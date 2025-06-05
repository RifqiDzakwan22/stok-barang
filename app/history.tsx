// app/history.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dummyData = [
  { id: 1, name: 'Beras', qty: 5, type: 'masuk', date: '2024-06-10' },
  { id: 2, name: 'Teh', qty: 2, type: 'keluar', date: '2024-06-11' },
  { id: 3, name: 'Minyak', qty: 3, type: 'masuk', date: '2024-06-12' },
];

export default function HistoryScreen() {
  const [selectedTab, setSelectedTab] = useState<'masuk' | 'keluar'>('masuk');
  const router = useRouter();

  const filteredData = dummyData.filter((item) => item.type === selectedTab);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histori Barang</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity onPress={() => setSelectedTab('masuk')} style={[styles.tab, selectedTab === 'masuk' && styles.activeTab]}>
          <Text style={styles.tabText}>Barang Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('keluar')} style={[styles.tab, selectedTab === 'keluar' && styles.activeTab]}>
          <Text style={styles.tabText}>Barang Keluar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {filteredData.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemQty}>{item.qty} {item.type === 'masuk' ? '⬇️' : '⬆️'}</Text>
            <Text style={styles.itemDate}>{item.date}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  tabRow: { flexDirection: 'row', marginBottom: 16 },
  tab: { flex: 1, padding: 10, backgroundColor: '#eee', alignItems: 'center', borderRadius: 6 },
  activeTab: { backgroundColor: '#0033FF' },
  tabText: { color: '#fff' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#F3F3F3', marginBottom: 6, borderRadius: 8 },
  itemText: { fontSize: 16 },
  itemQty: { fontWeight: 'bold', color: '#333' },
  itemDate: { color: '#666', fontSize: 12 },
  cancelText: { marginTop: 16, textAlign: 'center', color: '#666', textDecorationLine: 'underline' }
});
