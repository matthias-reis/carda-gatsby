export async function GET(request: Request) {
  console.log('commit');

  return new Response('get article');
}
