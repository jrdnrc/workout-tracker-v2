import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import {
  useAllWorkoutsQuery,
  useGetTemplateForWorkoutQuery,
  useCreateWorkoutMutation,
  useAddWorkoutExerciseMutation,
  useAddSetFromTemplateMutation,
  useAllTemplatesForWorkoutQuery,
} from '../generated/graphql';

gql`
  query AllWorkouts {
    allWorkouts(orderBy: NATURAL) {
      nodes {
        id
        name
        date
        notes
        completed
        durationMinutes
        workoutExercisesByWorkoutId {
          totalCount
        }
      }
    }
  }
`;

gql`
  query GetTemplateForWorkout($id: UUID!) {
    workoutTemplateById(id: $id) {
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
  query AllTemplatesForWorkout {
    allWorkoutTemplates(orderBy: NATURAL) {
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
  const fromTemplateId = searchParams.get('fromTemplate');
  const templateName = searchParams.get('name');
  const templateDate = searchParams.get('date');
  
  const [showTemplateSelector, setShowTemplateSelector] = useState(showNew);
  const [showManualForm, setShowManualForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const user = getCurrentUser();
  const { data, loading } = useAllWorkoutsQuery();
  const { data: templatesData, loading: templatesLoading } = useAllTemplatesForWorkoutQuery();
  const { data: templateData } = useGetTemplateForWorkoutQuery({
    variables: { id: fromTemplateId! },
    skip: !fromTemplateId,
  });
  const [createWorkout, { loading: creating }] = useCreateWorkoutMutation();
  const [addWorkoutExercise] = useAddWorkoutExerciseMutation();
  const [addSet] = useAddSetFromTemplateMutation();

  useEffect(() => {
    if (showNew) {
      setShowTemplateSelector(true);
      setSearchParams({});
    }
  }, [showNew, setSearchParams]);

  // Handle creating workout from template
  useEffect(() => {
    if (fromTemplateId && templateData?.workoutTemplateById) {
      handleCreateFromTemplate();
    }
  }, [fromTemplateId, templateData]);

  const handleCreateFromTemplate = async () => {
    if (!templateData?.workoutTemplateById || !user?.id) return;

    try {
      const template = templateData.workoutTemplateById;
      
      // Create the workout
      const workoutResult = await createWorkout({
        variables: {
          input: {
            workout: {
              userId: user.id,
              name: templateName || template.name,
              date: templateDate || new Date().toISOString().split('T')[0],
              completed: false,
            },
          },
        },
      });

      const workoutId = workoutResult.data?.createWorkout?.workout?.id;
      if (!workoutId) {
        throw new Error('Failed to create workout');
      }

      // Add exercises and sets from template
      for (const templateExercise of template.templateExercisesByTemplateId.nodes) {
        const workoutExerciseResult = await addWorkoutExercise({
          variables: {
            input: {
              workoutExercise: {
                workoutId,
                exerciseId: templateExercise.exerciseId,
                orderIndex: templateExercise.orderIndex,
                notes: templateExercise.notes,
              },
            },
          },
        });

        const workoutExerciseId = workoutExerciseResult.data?.createWorkoutExercise?.workoutExercise?.id;
        if (!workoutExerciseId) {
          throw new Error('Failed to create workout exercise');
        }

        // Create sets based on target sets
        const targetSets = templateExercise.targetSets || 3;
        for (let i = 1; i <= targetSets; i++) {
          await addSet({
            variables: {
              input: {
                set: {
                  workoutExerciseId,
                  setNumber: i,
                  completed: false,
                },
              },
            },
          });
        }
      }

      // Navigate to the workout
      navigate(`/workouts/${workoutId}`);
    } catch (error) {
      console.error('Error creating workout from template:', error);
      alert('Failed to create workout from template');
      setSearchParams({});
    }
  };

  const handleStartWorkout = (templateId: string, templateName: string) => {
    const today = new Date().toISOString().split('T')[0];
    const workoutName = `${templateName} - ${new Date().toLocaleDateString()}`;
    
    navigate(`/workouts?fromTemplate=${templateId}&name=${encodeURIComponent(workoutName)}&date=${today}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createWorkout({
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
      console.error('Error creating workout:', error);
      alert('Failed to create workout');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workouts</h1>
          <p className="mt-2 text-gray-600">View and track your workout history</p>
        </div>
        <button
          onClick={() => {
            setShowTemplateSelector(!showTemplateSelector);
            setShowManualForm(false);
          }}
          className="btn-primary"
        >
          {showTemplateSelector ? 'Cancel' : '+ New Workout'}
        </button>
      </div>

      {showTemplateSelector && !showManualForm && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Start Workout from Template</h2>
          <p className="text-gray-600 mb-6">
            Choose a template to quickly start a pre-planned workout
          </p>
          
          {templatesLoading ? (
            <p className="text-gray-500">Loading templates...</p>
          ) : templatesData?.allWorkoutTemplates?.nodes && templatesData.allWorkoutTemplates.nodes.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {templatesData.allWorkoutTemplates.nodes.map((template: any) => (
                  <button
                    key={template.id}
                    onClick={() => handleStartWorkout(template.id, template.name)}
                    className="text-left border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:bg-blue-50 transition"
                  >
                    <h3 className="font-bold text-gray-900">{template.name}</h3>
                    {template.description && (
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {template.templateExercisesByTemplateId.totalCount} exercises
                    </p>
                  </button>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowManualForm(true)}
                  className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                  Advanced: Create blank workout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No templates available</p>
              <div className="space-y-2">
                <Link to="/templates" className="btn-primary inline-block">
                  Create a Template First
                </Link>
                <div>
                  <button
                    onClick={() => setShowManualForm(true)}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Or create a blank workout
                  </button>
                </div>
              </div>
            </div>
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
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to templates
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workout Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                placeholder="e.g., Upper Body Day"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="input"
                rows={3}
                placeholder="Optional workout notes"
              />
            </div>
            <button type="submit" disabled={creating} className="btn-primary w-full">
              {creating ? 'Creating...' : 'Create Workout'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <p className="text-gray-500">Loading workouts...</p>
        ) : data?.allWorkouts?.nodes && data.allWorkouts.nodes.length > 0 ? (
          <div className="space-y-3">
            {data.allWorkouts.nodes.map((workout: any) => (
              <Link
                key={workout.id}
                to={`/workouts/${workout.id}`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{workout.name}</h3>
                      {workout.completed && (
                        <span className="text-green-600 text-sm">✓ Completed</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(workout.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    {workout.notes && (
                      <p className="text-sm text-gray-600 mt-2">{workout.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {workout.workoutExercisesByWorkoutId.totalCount} exercises
                    </p>
                    {workout.durationMinutes && (
                      <p className="text-sm text-gray-500 mt-1">
                        {workout.durationMinutes} min
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No workouts yet</p>
            <button onClick={() => setShowTemplateSelector(true)} className="btn-primary">
              Create Your First Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

