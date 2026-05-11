import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth, unauthorizedResponse } from '../_middleware/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const user = await checkAdminAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await checkAdminAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const body = await request.json()
    const supabase = await createClient()
    
    const { data, error } = await supabase.from('posts').insert([body]).select()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
