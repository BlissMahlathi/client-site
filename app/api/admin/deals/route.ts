import { createClient } from '@/lib/supabase/server'
import { checkAdminAuth, unauthorizedResponse } from '../_middleware/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const user = await checkAdminAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await checkAdminAuth(request)
  if (!user) return unauthorizedResponse()

  try {
    const body = await request.json()
    // server-side validation
    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
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
    
    const { data, error } = await supabase.from('deals').insert([body]).select()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create deal' }, { status: 500 })
  }
}
