import { useEffect, useRef, useState } from 'react';
import type { LegacyStats } from '../../data/companionSegments';
import styles from './segments.module.css';

interface Props {
  stats: LegacyStats;
  hadithCount: number;
  battleCount: number;
  authenticityScore: number;
  companionName: string;
  totalCompanions?: number;
  playing: boolean;
  reducedMotion: boolean;
  color: string;
}

function useCountUp(target: number, playing: boolean, reducedMotion: boolean, delay = 0) {
  const [val, setVal] = useState(reducedMotion ? target : 0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!playing) return;
    if (reducedMotion) {
      setVal(target);
      return;
    }
    let start: number | null = null;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts + delay;
      const elapsed = Math.max(0, ts - start);
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [playing, target, reducedMotion, delay]);
  return val;
}

export default function LegacyTicker({
  stats,
  hadithCount,
  battleCount,
  authenticityScore,
  companionName,
  totalCompanions = 120,
  playing,
  reducedMotion,
  color,
}: Props) {
  const [visible, setVisible] = useState<boolean[]>([]);
  const [authVisible, setAuthVisible] = useState(false);

  const hadiths = useCountUp(hadithCount, playing, reducedMotion, 0);
  const battles = useCountUp(battleCount, playing, reducedMotion, 200);
  const years = useCountUp(stats.yearsInIslam, playing, reducedMotion, 400);
  const students = useCountUp(stats.studentsCount ?? 0, playing, reducedMotion, 600);
  const slaves = useCountUp(stats.slavesFreed ?? 0, playing, reducedMotion, 800);
  const ayahs = useCountUp(stats.quranAyahsLinked, playing, reducedMotion, 1000);
  const auth = useCountUp(authenticityScore, playing, reducedMotion, 1400);

  const cells = [
    {
      num: hadiths,
      label: 'Hadiths Narrated',
      labelAr: 'الأحاديث المروية',
      max: 5374,
      topPct: Math.round((hadithCount / 5374) * 100),
    },
    {
      num: battles,
      label: 'Battles',
      labelAr: 'الغزوات',
      max: 20,
      topPct: Math.round((battleCount / 20) * 100),
    },
    { num: years, label: 'Years in Islam', labelAr: 'سنوات في الإسلام', max: 80, topPct: null },
    {
      num: students,
      label: 'Students / Narrators',
      labelAr: 'الطلاب والرواة',
      max: 5374,
      topPct: null,
    },
    { num: slaves, label: 'Slaves Freed', labelAr: 'العبيد المُعتقون', max: 20, topPct: null },
    { num: ayahs, label: 'Quran Ayahs Linked', labelAr: 'الآيات المرتبطة', max: 10, topPct: null },
  ];

  useEffect(() => {
    if (!playing) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    cells.forEach((_, i) => {
      timers.push(
        setTimeout(
          () =>
            setVisible(v => {
              const n = [...v];
              n[i] = true;
              return n;
            }),
          reducedMotion ? 0 : i * 150
        )
      );
    });
    timers.push(setTimeout(() => setAuthVisible(true), reducedMotion ? 0 : 1600));
    return () => timers.forEach(clearTimeout);
  }, [playing, reducedMotion]);

  return (
    <div>
      <div className={styles.tickerGrid}>
        {cells.map((c, i) => (
          <div
            key={i}
            className={`${styles.tickerCell} ${visible[i] || reducedMotion ? styles.tickerCellVisible : ''}`}
            style={{ transitionDelay: reducedMotion ? '0ms' : `${i * 150}ms` }}
          >
            <div className={styles.tickerNum} style={{ color }}>
              {c.num.toLocaleString()}
            </div>
            <div className={styles.tickerLabel}>{c.label}</div>
            <div className={styles.tickerLabelAr}>{c.labelAr}</div>
            <div className={styles.tickerBar}>
              <div
                className={styles.tickerBarFill}
                style={{
                  width:
                    playing || reducedMotion ? `${Math.min(100, (c.num / c.max) * 100)}%` : '0%',
                  background: color,
                }}
              />
            </div>
            {c.topPct !== null && c.topPct > 0 && (
              <div className={styles.tickerRankLabel}>Top {100 - c.topPct}% among companions</div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`${styles.tickerAuthBadge} ${authVisible || reducedMotion ? styles.tickerAuthBadgeVisible : ''}`}
      >
        <div className={styles.tickerAuthScore} style={{ color }}>
          {auth}
          <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>/100</span>
        </div>
        <div className={styles.tickerAuthLabel}>Authenticity Score</div>
      </div>
    </div>
  );
}
