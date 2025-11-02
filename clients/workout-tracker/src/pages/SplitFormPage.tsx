import { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getCurrentUser } from '../lib/auth';
import { handleError } from '../lib/errors';
import { ROUTES, DAYS_OF_WEEK } from '../constants';
import { ERROR_MESSAGES } from '../constants';
import {
  useGetSplitQuery,
  useTemplatesForSplitQuery,
  useCreateSplitMutation,
  useCreateSplitWorkoutMutation,
} from '../generated/graphql';
import LoadingState from '../components/LoadingState';
import FormField from '../components/FormField';
import BackButton from '../components/BackButton';

gql`
  query GetSplit($id: UUID!) {
    workoutSplit(id: $id) {
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
`;

gql`
  query TemplatesForSplit {
    workoutTemplates(orderBy: NATURAL) {
      nodes {
        id
        name
        description
      }
    }
  }
`;

gql`
  mutation CreateSplit($input: CreateWorkoutSplitInput!) {
    createWorkoutSplit(input: $input) {
      workoutSplit {
        id
      }
    }
  }
`;

gql`
  mutation CreateSplitWorkout($input: CreateSplitWorkoutInput!) {
    createSplitWorkout(input: $input) {
      splitWorkout {
        id
      }
    }
  }
`;

gql`
  mutation DeleteSplitWorkout($input: DeleteSplitWorkoutInput!) {
    deleteSplitWorkout(input: $input) {
      splitWorkout {
        id
      }
    }
  }
`;

export default function SplitFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const isNew = id === 'new';

  const [name, setName] = useState('');
  const [setAsActive, setSetAsActive] = useState(true);
  const [dayTemplates, setDayTemplates] = useState<Record<number, string>>({});

  const { data: splitData, loading: splitLoading } = useGetSplitQuery({
    variables: { id: id! },
    skip: isNew,
  });

  const { data: templatesData } = useTemplatesForSplitQuery();
  const [createSplit, { loading: creating }] = useCreateSplitMutation();
  const [createSplitWorkout] = useCreateSplitWorkoutMutation();

  useEffect(() => {
    if (splitData?.workoutSplit) {
      const split = splitData.workoutSplit;
      setName(split.name);
      setSetAsActive(split.isActive);
      
      const templates: Record<number, string> = {};
      if (split.splitWorkoutsBySplitId?.nodes) {
        split.splitWorkoutsBySplitId.nodes.forEach((sw) => {
          templates[sw.dayOfWeek] = sw.templateId;
        });
      }
      setDayTemplates(templates);
    }
  }, [splitData]);

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
    const template = templatesData?.workoutTemplates?.nodes?.find((t) => t.id === templateId);
    return template?.name || 'Unknown';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter a split name');
      return;
    }

    try {
      // Create split
      const result = await createSplit({
        variables: {
          input: {
            workoutSplit: {
              userId: user?.id,
              name: name.trim(),
              isActive: setAsActive,
            },
          },
        },
      });

      const splitId = result.data?.createWorkoutSplit?.workoutSplit?.id;
      if (!splitId) {
        throw new Error('Failed to get split ID');
      }

      // Add split workouts for each day
      for (const [dayOfWeek, templateId] of Object.entries(dayTemplates)) {
        await createSplitWorkout({
          variables: {
            input: {
              splitWorkout: {
                splitId: splitId,
                templateId,
                dayOfWeek: parseInt(dayOfWeek),
              },
            },
          },
        });
      }

      toast.success('Split created successfully');
      navigate(ROUTES.SPLITS);
    } catch (error) {
      handleError(error, ERROR_MESSAGES.CREATE_FAILED);
    }
  };

  if (splitLoading) return <LoadingState />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BackButton to={ROUTES.SPLITS} />
        <h1 className="text-3xl font-bold text-secondary-900">
          {isNew ? 'Create Split' : 'Edit Split'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Split Details</h2>
          <div className="space-y-4">
            <FormField label="Split Name" required>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="e.g., Push/Pull/Legs, Upper/Lower"
              />
            </FormField>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="setAsActive"
                checked={setAsActive}
                onChange={(e) => setSetAsActive(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600"
              />
              <label htmlFor="setAsActive" className="text-sm font-medium text-secondary-700">
                Set as active split
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Weekly Split</h2>
          <p className="text-secondary-600 mb-6">
            Assign workout templates to each day of the week. Leave empty for rest days.
          </p>

          <div className="space-y-3">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day.value}
                className="flex items-center gap-4 p-3 bg-secondary-50 rounded-lg"
              >
                <div className="w-24 font-medium text-secondary-900">{day.label}</div>
                <select
                  value={dayTemplates[day.value] || ''}
                  onChange={(e) => handleDayTemplateChange(day.value, e.target.value)}
                  className="input flex-1"
                >
                  <option value="">Rest Day</option>
                  {templatesData?.workoutTemplates?.nodes?.map((template) => (
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
            {creating ? 'Saving...' : 'Save Split'}
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.SPLITS)}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

