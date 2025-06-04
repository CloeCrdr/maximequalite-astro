// src/pages/api/tiktok.ts
import type { APIRoute } from "astro";
import * as cheerio from 'cheerio';

export const GET: APIRoute = async () => {
  const username = "maxime.qualit";
  const url = `https://www.tiktok.com/@${username}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  const scripts = $("script#__NEXT_DATA__").html();
  const json = JSON.parse(scripts || "{}");

  const items =
    json.props?.pageProps?.items?.slice(0, 3).map((item: any) => ({
      url: `https://www.tiktok.com/@${username}/video/${item.id}`,
      thumbnail: item.video.cover,
    })) || [];

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
};
