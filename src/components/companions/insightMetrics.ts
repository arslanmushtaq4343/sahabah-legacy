import { COMPANION_TRIBE } from '../../data/connectionData2';
import type { Companion } from '../../types';
import { parseYear } from './cardTheme';

function titleCase(value: string): string {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export function normalizeTribeLabel(value?: string): string | null {
  if (!value) return null;
  const raw = value.replace(/[\\]+/g, '').replace(/\s+/g, ' ').trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();
  if (lower.includes('khazraj')) return 'Khazraj (Ansar)';
  if (lower.includes('aws')) return 'Aws (Ansar)';
  if (lower.includes('hashim')) return 'Banu Hashim';
  if (lower.includes('taym')) return 'Banu Taym';
  if (lower.includes('adi')) return 'Banu Adi';
  if (lower.includes('umayya') || lower.includes('abd shams')) return 'Banu Umayya';
  if (lower.includes('makhzum')) return 'Banu Makhzum';
  if (lower.includes('zuhra')) return 'Banu Zuhra';
  if (lower.includes('asad')) return 'Banu Asad';
  if (lower.includes('sahm')) return 'Banu Sahm';
  if (lower.includes('jumah')) return 'Banu Jumah';
  if (lower.includes('abd al-dar')) return 'Banu Abd al-Dar';
  if (lower.includes('muttalib')) return 'Banu Muttalib';
  if (lower.includes('harith ibn fihr')) return 'Banu al-Harith ibn Fihr';
  if (lower.includes('abyss')) return 'Abyssinian Companions';
  if (lower.includes('persian')) return 'Persian Companions';
  if (lower.includes('freed') || lower.includes('mawla')) return 'Mawali / Freed Companions';
  if (lower.includes('ansar')) return 'Ansar';
  if (lower.includes('quraysh')) return raw.replace(/\s*\(Quraysh\).*$/i, ' (Quraysh)');

  return raw.includes('-') ? titleCase(raw) : raw;
}

export function getCompanionTribe(companion: Companion): string {
  return normalizeTribeLabel(COMPANION_TRIBE[companion.rank] || companion.tribe) || 'Unlisted';
}

export function getInsightMetrics(companions: readonly Companion[]) {
  const timelineCount = companions.filter(c => {
    const born = parseYear(c.born);
    const died = parseYear(c.death);
    return born !== null && died !== null && died > born;
  }).length;
  const hadithTotal = companions.reduce((sum, c) => sum + (c.hadiths || 0), 0);
  const hadithNarrators = companions.filter(c => c.hadiths > 0).length;
  const tribalGroups = new Set(companions.map(getCompanionTribe).filter(t => t !== 'Unlisted'));

  return {
    timelineCount,
    hadithTotal,
    hadithNarrators,
    tribalGroupCount: tribalGroups.size,
    networkNodeCount: companions.length,
  };
}

export function formatVisualInsightSummary(companions: readonly Companion[]): string {
  const metrics = getInsightMetrics(companions);
  return `${metrics.timelineCount} timeline records | ${metrics.hadithTotal.toLocaleString()} hadiths | ${metrics.tribalGroupCount} tribal groups`;
}
