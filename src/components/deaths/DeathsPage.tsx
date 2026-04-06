import { useState, useMemo } from 'react';
import { COMPANION_DEATHS, CAUSE_META, type CompanionDeath, type DeathCause } from '../../data/deaths';
import s from './DeathsPage.module.css';

// Historical bounding box for Middle East / Islamic world map
// Roughly: Lng 30–60, Lat 15–40
const MAP_LNG_MIN = 28, MAP_LNG_MAX = 62;
const MAP_LAT_MIN = 14, MAP_LAT_MAX = 42;
const MAP_W = 820, MAP_H = 440;

function lngToX(lng: number) {
  return ((lng - MAP_LNG_MIN) / (MAP_LNG_MAX - MAP_LNG_MIN)) * MAP_W;
}
function latToY(lat: number) {
  return MAP_H - ((lat - MAP_LAT_MIN) / (MAP_LAT_MAX - MAP_LAT_MIN)) * MAP_H;
}

const CAUSES: Array<{ id: DeathCause | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'martyrdom', label: 'Martyrdom' },
  { id: 'assassination', label: 'Assassination' },
  { id: 'plague', label: 'Plague' },
  { id: 'natural', label: 'Natural' },
];

export default function DeathsPage() {
  const [causeFilter, setCauseFilter] = useState<DeathCause | 'all'>('all');
  const [selected, setSelected] = useState<CompanionDeath | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');

  const filtered = useMemo(() => {
    if (causeFilter === 'all') return COMPANION_DEATHS;
    return COMPANION_DEATHS.filter((d) => d.cause === causeFilter);
  }, [causeFilter]);

  const stats = useMemo(() => {
    const counts: Partial<Record<DeathCause, number>> = {};
    COMPANION_DEATHS.forEach((d) => {
      counts[d.cause] = (counts[d.cause] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className={`${s.page} premium-page`}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.headerGlow} aria-hidden />
        <p className={s.eyebrow}>Collection 03 · Death Encyclopedia</p>
        <h1 className={s.title}>
          The <span className={s.red}>Departures</span>
        </h1>
        <p className={s.lead}>
          Cause of death, date in AH &amp; CE, exact location, who was present, and burial site for
          every major companion — mapped across the historical Islamic world.
        </p>

        {/* Cause stats bar */}
        <div className={s.statsBar}>
          {(Object.keys(CAUSE_META) as DeathCause[]).map((k) => (
            <div key={k} className={s.statPill} style={{ '--cc': CAUSE_META[k].color } as React.CSSProperties}>
              <span className={s.statIcon}>{CAUSE_META[k].icon}</span>
              <span className={s.statCount}>{stats[k] || 0}</span>
              <span className={s.statLabel}>{CAUSE_META[k].label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Controls */}
      <div className={s.controls}>
        <div className={s.filterRow}>
          {CAUSES.map((c) => (
            <button
              key={c.id}
              className={`${s.filterBtn} ${causeFilter === c.id ? s.filterActive : ''}`}
              onClick={() => setCauseFilter(c.id)}
              style={causeFilter === c.id && c.id !== 'all' ? { '--ac': CAUSE_META[c.id as DeathCause].color } as React.CSSProperties : undefined}
            >
              {c.id !== 'all' && <span>{CAUSE_META[c.id as DeathCause].icon}</span>}
              {c.label}
            </button>
          ))}
        </div>
        <div className={s.viewToggle}>
          <button className={`${s.viewBtn} ${view === 'map' ? s.viewActive : ''}`} onClick={() => setView('map')}>🗺 Map</button>
          <button className={`${s.viewBtn} ${view === 'list' ? s.viewActive : ''}`} onClick={() => setView('list')}>☰ List</button>
        </div>
      </div>

      {/* Map View */}
      {view === 'map' && (
        <div className={s.mapContainer}>
          <svg
            className={s.mapSvg}
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background ocean */}
            <rect width={MAP_W} height={MAP_H} fill="#0a0c14" />

            {/* Grid lines */}
            {[20, 30, 40, 50, 60].map((lng) => (
              <line
                key={`v${lng}`}
                x1={lngToX(lng)} y1={0}
                x2={lngToX(lng)} y2={MAP_H}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1"
              />
            ))}
            {[20, 25, 30, 35, 40].map((lat) => (
              <line
                key={`h${lat}`}
                x1={0} y1={latToY(lat)}
                x2={MAP_W} y2={latToY(lat)}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1"
              />
            ))}

            {/* Region labels */}
            <text x={lngToX(39)} y={latToY(26)} fill="rgba(255,255,255,0.12)" fontSize="13" textAnchor="middle" fontFamily="serif">Arabia</text>
            <text x={lngToX(37)} y={latToY(35)} fill="rgba(255,255,255,0.1)" fontSize="11" textAnchor="middle" fontFamily="serif">Levant</text>
            <text x={lngToX(45)} y={latToY(33)} fill="rgba(255,255,255,0.1)" fontSize="11" textAnchor="middle" fontFamily="serif">Iraq</text>
            <text x={lngToX(55)} y={latToY(33)} fill="rgba(255,255,255,0.1)" fontSize="11" textAnchor="middle" fontFamily="serif">Persia</text>
            <text x={lngToX(30)} y={latToY(30)} fill="rgba(255,255,255,0.08)" fontSize="10" textAnchor="middle" fontFamily="serif">Egypt</text>

            {/* Major city landmarks */}
            {[
              { label: 'Mecca', lat: 21.39, lng: 39.86 },
              { label: 'Medina', lat: 24.52, lng: 39.57 },
              { label: 'Damascus', lat: 33.51, lng: 36.28 },
              { label: 'Kufa', lat: 32.0, lng: 44.4 },
              { label: 'Basra', lat: 30.5, lng: 47.8 },
              { label: 'Jerusalem', lat: 31.77, lng: 35.22 },
            ].map((city) => (
              <g key={city.label}>
                <circle cx={lngToX(city.lng)} cy={latToY(city.lat)} r={3} fill="rgba(184,134,11,0.35)" />
                <text
                  x={lngToX(city.lng) + 5}
                  y={latToY(city.lat) + 4}
                  fill="rgba(184,134,11,0.5)"
                  fontSize="9"
                  fontFamily="serif"
                >
                  {city.label}
                </text>
              </g>
            ))}

            {/* Death markers */}
            {filtered.map((d) => {
              const x = lngToX(d.lng);
              const y = latToY(d.lat);
              const meta = CAUSE_META[d.cause];
              const isSel = selected?.id === d.id;
              return (
                <g
                  key={d.id}
                  onClick={() => setSelected(isSel ? null : d)}
                  style={{ cursor: 'pointer' }}
                >
                  {isSel && (
                    <circle cx={x} cy={y} r={18} fill={meta.color + '22'} stroke={meta.color} strokeWidth="1" />
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSel ? 8 : 6}
                    fill={meta.color}
                    stroke={isSel ? '#fff' : meta.color + 'aa'}
                    strokeWidth={isSel ? 2 : 1}
                    opacity={0.9}
                  />
                  {isSel && (
                    <text
                      x={x}
                      y={y - 14}
                      textAnchor="middle"
                      fill="#e8dfc8"
                      fontSize="9"
                      fontFamily="sans-serif"
                      stroke="#0a0806"
                      strokeWidth="3"
                      paintOrder="stroke"
                    >
                      {d.companion.split(' ').slice(0, 2).join(' ')}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className={s.mapLegend}>
            {(Object.keys(CAUSE_META) as DeathCause[]).map((k) => (
              <div key={k} className={s.legendItem}>
                <span className={s.legendDot} style={{ background: CAUSE_META[k].color }} />
                <span className={s.legendLabel}>{CAUSE_META[k].label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected detail panel */}
      {selected && (
        <DetailPanel death={selected} onClose={() => setSelected(null)} />
      )}

      {/* List View */}
      {view === 'list' && (
        <div className={s.list}>
          {filtered.map((d) => (
            <ListRow
              key={d.id}
              death={d}
              isSelected={selected?.id === d.id}
              onClick={() => setSelected(selected?.id === d.id ? null : d)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DetailPanel({ death: d, onClose }: { death: CompanionDeath; onClose: () => void }) {
  const meta = CAUSE_META[d.cause];
  return (
    <div className={s.panel} style={{ '--pc': meta.color } as React.CSSProperties}>
      <div className={s.panelHeader}>
        <div className={s.panelLeft}>
          <span className={s.panelCause} style={{ color: meta.color }}>
            {meta.icon} {meta.label}
          </span>
          <h2 className={s.panelName}>{d.companion}</h2>
          <p className={s.panelNameAr}>{d.companionAr}</p>
        </div>
        <button className={s.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div className={s.panelMeta}>
        <div className={s.metaItem}>
          <span className={s.metaLabel}>Year</span>
          <span className={s.metaVal}>{d.yearAH} AH / {d.yearCE} CE</span>
        </div>
        {d.age && (
          <div className={s.metaItem}>
            <span className={s.metaLabel}>Age</span>
            <span className={s.metaVal}>{d.age}</span>
          </div>
        )}
        <div className={s.metaItem}>
          <span className={s.metaLabel}>Location</span>
          <span className={s.metaVal}>{d.location} · <span dir="rtl">{d.locationAr}</span></span>
        </div>
        <div className={s.metaItem}>
          <span className={s.metaLabel}>Buried</span>
          <span className={s.metaVal}>{d.burialSite}</span>
        </div>
      </div>

      {d.presentAt.length > 0 && (
        <div className={s.panelSection}>
          <span className={s.panelSectLabel}>Present At Death</span>
          <p className={s.panelText}>{d.presentAt.join(', ')}</p>
        </div>
      )}

      <div className={s.panelSection}>
        <span className={s.panelSectLabel}>Circumstances</span>
        <p className={s.panelText}>{d.circumstance}</p>
      </div>

      {d.lastMoments && (
        <div className={s.panelSection}>
          <span className={s.panelSectLabel}>Final Moments</span>
          <p className={s.panelText}>{d.lastMoments}</p>
        </div>
      )}

      {d.propheticStatement && (
        <div className={s.propheticBox}>
          <span className={s.propheticLabel}>Prophetic Statement</span>
          <p className={s.propheticText}>{d.propheticStatement}</p>
        </div>
      )}
    </div>
  );
}

function ListRow({
  death: d,
  isSelected,
  onClick,
}: {
  death: CompanionDeath;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meta = CAUSE_META[d.cause];
  return (
    <div className={`${s.listRow} ${isSelected ? s.listRowOpen : ''}`}>
      <button className={s.listSummary} onClick={onClick}>
        <span className={s.listCauseDot} style={{ background: meta.color }} />
        <div className={s.listNames}>
          <span className={s.listName}>{d.companion}</span>
          <span className={s.listNameAr}>{d.companionAr}</span>
        </div>
        <div className={s.listMeta}>
          <span className={s.listYear}>{d.yearAH} AH · {d.yearCE} CE</span>
          <span className={s.listLoc}>{d.location}</span>
        </div>
        <span className={s.listCauseTag} style={{ color: meta.color, background: meta.color + '18' }}>
          {meta.icon} {meta.label}
        </span>
        <span className={s.listChev}>{isSelected ? '▲' : '▼'}</span>
      </button>
      {isSelected && (
        <div className={s.listDetail}>
          <p className={s.listCircumstance}>{d.circumstance}</p>
          {d.lastMoments && (
            <div className={s.listLast}>
              <span className={s.listLastLabel}>Final Moments</span>
              <p className={s.listLastText}>{d.lastMoments}</p>
            </div>
          )}
          {d.propheticStatement && (
            <div className={s.listProphetic}>
              <span className={s.listPropheticLabel}>Prophetic Statement</span>
              <p className={s.listPropheticText}>{d.propheticStatement}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
