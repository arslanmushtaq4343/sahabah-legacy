import { createContext, useContext, useState, type ReactNode } from 'react';

export type CompareKind = 'companion' | 'imam';

export interface CompareItem {
  kind: CompareKind;
  id: string;
}

interface CompareContextValue {
  selected: number[];
  selectedItems: CompareItem[];
  toggle: (rank: number) => void;
  toggleItem: (item: CompareItem) => void;
  toggleImam: (id: string) => void;
  clear: () => void;
  isSelected: (rank: number) => boolean;
  isItemSelected: (item: CompareItem) => boolean;
  isImamSelected: (id: string) => boolean;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const CompareContext = createContext<CompareContextValue>({
  selected: [],
  selectedItems: [],
  toggle: () => undefined,
  toggleItem: () => undefined,
  toggleImam: () => undefined,
  clear: () => undefined,
  isSelected: () => false,
  isItemSelected: () => false,
  isImamSelected: () => false,
  isPanelOpen: false,
  openPanel: () => undefined,
  closePanel: () => undefined,
});

function sameCompareItem(a: CompareItem, b: CompareItem) {
  return a.kind === b.kind && a.id === b.id;
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<CompareItem[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const selected = selectedItems
    .filter(item => item.kind === 'companion')
    .map(item => Number(item.id))
    .filter(Number.isFinite);

  const toggleItem = (item: CompareItem) => {
    setSelectedItems(prev =>
      prev.some(existing => sameCompareItem(existing, item))
        ? prev.filter(existing => !sameCompareItem(existing, item))
        : prev.length < 3
          ? [...prev, item]
          : prev
    );
  };

  const toggle = (rank: number) => toggleItem({ kind: 'companion', id: String(rank) });
  const toggleImam = (id: string) => toggleItem({ kind: 'imam', id });
  const clear = () => setSelectedItems([]);
  const isItemSelected = (item: CompareItem) =>
    selectedItems.some(existing => sameCompareItem(existing, item));
  const isSelected = (rank: number) => isItemSelected({ kind: 'companion', id: String(rank) });
  const isImamSelected = (id: string) => isItemSelected({ kind: 'imam', id });
  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <CompareContext.Provider
      value={{
        selected,
        selectedItems,
        toggle,
        toggleItem,
        toggleImam,
        clear,
        isSelected,
        isItemSelected,
        isImamSelected,
        isPanelOpen,
        openPanel,
        closePanel,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
