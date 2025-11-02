-- Rename tables from schedule to split
ALTER TABLE workout_schedules RENAME TO workout_splits;
ALTER TABLE scheduled_workouts RENAME TO split_workouts;

-- Rename columns
ALTER TABLE split_workouts RENAME COLUMN schedule_id TO split_id;
ALTER TABLE workouts RENAME COLUMN schedule_id TO split_id;

-- Rename indexes
ALTER INDEX idx_workout_schedules_user_id RENAME TO idx_workout_splits_user_id;
ALTER INDEX idx_workout_schedules_active RENAME TO idx_workout_splits_active;
ALTER INDEX idx_scheduled_workouts_schedule_id RENAME TO idx_split_workouts_split_id;
ALTER INDEX idx_scheduled_workouts_day RENAME TO idx_split_workouts_day;
ALTER INDEX idx_workouts_schedule_id RENAME TO idx_workouts_split_id;
ALTER INDEX idx_workouts_schedule_date RENAME TO idx_workouts_split_date;

-- Update foreign key constraints (drop and recreate)
ALTER TABLE split_workouts DROP CONSTRAINT IF EXISTS scheduled_workouts_schedule_id_fkey;
ALTER TABLE split_workouts 
  ADD CONSTRAINT split_workouts_split_id_fkey 
    FOREIGN KEY (split_id) REFERENCES workout_splits(id) ON DELETE CASCADE;

-- Update unique constraint
ALTER TABLE split_workouts DROP CONSTRAINT IF EXISTS scheduled_workouts_schedule_id_template_id_key;
ALTER TABLE split_workouts DROP CONSTRAINT IF EXISTS scheduled_workouts_schedule_id_day_of_week_key;
ALTER TABLE split_workouts 
  ADD CONSTRAINT split_workouts_split_id_day_of_week_key 
    UNIQUE(split_id, day_of_week);

-- Update workouts foreign key
ALTER TABLE workouts DROP CONSTRAINT IF EXISTS workouts_schedule_id_fkey;
ALTER TABLE workouts 
  ADD CONSTRAINT workouts_split_id_fkey 
    FOREIGN KEY (split_id) REFERENCES workout_splits(id) ON DELETE SET NULL;

-- Rename triggers
ALTER TRIGGER update_workout_schedules_updated_at ON workout_splits RENAME TO update_workout_splits_updated_at;

-- Drop trigger before dropping function
DROP TRIGGER IF EXISTS enforce_one_active_schedule ON workout_splits;

-- Rename and update function
DROP FUNCTION IF EXISTS ensure_one_active_schedule();

CREATE OR REPLACE FUNCTION ensure_one_active_split()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    -- Deactivate all other splits for this user
    UPDATE workout_splits
    SET is_active = false
    WHERE user_id = NEW.user_id
    AND id != NEW.id
    AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger with new function name
CREATE TRIGGER enforce_one_active_split
  BEFORE INSERT OR UPDATE ON workout_splits
  FOR EACH ROW
  WHEN (NEW.is_active = true)
  EXECUTE FUNCTION ensure_one_active_split();

-- Drop old policies
DROP POLICY IF EXISTS workout_schedules_select ON workout_splits;
DROP POLICY IF EXISTS workout_schedules_insert ON workout_splits;
DROP POLICY IF EXISTS workout_schedules_update ON workout_splits;
DROP POLICY IF EXISTS workout_schedules_delete ON workout_splits;
DROP POLICY IF EXISTS scheduled_workouts_select ON split_workouts;
DROP POLICY IF EXISTS scheduled_workouts_insert ON split_workouts;
DROP POLICY IF EXISTS scheduled_workouts_update ON split_workouts;
DROP POLICY IF EXISTS scheduled_workouts_delete ON split_workouts;

-- Recreate policies with new names
CREATE POLICY workout_splits_select ON workout_splits
  FOR SELECT
  USING (user_id = current_user_id());

CREATE POLICY workout_splits_insert ON workout_splits
  FOR INSERT
  WITH CHECK (user_id = current_user_id());

CREATE POLICY workout_splits_update ON workout_splits
  FOR UPDATE
  USING (user_id = current_user_id())
  WITH CHECK (user_id = current_user_id());

CREATE POLICY workout_splits_delete ON workout_splits
  FOR DELETE
  USING (user_id = current_user_id());

-- Split Workouts policies (access through split ownership)
CREATE POLICY split_workouts_select ON split_workouts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workout_splits
      WHERE workout_splits.id = split_workouts.split_id
      AND workout_splits.user_id = current_user_id()
    )
  );

CREATE POLICY split_workouts_insert ON split_workouts
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_splits
      WHERE workout_splits.id = split_workouts.split_id
      AND workout_splits.user_id = current_user_id()
    )
  );

CREATE POLICY split_workouts_update ON split_workouts
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM workout_splits
      WHERE workout_splits.id = split_workouts.split_id
      AND workout_splits.user_id = current_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_splits
      WHERE workout_splits.id = split_workouts.split_id
      AND workout_splits.user_id = current_user_id()
    )
  );

CREATE POLICY split_workouts_delete ON split_workouts
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM workout_splits
      WHERE workout_splits.id = split_workouts.split_id
      AND workout_splits.user_id = current_user_id()
    )
  );

-- Update comments
COMMENT ON COLUMN workouts.split_id IS 'The split this workout belongs to. Used for finding previous workouts from the same split.';
