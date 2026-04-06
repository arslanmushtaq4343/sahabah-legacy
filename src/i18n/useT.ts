import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { t, type TKey } from './translations';

export function useT() {
  const { lang } = useLanguage();
  return useMemo(() => {
    return (key: TKey) => t(lang, key);
  }, [lang]);
}

