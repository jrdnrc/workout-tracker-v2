-- Add index for efficient ordering of sets by set_number
-- This composite index helps with queries filtering by workout_exercise_id and ordering by set_number
CREATE INDEX idx_sets_workout_exercise_set_number ON sets(workout_exercise_id, set_number);

-- Enable PostGraphile ordering by set_number
-- PostGraphile v4 uses @sortable for column ordering
COMMENT ON COLUMN sets.set_number IS E'@sortable';



