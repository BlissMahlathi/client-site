#!/usr/bin/env bash
# Create Supabase storage bucket for deal images (requires supabase CLI and authenticated project)

set -euo pipefail

BUCKET_NAME="deal-images"
PUBLIC_FLAG="--public"

if ! command -v supabase >/dev/null 2>&1; then
  echo "Supabase CLI not found. Install it from https://supabase.com/docs/guides/cli"
  exit 1
fi

echo "Creating storage bucket: $BUCKET_NAME"
supabase storage create-bucket "$BUCKET_NAME" $PUBLIC_FLAG

echo "Bucket '$BUCKET_NAME' created (or already exists)."

echo "Note: the script assumes you're already logged in and the CLI is linked to your project."
