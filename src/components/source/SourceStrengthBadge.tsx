import type { SourceStrength } from '../../utils/sourceConfidence';
import { SOURCE_STRENGTH_META } from '../../utils/sourceConfidence';
import styles from './SourceStrengthBadge.module.css';

export function SourceStrengthBadge({
  strength,
  label,
  compact = false,
}: {
  strength: SourceStrength;
  label?: string;
  compact?: boolean;
}) {
  const meta = SOURCE_STRENGTH_META[strength];
  return (
    <span
      className={`${styles.badge} ${styles[strength]} ${compact ? styles.compact : ''}`}
      title={meta.description}
    >
      <span className={styles.dot} />
      {label ?? meta.label}
    </span>
  );
}
