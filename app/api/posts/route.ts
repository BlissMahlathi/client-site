import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../lib/supabaseClient'

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, content, published_at } = body

  if (!title) return NextResponse.json({ error: 'Missing title' }, { status: 400 })

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, published_at }])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, ...updates } = body
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const { data, error } = await supabase.from('posts').update(updates).eq('id', id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { id } = body
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const { data, error } = await supabase.from('posts').delete().eq('id', id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, data })
}
