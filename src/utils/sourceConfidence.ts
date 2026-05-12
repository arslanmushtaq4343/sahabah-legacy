import type { ConfidenceLevel } from '../data/companionDataQuality';
import type { ReliabilityLevel } from '../data/companionExtras';

export type SourceStrength = 'strong' | 'moderate' | 'weak' | 'disputed';

export const SOURCE_STRENGTH_META: Record<
  SourceStrength,
  { label: string; description: string; color: string }
> = {
  strong: {
    label: 'Strong',
    description: 'Quran, sahih hadith, or tightly sourced report',
    color: '#2ca66f',
  },
  moderate: {
    label: 'Moderate',
    description: 'Accepted report with usable support',
    color: '#c9a84c',
  },
  weak: {
    label: 'Weak',
    description: 'Report-based, contextual, or debated detail',
    color: '#d78a3d',
  },
  disputed: {
    label: 'Disputed',
    description: 'Rejected, very weak, or flagged as contested',
    color: '#cf5c5c',
  },
};

export function confidenceToStrength(level: ConfidenceLevel): SourceStrength {
  if (level === 'high') return 'strong';
  if (level === 'medium') return 'moderate';
  return 'weak';
}

export function reliabilityToStrength(level: ReliabilityLevel): SourceStrength {
  if (level === 'sahih') return 'strong';
  if (level === 'hasan' || level === 'maqbul') return 'moderate';
  if (level === 'mawdu') return 'disputed';
  return 'weak';
}
