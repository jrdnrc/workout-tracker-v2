import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getCurrentUser } from '../lib/auth';
import { handleError } from '../lib/errors';
import { ERROR_MESSAGES } from '../constants';
import {
  useGetTemplateQuery,
  useExercisesForTemplateQuery,
  useCreateTemplateMutation,
  useCreateTemplateExerciseMutation,
} from '../generated/graphql';
import LoadingState from '../components/LoadingState';
import FormField from '../components/FormField';
import BackButton from '../components/BackButton';
import { ROUTES } from '../constants';

gql`
  query GetTemplate($id: UUID!) {
    workoutTemplate(id: $id) {
      id
      name
      description
      templateExercisesByTemplateId(orderBy: NATURAL) {
        nodes {
          id
          exerciseId
          orderIndex
          targetSets
          targetReps
          notes
          exercise {
            id
            name
          }
        }
      }
    }
  }
`;

gql`
  query ExercisesForTemplate {
    exercises(orderBy: NATURAL) {
      nodes {
        id
        name
      }
    }
  }
`;

gql`
  mutation CreateTemplate($input: CreateWorkoutTemplateInput!) {
    createWorkoutTemplate(input: $input) {
      workoutTemplate {
        id
      }
    }
  }
`;

gql`
  mutation CreateTemplateExercise($input: CreateTemplateExerciseInput!) {
    createTemplateExercise(input: $input) {
      templateExercise {
        id
      }
    }
  }
`;

interface TemplateExercise {
  exerciseId: string;
  targetSets: number;
  targetReps: number;
  notes: string;
}

export default function TemplateFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const isNew = id === 'new';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [templateExercises, setTemplateExercises] = useState<TemplateExercise[]>([]);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [targetSets, setTargetSets] = useState(3);
  const [targetReps, setTargetReps] = useState(10);
  const [notes, setNotes] = useState('');

  const { data: templateData, loading: templateLoading } = useGetTemplateQuery({
    variables: { id: id! },
    skip: isNew,
  });

  const { data: exercisesData } = useExercisesForTemplateQuery();
  const [createTemplate, { loading: creating }] = useCreateTemplateMutation();
  const [createTemplateExercise] = useCreateTemplateExerciseMutation();

  useEffect(() => {
    if (templateData?.workoutTemplate) {
      const template = templateData.workoutTemplate;
      setName(template.name);
      setDescription(template.description || '');
      setTemplateExercises(
        template.templateExercisesByTemplateId.nodes.map((te) => ({
          exerciseId: te.exerciseId,
          targetSets: te.targetSets || 3,
          targetReps: te.targetReps || 10,
          notes: te.notes || '',
        }))
      );
    }
  }, [templateData]);

  const handleAddExercise = () => {
    if (!selectedExerciseId) return;
    
    setTemplateExercises([
      ...templateExercises,
      {
        exerciseId: selectedExerciseId,
        targetSets,
        targetReps,
        notes,
      },
    ]);

    setSelectedExerciseId('');
    setTargetSets(3);
    setTargetReps(10);
    setNotes('');
    setShowAddExercise(false);
  };

  const handleRemoveExercise = (index: number) => {
    setTemplateExercises(templateExercises.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    if (templateExercises.length === 0) {
      toast.error('Please add at least one exercise');
      return;
    }

    try {
      // Create template
      const result = await createTemplate({
        variables: {
          input: {
            workoutTemplate: {
              userId: user?.id,
              name: name.trim(),
              description: description.trim() || null,
              isPublic: false,
            },
          },
        },
      });

      const templateId = result.data?.createWorkoutTemplate?.workoutTemplate?.id;

      // Add exercises
      for (let i = 0; i < templateExercises.length; i++) {
        const exercise = templateExercises[i];
        await createTemplateExercise({
          variables: {
            input: {
              templateExercise: {
                templateId,
                exerciseId: exercise.exerciseId,
                orderIndex: i + 1,
                targetSets: exercise.targetSets,
                targetReps: exercise.targetReps,
                notes: exercise.notes || null,
              },
            },
          },
        });
      }

      navigate('/templates');
    } catch (error) {
      handleError(error, ERROR_MESSAGES.CREATE_FAILED);
    }
  };

  const getExerciseName = (exerciseId: string) => {
    const exercise = exercisesData?.exercises?.nodes?.find((e) => e.id === exerciseId);
    return exercise?.name || 'Unknown Exercise';
  };

  if (templateLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BackButton to={ROUTES.TEMPLATES} />
        <h1 className="text-3xl font-bold text-secondary-900">
          {isNew ? 'Create Template' : 'Edit Template'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Template Details</h2>
          <div className="space-y-4">
            <FormField label="Template Name" required>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="e.g., Push Day, Upper Body"
              />
            </FormField>
            <FormField label="Description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
                rows={3}
                placeholder="Optional description of this template"
              />
            </FormField>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Exercises</h2>

          {templateExercises.length > 0 && (
            <div className="space-y-2 mb-4">
              {templateExercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900">{getExerciseName(exercise.exerciseId)}</p>
                    <p className="text-sm text-secondary-600">
                      {exercise.targetSets} sets × {exercise.targetReps} reps
                      {exercise.notes && ` • ${exercise.notes}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(index)}
                    className="text-danger-600 hover:text-danger-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {showAddExercise ? (
            <div className="border border-primary-200 rounded-lg p-4 bg-primary-50">
              <h3 className="font-medium text-secondary-900 mb-3">Add Exercise</h3>
              <div className="space-y-3">
                <FormField label="Exercise">
                  <select
                    value={selectedExerciseId}
                    onChange={(e) => setSelectedExerciseId(e.target.value)}
                    className="input"
                  >
                    <option value="">Select an exercise...</option>
                    {exercisesData?.exercises?.nodes?.map((exercise) => (
                      <option key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </option>
                    ))}
                  </select>
                </FormField>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Target Sets">
                    <input
                      type="number"
                      min="1"
                      value={targetSets}
                      onChange={(e) => setTargetSets(parseInt(e.target.value))}
                      className="input"
                    />
                  </FormField>
                  <FormField label="Target Reps">
                    <input
                      type="number"
                      min="1"
                      value={targetReps}
                      onChange={(e) => setTargetReps(parseInt(e.target.value))}
                      className="input"
                    />
                  </FormField>
                </div>
                <FormField label="Notes">
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input"
                    placeholder="e.g., Per leg, To failure"
                  />
                </FormField>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddExercise}
                    disabled={!selectedExerciseId}
                    className="btn-primary flex-1"
                  >
                    Add Exercise
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddExercise(false);
                      setSelectedExerciseId('');
                      setNotes('');
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowAddExercise(true)}
              className="w-full py-3 border-2 border-dashed border-secondary-300 rounded-lg text-secondary-600 hover:border-primary-400 hover:text-primary-600 transition"
            >
              + Add Exercise
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={creating} className="btn-primary flex-1">
            {creating ? 'Saving...' : 'Save Template'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/templates')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

