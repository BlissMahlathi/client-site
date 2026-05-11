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
    // server-side validation
    if (body.price != null && isNaN(Number(body.price))) {
      return NextResponse.json({ error: 'Price must be a number' }, { status: 400 })
    }
    if (body.start_date) {
      const sd = new Date(body.start_date)
      if (isNaN(sd.getTime())) return NextResponse.json({ error: 'Invalid start_date' }, { status: 400 })
    }
    if (body.end_date) {
      const ed = new Date(body.end_date)
      if (isNaN(ed.getTime())) return NextResponse.json({ error: 'Invalid end_date' }, { status: 400 })
    }
    if (body.start_date && body.end_date) {
      if (new Date(body.start_date) > new Date(body.end_date)) {
        return NextResponse.json({ error: 'start_date must be before end_date' }, { status: 400 })
      }
    }
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('deals')
      .update(body)
      .eq('id', params.id)
      .select()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update deal' }, { status: 500 })
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
    
    const { error } = await supabase.from('deals').delete().eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete deal' }, { status: 500 })
  }
}
