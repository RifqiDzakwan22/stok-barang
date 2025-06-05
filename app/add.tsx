import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddBarang() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const imageMap = {
  'beras': require('@/assets/images/beras.png'),
  'minyak': require('@/assets/images/minyak.png'),
  'teh': require('@/assets/images/teh.png'),
  'pasta gigi': require('@/assets/images/obatnyamuk.png'),
  'gula': require('@/assets/images/gula.png'),
  'garam': require('@/assets/images/garam.png'),
  'sabun mandi': require('@/assets/images/sabunmandi.png'),
  'sabun cuci piring': require('@/assets/images/sabuncucipring.png'),
  'sabun lantai': require('@/assets/images/sabunlantai.png'),
  'mie kuah': require('@/assets/images/miekuah.png'),
  'coklat messes': require('@/assets/images/coklatmesses.png'),
  'coklat batang': require('@/assets/images/coklatbatang.png'),
  'keju': require('@/assets/images/keju.png'),
  'mie goreng': require('@/assets/images/miegoreng.png'),
  'makaroni': require('@/assets/images/makaroni.png'),
  'pulpen': require('@/assets/images/pulpen.png'),
  'buku tulis': require('@/assets/images/bukutulis.png'),
  'obat nyamuk': require('@/assets/images/obatnyamuk.png'),
  'tepung terigu': require('@/assets/images/tepungterigu.png'),
  'parfum': require('@/assets/images/parfum.png'),
  'sapu': require('@/assets/images/sapu.png'),
  
};

const defaultImage = require('@/assets/images/beras.png');
const image = imageMap[name.toLowerCase()] || defaultImage;

  const handleSave = () => {
    if (!name || !qty) {
      Alert.alert('Isi semua data!');
      return;
    }

    Alert.alert('Berhasil', `Barang "${name}" (${qty}) berhasil ditambahkan!`);
    router.replace('/inventory');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Barang Baru</Text>

      <Image source={image} style={styles.image} />

      <Text style={styles.label}>Nama Barang</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Pasta Gigi"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Jumlah</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: 10"
        keyboardType="numeric"
        value={qty}
        onChangeText={setQty}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/inventory')}>
        <Text style={styles.cancel}>Batal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0033FF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  cancel: {
    marginTop: 16,
    textAlign: 'center',
    color: '#666',
    textDecorationLine: 'underline',
  },
  image: { width: 80, height: 80, alignSelf: 'center', marginBottom: 20 },
});
