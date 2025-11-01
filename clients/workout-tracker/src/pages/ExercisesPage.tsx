import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import {
  useAllExercisesQuery,
  useCreateExerciseMutation,
  useDeleteExerciseMutation,
} from '../generated/graphql';

gql`
  query AllExercises {
    allExercises(orderBy: NATURAL) {
      nodes {
        id
        name
        description
        category
        muscleGroups
        createdAt
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
  mutation DeleteExercise($input: DeleteExerciseByIdInput!) {
    deleteExerciseById(input: $input) {
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
  const { data, loading, refetch } = useAllExercisesQuery();
  const [createExercise, { loading: creating }] = useCreateExerciseMutation();
  const [deleteExercise] = useDeleteExerciseMutation();

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
      console.error('Error creating exercise:', error);
      alert('Failed to create exercise');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this exercise?')) return;
    try {
      await deleteExercise({
        variables: { input: { id } },
      });
      refetch();
    } catch (error) {
      console.error('Error deleting exercise:', error);
      alert('Failed to delete exercise');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exercises</h1>
          <p className="mt-2 text-gray-600">Manage your exercise library</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? 'Cancel' : '+ Add Exercise'}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">New Exercise</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                placeholder="e.g., Bench Press"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input"
                rows={3}
                placeholder="Optional description or notes"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                  placeholder="e.g., Compound, Isolation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Muscle Groups
                </label>
                <input
                  type="text"
                  value={formData.muscleGroups}
                  onChange={(e) => setFormData({ ...formData, muscleGroups: e.target.value })}
                  className="input"
                  placeholder="e.g., Chest, Triceps (comma-separated)"
                />
              </div>
            </div>
            <button type="submit" disabled={creating} className="btn-primary w-full">
              {creating ? 'Creating...' : 'Create Exercise'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <p className="text-gray-500">Loading exercises...</p>
        ) : data?.allExercises?.nodes?.length > 0 ? (
          <div className="space-y-2">
            {data.allExercises.nodes.map((exercise: any) => (
              <div
                key={exercise.id}
                className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{exercise.name}</h3>
                  {exercise.description && (
                    <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {exercise.category && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {exercise.category}
                      </span>
                    )}
                    {exercise.muscleGroups?.map((muscle: string) => (
                      <span
                        key={muscle}
                        className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(exercise.id)}
                  className="text-red-600 hover:text-red-700 text-sm ml-4"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No exercises yet</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Your First Exercise
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

