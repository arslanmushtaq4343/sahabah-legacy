import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const rows = [
  {
    year: 2010,
    muslimPopulation: 1700000000,
    shareOfWorldPopulation: 0.24,
    sourceId: 'pew',
    locator: 'How the Global Religious Landscape Changed From 2010 to 2020',
    url: 'https://www.pewresearch.org/religion/2025/06/09/muslim-population-change/',
    status: 'verified',
    note: 'Pew reports 1.7B Muslims and 24% of world population in 2010.',
  },
  {
    year: 2020,
    muslimPopulation: 2000000000,
    shareOfWorldPopulation: 0.26,
    sourceId: 'pew',
    locator: 'How the Global Religious Landscape Changed From 2010 to 2020',
    url: 'https://www.pewresearch.org/religion/2025/06/09/muslim-population-change/',
    status: 'verified',
    note: 'Pew reports 2.0B Muslims and 26% of world population in 2020.',
  },
];

const outputPath = resolve(process.cwd(), 'tmp', 'pew-population-seed.json');
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify({ importedAt: new Date().toISOString(), rows }, null, 2)}\n`);

// eslint-disable-next-line no-console
console.log(`Wrote ${rows.length} Pew population seed rows to ${outputPath}`);
