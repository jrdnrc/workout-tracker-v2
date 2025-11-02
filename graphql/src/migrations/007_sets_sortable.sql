-- Enable PostGraphile ordering by set_number
-- PostGraphile v4 uses @sortable for column ordering
COMMENT ON COLUMN sets.set_number IS E'@sortable';