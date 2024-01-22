export async function GET(request: Request) {
  console.log('[push/get] synchronize changes with master');
  return new Response('get article');
}
