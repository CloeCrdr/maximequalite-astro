import { getSocials } from '../../lib/getSocials';

export async function GET() {
  try {
    const socials = await getSocials();

    return new Response(JSON.stringify(socials), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('[api/socials]', error);

    return new Response(JSON.stringify([]), {
      status: 500,
    });
  }
}