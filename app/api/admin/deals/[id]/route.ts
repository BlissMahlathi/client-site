export async function GET(request: Request, { params }: { params: { id: string } }) {
  return new Response(JSON.stringify({ message: 'GET not implemented' }), { status: 501 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  return new Response(JSON.stringify({ message: 'PUT not implemented' }), { status: 501 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return new Response(JSON.stringify({ message: 'DELETE not implemented' }), { status: 501 });
}
