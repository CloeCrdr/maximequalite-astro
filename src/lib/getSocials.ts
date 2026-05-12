import base from './airtable';

export async function getSocials() {
  const records = await base('Réseaux sociaux')
    .select({
      sort: [{ field: 'date', direction: 'desc' }],
    })
    .all();

  return records.map((record) => {
    const rawImages = record.get('img_url');

    const images =
      typeof rawImages === 'string'
        ? rawImages
            .split('\n')
            .map((img) => img.trim())
            .filter(Boolean)
        : [];

    return {
      id: record.id,

      social: record.get('Réseau social'),

      text: record.get('texte') || '',

      link: record.get('lien') || '',

      date: record.get('date'),

      images,
    };
  });
}