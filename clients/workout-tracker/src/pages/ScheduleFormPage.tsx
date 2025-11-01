import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../lib/auth';
import {
  useGetScheduleQuery,
  useAllTemplatesForScheduleQuery,
  useCreateScheduleMutation,
  useCreateScheduledWorkoutMutation,
} from '../generated/graphql';

gql`
  query GetSchedule($id: UUID!) {
    workoutScheduleById(id: $id) {
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
`;

gql`
  query AllTemplatesForSchedule {
    allWorkoutTemplates(orderBy: NATURAL) {
      nodes {
        id
        name
        description
      }
    }
  }
`;

gql`
  mutation CreateSchedule($input: CreateWorkoutScheduleInput!) {
    createWorkoutSchedule(input: $input) {
      workoutSchedule {
        id
      }
    }
  }
`;

gql`
  mutation CreateScheduledWorkout($input: CreateScheduledWorkoutInput!) {
    createScheduledWorkout(input: $input) {
      scheduledWorkout {
        id
      }
    }
  }
`;

gql`
  mutation DeleteScheduledWorkout($input: DeleteScheduledWorkoutByIdInput!) {
    deleteScheduledWorkoutById(input: $input) {
      scheduledWorkout {
        id
      }
    }
  }
`;

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday', short: 'Sun' },
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' },
];

export default function ScheduleFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const isNew = id === 'new';

  const [name, setName] = useState('');
  const [setAsActive, setSetAsActive] = useState(true);
  const [dayTemplates, setDayTemplates] = useState<Record<number, string>>({});

  const { data: scheduleData, loading: scheduleLoading } = useGetScheduleQuery({
    variables: { id: id! },
    skip: isNew,
  });

  const { data: templatesData } = useAllTemplatesForScheduleQuery();
  const [createSchedule, { loading: creating }] = useCreateScheduleMutation();
  const [createScheduledWorkout] = useCreateScheduledWorkoutMutation();

  useEffect(() => {
    if (scheduleData?.workoutScheduleById) {
      const schedule = scheduleData.workoutScheduleById;
      setName(schedule.name);
      setSetAsActive(schedule.isActive);
      
      const templates: Record<number, string> = {};
      if (schedule.scheduledWorkoutsByScheduleId?.nodes) {
        schedule.scheduledWorkoutsByScheduleId.nodes.forEach((sw: any) => {
          templates[sw.dayOfWeek] = sw.templateId;
        });
      }
      setDayTemplates(templates);
    }
  }, [scheduleData]);

  const handleDayTemplateChange = (day: number, templateId: string) => {
    setDayTemplates((prev) => {
      if (templateId === '') {
        const { [day]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [day]: templateId };
    });
  };

  const getTemplateName = (templateId: string) => {
    const template = templatesData?.allWorkoutTemplates?.nodes?.find((t: any) => t.id === templateId);
    return template?.name || 'Unknown';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter a schedule name');
      return;
    }

    try {
      // Create schedule
      const result = await createSchedule({
        variables: {
          input: {
            workoutSchedule: {
              userId: user?.id,
              name: name.trim(),
              isActive: setAsActive,
            },
          },
        },
      });

      const scheduleId = result.data?.createWorkoutSchedule?.workoutSchedule?.id;
      if (!scheduleId) {
        throw new Error('Failed to get schedule ID');
      }

      // Add scheduled workouts for each day
      for (const [dayOfWeek, templateId] of Object.entries(dayTemplates)) {
        await createScheduledWorkout({
          variables: {
            input: {
              scheduledWorkout: {
                scheduleId,
                templateId,
                dayOfWeek: parseInt(dayOfWeek),
              },
            },
          },
        });
      }

      navigate('/schedules');
    } catch (error) {
      console.error('Error creating schedule:', error);
      alert('Failed to create schedule');
    }
  };

  if (scheduleLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/schedules')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {isNew ? 'Create Schedule' : 'Edit Schedule'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Schedule Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Schedule Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="e.g., Push/Pull/Legs, Upper/Lower"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="setAsActive"
                checked={setAsActive}
                onChange={(e) => setSetAsActive(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              <label htmlFor="setAsActive" className="text-sm font-medium text-gray-700">
                Set as active schedule
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Weekly Schedule</h2>
          <p className="text-gray-600 mb-6">
            Assign workout templates to each day of the week. Leave empty for rest days.
          </p>

          <div className="space-y-3">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day.value}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-24 font-medium text-gray-900">{day.label}</div>
                <select
                  value={dayTemplates[day.value] || ''}
                  onChange={(e) => handleDayTemplateChange(day.value, e.target.value)}
                  className="input flex-1"
                >
                  <option value="">Rest Day</option>
                  {templatesData?.allWorkoutTemplates?.nodes?.map((template: any) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                {dayTemplates[day.value] && (
                  <span className="text-sm text-gray-600">
                    ✓ {getTemplateName(dayTemplates[day.value])}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={creating} className="btn-primary flex-1">
            {creating ? 'Saving...' : 'Save Schedule'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/schedules')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

