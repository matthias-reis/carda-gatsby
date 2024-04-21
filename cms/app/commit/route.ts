export async function GET(request: Request) {
  console.log('[commit/get] commit');

  return new Response('commit changes');
}
