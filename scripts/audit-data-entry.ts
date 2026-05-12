import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { runResearchDataAudit } from '../src/data/researchAudit';

const report = runResearchDataAudit();
const outputPath = resolve(process.cwd(), 'tmp', 'data-audit.json');

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

const summary = {
  generatedAt: report.generatedAt,
  companions: report.totals.companions,
  claims: report.totals.claims,
  externalClaims: report.totals.externalClaims,
  externalProfileCoveragePercent: report.coverage.externalProfileCoveragePercent,
  highRiskLocalOnlyClaims: report.totals.highRiskLocalOnlyClaims,
  issues: report.issues.length,
};

// eslint-disable-next-line no-console
console.log(JSON.stringify(summary, null, 2));
// eslint-disable-next-line no-console
console.log(`Wrote ${outputPath}`);
