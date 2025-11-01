import { useState, useRef, useEffect } from 'react';
import { gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetWorkoutQuery,
  useAllExercisesForWorkoutQuery,
  useAddExerciseToWorkoutMutation,
  useAddSetMutation,
  useUpdateSetMutation,
  useUpdateWorkoutMutation,
} from '../generated/graphql';

gql`
  query GetWorkout($id: UUID!) {
    workoutById(id: $id) {
      id
      name
      date
      notes
      completed
      durationMinutes
      workoutExercisesByWorkoutId(orderBy: NATURAL) {
        nodes {
          id
          orderIndex
          notes
          exerciseByExerciseId {
            id
            name
          }
          setsByWorkoutExerciseId(orderBy: NATURAL) {
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
  query AllExercisesForWorkout {
    allExercises(orderBy: NATURAL) {
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
  mutation UpdateSet($input: UpdateSetByIdInput!) {
    updateSetById(input: $input) {
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
  mutation UpdateWorkout($input: UpdateWorkoutByIdInput!) {
    updateWorkoutById(input: $input) {
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
  const [localSetValues, setLocalSetValues] = useState<Record<string, any>>({});

  const { data, loading } = useGetWorkoutQuery({
    variables: { id: id! },
  });
  const { data: exercisesData } = useAllExercisesForWorkoutQuery();

  const [addExerciseToWorkout] = useAddExerciseToWorkoutMutation();
  const [addSet] = useAddSetMutation();
  const [updateSet] = useUpdateSetMutation();
  const [updateWorkout] = useUpdateWorkoutMutation();

  const workout = data?.workoutById;

  const handleAddExercise = async () => {
    if (!selectedExerciseId) return;
    try {
      const maxOrder = Math.max(
        0,
        ...(workout?.workoutExercisesByWorkoutId?.nodes?.map((we: any) => we.orderIndex) || [])
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
      console.error('Error adding exercise:', error);
      alert('Failed to add exercise');
    }
  };

  const handleAddSet = async (workoutExerciseId: string) => {
    try {
      const workoutExercise = workout?.workoutExercisesByWorkoutId?.nodes?.find(
        (we: any) => we.id === workoutExerciseId
      );
      const setCount = workoutExercise?.setsByWorkoutExerciseId?.nodes?.length || 0;
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
      console.error('Error adding set:', error);
      alert('Failed to add set');
    }
  };

  // Debounce map to store timeouts per set+field
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  const handleInputChange = (setId: string, field: string, value: string) => {
    const key = `${setId}-${field}`;
    
    // Update local state immediately for responsive UI
    setLocalSetValues(prev => ({
      ...prev,
      [key]: value,
    }));

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
              setPatch: { [field]: numValue },
            },
          },
        });
      } catch (error) {
        console.error('Error updating set:', error);
      }
    }, 800);
  };

  const handleCheckboxChange = async (setId: string, checked: boolean) => {
    try {
      await updateSet({
        variables: {
          input: {
            id: setId,
            setPatch: { completed: checked },
          },
        },
        optimisticResponse: {
          updateSetById: {
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
      console.error('Error updating set:', error);
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  const handleCompleteWorkout = async () => {
    try {
      await updateWorkout({
        variables: {
          input: {
            id,
            workoutPatch: {
              completed: !workout?.completed,
            },
          },
        },
        optimisticResponse: {
          updateWorkoutById: {
            __typename: 'UpdateWorkoutPayload',
            workout: {
              __typename: 'Workout',
              id: id!,
              completed: !workout?.completed,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!workout) return <div>Workout not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/workouts')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">{workout.name}</h1>
            {workout.completed && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                ✓ Completed
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-600">
            {new Date(workout.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {workout.notes && <p className="mt-2 text-gray-600">{workout.notes}</p>}
        </div>
        <button
          onClick={handleCompleteWorkout}
          className={workout.completed ? 'btn-secondary' : 'btn-primary'}
        >
          {workout.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
      </div>

      {workout.workoutExercisesByWorkoutId?.nodes?.map((workoutExercise: any) => (
        <div key={workoutExercise.id} className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {workoutExercise.exerciseByExerciseId.name}
          </h2>
          {workoutExercise.notes && (
            <p className="text-sm text-gray-600 mb-4">{workoutExercise.notes}</p>
          )}
          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-2 text-sm font-medium text-gray-500 pb-2 border-b">
              <div>Set</div>
              <div>Weight</div>
              <div>Reps</div>
              <div>RPE</div>
              <div>Done</div>
            </div>
            {workoutExercise.setsByWorkoutExerciseId?.nodes?.map((set: any) => {
              const weightKey = `${set.id}-weight`;
              const repsKey = `${set.id}-reps`;
              const rpeKey = `${set.id}-rpe`;
              
              return (
                <div key={set.id} className="grid grid-cols-5 gap-2 items-center">
                  <div className="text-sm font-medium">{set.setNumber}</div>
                  <input
                    type="number"
                    step="0.01"
                    value={localSetValues[weightKey] !== undefined ? localSetValues[weightKey] : (set.weight || '')}
                    onChange={(e) => handleInputChange(set.id, 'weight', e.target.value)}
                    className="input py-1 text-sm"
                    placeholder="lbs"
                  />
                  <input
                    type="number"
                    value={localSetValues[repsKey] !== undefined ? localSetValues[repsKey] : (set.reps || '')}
                    onChange={(e) => handleInputChange(set.id, 'reps', e.target.value)}
                    className="input py-1 text-sm"
                    placeholder="reps"
                  />
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
                  <input
                    type="checkbox"
                    checked={set.completed}
                    onChange={(e) => handleCheckboxChange(set.id, e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600"
                  />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => handleAddSet(workoutExercise.id)}
            className="mt-4 text-sm text-blue-600 hover:text-blue-700"
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
              {exercisesData?.allExercises?.nodes?.map((exercise: any) => (
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
    </div>
  );
}

