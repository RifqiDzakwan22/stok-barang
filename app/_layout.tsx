// app/_layout.tsx
import { Slot } from 'expo-router';
import React from 'react';
import { InventoryProvider } from './context/InventoryContext'; // pastikan path ini sesuai

export default function RootLayout() {
  return (
    <InventoryProvider>
      <Slot />
    </InventoryProvider>
  );
}
