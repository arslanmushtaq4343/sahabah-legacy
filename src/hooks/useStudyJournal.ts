import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'sahabah_studied';

function load(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch {
    return new Set();
  }
}

function save(set: Set<number>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch { /* storage full */ }
}

export function useStudyJournal() {
  const [studied, setStudied] = useState<Set<number>>(() => load());

  /* sync across tabs */
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setStudied(load());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const markStudied = useCallback((rank: number) => {
    setStudied(prev => {
      const next = new Set(prev);
      next.add(rank);
      save(next);
      return next;
    });
  }, []);

  const unmarkStudied = useCallback((rank: number) => {
    setStudied(prev => {
      const next = new Set(prev);
      next.delete(rank);
      save(next);
      return next;
    });
  }, []);

  const toggleStudied = useCallback((rank: number) => {
    setStudied(prev => {
      const next = new Set(prev);
      if (next.has(rank)) next.delete(rank); else next.add(rank);
      save(next);
      return next;
    });
  }, []);

  const isStudied = useCallback((rank: number) => studied.has(rank), [studied]);

  return { studied, markStudied, unmarkStudied, toggleStudied, isStudied, count: studied.size };
}
