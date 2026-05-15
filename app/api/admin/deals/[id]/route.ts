export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [];
}

export async function GET() {
  return new Response(JSON.stringify({ message: 'GET not implemented' }), { status: 501 });
}

export async function PUT() {
  return new Response(JSON.stringify({ message: 'PUT not implemented' }), { status: 501 });
}

export async function DELETE() {
  return new Response(JSON.stringify({ message: 'DELETE not implemented' }), { status: 501 });
}
