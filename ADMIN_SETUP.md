# Admin Dashboard Setup Guide

## Overview

Your admin dashboard is now ready! It provides complete content management for:
- **Deals & Events**: Manage special offers with duration, location, price, and package details
- **Blog Posts**: Create and publish blog content
- **Gallery**: Manage portfolio images
- **Courses**: Manage training courses with highlights and pricing

## Database Setup

### 1. Run the Schema Migration

Copy and paste the SQL from `supabase_schema.sql` into your Supabase SQL Editor:

```sql
-- Supabase schema to run in the SQL Editor
-- Enables uuid generation
create extension if not exists "pgcrypto";

-- Posts table for blogs/news
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- Reactions/emojis per post
create table if not exists reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  emoji text not null,
  count integer default 0
);

-- Subscriptions for updates
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now()
);

-- Deals table (events, packages, special offers)
create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  price decimal(10, 2),
  duration text,
  location text,
  package_details text,
  image_url text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Gallery table (images for portfolio)
create table if not exists galleries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  caption text,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Courses table (training courses)
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price text not null,
  duration text not null,
  tags text[],
  description text,
  highlights text[],
  deposit text,
  image_url text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## Supabase Authentication Setup

### 1. Enable Authentication

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Ensure **Email** is enabled (it usually is by default)

### 2. Create Admin User

1. Go to **Authentication** → **Users**
2. Click "Invite User" or create a new user manually
3. Set email and password for your admin account
4. Confirm the user (or resend confirmation email)

### 3. Environment Variables

Make sure your `.env.local` has these variables (they should already be there):

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

## Accessing the Admin Dashboard

### Login

Navigate to `http://localhost:3000/admin/login` (or your deployed URL)

Login with your Supabase admin credentials:
- Email: your-admin@email.com
- Password: your-password

### Dashboard Navigation

After login, you'll see the admin dashboard with 4 main sections:

#### 1. **Deals & Events** (`/admin/deals`)
- Create, edit, and delete deals
- Set:
  - Title and description
  - Price (in Rand)
  - Duration (e.g., "3 Days", "1 Week")
  - Location
  - Package details (what's included)
  - Image URL
  - Active status

#### 2. **Blog Posts** (`/admin/blogs`)
- Create and publish blog articles
- Set:
  - Title
  - Content (full blog post)
  - Publication date
  - Save as draft or publish

#### 3. **Gallery** (`/admin/gallery`)
- Manage portfolio images
- Features:
  - Image title and URL
  - Caption/description
  - Display order (for sorting in gallery)
  - Image preview
  - Delete images

#### 4. **Courses** (`/admin/courses`)
- Manage training courses
- Set:
  - Course name and price
  - Duration
  - Tags (e.g., "Nails", "Lashes")
  - Description
  - Course highlights (what students learn)
  - Deposit requirements
  - Active status

## Features

### Real-time Operations
- All changes are immediately reflected in the database
- No need to refresh - UI updates automatically
- Toast notifications confirm all actions

### Data Display
- **Deals**: Shows price, duration, location, and package details
- **Gallery**: Displays image previews in a grid
- **Courses**: Shows tags, highlights, and pricing info
- **Blogs**: Preview of post content with publication status

### CRUD Operations
- **Create**: "New" buttons in each section
- **Read**: View all items in list/grid format
- **Update**: Edit button on each item
- **Delete**: Delete button with confirmation

## Security

### Authentication
- Admin access requires Supabase email/password authentication
- Session is maintained securely via cookies
- Automatic logout and redirect to login if session expires

### Row-Level Security (Recommended)

For production, add RLS policies to your Supabase tables. This ensures:
- Only authenticated admin users can access admin functions
- Data is properly protected

Add these policies in Supabase SQL Editor:

```sql
-- Enable RLS on all admin tables
alter table deals enable row level security;
alter table galleries enable row level security;
alter table courses enable row level security;
alter table posts enable row level security;

-- Create policies allowing authenticated users (you can restrict further)
create policy "Admin only" on deals for all using (auth.role() = 'authenticated');
create policy "Admin only" on galleries for all using (auth.role() = 'authenticated');
create policy "Admin only" on courses for all using (auth.role() = 'authenticated');
create policy "Admin only" on posts for all using (auth.role() = 'authenticated');
```

## Troubleshooting

### Can't Login
- Check that your email and password are correct
- Verify the user exists in Supabase Authentication
- Check that your `.env.local` has correct Supabase credentials

### Changes Not Showing Up
- The dashboard uses real-time Supabase connection
- Try refreshing the page
- Check browser console for any errors

### Images Not Loading in Gallery
- Ensure image URLs are publicly accessible
- Check that the URL is complete (includes protocol, e.g., `https://...`)

### Database Error
- Run the schema migration again to ensure all tables exist
- Check Supabase dashboard for error logs

## API Routes

The dashboard includes backend API routes for secure operations:

- `POST /api/admin/deals` - Create deal
- `PUT /api/admin/deals/[id]` - Update deal
- `DELETE /api/admin/deals/[id]` - Delete deal
- `POST /api/admin/blogs` - Create post
- `PUT /api/admin/blogs/[id]` - Update post
- `DELETE /api/admin/blogs/[id]` - Delete post
- `POST /api/admin/galleries` - Add image
- `PUT /api/admin/galleries/[id]` - Update image
- `DELETE /api/admin/galleries/[id]` - Delete image
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/[id]` - Update course
- `DELETE /api/admin/courses/[id]` - Delete course

All routes require admin authentication.

## Next Steps

1. **Set up Supabase Auth**: Create your admin user in Supabase
2. **Run Database Schema**: Execute the SQL in Supabase
3. **Test Login**: Go to `/admin/login` and verify you can access the dashboard
4. **Add Content**: Start adding deals, blog posts, gallery images, and courses
5. **Connect to Frontend**: Update your site components to pull data from the database

## Frontend Integration Example

Once your admin dashboard is managing content, update your frontend components to fetch data from the database:

```typescript
// app/components/site/Deals.tsx
const { data: deals } = await supabase
  .from('deals')
  .select('*')
  .eq('active', true)

// Render deals...
```

This way, any content you add in the admin dashboard will automatically appear on your site!
