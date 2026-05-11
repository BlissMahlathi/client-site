-- Migration: add start_date and end_date to deals
BEGIN;

ALTER TABLE IF EXISTS deals
  ADD COLUMN IF NOT EXISTS start_date timestamptz;

ALTER TABLE IF EXISTS deals
  ADD COLUMN IF NOT EXISTS end_date timestamptz;

-- Optionally, backfill start_date/end_date from duration if you have a known format.

COMMIT;

-- To apply: run this SQL in the Supabase SQL editor or via the Supabase CLI.
