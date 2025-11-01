import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import {
  useGetTemplateQuery,
  useAllExercisesForTemplateQuery,
  useCreateTemplateMutation,
  useCreateTemplateExerciseMutation,
} from '../generated/graphql';

gql`
  query GetTemplate($id: UUID!) {
    workoutTemplateById(id: $id) {
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
          exerciseByExerciseId {
            id
            name
          }
        }
      }
    }
  }
`;

gql`
  query AllExercisesForTemplate {
    allExercises(orderBy: NATURAL) {
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

  const { data: exercisesData } = useAllExercisesForTemplateQuery();
  const [createTemplate, { loading: creating }] = useCreateTemplateMutation();
  const [createTemplateExercise] = useCreateTemplateExerciseMutation();

  useEffect(() => {
    if (templateData?.workoutTemplateById) {
      const template = templateData.workoutTemplateById;
      setName(template.name);
      setDescription(template.description || '');
      setTemplateExercises(
        template.templateExercisesByTemplateId.nodes.map((te: any) => ({
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
      alert('Please enter a template name');
      return;
    }

    if (templateExercises.length === 0) {
      alert('Please add at least one exercise');
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

      const templateId = result.data.createWorkoutTemplate.workoutTemplate.id;

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
      console.error('Error creating template:', error);
      alert('Failed to create template');
    }
  };

  const getExerciseName = (exerciseId: string) => {
    const exercise = exercisesData?.allExercises?.nodes?.find((e: any) => e.id === exerciseId);
    return exercise?.name || 'Unknown Exercise';
  };

  if (templateLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/templates')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? 'Create Template' : 'Edit Template'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Template Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="e.g., Push Day, Upper Body"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
                rows={3}
                placeholder="Optional description of this template"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Exercises</h2>

          {templateExercises.length > 0 && (
            <div className="space-y-2 mb-4">
              {templateExercises.map((exercise, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{getExerciseName(exercise.exerciseId)}</p>
                    <p className="text-sm text-gray-600">
                      {exercise.targetSets} sets × {exercise.targetReps} reps
                      {exercise.notes && ` • ${exercise.notes}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {showAddExercise ? (
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-medium text-gray-900 mb-3">Add Exercise</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exercise</label>
                  <select
                    value={selectedExerciseId}
                    onChange={(e) => setSelectedExerciseId(e.target.value)}
                    className="input"
                  >
                    <option value="">Select an exercise...</option>
                    {exercisesData?.allExercises?.nodes?.map((exercise: any) => (
                      <option key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Sets
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={targetSets}
                      onChange={(e) => setTargetSets(parseInt(e.target.value))}
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Reps
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={targetReps}
                      onChange={(e) => setTargetReps(parseInt(e.target.value))}
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input"
                    placeholder="e.g., Per leg, To failure"
                  />
                </div>
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
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition"
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

