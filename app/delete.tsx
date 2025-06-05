import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const initialData = [
  { id: 1, name: 'Beras', image: require('@/assets/images/beras.png') },
  { id: 2, name: 'Minyak', image: require('@/assets/images/minyak.png') },
  { id: 3, name: 'Teh', image: require('@/assets/images/teh.png') },
  { id: 4, name: 'Gula', qty: 5, image: require('@/assets/images/gula.png') },
  { id: 5, name: 'Garam', qty: 5, image: require('@/assets/images/garam.png') },
  { id: 6, name: 'Sabun Mandi', qty: 5, image: require('@/assets/images/sabunmandi.png') },
  { id: 7, name: 'Sabun Cuci Piring', qty: 5, image: require('@/assets/images/sabuncucipring.png') },
  { id: 8, name: 'Sabun Lantai', qty: 5, image: require('@/assets/images/sabunlantai.png') },
  { id: 9, name: 'Mie Kuah', qty: 5, image: require('@/assets/images/miekuah.png') },
  { id: 10, name: 'Coklat Messes', qty: 5, image: require('@/assets/images/coklatmesses.png') },
  { id: 11, name: 'Coklat Batang', qty: 5, image: require('@/assets/images/coklatbatang.png') },
  { id: 12, name: 'Keju', qty: 5, image: require('@/assets/images/keju.png') },
  { id: 13, name: 'Mie Goreng', qty: 5, image: require('@/assets/images/miegoreng.png') },
  { id: 14, name: 'Makaroni', qty: 5, image: require('@/assets/images/makaroni.png') },
  { id: 15, name: 'Pulpen', qty: 5, image: require('@/assets/images/pulpen.png') },
  { id: 16, name: 'Buku Tulis', qty: 5, image: require('@/assets/images/bukutulis.png') },
  { id: 17, name: 'Obat Nyamuk', qty: 5, image: require('@/assets/images/obatnyamuk.png') },
  { id: 18, name: 'Tepung Terigu', qty: 5, image: require('@/assets/images/tepungterigu.png') },
  { id: 19, name: 'Parfum', qty: 5, image: require('@/assets/images/parfum.png') },
  { id: 20, name: 'Sapu', qty: 5, image: require('@/assets/images/sapu.png') },
];

export default function DeleteScreen() {
  const router = useRouter();
  const [items, setItems] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      Alert.alert('Pilih barang dulu!');
      return;
    }

    Alert.alert('Konfirmasi', 'Yakin ingin menghapus barang terpilih?', [
      { text: 'Batal' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => {
          const updated = items.filter(item => !selectedIds.includes(item.id));
          setItems(updated);
          setSelectedIds([]);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hapus Barang</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              selectedIds.includes(item.id) && styles.selected,
            ]}
            onPress={() => toggleSelect(item.id)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            {selectedIds.includes(item.id) && <Text style={styles.check}>✔️</Text>}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Hapus</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/inventory')}>
        <Text style={styles.cancel}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FF5C5C',
  },
  image: { width: 30, height: 30, marginRight: 10 },
  name: { flex: 1, fontSize: 16 },
  check: { fontSize: 16, color: '#FF5C5C' },

  deleteButton: {
    backgroundColor: '#FF5C5C',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteText: { color: '#fff', fontWeight: 'bold' },
  cancel: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
    textDecorationLine: 'underline',
  },
});
