import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  return new Response(JSON.stringify({ message: 'POST not implemented' }), { status: 501 });
}

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify({ message: 'GET not implemented' }), { status: 501 });
}
