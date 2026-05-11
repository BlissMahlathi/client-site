import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../lib/supabaseClient'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

  const { data, error } = await supabase.from('subscriptions').upsert({ email }).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true, data }, { status: 201 })
}
