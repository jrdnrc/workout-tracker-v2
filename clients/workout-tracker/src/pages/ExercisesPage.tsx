import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import {
  useExercisesQuery,
  useCreateExerciseMutation,
  useDeleteExerciseMutation,
} from '../generated/graphql';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import FormField from '../components/FormField';
import DeleteButton from '../components/DeleteButton';
import { handleError } from '../lib/errors';
import { useDelete } from '../hooks/useDelete';
import { ERROR_MESSAGES } from '../constants';

gql`
  query Exercises {
    exercises(orderBy: NATURAL) {
      nodes {
        ...ExerciseFields
      }
    }
  }
`;

gql`
  mutation CreateExercise($input: CreateExerciseInput!) {
    createExercise(input: $input) {
      exercise {
        id
        name
        description
        category
        muscleGroups
      }
    }
  }
`;

gql`
  mutation DeleteExercise($input: DeleteExerciseInput!) {
    deleteExercise(input: $input) {
      exercise {
        id
      }
    }
  }
`;

export default function ExercisesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const showNew = searchParams.get('new') === 'true';
  const [showForm, setShowForm] = useState(showNew);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    muscleGroups: '',
  });

  const user = getCurrentUser();
  const { data, loading, refetch } = useExercisesQuery();
  const [createExercise, { loading: creating }] = useCreateExerciseMutation();
  const [deleteExercise] = useDeleteExerciseMutation();

  const { handleDelete, isDeleting } = useDelete(
    async (id: string) => {
      await deleteExercise({
        variables: { input: { id } },
      });
    },
    () => refetch()
  );

  useEffect(() => {
    if (showNew) {
      setShowForm(true);
      setSearchParams({});
    }
  }, [showNew, setSearchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createExercise({
        variables: {
          input: {
            exercise: {
              userId: user?.id,
              name: formData.name,
              description: formData.description || null,
              category: formData.category || null,
              muscleGroups: formData.muscleGroups
                ? formData.muscleGroups.split(',').map((s) => s.trim())
                : null,
            },
          },
        },
      });
      setFormData({ name: '', description: '', category: '', muscleGroups: '' });
      setShowForm(false);
      refetch();
    } catch (error) {
      handleError(error, ERROR_MESSAGES.CREATE_FAILED);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Exercises"
        subtitle="Manage your exercise library"
        action={
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Exercise'}
        </button>
        }
      />

      {showForm && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">New Exercise</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Name" required>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                placeholder="e.g., Bench Press"
              />
            </FormField>
            <FormField label="Description">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input"
                rows={3}
                placeholder="Optional description or notes"
              />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category">
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                  placeholder="e.g., Compound, Isolation"
                />
              </FormField>
              <FormField label="Muscle Groups">
                <input
                  type="text"
                  value={formData.muscleGroups}
                  onChange={(e) => setFormData({ ...formData, muscleGroups: e.target.value })}
                  className="input"
                  placeholder="e.g., Chest, Triceps (comma-separated)"
                />
              </FormField>
            </div>
            <button type="submit" disabled={creating} className="btn-primary w-full">
              {creating ? 'Creating...' : 'Create Exercise'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <LoadingState message="Loading exercises..." />
        ) : data?.exercises?.nodes && data.exercises.nodes.length > 0 ? (
          <div className="space-y-2">
            {data.exercises.nodes.map((exercise) => (
              <div
                key={exercise.id}
                className="flex justify-between items-start p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-secondary-900">{exercise.name}</h3>
                  {exercise.description && (
                    <p className="text-sm text-secondary-600 mt-1">{exercise.description}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {exercise.category && (
                      <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                        {exercise.category}
                      </span>
                    )}
                    {exercise.muscleGroups?.map((muscle) => (
                      <span
                        key={muscle}
                        className="text-xs px-2 py-1 bg-success-100 text-success-700 rounded"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                <DeleteButton
                  onClick={() => handleDelete(exercise.id, exercise.name, 'Are you sure you want to delete this exercise?')}
                  disabled={isDeleting}
                  className="ml-4"
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No exercises yet"
            action={
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Your First Exercise
            </button>
            }
          />
        )}
      </div>
    </div>
  );
}

