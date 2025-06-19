import React, { createContext, useContext, useState } from 'react';

interface Item {
  id: number;
  name: string;
  qty: number;
}

interface InventoryContextProps {
  items: Item[];
  addItem: (item: Item) => void;
  editItem: (id: number, newQty: number) => void;
  deleteItem: (id: number) => void;
  history: string[];
}

const InventoryContext = createContext<InventoryContextProps | null>(null);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'beras', qty: 10 },
    { id: 2, name: 'minyak', qty: 5 },
    { id: 3, name: 'teh', qty: 7 },
    { id: 4, name: 'gula', qty: 9 },
    { id: 5, name: 'sapu', qty: 3 },
    { id: 6, name: 'sabun', qty: 8 },
    { id: 7, name: 'mie kuah', qty: 12 },
    { id: 8, name: 'obat nyamuk', qty: 6 },
    { id: 9, name: 'keju', qty: 15 },
    { id: 10, name: 'pulpen', qty: 4 },
  ]);

  const [history, setHistory] = useState<string[]>([]);

  const addItem = (item: Item) => {
    setItems(prev => [...prev, item]);
    setHistory(prev => [`🟢 Tambah: ${item.name} (${item.qty})`, ...prev]);
  };

  const editItem = (id: number, newQty: number) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, qty: newQty } : item))
    );
    const name = items.find(i => i.id === id)?.name;
    setHistory(prev => [`🟡 Edit: ${name} jadi (${newQty})`, ...prev]);
  };

  const deleteItem = (id: number) => {
    const deleted = items.find(i => i.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    if (deleted) {
      setHistory(prev => [`🔴 Hapus: ${deleted.name}`, ...prev]);
    }
  };

  return (
    <InventoryContext.Provider
      value={{ items, addItem, editItem, deleteItem, history }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
