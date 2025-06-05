const SHEET_ID = '1eSaujnf3w1vHBgpoJw5FqBqWX5K7frzCGBWM7LbOEQk';
const GID = '1042612465';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

export async function fetchSheetData() {
  const res = await fetch(SHEET_URL);
  const text = await res.text();

  if (!text.startsWith('/*O_o*/')) {
    throw new Error("Le lien Google Sheet ne renvoie pas du JSON. Assure-toi que la feuille est bien publiée via 'Fichier > Publier sur le Web'.");
  }

  const json = JSON.parse(text.substring(47).slice(0, -2));
  const rows = json.table.rows.slice(1); // ⚠️ On ignore la première ligne

  const data = rows.map(row => {
    const title = row.c[0]?.v || '';
    const images = row.c[1]?.v ? row.c[1].v.split(',').map(i => i.trim()) : [];
    const text = (row.c[2]?.v || '').replace(/\r?\n/g, '<br />');
    const url_social = row.c[3]?.v
  ? row.c[3].v.split(',').map(i => i.trim())
  : [];

    return { title, images, text, url_social };
  });

  return data.reverse();
}
