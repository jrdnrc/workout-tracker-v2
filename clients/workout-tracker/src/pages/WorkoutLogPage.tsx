import { useState, useRef, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useGetWorkoutQuery,
  useExercisesForWorkoutQuery,
  useAddExerciseToWorkoutMutation,
  useAddSetMutation,
  useUpdateSetMutation,
  useUpdateWorkoutMutation,
  usePreviousWorkoutFromSplitQuery,
  useSyncTemplateFromWorkoutMutation
} from '../generated/graphql';
import { handleError } from '../lib/errors';
import { ERROR_MESSAGES } from '../constants';
import LoadingState from '../components/LoadingState';

gql`
  mutation SyncTemplateFromWorkout($workoutId: UUID!) {
    syncTemplateFromWorkout(workoutId: $workoutId)
  }
`;

gql`
  query GetWorkout($id: UUID!) {
    workout(id: $id) {
      id
      name
      date
      notes
      completed
      durationMinutes
      templateId
      splitId
      workoutExercises(orderBy: NATURAL) {
        nodes {
          id
          orderIndex
          notes
          exercise {
            id
            name
          }
          sets(orderBy: SET_NUMBER_ASC) {
            nodes {
              id
              setNumber
              weight
              reps
              rpe
              completed
              notes
            }
          }
        }
      }
    }
  }
`;

gql`
  query PreviousWorkoutFromSplit($splitId: UUID!, $dayOfWeek: Int!) {
    previousWorkoutFromSplit(splitId: $splitId, dayOfWeek: $dayOfWeek) {
      id
      workoutExercises(orderBy: NATURAL) {
        nodes {
          exercise {
            id
            name
          }
          sets(orderBy: SET_NUMBER_ASC) {
            nodes {
              setNumber
              weight
              reps
              rpe
            }
          }
        }
      }
    }
  }
`;

gql`
  query ExercisesForWorkout {
    exercises(orderBy: NATURAL) {
      nodes {
        id
        name
      }
    }
  }
`;

gql`
  mutation AddExerciseToWorkout($input: CreateWorkoutExerciseInput!) {
    createWorkoutExercise(input: $input) {
      workoutExercise {
        id
      }
    }
  }
`;

gql`
  mutation AddSet($input: CreateSetInput!) {
    createSet(input: $input) {
      set {
        id
      }
    }
  }
`;

gql`
  mutation UpdateSet($input: UpdateSetInput!) {
    updateSet(input: $input) {
      set {
        id
        weight
        reps
        rpe
        completed
      }
    }
  }
`;

gql`
  mutation UpdateWorkout($input: UpdateWorkoutInput!) {
    updateWorkout(input: $input) {
      workout {
        id
        completed
      }
    }
  }
`;

