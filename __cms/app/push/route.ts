export async function GET(request: Request) {
  console.log('push');
  return new Response('get article');
}
