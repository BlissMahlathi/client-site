-- ==========================================
-- FULL SAFE ADMIN DASHBOARD MIGRATION
-- Creates everything if missing
-- PostgreSQL / Supabase Compatible
-- ==========================================

BEGIN;

-- ==========================================
-- EXTENSIONS
-- ==========================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================================
-- UPDATED_AT FUNCTION
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 1. DEALS TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS deals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    title text NOT NULL,
    description text,

    image text,

    price numeric(10,2),
    discounted_price numeric(10,2),

    active boolean DEFAULT true,

    start_date timestamptz,
    end_date timestamptz,

    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Add missing columns safely
ALTER TABLE deals
    ADD COLUMN IF NOT EXISTS title text,
    ADD COLUMN IF NOT EXISTS description text,
    ADD COLUMN IF NOT EXISTS image text,
    ADD COLUMN IF NOT EXISTS price numeric(10,2),
    ADD COLUMN IF NOT EXISTS discounted_price numeric(10,2),
    ADD COLUMN IF NOT EXISTS active boolean DEFAULT true,
    ADD COLUMN IF NOT EXISTS start_date timestamptz,
    ADD COLUMN IF NOT EXISTS end_date timestamptz,
    ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT NOW();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_deals_start_date
ON deals(start_date);

CREATE INDEX IF NOT EXISTS idx_deals_end_date
ON deals(end_date);

CREATE INDEX IF NOT EXISTS idx_deals_active
ON deals(active);

-- Enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Remove old policies first
DROP POLICY IF EXISTS admin_all_deals ON deals;
DROP POLICY IF EXISTS public_view_active_deals ON deals;

-- Policies
CREATE POLICY admin_all_deals
ON deals
FOR ALL
USING (
    auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY public_view_active_deals
ON deals
FOR SELECT
USING (
    active = true
);

-- Trigger
DROP TRIGGER IF EXISTS update_deals_updated_at ON deals;

CREATE TRIGGER update_deals_updated_at
BEFORE UPDATE ON deals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 2. POSTS TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    title text NOT NULL,
    content text,

    image text,

    published boolean DEFAULT true,

    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS title text,
    ADD COLUMN IF NOT EXISTS content text,
    ADD COLUMN IF NOT EXISTS image text,
    ADD COLUMN IF NOT EXISTS published boolean DEFAULT true,
    ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT NOW();

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all_posts ON posts;
DROP POLICY IF EXISTS public_view_posts ON posts;

CREATE POLICY admin_all_posts
ON posts
FOR ALL
USING (
    auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY public_view_posts
ON posts
FOR SELECT
USING (true);

DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 3. GALLERIES TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS galleries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    title text,
    image text NOT NULL,

    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

ALTER TABLE galleries
    ADD COLUMN IF NOT EXISTS title text,
    ADD COLUMN IF NOT EXISTS image text,
    ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT NOW();

ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all_galleries ON galleries;
DROP POLICY IF EXISTS public_view_galleries ON galleries;

CREATE POLICY admin_all_galleries
ON galleries
FOR ALL
USING (
    auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY public_view_galleries
ON galleries
FOR SELECT
USING (true);

DROP TRIGGER IF EXISTS update_galleries_updated_at ON galleries;

CREATE TRIGGER update_galleries_updated_at
BEFORE UPDATE ON galleries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 4. COURSES TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS courses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    title text NOT NULL,
    description text,

    image text,

    price numeric(10,2),

    active boolean DEFAULT true,

    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

ALTER TABLE courses
    ADD COLUMN IF NOT EXISTS title text,
    ADD COLUMN IF NOT EXISTS description text,
    ADD COLUMN IF NOT EXISTS image text,
    ADD COLUMN IF NOT EXISTS price numeric(10,2),
    ADD COLUMN IF NOT EXISTS active boolean DEFAULT true,
    ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT NOW(),
    ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT NOW();

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS admin_all_courses ON courses;
DROP POLICY IF EXISTS public_view_active_courses ON courses;

CREATE POLICY admin_all_courses
ON courses
FOR ALL
USING (
    auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
);

CREATE POLICY public_view_active_courses
ON courses
FOR SELECT
USING (
    active = true
);

DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 5. SUBSCRIPTIONS TABLE
-- ==========================================

CREATE TABLE IF NOT EXISTS subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    email text UNIQUE NOT NULL,

    created_at timestamptz DEFAULT NOW()
);

ALTER TABLE subscriptions
    ADD COLUMN IF NOT EXISTS email text,
    ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT NOW();

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS anyone_can_subscribe ON subscriptions;
DROP POLICY IF EXISTS public_view_subscriptions ON subscriptions;

CREATE POLICY anyone_can_subscribe
ON subscriptions
FOR INSERT
WITH CHECK (true);

CREATE POLICY public_view_subscriptions
ON subscriptions
FOR SELECT
USING (true);

-- ==========================================
-- FINAL SUCCESS MESSAGE
-- ==========================================

SELECT 'FULL ADMIN DASHBOARD MIGRATION COMPLETED SUCCESSFULLY'
AS status;

COMMIT;
