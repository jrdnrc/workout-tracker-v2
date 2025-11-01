-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE sets ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user_id from JWT claims
CREATE OR REPLACE FUNCTION current_user_id() RETURNS UUID AS $$
  SELECT NULLIF(current_setting('jwt.claims.user_id', true), '')::UUID;
$$ LANGUAGE SQL STABLE;

-- Users policies
CREATE POLICY users_select ON users
  FOR SELECT
  USING (id = current_user_id());

CREATE POLICY users_update ON users
  FOR UPDATE
  USING (id = current_user_id())
  WITH CHECK (id = current_user_id());

-- User credentials policies (users can only see their own credentials)
CREATE POLICY user_credentials_select ON user_credentials
  FOR SELECT
  USING (user_id = current_user_id());

CREATE POLICY user_credentials_insert ON user_credentials
  FOR INSERT
  WITH CHECK (user_id = current_user_id());

CREATE POLICY user_credentials_update ON user_credentials
  FOR UPDATE
  USING (user_id = current_user_id())
  WITH CHECK (user_id = current_user_id());

CREATE POLICY user_credentials_delete ON user_credentials
  FOR DELETE
  USING (user_id = current_user_id());

-- Exercises policies
CREATE POLICY exercises_select ON exercises
  FOR SELECT
  USING (user_id = current_user_id());

CREATE POLICY exercises_insert ON exercises
  FOR INSERT
  WITH CHECK (user_id = current_user_id());

CREATE POLICY exercises_update ON exercises
  FOR UPDATE
  USING (user_id = current_user_id())
  WITH CHECK (user_id = current_user_id());

CREATE POLICY exercises_delete ON exercises
  FOR DELETE
  USING (user_id = current_user_id());

-- Workouts policies
CREATE POLICY workouts_select ON workouts
  FOR SELECT
  USING (user_id = current_user_id());

CREATE POLICY workouts_insert ON workouts
  FOR INSERT
  WITH CHECK (user_id = current_user_id());

CREATE POLICY workouts_update ON workouts
  FOR UPDATE
  USING (user_id = current_user_id())
  WITH CHECK (user_id = current_user_id());

CREATE POLICY workouts_delete ON workouts
  FOR DELETE
  USING (user_id = current_user_id());

-- Workout exercises policies (access through workout ownership)
CREATE POLICY workout_exercises_select ON workout_exercises
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workouts
      WHERE workouts.id = workout_exercises.workout_id
      AND workouts.user_id = current_user_id()
    )
  );

CREATE POLICY workout_exercises_insert ON workout_exercises
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workouts
      WHERE workouts.id = workout_exercises.workout_id
      AND workouts.user_id = current_user_id()
    )
  );

CREATE POLICY workout_exercises_update ON workout_exercises
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM workouts
      WHERE workouts.id = workout_exercises.workout_id
      AND workouts.user_id = current_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workouts
      WHERE workouts.id = workout_exercises.workout_id
      AND workouts.user_id = current_user_id()
    )
  );

CREATE POLICY workout_exercises_delete ON workout_exercises
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM workouts
      WHERE workouts.id = workout_exercises.workout_id
      AND workouts.user_id = current_user_id()
    )
  );

-- Sets policies (access through workout_exercise -> workout ownership)
CREATE POLICY sets_select ON sets
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workout_exercises
      JOIN workouts ON workouts.id = workout_exercises.workout_id
      WHERE workout_exercises.id = sets.workout_exercise_id
      AND workouts.user_id = current_user_id()
    )
  );

CREATE POLICY sets_insert ON sets
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_exercises
      JOIN workouts ON workouts.id = workout_exercises.workout_id
      WHERE workout_exercises.id = sets.workout_exercise_id
      AND workouts.user_id = current_user_id()
    )
  );

CREATE POLICY sets_update ON sets
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM workout_exercises
      JOIN workouts ON workouts.id = workout_exercises.workout_id
      WHERE workout_exercises.id = sets.workout_exercise_id
      AND workouts.user_id = current_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_exercises
      JOIN workouts ON workouts.id = workout_exercises.workout_id
      WHERE workout_exercises.id = sets.workout_exercise_id
      AND workouts.user_id = current_user_id()
    )
  );

CREATE POLICY sets_delete ON sets
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM workout_exercises
      JOIN workouts ON workouts.id = workout_exercises.workout_id
      WHERE workout_exercises.id = sets.workout_exercise_id
      AND workouts.user_id = current_user_id()
    )
  );

