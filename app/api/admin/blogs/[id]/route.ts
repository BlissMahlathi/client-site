import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth, unauthorizedResponse } from '../../_middleware/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await checkAdminAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const { id } = await params
    const body = await request.json()
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('posts')
      .update(body)
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await checkAdminAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const { id } = await params
    const supabase = await createClient()
    
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
