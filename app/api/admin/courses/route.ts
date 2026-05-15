export const dynamic = 'force-static';

export async function GET() {
  return new Response(JSON.stringify({ message: 'GET not implemented' }), { status: 501 });
}

export async function POST() {
  return new Response(JSON.stringify({ message: 'POST not implemented' }), { status: 501 });
}
