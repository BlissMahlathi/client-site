import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function checkAdminAuth(request: NextRequest) {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Enforce admin role: set `role` in user metadata to "admin" for admin users
  // Example: user.user_metadata.role === 'admin'
  const role = (user.user_metadata as any)?.role
  if (role !== 'admin') return null

  return user
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
