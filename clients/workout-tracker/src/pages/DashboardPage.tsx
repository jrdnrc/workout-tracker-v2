import { Link, useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useRecentWorkoutsQuery, useDashboardStatsQuery, useTodayWorkoutQuery } from '../generated/graphql';

gql`
  query RecentWorkouts {
    allWorkouts(first: 5, orderBy: NATURAL) {
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
    allWorkouts {
      totalCount
    }
    allExercises {
      totalCount
    }
  }
`;

gql`
  query TodayWorkout {
    allWorkoutSchedules(orderBy: NATURAL) {
      nodes {
        id
        name
        isActive
        scheduledWorkoutsByScheduleId {
          nodes {
            id
            dayOfWeek
            templateId
          }
        }
      }
    }
    allWorkoutTemplates(orderBy: NATURAL) {
      nodes {
        id
        name
        description
        templateExercisesByTemplateId {
          totalCount
          nodes {
            exerciseByExerciseId {
              name
            }
          }
        }
      }
    }
  }
`;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: workoutsData, loading: workoutsLoading } = useRecentWorkoutsQuery();
  const { data: statsData } = useDashboardStatsQuery();
  const { data: scheduleData } = useTodayWorkoutQuery();

  // Get today's day of week (0 = Sunday, 6 = Saturday)
  const today = new Date().getDay();

  // Find today's scheduled workout
  const activeSchedule = scheduleData?.allWorkoutSchedules?.nodes?.find(
    (schedule: any) => schedule.isActive
  );
  const todayWorkout = activeSchedule?.scheduledWorkoutsByScheduleId?.nodes?.find(
    (sw: any) => sw.dayOfWeek === today
  );
  
  // Find the template for today's workout
  const todayTemplate = scheduleData?.allWorkoutTemplates?.nodes?.find(
    (template: any) => template.id === todayWorkout?.templateId
  );

  const handleStartTodayWorkout = () => {
    if (!todayWorkout || !todayTemplate) return;
    const templateId = todayWorkout.templateId;
    const templateName = todayTemplate.name;
    const date = new Date().toISOString().split('T')[0];
    const workoutName = `${templateName} - ${new Date().toLocaleDateString()}`;
    
    navigate(`/workouts?fromTemplate=${templateId}&name=${encodeURIComponent(workoutName)}&date=${date}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Track your fitness journey</p>
      </div>

      {/* Today's Workout CTA - Prominent call to action */}
      {activeSchedule && todayWorkout && todayTemplate && (
        <div className="card border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Today's Workout</h2>
              <p className="text-xl text-blue-700 font-semibold mb-2">
                {todayTemplate.name}
              </p>
              {todayTemplate.description && (
                <p className="text-gray-600 mb-3">
                  {todayTemplate.description}
                </p>
              )}
              <div className="bg-white rounded-lg p-3 inline-block">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {todayTemplate.templateExercisesByTemplateId.totalCount} exercises:
                </p>
                <div className="text-sm text-gray-600">
                  {todayTemplate.templateExercisesByTemplateId.nodes
                    .slice(0, 5)
                    .map((te: any) => te.exerciseByExerciseId.name)
                    .join(', ')}
                  {todayTemplate.templateExercisesByTemplateId.totalCount > 5 && '...'}
                </div>
              </div>
            </div>
            <button
              onClick={handleStartTodayWorkout}
              className="btn-primary px-8 py-4 text-xl font-semibold whitespace-nowrap shadow-md hover:shadow-lg transition-shadow"
            >
              Start Workout 🏋️
            </button>
          </div>
        </div>
      )}

      {/* Rest Day Message */}
      {activeSchedule && !todayWorkout && (
        <div className="card border-2 border-gray-300 bg-gradient-to-r from-gray-50 to-slate-50">
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Rest Day 😌</h2>
            <p className="text-gray-600 mb-4">No workout scheduled for today</p>
            <Link to="/workouts" className="btn-secondary inline-block">
              Log Workout Anyway
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Total Workouts</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {statsData?.allWorkouts?.totalCount || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">Exercises</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {statsData?.allExercises?.totalCount || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-500">This Week</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {workoutsData?.allWorkouts?.nodes?.filter((w: any) => {
              const date = new Date(w.date);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return date >= weekAgo;
            }).length || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Workouts</h2>
            <Link to="/workouts" className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          {workoutsLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : workoutsData?.allWorkouts?.nodes && workoutsData.allWorkouts.nodes.length > 0 ? (
            <div className="space-y-3">
              {workoutsData.allWorkouts.nodes.map((workout: any) => (
                <Link
                  key={workout.id}
                  to={`/workouts/${workout.id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{workout.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(workout.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {workout.durationMinutes && (
                        <span className="text-sm text-gray-600">{workout.durationMinutes}m</span>
                      )}
                      {workout.completed && (
                        <span className="text-green-600">✓</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No workouts yet</p>
              <Link to="/workouts" className="btn-primary inline-block">
                Start Your First Workout
              </Link>
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/workouts?new=true"
              className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center"
            >
              <span className="text-2xl mb-2 block">🏋️</span>
              <span className="font-medium text-blue-900">Log New Workout</span>
            </Link>
            <Link
              to="/exercises?new=true"
              className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition text-center"
            >
              <span className="text-2xl mb-2 block">➕</span>
              <span className="font-medium text-green-900">Add Exercise</span>
            </Link>
            <Link
              to="/exercises"
              className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center"
            >
              <span className="text-2xl mb-2 block">📋</span>
              <span className="font-medium text-purple-900">View Exercises</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


