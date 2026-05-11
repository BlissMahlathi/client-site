import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth, unauthorizedResponse } from '../../_middleware/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await checkAdminAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const body = await request.json()
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('galleries')
      .update(body)
      .eq('id', params.id)
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await checkAdminAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const supabase = await createClient()
    
    const { error } = await supabase.from('galleries').delete().eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 })
  }
}
