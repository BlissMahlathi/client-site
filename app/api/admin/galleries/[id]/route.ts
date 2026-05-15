import { NextRequest } from 'next/server';

export const dynamic = 'force-static';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return new Response(JSON.stringify({ message: 'GET not implemented' }), { status: 501 });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return new Response(JSON.stringify({ message: 'PUT not implemented' }), { status: 501 });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return new Response(JSON.stringify({ message: 'DELETE not implemented' }), { status: 501 });
}
