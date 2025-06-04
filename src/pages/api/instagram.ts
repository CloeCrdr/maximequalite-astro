export const GET: APIRoute = async () => {
    try {
      const res = await fetch('https://igapi.com/maximequalite');
      const json = await res.json();
  
      console.log('[IGAPI RESPONSE]', json); // 👈 Ajoute ça
  
      if (!json.items || json.items.length === 0) {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      const posts = json.items.slice(0, 3).map((item: any) => ({
        url: `https://www.instagram.com/p/${item.shortcode}/`,
        image: item.display_url,
        caption: item.edge_media_to_caption?.edges?.[0]?.node?.text || ''
      }));
  
      return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error('[IGAPI ERROR]', err); // 👈 Et ça
      return new Response(JSON.stringify({ error: 'Failed to fetch Instagram data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  };
  