export default function WorkoutLogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [localSetValues, setLocalSetValues] = useState<Record<string, string>>({});
  const [showSyncDialog, setShowSyncDialog] = useState(false);

  const { data, loading } = useGetWorkoutQuery({
    variables: { id: id! },
  });
  const { data: exercisesData } = useExercisesForWorkoutQuery();

  const [addExerciseToWorkout] = useAddExerciseToWorkoutMutation();
  const [addSet] = useAddSetMutation();
  const [updateSet] = useUpdateSetMutation();
  const [updateWorkout] = useUpdateWorkoutMutation();
  const [syncTemplateFromWorkout] = useSyncTemplateFromWorkoutMutation();

  const workout = data?.workout;
  const splitId = workout?.splitId;
  const templateId = workout?.templateId;
  const dayOfWeek = workout?.date ? new Date(workout.date).getDay() : null;

  // Query previous workout if this workout is from a split
  const { data: previousWorkoutData } = usePreviousWorkoutFromSplitQuery({
    variables: {
      splitId: splitId!,
      dayOfWeek: dayOfWeek!,
    },
    skip: !splitId || dayOfWeek === null,
  });

  const previousWorkout = previousWorkoutData?.previousWorkoutFromSplit;

  // Helper function to get previous set data for an exercise
  const getPreviousSetData = (exerciseId: string, setNumber: number) => {
    if (!previousWorkout) return null;
    
    const previousExercise = previousWorkout.workoutExercises.nodes.find(
      (we) => we?.exercise?.id === exerciseId
    );
    
    if (!previousExercise) return null;
    
    const previousSet = previousExercise.sets.nodes.find(
      (s) => s.setNumber === setNumber
    );
    
    return previousSet || null;
  };

  const handleAddExercise = async () => {
    if (!selectedExerciseId) return;
    try {
      const maxOrder = Math.max(
        0,
        ...(workout?.workoutExercises?.nodes?.map((we) => we.orderIndex) || [])
      );
      await addExerciseToWorkout({
        variables: {
          input: {
            workoutExercise: {
              workoutId: id,
              exerciseId: selectedExerciseId,
              orderIndex: maxOrder + 1,
            },
          },
        },
        refetchQueries: ['GetWorkout'],
      });
      setSelectedExerciseId('');
      setShowAddExercise(false);
    } catch (error) {
      handleError(error, 'Failed to add exercise');
    }
  };

  const handleAddSet = async (workoutExerciseId: string) => {
    try {
      const workoutExercise = workout?.workoutExercises?.nodes?.find(
        (we) => we.id === workoutExerciseId
      );
      const setCount = workoutExercise?.sets?.nodes?.length || 0;
      await addSet({
        variables: {
          input: {
            set: {
              workoutExerciseId,
              setNumber: setCount + 1,
              completed: false,
            },
          },
        },
        refetchQueries: ['GetWorkout'],
      });
    } catch (error) {
      handleError(error, 'Failed to add set');
    }
  };

  // Debounce map to store timeouts per set+field
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const handleInputChange = (setId: string, field: string, value: string) => {
    const key = `${setId}-${field}`;
    
    // Update local state immediately for responsive UI
    setLocalSetValues(prev => {
      const updated = { ...prev, [key]: value };
      
      // Check if all three fields are filled after this update
      const weightKey = `${setId}-weight`;
      const repsKey = `${setId}-reps`;
      const rpeKey = `${setId}-rpe`;
      
      const weight = updated[weightKey];
      const reps = updated[repsKey];
      const rpe = updated[rpeKey];
      
      // Get current set data from workout
      const set = workout?.workoutExercises?.nodes
        ?.flatMap((we) => we.sets?.nodes || [])
        .find((s) => s.id === setId);
      
      if (set) {
        const currentWeight = weight !== '' ? weight : (set.weight || '');
        const currentReps = reps !== '' ? reps : (set.reps || '');
        const currentRpe = rpe !== '' ? rpe : (set.rpe || '');
        
        // Check if all three fields are filled (not empty and valid numbers)
        const allFilled = 
          currentWeight !== '' && currentWeight !== null && !isNaN(parseFloat(String(currentWeight))) &&
          currentReps !== '' && currentReps !== null && !isNaN(parseFloat(String(currentReps))) &&
          currentRpe !== '' && currentRpe !== null && !isNaN(parseFloat(String(currentRpe)));
        
        if (allFilled && !set.completed) {
          // Auto-check the "done" checkbox after a short delay to allow the mutation to complete
          setTimeout(() => {
            handleCheckboxChange(setId, true);
          }, 100);
        }
      }
      
      return updated;
    });

    // Clear existing timer
    if (debounceTimers.current[key]) {
      clearTimeout(debounceTimers.current[key]);
    }

    // Debounce the actual mutation
    debounceTimers.current[key] = setTimeout(async () => {
      const numValue = value === '' ? null : parseFloat(value);
      try {
        await updateSet({
          variables: {
            input: {
              id: setId,
              patch: { [field]: numValue },
            },
          },
        });
      } catch (error) {
        // Silently fail - errors are already logged by handleError if needed
      }
    }, 800);
  };

  const handleCheckboxChange = async (setId: string, checked: boolean) => {
    try {
      await updateSet({
        variables: {
          input: {
            id: setId,
            patch: { completed: checked },
          },
        },
        optimisticResponse: {
          updateSet: {
            __typename: 'UpdateSetPayload',
            set: {
              __typename: 'Set',
              id: setId,
              completed: checked,
              weight: null,
              reps: null,
              rpe: null,
            },
          },
        },
      });
    } catch (error) {
      // Silently fail - errors are already logged by handleError if needed
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  const handleCompleteWorkout = async () => {
    const willBeCompleted = !workout?.completed;
    
    try {
      await updateWorkout({
        variables: {
          input: {
            id,
            patch: {
              completed: willBeCompleted,
            },
          },
        },
        optimisticResponse: {
          updateWorkout: {
            __typename: 'UpdateWorkoutPayload',
            workout: {
              __typename: 'Workout',
              id: id!,
              completed: willBeCompleted,
            },
          },
        },
      });

      // If completing a workout from a split with a template, show sync dialog
      if (willBeCompleted && templateId && splitId) {
        setShowSyncDialog(true);
      }
    } catch (error) {
      handleError(error, ERROR_MESSAGES.UPDATE_FAILED);
    }
  };

  const handleSyncTemplate = async () => {
    try {
      await syncTemplateFromWorkout({
        variables: { workoutId: id! },
      });
      setShowSyncDialog(false);
      toast.success('Template updated successfully! Future workouts will use the updated structure.');
    } catch (error) {
      handleError(error, 'Failed to sync template. Please try again.');
    }
  };

  if (loading) return <LoadingState />;
  if (!workout) return <div>Workout not found</div>;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => navigate('/workouts')}
              className="text-secondary-600 hover:text-secondary-900 active:text-secondary-700"
            >
              ← Back
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 break-words">{workout.name}</h1>
            {workout.completed && (
              <span className="px-2 sm:px-3 py-1 bg-success-100 text-success-700 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                ✓ Completed
              </span>
            )}
          </div>
          <p className="mt-2 text-sm sm:text-base text-secondary-600">
            {new Date(workout.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {workout.notes && <p className="mt-2 text-sm sm:text-base text-secondary-600">{workout.notes}</p>}
        </div>
        <button
          onClick={handleCompleteWorkout}
          className={`w-full sm:w-auto ${workout.completed ? 'btn-secondary' : 'btn-primary'}`}
        >
          {workout.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
      </div>

      {workout.workoutExercises?.nodes?.map((workoutExercise) => (
        <div key={workoutExercise.id} className="card">
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-3 sm:mb-4">
            {workoutExercise.exercise?.name}
          </h2>
          {workoutExercise.notes && (
            <p className="text-sm text-secondary-600 mb-3 sm:mb-4">{workoutExercise.notes}</p>
          )}
          <div className="space-y-2">
            {/* Desktop Table Header */}
            <div className="hidden sm:grid sm:grid-cols-5 gap-2 text-sm font-medium text-secondary-500 pb-2 border-b">
              <div>Set</div>
              <div>Weight</div>
              <div>Reps</div>
              <div>RPE</div>
              <div>Done</div>
            </div>
            
            {workoutExercise.sets?.nodes?.map((set) => {
              const weightKey = `${set.id}-weight`;
              const repsKey = `${set.id}-reps`;
              const rpeKey = `${set.id}-rpe`;
              const exerciseId = workoutExercise.exercise?.id;
              const previousSet = getPreviousSetData(exerciseId, set.setNumber);
              
              // Helper to format previous workout display
              const formatPreviousSet = (prev: NonNullable<ReturnType<typeof getPreviousSetData>>) => {
                const parts = [];
                if (prev.weight) parts.push(`${prev.weight} lbs`);
                if (prev.reps) parts.push(`× ${prev.reps} reps`);
                if (prev.rpe) parts.push(`@ ${prev.rpe} RPE`);
                return parts.length > 0 ? `Last: ${parts.join(' ')}` : null;
              };
              
              const previousText = previousSet ? formatPreviousSet(previousSet) : null;
              
              return (
                <div key={set.id}>
                  {/* Mobile Layout */}
                  <div className="sm:hidden bg-secondary-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-secondary-900">Set {set.setNumber}</span>
                      <input
                        type="checkbox"
                        checked={set.completed}
                        onChange={(e) => handleCheckboxChange(set.id, e.target.checked)}
                        className="w-6 h-6 rounded text-primary-600"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-secondary-500 block mb-1">Weight</label>
                        <input
                          type="number"
                          step="0.01"
                          value={localSetValues[weightKey] !== undefined ? localSetValues[weightKey] : (set.weight || '')}
                          onChange={(e) => handleInputChange(set.id, 'weight', e.target.value)}
                          className="input py-2 text-sm"
                          placeholder="lbs"
                        />
                        {previousText && previousSet?.weight && (
                          <p className="text-xs text-secondary-400 mt-1">
                            {previousText.split('×')[0].trim()}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs text-secondary-500 block mb-1">Reps</label>
                        <input
                          type="number"
                          value={localSetValues[repsKey] !== undefined ? localSetValues[repsKey] : (set.reps || '')}
                          onChange={(e) => handleInputChange(set.id, 'reps', e.target.value)}
                          className="input py-2 text-sm"
                          placeholder="reps"
                        />
                        {previousText && previousSet?.reps && (
                          <p className="text-xs text-secondary-400 mt-1">
                            × {previousSet.reps} reps
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs text-secondary-500 block mb-1">RPE</label>
                        <input
                          type="number"
                          step="0.5"
                          value={localSetValues[rpeKey] !== undefined ? localSetValues[rpeKey] : (set.rpe || '')}
                          onChange={(e) => handleInputChange(set.id, 'rpe', e.target.value)}
                          className="input py-2 text-sm"
                          placeholder="1-10"
                          min="1"
                          max="10"
                        />
                        {previousText && previousSet?.rpe && (
                          <p className="text-xs text-secondary-400 mt-1">
                            @ {previousSet.rpe} RPE
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Layout */}
                  <div className="hidden sm:grid sm:grid-cols-5 gap-2 items-center">
                    <div className="text-sm font-medium">
                      {set.setNumber}
                      {previousText && (
                        <div className="text-xs text-secondary-400 mt-0.5 font-normal">
                          {previousText}
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.01"
                        value={localSetValues[weightKey] !== undefined ? localSetValues[weightKey] : (set.weight || '')}
                        onChange={(e) => handleInputChange(set.id, 'weight', e.target.value)}
                        className="input py-1 text-sm"
                        placeholder="lbs"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={localSetValues[repsKey] !== undefined ? localSetValues[repsKey] : (set.reps || '')}
                        onChange={(e) => handleInputChange(set.id, 'reps', e.target.value)}
                        className="input py-1 text-sm"
                        placeholder="reps"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.5"
                        value={localSetValues[rpeKey] !== undefined ? localSetValues[rpeKey] : (set.rpe || '')}
                        onChange={(e) => handleInputChange(set.id, 'rpe', e.target.value)}
                        className="input py-1 text-sm"
                        placeholder="1-10"
                        min="1"
                        max="10"
                      />
                    </div>
                    <input
                      type="checkbox"
                      checked={set.completed}
                      onChange={(e) => handleCheckboxChange(set.id, e.target.checked)}
                      className="w-5 h-5 rounded text-primary-600"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => handleAddSet(workoutExercise.id)}
            className="mt-4 text-sm text-primary-600 hover:text-primary-700 active:text-primary-800 font-medium"
          >
            + Add Set
          </button>
        </div>
      ))}

      {showAddExercise ? (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Add Exercise</h2>
          <div className="flex gap-2">
            <select
              value={selectedExerciseId}
              onChange={(e) => setSelectedExerciseId(e.target.value)}
              className="input flex-1"
            >
              <option value="">Select an exercise...</option>
              {exercisesData?.exercises?.nodes?.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddExercise} className="btn-primary">
              Add
            </button>
            <button onClick={() => setShowAddExercise(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAddExercise(true)} className="btn-primary w-full">
          + Add Exercise
        </button>
      )}

      {/* Sync Template Dialog */}
      {showSyncDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-secondary-900 mb-4">
              Update Template for Future Workouts?
            </h2>
            <p className="text-secondary-600 mb-6">
              This workout is part of your split. Would you like to update the template
              so that future workouts from this split include the changes you made?
            </p>
            <p className="text-sm text-secondary-500 mb-6">
              This will sync:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Number of sets per exercise</li>
                <li>New exercises you added</li>
                <li>Exercise order and notes</li>
              </ul>
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSyncTemplate}
                className="btn-primary flex-1"
              >
                Update Template
              </button>
              <button
                onClick={() => setShowSyncDialog(false)}
                className="btn-secondary flex-1"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}