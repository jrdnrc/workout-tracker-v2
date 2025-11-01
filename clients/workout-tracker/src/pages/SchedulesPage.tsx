import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  useAllSchedulesQuery,
  useDeleteScheduleMutation,
  useActivateScheduleMutation,
} from '../generated/graphql';

gql`
  query AllSchedules {
    allWorkoutSchedules(orderBy: NATURAL) {
      nodes {
        id
        name
        isActive
        createdAt
        scheduledWorkoutsByScheduleId {
          totalCount
        }
      }
    }
  }
`;

gql`
  mutation DeleteSchedule($input: DeleteWorkoutScheduleByIdInput!) {
    deleteWorkoutScheduleById(input: $input) {
      workoutSchedule {
        id
      }
    }
  }
`;

gql`
  mutation ActivateSchedule($input: UpdateWorkoutScheduleByIdInput!) {
    updateWorkoutScheduleById(input: $input) {
      workoutSchedule {
        id
        isActive
      }
    }
  }
`;

export default function SchedulesPage() {
  const { data, loading, refetch } = useAllSchedulesQuery();
  const [deleteSchedule] = useDeleteScheduleMutation();
  const [activateSchedule] = useActivateScheduleMutation();

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the "${name}" schedule?`)) return;
    try {
      await deleteSchedule({
        variables: { input: { id } },
      });
      refetch();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Failed to delete schedule');
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await activateSchedule({
        variables: {
          input: {
            id,
            workoutSchedulePatch: {
              isActive: true,
            },
          },
        },
      });
      refetch();
    } catch (error) {
      console.error('Error activating schedule:', error);
      alert('Failed to activate schedule');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workout Schedules</h1>
          <p className="mt-2 text-gray-600">Plan your weekly workout routine</p>
        </div>
        <Link to="/schedules/new" className="btn-primary">
          + Create Schedule
        </Link>
      </div>

      <div className="card">
        {loading ? (
          <p className="text-gray-500">Loading schedules...</p>
        ) : data?.allWorkoutSchedules?.nodes && data.allWorkoutSchedules.nodes.length > 0 ? (
          <div className="space-y-3">
            {data.allWorkoutSchedules.nodes.map((schedule: any) => (
              <div
                key={schedule.id}
                className={`p-4 rounded-lg border-2 transition ${
                  schedule.isActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{schedule.name}</h3>
                      {schedule.isActive && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {schedule.scheduledWorkoutsByScheduleId.totalCount} days scheduled
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!schedule.isActive && (
                      <button
                        onClick={() => handleActivate(schedule.id)}
                        className="text-sm px-3 py-1 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                      >
                        Set Active
                      </button>
                    )}
                    <Link
                      to={`/schedules/${schedule.id}`}
                      className="text-sm px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(schedule.id, schedule.name)}
                      className="text-sm px-3 py-1 text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No schedules yet</p>
            <Link to="/schedules/new" className="btn-primary inline-block">
              Create Your First Schedule
            </Link>
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border-blue-200">
        <h2 className="text-lg font-bold text-blue-900 mb-2">📅 What are schedules?</h2>
        <p className="text-sm text-blue-800">
          Schedules let you plan your weekly workout routine. Assign workout templates to specific
          days of the week, and the app will prompt you to start today's workout on your dashboard.
          Perfect for following consistent training splits!
        </p>
      </div>
    </div>
  );
}

