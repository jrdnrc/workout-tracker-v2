-- Add tracking fields to workouts table
ALTER TABLE workouts ADD COLUMN template_id UUID REFERENCES workout_templates(id) ON DELETE SET NULL;
ALTER TABLE workouts ADD COLUMN schedule_id UUID REFERENCES workout_schedules(id) ON DELETE SET NULL;

-- Add indexes for efficient queries
CREATE INDEX idx_workouts_template_id ON workouts(template_id);
CREATE INDEX idx_workouts_schedule_id ON workouts(schedule_id);
CREATE INDEX idx_workouts_schedule_date ON workouts(schedule_id, date DESC);

-- Comments for documentation
COMMENT ON COLUMN workouts.template_id IS 'The template this workout was created from. Used for syncing changes back to template.';
COMMENT ON COLUMN workouts.schedule_id IS 'The schedule this workout belongs to. Used for finding previous workouts from the same schedule.';

