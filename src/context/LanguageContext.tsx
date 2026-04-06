import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Language } from '../types';

interface LanguageContextValue {
  lang: Language;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  toggle: () => undefined,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('lang');
    return stored === 'ur' ? 'ur' : 'en';
  });
  const toggle = () => setLang(prev => (prev === 'en' ? 'ur' : 'en'));

  useEffect(() => {
    localStorage.setItem('lang', lang);
    const root = document.documentElement;
    root.lang = lang === 'ur' ? 'ur' : 'en';
    root.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', lang === 'ur');
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

