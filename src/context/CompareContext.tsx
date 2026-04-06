import { createContext, useContext, useState, type ReactNode } from 'react';

interface CompareContextValue {
  selected: number[];
  toggle: (rank: number) => void;
  clear: () => void;
  isSelected: (rank: number) => boolean;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const CompareContext = createContext<CompareContextValue>({
  selected: [],
  toggle: () => undefined,
  clear: () => undefined,
  isSelected: () => false,
  isPanelOpen: false,
  openPanel: () => undefined,
  closePanel: () => undefined,
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggle = (rank: number) => {
    setSelected(prev =>
      prev.includes(rank)
        ? prev.filter(r => r !== rank)
        : prev.length < 3
        ? [...prev, rank]
        : prev
    );
  };

  const clear = () => setSelected([]);
  const isSelected = (rank: number) => selected.includes(rank);
  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <CompareContext.Provider
      value={{ selected, toggle, clear, isSelected, isPanelOpen, openPanel, closePanel }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}

