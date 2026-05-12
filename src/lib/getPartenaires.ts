import base from './airtable';

export async function getPartners() {
  const records = await base('Partenaires')
    .select()
    .all();

  return records.map((record) => {
    const logoField = record.get('Logo');

    return {
      id: record.id,

      name: record.get('nom_partenaire'),

      url_logo: record.get('url_logo'),

      url_site: record.get('url_site'),

      logo:
        Array.isArray(logoField) && logoField.length > 0
          ? logoField[0].url
          : null,
    };
  });
}