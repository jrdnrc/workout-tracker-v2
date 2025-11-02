import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useTemplatesQuery, useDeleteTemplateMutation } from '../generated/graphql';
import { useDelete } from '../hooks/useDelete';
import StartWorkoutFromTemplateButton from '../components/StartWorkoutFromTemplateButton';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import DeleteButton from '../components/DeleteButton';
import InfoCard from '../components/InfoCard';

gql`
  query Templates {
    workoutTemplates(orderBy: NATURAL) {
      nodes {
        ...TemplateFields
      }
    }
  }
`;

gql`
  mutation DeleteTemplate($input: DeleteWorkoutTemplateInput!) {
    deleteWorkoutTemplate(input: $input) {
      workoutTemplate {
        id
      }
    }
  }
`;

export default function TemplatesPage() {
  const { data, loading, refetch } = useTemplatesQuery();
  const [deleteTemplate] = useDeleteTemplateMutation();

  const { handleDelete, isDeleting } = useDelete(
    async (id: string) => {
      await deleteTemplate({
        variables: { input: { id } },
      });
    },
    () => refetch()
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workout Templates"
        subtitle="Reusable workout plans for faster logging"
        action={<Link to={`${ROUTES.TEMPLATES}/new`} className="btn-primary">+ Create Template</Link>}
      />

      <div className="card">
        {loading ? (
          <LoadingState message="Loading templates..." />
        ) : data?.workoutTemplates?.nodes && data.workoutTemplates.nodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.workoutTemplates.nodes.map((template) => (
              <div
                key={template.id}
                className="border border-secondary-200 rounded-lg p-4 hover:border-primary-300 transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-secondary-900">{template.name}</h3>
                    {template.description && (
                      <p className="text-sm text-secondary-600 mt-1">{template.description}</p>
                    )}
                  </div>
                  <DeleteButton
                    onClick={() => handleDelete(template.id, template.name, `Are you sure you want to delete the "${template.name}" template?`)}
                    disabled={isDeleting}
                    className="ml-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">
                    {template.templateExercisesByTemplateId.totalCount} exercises
                  </span>
                  <div className="flex gap-2 items-center">
                    <Link
                      to={`${ROUTES.TEMPLATES}/${template.id}`}
                      className="text-sm text-secondary-700 hover:text-secondary-900 px-3 py-1 border border-secondary-300 rounded-md flex items-center justify-center min-h-[44px]"
                    >
                      View
                    </Link>
                    <StartWorkoutFromTemplateButton
                      templateId={template.id}
                      templateName={template.name}
                      className="text-sm px-3 py-1"
                    >
                      Start Workout
                    </StartWorkoutFromTemplateButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No templates yet"
            action={<Link to={`${ROUTES.TEMPLATES}/new`} className="btn-primary inline-block">Create Your First Template</Link>}
          />
        )}
      </div>

      <InfoCard
        title="💡 What are templates?"
        variant="info"
      >
          Templates are reusable workout plans. Create them once with your favorite exercises and
          target sets/reps, then quickly start new workouts from them. Perfect for following
          consistent training splits like Push/Pull/Legs or Upper/Lower.
      </InfoCard>
    </div>
  );
}

