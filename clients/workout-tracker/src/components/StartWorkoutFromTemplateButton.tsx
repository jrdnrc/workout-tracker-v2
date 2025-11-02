import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getCurrentUser } from '../lib/auth';
import { handleError } from '../lib/errors';
import {
  useGetTemplateForWorkoutLazyQuery,
  useCreateWorkoutMutation,
  useAddWorkoutExerciseMutation,
  useAddSetFromTemplateMutation,
  WorkoutInput,
} from '../generated/graphql';

interface StartWorkoutFromTemplateButtonProps {
  templateId: string;
  templateName: string;
  splitId?: string | null;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'card';
}

export default function StartWorkoutFromTemplateButton({
  templateId,
  templateName,
  splitId,
  className = '',
  children,
  variant = 'primary',
}: StartWorkoutFromTemplateButtonProps) {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  
  const [getTemplate] = useGetTemplateForWorkoutLazyQuery();
  const [createWorkoutMutation] = useCreateWorkoutMutation();
  const [addWorkoutExerciseMutation] = useAddWorkoutExerciseMutation();
  const [addSetMutation] = useAddSetFromTemplateMutation();

  const handleClick = async () => {
    const user = getCurrentUser();
    if (!user?.id) {
      toast.error('User not authenticated');
      return;
    }

    setCreating(true);
    try {
      // Fetch template data
      const { data: templateData } = await getTemplate({ variables: { id: templateId } });
      const template = templateData?.workoutTemplate;

      if (!template) {
        throw new Error('Template not found');
      }

      const today = new Date().toISOString().split('T')[0];
      const workoutName = `${templateName} - ${new Date().toLocaleDateString()}`;

      // Create the workout
      const workoutInput: WorkoutInput = {
        userId: user.id,
        name: workoutName,
        date: today,
        completed: false,
        ...(templateId && { templateId }),
        ...(splitId && { splitId }),
      };

      const workoutResult = await createWorkoutMutation({
        variables: {
          input: {
            workout: workoutInput,
          },
        },
      });

      const workoutId = workoutResult.data?.createWorkout?.workout?.id;
      if (!workoutId) {
        throw new Error('Failed to create workout');
      }

      // Add exercises and sets from template
      for (const templateExercise of template.templateExercisesByTemplateId.nodes) {
        const workoutExerciseResult = await addWorkoutExerciseMutation({
          variables: {
            input: {
              workoutExercise: {
                workoutId,
                exerciseId: templateExercise.exerciseId,
                orderIndex: templateExercise.orderIndex,
                notes: templateExercise.notes,
              },
            },
          },
        });

        const workoutExerciseId = workoutExerciseResult.data?.createWorkoutExercise?.workoutExercise?.id;
        if (!workoutExerciseId) {
          throw new Error('Failed to create workout exercise');
        }

        // Create sets based on target sets
        const targetSets = templateExercise.targetSets || 3;
        for (let i = 1; i <= targetSets; i++) {
          await addSetMutation({
            variables: {
              input: {
                set: {
                  workoutExerciseId,
                  setNumber: i,
                  completed: false,
                },
              },
            },
          });
        }
      }

      // Navigate to the workout
      navigate(`/workouts/${workoutId}`);
    } catch (error) {
      handleError(error, 'Failed to create workout from template');
    } finally {
      setCreating(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'card':
        return 'text-left border-2 border-secondary-200 rounded-lg p-4 hover:border-primary-400 hover:bg-primary-50 transition disabled:opacity-50 disabled:cursor-not-allowed';
      default:
        return 'btn-primary';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={creating}
      className={`${getVariantClasses()} ${className}`}
    >
      {creating ? 'Creating...' : (children || `Start ${templateName}`)}
    </button>
  );
}

