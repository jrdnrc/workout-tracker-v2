import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { handleError } from '../lib/errors';
import { ROUTES } from '../constants';
import {
  useSplitsQuery,
  useDeleteSplitMutation,
  useActivateSplitMutation,
} from '../generated/graphql';
import { useDelete } from '../hooks/useDelete';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import DeleteButton from '../components/DeleteButton';
import InfoCard from '../components/InfoCard';

gql`
  query Splits {
    workoutSplits(orderBy: NATURAL) {
      nodes {
        ...SplitFields
      }
    }
  }
`;

gql`
  mutation DeleteSplit($input: DeleteWorkoutSplitInput!) {
    deleteWorkoutSplit(input: $input) {
      workoutSplit {
        id
      }
    }
  }
`;

gql`
  mutation ActivateSplit($input: UpdateWorkoutSplitInput!) {
    updateWorkoutSplit(input: $input) {
      workoutSplit {
        id
        isActive
      }
    }
  }
`;

export default function SplitsPage() {
  const { data, loading, refetch } = useSplitsQuery();
  const [deleteSplit] = useDeleteSplitMutation();
  const [activateSplit] = useActivateSplitMutation();

  const { handleDelete, isDeleting } = useDelete(
    async (id: string) => {
      await deleteSplit({
        variables: { input: { id } },
      });
    },
    () => refetch()
  );

  const handleActivate = async (id: string) => {
    try {
      await activateSplit({
        variables: {
          input: {
            id,
            patch: {
              isActive: true,
            },
          },
        },
      });
      toast.success('Split activated successfully');
      refetch();
    } catch (error) {
      handleError(error, 'Failed to activate split');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workout Splits"
        subtitle="Plan your weekly workout routine"
        action={<Link to={`${ROUTES.SPLITS}/new`} className="btn-primary">+ Create Split</Link>}
      />

      <div className="card">
        {loading ? (
          <LoadingState message="Loading splits..." />
        ) : data?.workoutSplits?.nodes && data.workoutSplits.nodes.length > 0 ? (
          <div className="space-y-3">
            {data.workoutSplits.nodes.map((split) => (
              <div
                key={split.id}
                className={`p-4 rounded-lg border-2 transition ${
                  split.isActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-secondary-200 bg-secondary-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-secondary-900">{split.name}</h3>
                      {split.isActive && (
                        <span className="px-2 py-1 text-xs font-medium bg-primary-600 text-white rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-secondary-600 mt-1">
                      {split.splitWorkoutsBySplitId?.totalCount || 0} days scheduled
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!split.isActive && (
                      <button
                        onClick={() => handleActivate(split.id)}
                        className="text-sm px-3 py-1 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50"
                      >
                        Set Active
                      </button>
                    )}
                    <Link
                      to={`${ROUTES.SPLITS}/${split.id}`}
                      className="text-sm px-3 py-1 border border-secondary-300 text-secondary-700 rounded-md hover:bg-secondary-100"
                    >
                      Edit
                    </Link>
                    <DeleteButton
                      onClick={() => handleDelete(split.id, split.name, `Are you sure you want to delete the "${split.name}" split?`)}
                      disabled={isDeleting}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            message="No splits yet"
            action={<Link to={`${ROUTES.SPLITS}/new`} className="btn-primary inline-block">Create Your First Split</Link>}
          />
        )}
      </div>

      <InfoCard
        title="📅 What are splits?"
        variant="info"
      >
        Splits let you plan your weekly workout routine. Assign workout templates to specific
        days of the week, and the app will prompt you to start today's workout on your dashboard.
        Perfect for following consistent training splits!
      </InfoCard>
    </div>
  );
}
