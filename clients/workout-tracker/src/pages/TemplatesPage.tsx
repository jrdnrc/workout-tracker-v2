import { useState } from 'react';
import { gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import { useAllTemplatesQuery, useDeleteTemplateMutation } from '../generated/graphql';

gql`
  query AllTemplates {
    allWorkoutTemplates(orderBy: NATURAL) {
      nodes {
        id
        name
        description
        createdAt
        templateExercisesByTemplateId {
          totalCount
        }
      }
    }
  }
`;

gql`
  mutation DeleteTemplate($input: DeleteWorkoutTemplateByIdInput!) {
    deleteWorkoutTemplateById(input: $input) {
      workoutTemplate {
        id
      }
    }
  }
`;

export default function TemplatesPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const { data, loading, refetch } = useAllTemplatesQuery();
  const [deleteTemplate] = useDeleteTemplateMutation();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the "${name}" template?`)) return;
    try {
      await deleteTemplate({
        variables: { input: { id } },
      });
      refetch();
    } catch (error) {
      console.error('Error deleting template:', error);
      alert('Failed to delete template');
    }
  };

  const handleStartWorkout = async (templateId: string, templateName: string) => {
    const today = new Date().toISOString().split('T')[0];
    const workoutName = `${templateName} - ${new Date().toLocaleDateString()}`;
    
    navigate(`/workouts?fromTemplate=${templateId}&name=${encodeURIComponent(workoutName)}&date=${today}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workout Templates</h1>
          <p className="mt-2 text-gray-600">Reusable workout plans for faster logging</p>
        </div>
        <Link to="/templates/new" className="btn-primary">
          + Create Template
        </Link>
      </div>

      <div className="card">
        {loading ? (
          <p className="text-gray-500">Loading templates...</p>
        ) : data?.allWorkoutTemplates?.nodes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.allWorkoutTemplates.nodes.map((template: any) => (
              <div
                key={template.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{template.name}</h3>
                    {template.description && (
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(template.id, template.name)}
                    className="text-red-600 hover:text-red-700 text-sm ml-2"
                  >
                    Delete
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {template.templateExercisesByTemplateId.totalCount} exercises
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={`/templates/${template.id}`}
                      className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1 border border-gray-300 rounded-md"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleStartWorkout(template.id, template.name)}
                      className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md"
                    >
                      Start Workout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No templates yet</p>
            <Link to="/templates/new" className="btn-primary inline-block">
              Create Your First Template
            </Link>
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border-blue-200">
        <h2 className="text-lg font-bold text-blue-900 mb-2">💡 What are templates?</h2>
        <p className="text-sm text-blue-800">
          Templates are reusable workout plans. Create them once with your favorite exercises and
          target sets/reps, then quickly start new workouts from them. Perfect for following
          consistent training splits like Push/Pull/Legs or Upper/Lower.
        </p>
      </div>
    </div>
  );
}

