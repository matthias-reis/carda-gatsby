import { addLog, getLogs } from '@/srv/logStash';

export async function GET() {
  return Response.json(getLogs());
}

export async function POST(request: Request) {
  const message = await request.json();
  addLog(message);
  return new Response('ok', { status: 200 });
}
