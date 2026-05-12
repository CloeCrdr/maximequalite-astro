import { getPartners } from '../../lib/getPartners';

export async function GET() {
  try {
    const partners = await getPartners();

    return new Response(JSON.stringify(partners), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify([]), {
      status: 500,
    });
  }
}