-- Enable native PostGraphile ordering for set_number column
-- PostGraphile v4 only exposes columns for ordering if they have indexes
-- (when ignoreIndexes: false). The @sortable comment is for v5 only.
--
-- For v4, we need to ensure set_number has an index that PostGraphile can recognize.
-- The composite index (workout_exercise_id, set_number) exists but PostGraphile
-- might not recognize it as making set_number orderable on its own.
--
-- Solution: Create a single-column index on set_number so PostGraphile v4 
-- automatically exposes it for ordering without needing a custom plugin.

-- Create index on set_number for PostGraphile v4 to recognize it as orderable
CREATE INDEX IF NOT EXISTS idx_sets_set_number ON sets(set_number);

-- Also ensure the composite index exists for efficient queries filtering by workout_exercise_id
CREATE INDEX IF NOT EXISTS idx_sets_workout_exercise_set_number ON sets(workout_exercise_id, set_number);

-- Note: The @sortable comment doesn't work in PostGraphile v4, only v5+
-- For v4, PostGraphile automatically exposes indexed columns for ordering
-- when ignoreIndexes: false (which is your current setting)

-- The existing RLS policy in 002_rls.sql already allows access to set_number.
-- Once PostGraphile recognizes the index, it will automatically expose 
-- set_number in the orderBy enum for the Sets connection.
