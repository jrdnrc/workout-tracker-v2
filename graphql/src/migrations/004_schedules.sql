-- Workout Schedules
CREATE TABLE workout_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_workout_schedules_user_id ON workout_schedules(user_id);
CREATE INDEX idx_workout_schedules_active ON workout_schedules(user_id, is_active);

-- Scheduled Workouts (templates assigned to days)
CREATE TABLE scheduled_workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  schedule_id UUID NOT NULL REFERENCES workout_schedules(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES workout_templates(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(schedule_id, day_of_week)
);

CREATE INDEX idx_scheduled_workouts_schedule_id ON scheduled_workouts(schedule_id);
CREATE INDEX idx_scheduled_workouts_day ON scheduled_workouts(schedule_id, day_of_week);

-- Updated_at trigger for workout_schedules
CREATE TRIGGER update_workout_schedules_updated_at BEFORE UPDATE ON workout_schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to ensure only one active schedule per user
CREATE OR REPLACE FUNCTION ensure_one_active_schedule()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    -- Deactivate all other schedules for this user
    UPDATE workout_schedules
    SET is_active = false
    WHERE user_id = NEW.user_id
    AND id != NEW.id
    AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_one_active_schedule
  BEFORE INSERT OR UPDATE ON workout_schedules
  FOR EACH ROW
  WHEN (NEW.is_active = true)
  EXECUTE FUNCTION ensure_one_active_schedule();

-- Enable Row Level Security
ALTER TABLE workout_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_workouts ENABLE ROW LEVEL SECURITY;

-- Workout Schedules policies
CREATE POLICY workout_schedules_select ON workout_schedules
  FOR SELECT
  USING (user_id = current_user_id());

CREATE POLICY workout_schedules_insert ON workout_schedules
  FOR INSERT
  WITH CHECK (user_id = current_user_id());

CREATE POLICY workout_schedules_update ON workout_schedules
  FOR UPDATE
  USING (user_id = current_user_id())
  WITH CHECK (user_id = current_user_id());

CREATE POLICY workout_schedules_delete ON workout_schedules
  FOR DELETE
  USING (user_id = current_user_id());

-- Scheduled Workouts policies (access through schedule ownership)
CREATE POLICY scheduled_workouts_select ON scheduled_workouts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workout_schedules
      WHERE workout_schedules.id = scheduled_workouts.schedule_id
      AND workout_schedules.user_id = current_user_id()
    )
  );

CREATE POLICY scheduled_workouts_insert ON scheduled_workouts
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_schedules
      WHERE workout_schedules.id = scheduled_workouts.schedule_id
      AND workout_schedules.user_id = current_user_id()
    )
  );

CREATE POLICY scheduled_workouts_update ON scheduled_workouts
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM workout_schedules
      WHERE workout_schedules.id = scheduled_workouts.schedule_id
      AND workout_schedules.user_id = current_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_schedules
      WHERE workout_schedules.id = scheduled_workouts.schedule_id
      AND workout_schedules.user_id = current_user_id()
    )
  );

CREATE POLICY scheduled_workouts_delete ON scheduled_workouts
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM workout_schedules
      WHERE workout_schedules.id = scheduled_workouts.schedule_id
      AND workout_schedules.user_id = current_user_id()
    )
  );

