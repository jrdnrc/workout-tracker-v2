import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useRecentWorkoutsQuery, useDashboardStatsQuery, useTodayWorkoutQuery } from '../generated/graphql';
import StartWorkoutFromTemplateButton from '../components/StartWorkoutFromTemplateButton';
import PageHeader from '../components/PageHeader';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import StatsCard from '../components/StatsCard';

gql`
  query RecentWorkouts {
    workouts(first: 5, orderBy: DATE_DESC) {
      nodes {
        id
        name
        date
        completed
        durationMinutes
      }
    }
  }
`;

gql`
  query DashboardStats {
    workouts {
      totalCount
    }
    exercises {
      totalCount
    }
  }
`;

gql`
  query TodayWorkout {
    workoutSplits(orderBy: NATURAL) {
      nodes {
        id
        name
        isActive
        splitWorkoutsBySplitId {
          nodes {
            id
            dayOfWeek
            templateId
          }
        }
      }
    }
    workoutTemplates(orderBy: NATURAL) {
      nodes {
        id
        name
        description
        templateExercisesByTemplateId {
          totalCount
          nodes {
            exercise {
              name
            }
          }
        }
      }
    }
  }
`;

export default function DashboardPage() {
  const { data: workoutsData, loading: workoutsLoading } = useRecentWorkoutsQuery();
  const { data: statsData } = useDashboardStatsQuery();
  const { data: splitData } = useTodayWorkoutQuery();

  // Get today's day of week (0 = Sunday, 6 = Saturday)
  const today = new Date().getDay();

  // Find today's split workout
  const activeSplit = splitData?.workoutSplits?.nodes?.find(
    (split) => split.isActive
  );
  const todayWorkout = activeSplit?.splitWorkoutsBySplitId?.nodes?.find(
    (sw) => sw.dayOfWeek === today
  );
  
  // Find the template for today's workout
  const todayTemplate = splitData?.workoutTemplates?.nodes?.find(
    (template) => template.id === todayWorkout?.templateId
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Track your fitness journey"
      />

      {/* Today's Workout CTA - Prominent call to action */}
      {activeSplit && todayWorkout && todayTemplate && (
        <div className="card border-2 border-primary-500 bg-gradient-to-r from-primary-50 to-indigo-50 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-secondary-900 mb-1">Today's Workout</h2>
              <p className="text-xl text-primary-700 font-semibold mb-2">
                {todayTemplate.name}
              </p>
              {todayTemplate.description && (
                <p className="text-secondary-600 mb-3">
                  {todayTemplate.description}
                </p>
              )}
              <div className="bg-white rounded-lg p-3 inline-block">
                <p className="text-sm font-medium text-secondary-700 mb-1">
                  {todayTemplate.templateExercisesByTemplateId.totalCount} exercises:
                </p>
                <div className="text-sm text-secondary-600">
                  {todayTemplate.templateExercisesByTemplateId.nodes
                    .slice(0, 5)
                    .map((te) => te.exercise?.name)
                    .filter(Boolean)
                    .join(', ')}
                  {todayTemplate.templateExercisesByTemplateId.totalCount > 5 && '...'}
                </div>
              </div>
            </div>
            {todayWorkout && todayTemplate && (
              <StartWorkoutFromTemplateButton
                templateId={todayWorkout.templateId}
                templateName={todayTemplate.name}
                splitId={activeSplit.id}
                className="px-8 py-4 text-xl font-semibold whitespace-nowrap shadow-md hover:shadow-lg transition-shadow"
            >
              Start Workout 🏋️
              </StartWorkoutFromTemplateButton>
            )}
          </div>
        </div>
      )}

      {/* Rest Day Message */}
      {activeSplit && !todayWorkout && (
        <div className="card border-2 border-secondary-300 bg-gradient-to-r from-secondary-50 to-slate-50">
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Rest Day 😌</h2>
            <p className="text-secondary-600 mb-4">No workout scheduled for today</p>
            <Link to="/workouts" className="btn-secondary inline-block">
              Log Workout Anyway
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          label="Total Workouts"
          value={statsData?.workouts?.totalCount || 0}
        />
        <StatsCard
          label="Exercises"
          value={statsData?.exercises?.totalCount || 0}
        />
        <StatsCard
          label="This Week"
          value={workoutsData?.workouts?.nodes?.filter((w) => {
              const date = new Date(w.date);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return date >= weekAgo;
            }).length || 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-secondary-900">Recent Workouts</h2>
            <Link to="/workouts" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>
          {workoutsLoading ? (
            <LoadingState />
          ) : workoutsData?.workouts?.nodes && workoutsData.workouts.nodes.length > 0 ? (
            <div className="space-y-3">
              {workoutsData.workouts.nodes.map((workout) => (
                <Link
                  key={workout.id}
                  to={`/workouts/${workout.id}`}
                  className="block p-3 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-secondary-900">{workout.name}</h3>
                      <p className="text-sm text-secondary-500">
                        {new Date(workout.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {workout.durationMinutes && (
                        <span className="text-sm text-secondary-600">{workout.durationMinutes}m</span>
                      )}
                      {workout.completed && (
                        <span className="text-success-600">✓</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              message="No workouts yet"
              action={<Link to="/workouts" className="btn-primary inline-block">Start Your First Workout</Link>}
            />
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-secondary-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/workouts?new=true"
              className="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition text-center"
            >
              <span className="text-2xl mb-2 block">🏋️</span>
              <span className="font-medium text-primary-900">Log New Workout</span>
            </Link>
            <Link
              to="/exercises?new=true"
              className="block p-4 bg-success-50 rounded-lg hover:bg-success-100 transition text-center"
            >
              <span className="text-2xl mb-2 block">➕</span>
              <span className="font-medium text-success-900">Add Exercise</span>
            </Link>
            <Link
              to="/exercises"
              className="block p-4 bg-accent-50 rounded-lg hover:bg-accent-100 transition text-center"
            >
              <span className="text-2xl mb-2 block">📋</span>
              <span className="font-medium text-accent-900">View Exercises</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


