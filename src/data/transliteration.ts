const REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bMuawiyah\b/g, "Mu'awiyah"],
  [/\bQuran\b/g, "Qur'an"],
  [/\bdua\b/g, "du'a"],
  [/\bDua\b/g, "Du'a"],
  [/\bduas\b/g, "du'as"],
  [/\bDuas\b/g, "Du'as"],
];

export function normalizeTransliteration(text: string): string {
  return REPLACEMENTS.reduce(
    (value, [pattern, replacement]) => value.replace(pattern, replacement),
    text
  );
}

export function normalizeTransliterationList(items: string[]): string[] {
  return items.map(item => normalizeTransliteration(item));
}
