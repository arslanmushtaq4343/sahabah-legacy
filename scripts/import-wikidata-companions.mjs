import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const query = `
SELECT DISTINCT ?person ?personLabel ?personAltLabel ?dob ?dod ?placeLabel WHERE {
  ?person wdt:P31 wd:Q5.
  { ?person wdt:P361 wd:Q188711. }
  UNION { ?person wdt:P106 wd:Q188711. }
  OPTIONAL { ?person wdt:P569 ?dob. }
  OPTIONAL { ?person wdt:P570 ?dod. }
  OPTIONAL { ?person wdt:P19 ?place. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,ar". }
}
ORDER BY ?personLabel
`;

const url = new URL('https://query.wikidata.org/sparql');
url.searchParams.set('format', 'json');
url.searchParams.set('query', query);

const response = await fetch(url, {
  headers: {
    Accept: 'application/sparql-results+json',
    'User-Agent': 'sahabah-archive-data-import/1.0 local research audit',
  },
});

if (!response.ok) {
  throw new Error(`Wikidata request failed: ${response.status} ${response.statusText}`);
}

const data = await response.json();
const rows = data.results.bindings.map(row => ({
  wikidataId: row.person.value.replace('http://www.wikidata.org/entity/', ''),
  label: row.personLabel?.value ?? '',
  aliases: row.personAltLabel?.value ? row.personAltLabel.value.split(', ') : [],
  birthDate: row.dob?.value ?? null,
  deathDate: row.dod?.value ?? null,
  birthPlace: row.placeLabel?.value ?? null,
  source: 'wikidata',
  status: 'seed-only',
}));

const outputPath = resolve(process.cwd(), 'tmp', 'wikidata-companions.json');
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify({ importedAt: new Date().toISOString(), rows }, null, 2)}\n`);

// eslint-disable-next-line no-console
console.log(`Imported ${rows.length} Wikidata seed rows to ${outputPath}`);
