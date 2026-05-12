import { normalizeTransliteration } from '../data/transliteration';

export function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

export function speakText(text: string, options: { lang?: string; rate?: number; pitch?: number } = {}) {
  if (!('speechSynthesis' in window) || !text.trim()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang ?? 'en-US';
  utterance.rate = options.rate ?? 0.92;
  utterance.pitch = options.pitch ?? 1;

  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.toLowerCase().startsWith(utterance.lang.toLowerCase().slice(0, 2)));
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

export function speakArabic(text: string) {
  speakText(text, { lang: 'ar-SA', rate: 0.8, pitch: 1.1 });
}

export function speakBio(name: string, bio: string) {
  const cleanName = normalizeTransliteration(name);
  const cleanBio = normalizeTransliteration(bio);
  speakText(`${cleanName}. ${cleanBio}`, { lang: 'en-US', rate: 0.9, pitch: 1 });
}

export function quranRecitationUrl(ayahRef: string) {
  const match = ayahRef.match(/(\d{1,3})\D+(\d{1,3})/);
  if (!match) return null;
  const surah = match[1].padStart(3, '0');
  const ayah = match[2].padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${surah}${ayah}.mp3`;
}
