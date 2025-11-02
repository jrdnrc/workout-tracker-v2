import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import StartWorkoutFromTemplateButton from '../components/StartWorkoutFromTemplateButton';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import FormField from '../components/FormField';
import {
  useWorkoutsQuery,
  useCreateWorkoutMutation,
  useTemplatesForWorkoutQuery,
} from '../generated/graphql';
import { handleError } from '../lib/errors';
import { ERROR_MESSAGES } from '../constants';

gql`
  query Workouts {
    workouts(orderBy: NATURAL) {
      nodes {
        id
        name
        date
        notes
        completed
        durationMinutes
        workoutExercises {
          totalCount
        }
      }
    }
  }
`;

gql`
  query GetTemplateForWorkout($id: UUID!) {
    workoutTemplate(id: $id) {
      id
      name
      templateExercisesByTemplateId(orderBy: NATURAL) {
        nodes {
          exerciseId
          orderIndex
          targetSets
          targetReps
          notes
        }
      }
    }
  }
`;

gql`
  mutation CreateWorkout($input: CreateWorkoutInput!) {
    createWorkout(input: $input) {
      workout {
        id
        name
        date
      }
    }
  }
`;

gql`
  mutation AddWorkoutExercise($input: CreateWorkoutExerciseInput!) {
    createWorkoutExercise(input: $input) {
      workoutExercise {
        id
      }
    }
  }
`;

gql`
  mutation AddSetFromTemplate($input: CreateSetInput!) {
    createSet(input: $input) {
      set {
        id
      }
    }
  }
`;

gql`
  query TemplatesForWorkout {
    workoutTemplates(orderBy: NATURAL) {
      nodes {
        id
        name
        description
        templateExercisesByTemplateId {
          totalCount
        }
      }
    }
  }
`;

export default function WorkoutsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const showNew = searchParams.get('new') === 'true';
  
  const [showTemplateSelector, setShowTemplateSelector] = useState(showNew);
  const [showManualForm, setShowManualForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const user = getCurrentUser();
  const { data, loading } = useWorkoutsQuery();
  const { data: templatesData, loading: templatesLoading } = useTemplatesForWorkoutQuery();
  const [createWorkoutMutation, { loading: creating }] = useCreateWorkoutMutation();

  useEffect(() => {
    if (showNew) {
      setShowTemplateSelector(true);
      setSearchParams({});
    }
  }, [showNew, setSearchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createWorkoutMutation({
        variables: {
          input: {
            workout: {
              userId: user?.id,
              name: formData.name,
              date: formData.date,
              notes: formData.notes || null,
              completed: false,
            },
          },
        },
      });
      const workoutId = result.data?.createWorkout?.workout?.id;
      if (!workoutId) {
        throw new Error('Failed to create workout');
      }
      setFormData({ name: '', date: new Date().toISOString().split('T')[0], notes: '' });
      setShowManualForm(false);
      setShowTemplateSelector(false);
      navigate(`/workouts/${workoutId}`);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.CREATE_FAILED);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workouts"
        subtitle="View and track your workout history"
        action={
        <button
          onClick={() => {
            setShowTemplateSelector(!showTemplateSelector);
            setShowManualForm(false);
          }}
          className="btn-primary"
        >
          {showTemplateSelector ? 'Cancel' : '+ New Workout'}
        </button>
        }
      />

      {showTemplateSelector && !showManualForm && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Start Workout from Template</h2>
          <p className="text-secondary-600 mb-6">
            Choose a template to quickly start a pre-planned workout
          </p>
          
          {templatesLoading ? (
            <LoadingState message="Loading templates..." />
          ) : templatesData?.workoutTemplates?.nodes && templatesData.workoutTemplates.nodes.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templatesData.workoutTemplates.nodes.map((template) => (
                  <StartWorkoutFromTemplateButton
                    key={template.id}
                    templateId={template.id}
                    templateName={template.name}
                    variant="card"
                    className="w-full"
                  >
                    <div className="w-full">
                      <h3 className="font-bold text-secondary-900">{template.name}</h3>
                    {template.description && (
                        <p className="text-sm text-secondary-600 mt-1">{template.description}</p>
                    )}
                      <p className="text-xs text-secondary-500 mt-2">
                      {template.templateExercisesByTemplateId.totalCount} exercises
                    </p>
                    </div>
                  </StartWorkoutFromTemplateButton>
                ))}
              </div>
              
              <div className="pt-4 border-t border-secondary-200">
                <button
                  onClick={() => setShowManualForm(true)}
                  className="text-sm text-secondary-600 hover:text-secondary-900 underline"
                >
                  Advanced: Create blank workout
                </button>
              </div>
            </div>
          ) : (
            <EmptyState
              message="No templates available"
              action={
              <div className="space-y-2">
                <Link to="/templates" className="btn-primary inline-block">
                  Create a Template First
                </Link>
                <div>
                  <button
                    onClick={() => setShowManualForm(true)}
                      className="text-sm text-secondary-600 hover:text-secondary-900 underline"
                  >
                    Or create a blank workout
                  </button>
                </div>
              </div>
              }
            />
          )}
        </div>
      )}

      {showManualForm && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Create Blank Workout</h2>
            <button
              onClick={() => {
                setShowManualForm(false);
                setShowTemplateSelector(true);
              }}
              className="text-sm text-secondary-600 hover:text-secondary-900"
            >
              ← Back to templates
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Workout Name" required>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                placeholder="e.g., Upper Body Day"
              />
            </FormField>
            <FormField label="Date" required>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input"
              />
            </FormField>
            <FormField label="Notes">
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="input"
                rows={3}
                placeholder="Optional workout notes"
              />
            </FormField>
            <button type="submit" disabled={creating} className="btn-primary w-full">
              {creating ? 'Creating...' : 'Create Workout'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <LoadingState message="Loading workouts..." />
        ) : data?.workouts?.nodes && data.workouts.nodes.length > 0 ? (
          <div className="space-y-3">
            {data.workouts.nodes.map((workout) => (
              <Link
                key={workout.id}
                to={`/workouts/${workout.id}`}
                className="block p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-secondary-900">{workout.name}</h3>
                      {workout.completed && (
                        <span className="text-success-600 text-sm">✓ Completed</span>
                      )}
                    </div>
                    <p className="text-sm text-secondary-500 mt-1">
                      {new Date(workout.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    {workout.notes && (
                      <p className="text-sm text-secondary-600 mt-2">{workout.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-secondary-600">
                      {workout.workoutExercises.totalCount} exercises
                    </p>
                    {workout.durationMinutes && (
                      <p className="text-sm text-secondary-500 mt-1">
                        {workout.durationMinutes} min
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No workouts yet"
            action={
            <button onClick={() => setShowTemplateSelector(true)} className="btn-primary">
              Create Your First Workout
            </button>
            }
          />
        )}
      </div>
    </div>
  );
}

