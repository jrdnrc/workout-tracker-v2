import { useState } from 'react';
import { gql } from '@apollo/client';
import {
  useTemplatesQuery,
  useWorkoutsQuery,
  useSplitsQuery,
  useDeleteTemplateMutation,
  useDeleteSplitMutation,
  useSeedTemplatesMutation,
  useDeleteWorkoutMutation,
} from '../generated/graphql';
import PageHeader from '../components/PageHeader';
import DeleteAllAction from '../components/DeleteAllAction';
import SeedAction from '../components/SeedAction';

gql`
  mutation SeedTemplates {
    seedTemplates
  }
`;

gql`
  mutation DeleteWorkout($input: DeleteWorkoutInput!) {
    deleteWorkout(input: $input) {
      workout {
        id
      }
    }
  }
`;

export default function DevPage() {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const { data: templatesData, refetch: refetchTemplates } = useTemplatesQuery();
  const { data: workoutsData, refetch: refetchWorkouts } = useWorkoutsQuery();
  const { data: splitsData, refetch: refetchSplits } = useSplitsQuery();

  const [deleteTemplate] = useDeleteTemplateMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();
  const [deleteSplit] = useDeleteSplitMutation();
  const [seedTemplates] = useSeedTemplatesMutation();

  const handleDeleteTemplates = async () => {
    if (!templatesData?.workoutTemplates?.nodes) return;
    for (const template of templatesData.workoutTemplates.nodes) {
      await deleteTemplate({
        variables: { input: { id: template.id } },
      });
    }
  };

  const handleDeleteWorkouts = async () => {
    if (!workoutsData?.workouts?.nodes) return;
    for (const workout of workoutsData.workouts.nodes) {
      await deleteWorkout({
        variables: { input: { id: workout.id } },
      });
    }
  };

  const handleDeleteSplits = async () => {
    if (!splitsData?.workoutSplits?.nodes) return;
    for (const split of splitsData.workoutSplits.nodes) {
      await deleteSplit({
        variables: { input: { id: split.id } },
      });
    }
  };

  const handleSeedTemplates = async () => {
    await seedTemplates();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dev Tools"
        subtitle="Development utilities for testing and data management"
      />

      <div className="card border-2 border-warning-300 bg-warning-50">
        <h2 className="text-lg font-bold text-warning-900 mb-2">⚠️ Warning</h2>
        <p className="text-sm text-warning-800">
          These actions are destructive and cannot be undone. Use with caution.
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Delete All</h2>
        <div className="space-y-3">
          <DeleteAllAction
            title="My Templates"
            count={templatesData?.workoutTemplates?.nodes?.length || 0}
            countLabel="templates"
            confirmationMessage="Are you sure you want to delete ALL your templates? This cannot be undone."
            successMessage="All templates deleted successfully"
            errorMessage="Failed to delete templates"
            onDelete={handleDeleteTemplates}
            onRefetch={async () => { await refetchTemplates(); }}
            isDeleting={deleting === 'templates'}
            setIsDeleting={(value) => setDeleting(value ? 'templates' : null)}
          />

          <DeleteAllAction
            title="My Workout Logs"
            count={workoutsData?.workouts?.nodes?.length || 0}
            countLabel="workouts"
            confirmationMessage="Are you sure you want to delete ALL your workout logs? This cannot be undone."
            successMessage="All workout logs deleted successfully"
            errorMessage="Failed to delete workout logs"
            onDelete={handleDeleteWorkouts}
            onRefetch={async () => { await refetchWorkouts(); }}
            isDeleting={deleting === 'workouts'}
            setIsDeleting={(value) => setDeleting(value ? 'workouts' : null)}
          />

          <DeleteAllAction
            title="My Splits"
            count={splitsData?.workoutSplits?.nodes?.length || 0}
            countLabel="splits"
            confirmationMessage="Are you sure you want to delete ALL your splits? This cannot be undone."
            successMessage="All splits deleted successfully"
            errorMessage="Failed to delete splits"
            onDelete={handleDeleteSplits}
            onRefetch={async () => { await refetchSplits(); }}
            isDeleting={deleting === 'splits'}
            setIsDeleting={(value) => setDeleting(value ? 'splits' : null)}
          />
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Seed Data</h2>
        <SeedAction
          title="Templates"
          description="Creates default workout templates (Push/Pull/Legs, Upper/Lower, Full Body)"
          confirmationMessage="This will seed default workout templates. Continue?"
          successMessage="Templates seeded successfully"
          errorMessage="Failed to seed templates"
          onSeed={handleSeedTemplates}
          onRefetch={async () => { await refetchTemplates(); }}
          isSeeding={seeding}
          setIsSeeding={setSeeding}
        />
      </div>
    </div>
  );
}

