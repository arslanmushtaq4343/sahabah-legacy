import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const verseArg = process.argv.find(arg => arg.startsWith('--verse='));
const verseKey = verseArg?.slice('--verse='.length) ?? '2:255';

if (!/^\d{1,3}:\d{1,3}$/.test(verseKey)) {
  throw new Error('Use --verse=chapter:verse, for example --verse=2:255');
}

const url = new URL(`https://api.quran.com/api/v4/verses/by_key/${verseKey}`);
url.searchParams.set('fields', 'text_uthmani,text_imlaei');
url.searchParams.set('translations', '20,131');
url.searchParams.set('words', 'true');

const response = await fetch(url, {
  headers: {
    Accept: 'application/json',
    'User-Agent': 'sahabah-archive-quran-import/1.0 local research audit',
  },
});

if (!response.ok) {
  throw new Error(`Quran.com request failed: ${response.status} ${response.statusText}`);
}

const data = await response.json();
const outputPath = resolve(process.cwd(), 'tmp', `quran-${verseKey.replace(':', '-')}.json`);
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `${JSON.stringify(
    {
      importedAt: new Date().toISOString(),
      sourceId: 'quran-com-api',
      verseKey,
      data,
    },
    null,
    2
  )}\n`
);

// eslint-disable-next-line no-console
console.log(`Wrote Quran.com seed for ${verseKey} to ${outputPath}`);
