import type { Companion } from '@sahabah/shared-types';

function csvEscape(value: string | number) {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function exportCompanionsCsv(rows: Companion[], fileName = 'connections-export.csv') {
  const header = ['rank', 'name', 'ar', 'category', 'relType', 'hadiths', 'battles', 'place', 'tribe'];
  const body = rows.map(c =>
    [
      c.rank,
      c.name,
      c.ar,
      c.cat,
      c.relType,
      c.hadiths ?? 0,
      c.battles?.length ?? 0,
      c.place,
      c.tribe,
    ]
      .map(csvEscape)
      .join(',')
  );
  const csv = [header.join(','), ...body].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportSvgAsPng(svgElement: SVGSVGElement, fileName = 'connections-graph.png') {
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svgElement);
  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.onload = () => {
    const vb = svgElement.viewBox.baseVal;
    const width = vb?.width || svgElement.clientWidth || 1200;
    const height = vb?.height || svgElement.clientHeight || 800;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0f0f10';
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0);
    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };
  img.src = url;
}
