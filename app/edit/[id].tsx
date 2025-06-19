import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const dummyInventory = {
  1: { name: 'Beras', image: require('@/assets/images/beras.png'), qty: 10 },
  2: { name: 'Minyak', image: require('@/assets/images/minyak.png'), qty: 8 },
  3: { name: 'Teh', qty: 5, image: require('@/assets/images/teh.png') },
  4: { name: 'Gula', qty: 5, image: require('@/assets/images/gula.png') },
  5: { name: 'Garam', qty: 5, image: require('@/assets/images/garam.png') },
  6: { name: 'Sabun Mandi', qty: 5, image: require('@/assets/images/sabunmandi.png') },
  7: { name: 'Sabun Cuci Piring', qty: 5, image: require('@/assets/images/sabuncucipring.png') },
  8: { name: 'Sabun Lantai', qty: 5, image: require('@/assets/images/sabunlantai.png') },
  9: { name: 'Mie Kuah', qty: 5, image: require('@/assets/images/miekuah.png') },
 10: { name: 'Coklat Messes', qty: 5, image: require('@/assets/images/coklatmesses.png') },
 11: { name: 'Coklat Batang', qty: 5, image: require('@/assets/images/coklatbatang.png') },
 12: { name: 'Keju', qty: 5, image: require('@/assets/images/keju.png') },
 13: { name: 'Mie Goreng', qty: 5, image: require('@/assets/images/miegoreng.png') },
 14: { name: 'Makaroni', qty: 5, image: require('@/assets/images/makaroni.png') },
 15: { name: 'Pulpen', qty: 5, image: require('@/assets/images/pulpen.png') },
 16: { name: 'Buku Tulis', qty: 5, image: require('@/assets/images/bukutulis.png') },
 17: { name: 'Obat Nyamuk', qty: 5, image: require('@/assets/images/obatnyamuk.png') },
 18: { name: 'Tepung Terigu', qty: 5, image: require('@/assets/images/tepungterigu.png') },
 19: { name: 'Parfum', qty: 5, image: require('@/assets/images/parfum.png') },
 20: { name: 'Sapu', qty: 5, image: require('@/assets/images/sapu.png') },
};

export default function EditBarang() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const numericId = id ? parseInt(id.toString(), 10) : NaN;
  const item = dummyInventory[numericId];

if (!item) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barang tidak ditemukan</Text>
      <TouchableOpacity onPress={() => router.replace('/inventory')}>
        <Text style={styles.cancelText}>Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}

  const [newQty, setNewQty] = useState(String(item?.qty || ''));

  const handleSave = () => {
    alert(`Jumlah barang "${item?.name}" diubah jadi ${newQty}`);
    router.replace('/inventory');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Jumlah Barang</Text>
      <Image source={item?.image} style={styles.image} />
      <Text style={styles.label}>{item?.name}</Text>

      <Text style={styles.inputLabel}>Jumlah Baru</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={newQty}
        onChangeText={setNewQty}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Simpan</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.cancelText}>Batal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  image: { width: 100, height: 100, alignSelf: 'center', marginBottom: 10 },
  label: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  inputLabel: { fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#0033FF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: 'bold' },
  cancelText: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
    textDecorationLine: 'underline',
  },
});