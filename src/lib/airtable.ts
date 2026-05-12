import Airtable from 'airtable';

const base = new Airtable({
  apiKey: import.meta.env.AIRTABLE_TOKEN,
}).base(import.meta.env.AIRTABLE_BASE_ID);

export default base;