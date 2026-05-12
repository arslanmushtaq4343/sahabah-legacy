import { useMemo, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import * as d3 from 'd3';
import { COMPANIONS, CAT_COLORS } from '../../data/companions';
import { normalizeTransliteration } from '../../data/transliteration';
import type { Companion } from '../../types';
import { parseYear } from './cardTheme';
import { getCompanionTribe, getInsightMetrics } from './insightMetrics';
import GeographicMap from './GeographicMap';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import styles from './CompanionsPage.module.css';

type Tab = 'timeline' | 'hadiths' | 'network' | 'geo';

interface Props {
  onClose: () => void;
  onSelectCompanion: (c: Companion) => void;
}

export default function InsightsPanel({ onClose, onSelectCompanion }: Props) {
  useBodyScrollLock(true);
  const [tab, setTab] = useState<Tab>('timeline');
  const metrics = useMemo(() => getInsightMetrics(COMPANIONS), []);

  return createPortal(
    <div
      className={styles.insightsOverlay}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className={styles.insightsBox}
        role="dialog"
        aria-modal="true"
        aria-label="Companion insights"
      >
        <div className={styles.insightsHeader}>
          <div>
            <p className={styles.insightsEyebrow}>Visual Insights</p>
            <h2 className={styles.insightsTitle}>The Companions at a Glance</h2>
          </div>
          <button className={styles.insightsClose} onClick={onClose} aria-label="Close insights">
            ×
          </button>
        </div>
        <div className={styles.insightsTabs} role="tablist">
          {(
            [
              ['timeline', 'Lifespan Timeline'],
              ['hadiths', 'Top Hadith Narrators'],
              ['network', 'Tribal Network'],
              ['geo', 'Geographic Origins'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id ? 'true' : 'false'}
              className={`${styles.insightsTab} ${tab === id ? styles.insightsTabActive : ''}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className={styles.insightsSummaryGrid} aria-label="Visual insights data coverage">
          <div className={styles.insightsSummaryCard}>
            <strong>{metrics.timelineCount}</strong>
            <span>timeline records</span>
          </div>
          <div className={styles.insightsSummaryCard}>
            <strong>{metrics.hadithTotal.toLocaleString()}</strong>
            <span>hadiths from {metrics.hadithNarrators} narrators</span>
          </div>
          <div className={styles.insightsSummaryCard}>
            <strong>{metrics.tribalGroupCount}</strong>
            <span>tribal groups across {metrics.networkNodeCount} nodes</span>
          </div>
        </div>
        <div className={styles.insightsBody}>
          {tab === 'timeline' && <TimelineChart onSelect={onSelectCompanion} />}
          {tab === 'hadiths' && <HadithChart onSelect={onSelectCompanion} />}
          {tab === 'network' && <TribalNetwork onSelect={onSelectCompanion} />}
          {tab === 'geo' && <GeographicMap onSelect={onSelectCompanion} />}
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ---------------- Timeline (recharts ScatterChart) ---------------- */

function TimelineChart({ onSelect }: { onSelect: (c: Companion) => void }) {
  const points = useMemo(() => {
    return COMPANIONS.map(c => {
      const born = parseYear(c.born);
      const died = parseYear(c.death);
      if (born == null || died == null || died <= born) return null;
      return {
        rank: c.rank,
        name: normalizeTransliteration(c.name),
        cat: c.cat,
        color: CAT_COLORS[c.cat],
        born,
        died,
        lifespan: died - born,
        hadiths: c.hadiths || 0,
        companion: c,
      };
    }).filter((p): p is NonNullable<typeof p> => p !== null);
  }, []);
  const preview = useMemo(() => {
    return [...points].sort((a, b) => b.hadiths - a.hadiths || a.born - b.born).slice(0, 6);
  }, [points]);

  return (
    <div className={styles.insightsChartWrap}>
      <p className={styles.insightsHint}>
        Each dot is a companion. X-axis: birth year (CE). Y-axis: lifespan (years). Dot size: hadith
        count. Click a dot to open the profile.
      </p>
      <div className={styles.insightsDataStrip}>
        {preview.map(d => (
          <button
            key={d.rank}
            type="button"
            className={styles.insightsDataCard}
            onClick={() => onSelect(d.companion)}
          >
            <strong style={{ color: d.color }}>#{d.rank} {d.name}</strong>
            <span>{d.born}-{d.died} CE · {d.lifespan}y</span>
            <small>{d.hadiths.toLocaleString()} hadiths</small>
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={420}>
        <ScatterChart margin={{ top: 16, right: 24, bottom: 32, left: 16 }}>
          <CartesianGrid stroke="#d4a82022" strokeDasharray="3 3" />
          <XAxis
            dataKey="born"
            type="number"
            name="Born"
            domain={['dataMin - 5', 'dataMax + 5']}
            label={{
              value: 'Birth year (CE)',
              position: 'insideBottom',
              offset: -16,
              fill: '#9c8765',
            }}
            tick={{ fill: '#9c8765', fontSize: 11 }}
            stroke="#9c876544"
          />
          <YAxis
            dataKey="lifespan"
            type="number"
            name="Lifespan"
            label={{
              value: 'Lifespan (years)',
              angle: -90,
              position: 'insideLeft',
              fill: '#9c8765',
            }}
            tick={{ fill: '#9c8765', fontSize: 11 }}
            stroke="#9c876544"
          />
          <ZAxis dataKey="hadiths" range={[40, 400]} name="Hadiths" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3', stroke: '#d4a82066' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as (typeof points)[0];
              return (
                <div className={styles.insightsTooltip}>
                  <strong style={{ color: d.color }}>
                    #{d.rank} {d.name}
                  </strong>
                  <div>
                    Born {d.born} · Died {d.died} · {d.lifespan}y
                  </div>
                  {d.hadiths > 0 && <div>{d.hadiths.toLocaleString()} hadiths</div>}
                  <em>Click to open profile</em>
                </div>
              );
            }}
          />
          <Scatter
            data={points}
            onClick={(p: any) => onSelect(p.companion)}
            shape={(props: any) => {
              const { cx, cy, payload } = props;
              const r = Math.sqrt(props.size ?? 60) / 2;
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={payload.color}
                  fillOpacity={0.7}
                  stroke={payload.color}
                />
              );
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------------- Top hadith narrators ---------------- */

function HadithChart({ onSelect }: { onSelect: (c: Companion) => void }) {
  const data = useMemo(() => {
    return [...COMPANIONS]
      .filter(c => c.hadiths > 0)
      .sort((a, b) => b.hadiths - a.hadiths)
      .slice(0, 20)
      .map(c => ({
        rank: c.rank,
        name: normalizeTransliteration(c.name),
        hadiths: c.hadiths,
        color: CAT_COLORS[c.cat],
        companion: c,
      }));
  }, []);
  const preview = data.slice(0, 6);

  return (
    <div className={styles.insightsChartWrap}>
      <p className={styles.insightsHint}>
        Top 20 narrators by hadith count. Click a bar to open the profile.
      </p>
      <div className={styles.insightsDataStrip}>
        {preview.map(d => (
          <button
            key={d.rank}
            type="button"
            className={styles.insightsDataCard}
            onClick={() => onSelect(d.companion)}
          >
            <strong style={{ color: d.color }}>#{d.rank} {d.name}</strong>
            <span>{d.hadiths.toLocaleString()} hadiths narrated</span>
            <small>Open profile</small>
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={Math.max(360, data.length * 26)}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 32 }}>
          <CartesianGrid stroke="#d4a82022" strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fill: '#9c8765', fontSize: 11 }} stroke="#9c876544" />
          <YAxis
            dataKey="name"
            type="category"
            width={150}
            tick={{ fill: '#9c8765', fontSize: 11 }}
            stroke="#9c876544"
          />
          <Tooltip
            cursor={{ fill: '#d4a82011' }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload as (typeof data)[0];
              return (
                <div className={styles.insightsTooltip}>
                  <strong style={{ color: d.color }}>
                    #{d.rank} {d.name}
                  </strong>
                  <div>{d.hadiths.toLocaleString()} hadiths narrated</div>
                </div>
              );
            }}
          />
          <Bar dataKey="hadiths" onClick={(d: any) => onSelect(d.companion)} cursor="pointer">
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ---------------- Tribal network (d3 force) ---------------- */

interface NetNode extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  tribe: string;
  cat: string;
  color: string;
  rank: number;
  companion: Companion;
}

function TribalNetwork({ onSelect }: { onSelect: (c: Companion) => void }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const W = 760,
    H = 480;

  const { nodes, tribeColors } = useMemo(() => {
    const tribeSet = new Set<string>();
    COMPANIONS.forEach(c => {
      const t = getCompanionTribe(c);
      if (t) tribeSet.add(t);
    });
    const tribeArr = [...tribeSet];
    const scale = d3
      .scaleOrdinal<string, string>()
      .domain(tribeArr)
      .range(d3.quantize(d3.interpolateRainbow, Math.max(3, tribeArr.length)));
    const colors: Record<string, string> = {};
    tribeArr.forEach(t => {
      colors[t] = scale(t);
    });

    const ns: NetNode[] = COMPANIONS.map(c => ({
      id: c.rank,
      rank: c.rank,
      name: normalizeTransliteration(c.name),
      tribe: getCompanionTribe(c),
      cat: c.cat,
      color: colors[getCompanionTribe(c)] || '#888',
      companion: c,
    }));

    return { nodes: ns, tribeColors: colors };
  }, []);
  const tribeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    nodes.forEach(node => counts.set(node.tribe, (counts.get(node.tribe) || 0) + 1));
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 8)
      .map(([tribe, count]) => ({ tribe, count, color: tribeColors[tribe] || '#888' }));
  }, [nodes, tribeColors]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const tooltip = d3
      .select<HTMLDivElement, unknown>('body')
      .append('div')
      .attr('class', styles.networkTooltip)
      .style('position', 'fixed')
      .style('pointer-events', 'none')
      .style('opacity', '0');

    const tribeCenters: Record<string, { x: number; y: number }> = {};
    const tribeArr = Object.keys(tribeColors);
    tribeArr.forEach((t, i) => {
      const angle = (i / tribeArr.length) * Math.PI * 2;
      tribeCenters[t] = {
        x: W / 2 + Math.cos(angle) * (W * 0.32),
        y: H / 2 + Math.sin(angle) * (H * 0.36),
      };
    });

    const sim = d3
      .forceSimulation<NetNode>(nodes)
      .force('charge', d3.forceManyBody<NetNode>().strength(-18))
      .force('collision', d3.forceCollide<NetNode>().radius(7))
      .force(
        'x',
        d3
          .forceX<NetNode>()
          .strength(0.18)
          .x(d => tribeCenters[d.tribe]?.x ?? W / 2)
      )
      .force(
        'y',
        d3
          .forceY<NetNode>()
          .strength(0.18)
          .y(d => tribeCenters[d.tribe]?.y ?? H / 2)
      )
      .alphaDecay(0.03);

    const node = svg
      .append('g')
      .selectAll<SVGCircleElement, NetNode>('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('fill', d => d.color)
      .attr('fill-opacity', 0.85)
      .attr('stroke', '#0d1520')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this).attr('r', 8).attr('stroke-width', 2);
        tooltip
          .style('opacity', '1')
          .html(
            `<strong>#${d.rank} ${d.name}</strong><br/><span style="color:${d.color}">${d.tribe}</span>`
          );
      })
      .on('mousemove', event => {
        tooltip.style('left', `${event.clientX + 12}px`).style('top', `${event.clientY + 12}px`);
      })
      .on('mouseleave', function () {
        d3.select(this).attr('r', 5).attr('stroke-width', 1);
        tooltip.style('opacity', '0');
      })
      .on('click', (_event, d) => onSelect(d.companion));

    sim.on('tick', () => {
      node
        .attr('cx', d => Math.max(6, Math.min(W - 6, d.x ?? 0)))
        .attr('cy', d => Math.max(6, Math.min(H - 6, d.y ?? 0)));
    });

    return () => {
      sim.stop();
      tooltip.remove();
    };
  }, [nodes, tribeColors, onSelect]);

  return (
    <div className={styles.insightsChartWrap}>
      <p className={styles.insightsHint}>
        Each dot is a companion, clustered by tribe. Hover for name, click to open the profile.
      </p>
      <div className={styles.insightsDataStrip}>
        {tribeCounts.map(item => (
          <div key={item.tribe} className={styles.insightsDataCard}>
            <strong style={{ color: item.color }}>{item.tribe}</strong>
            <span>{item.count} companions</span>
            <small>Clustered in the network below</small>
          </div>
        ))}
      </div>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className={styles.networkSvg} />
      <div className={styles.networkLegend}>
        {Object.entries(tribeColors)
          .slice(0, 24)
          .map(([tribe, color]) => (
            <span key={tribe} className={styles.networkLegItem}>
              <span className={styles.networkLegSwatch} style={{ background: color }} />
              {tribe}
            </span>
          ))}
      </div>
    </div>
  );
}
