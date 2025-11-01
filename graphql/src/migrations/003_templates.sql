-- Workout Templates
CREATE TABLE workout_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_workout_templates_user_id ON workout_templates(user_id);

-- Template Exercises
CREATE TABLE template_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID NOT NULL REFERENCES workout_templates(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  target_sets INTEGER,
  target_reps INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_template_exercises_template_id ON template_exercises(template_id);
CREATE INDEX idx_template_exercises_exercise_id ON template_exercises(exercise_id);

-- Updated_at trigger for workout_templates
CREATE TRIGGER update_workout_templates_updated_at BEFORE UPDATE ON workout_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE workout_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_exercises ENABLE ROW LEVEL SECURITY;

-- Workout Templates policies
CREATE POLICY workout_templates_select ON workout_templates
  FOR SELECT
  USING (user_id = current_user_id() OR is_public = true);

CREATE POLICY workout_templates_insert ON workout_templates
  FOR INSERT
  WITH CHECK (user_id = current_user_id());

CREATE POLICY workout_templates_update ON workout_templates
  FOR UPDATE
  USING (user_id = current_user_id())
  WITH CHECK (user_id = current_user_id());

CREATE POLICY workout_templates_delete ON workout_templates
  FOR DELETE
  USING (user_id = current_user_id());

-- Template Exercises policies (access through template ownership)
CREATE POLICY template_exercises_select ON template_exercises
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workout_templates
      WHERE workout_templates.id = template_exercises.template_id
      AND (workout_templates.user_id = current_user_id() OR workout_templates.is_public = true)
    )
  );

CREATE POLICY template_exercises_insert ON template_exercises
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_templates
      WHERE workout_templates.id = template_exercises.template_id
      AND workout_templates.user_id = current_user_id()
    )
  );

CREATE POLICY template_exercises_update ON template_exercises
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM workout_templates
      WHERE workout_templates.id = template_exercises.template_id
      AND workout_templates.user_id = current_user_id()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workout_templates
      WHERE workout_templates.id = template_exercises.template_id
      AND workout_templates.user_id = current_user_id()
    )
  );

CREATE POLICY template_exercises_delete ON template_exercises
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM workout_templates
      WHERE workout_templates.id = template_exercises.template_id
      AND workout_templates.user_id = current_user_id()
    )
  );

