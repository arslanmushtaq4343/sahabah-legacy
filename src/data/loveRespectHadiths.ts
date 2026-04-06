export interface LoveRespectHadith {
  ar: string;
  en: string;
  ur: string;
  src: string;
  tags: string[];
}

let cached: LoveRespectHadith[] | null = null;

export async function loadLoveRespectHadiths(): Promise<LoveRespectHadith[]> {
  if (cached) return cached;

  try {
    const res = await fetch('/hadiths-main-tab.html', { credentials: 'same-origin' });
    const html = await res.text();

    const start = html.indexOf('const HADITHS = [');
    if (start === -1) return [];

    const endMain = html.indexOf('];', start);
    if (endMain === -1) return [];

    const pushIdx = html.indexOf('HADITHS.push(', endMain);
    const pushEnd = pushIdx !== -1 ? html.indexOf(');', pushIdx) + 2 : -1;

    const mainArray = html.slice(start, endMain + 2);
    const pushBlock = pushIdx !== -1 && pushEnd !== -1 ? html.slice(pushIdx, pushEnd + 1) : '';

    const code = `
      ${mainArray}
      ${pushBlock}
      return HADITHS;
    `;

    // eslint-disable-next-line no-new-func
    const fn = new Function(code) as () => LoveRespectHadith[];
    const result = fn() || [];
    cached = result;
    return result;
  } catch {
    return [];
  }
}

