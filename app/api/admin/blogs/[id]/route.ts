export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return new Response(JSON.stringify({ message: `GET not implemented for id "${id}"` }), { status: 501 });
}

export async function PUT(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return new Response(JSON.stringify({ message: `PUT not implemented for id "${id}"` }), { status: 501 });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return new Response(JSON.stringify({ message: `DELETE not implemented for id "${id}"` }), { status: 501 });
}
