import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useInventory } from './context/InventoryContext';

const imageMap = {
  beras: require('@/assets/images/beras.png'),
  minyak: require('@/assets/images/minyak.png'),
  gula: require('@/assets/images/gula.png'),
  sapu: require('@/assets/images/sapu.png'),
  teh: require('@/assets/images/teh.png'),
};

export default function AddScreen() {
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');
  const { addItem } = useInventory();
  const router = useRouter();

  const handleAdd = () => {
    if (!name || !qty) {
      Alert.alert('Harap isi nama dan jumlah barang!');
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      qty: parseInt(qty),
    };

    addItem(newItem);
    router.replace('/inventory');
  };

  const imageSource = imageMap[name.toLowerCase()] || require('@/assets/images/beras.png');

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.header}>📦 Tambah Barang</Text>

        <Image source={imageSource} style={styles.previewImage} />

        <TextInput
          style={styles.input}
          placeholder="Nama barang"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Jumlah"
          keyboardType="numeric"
          value={qty}
          onChangeText={setQty}
        />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Tambah</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/inventory')}
        >
          <Text style={styles.backText}>⬅️ Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',   // tengah vertikal
    alignItems: 'center',       // tengah horizontal
    padding: 16,
  },
  inner: {
    width: '100%',
    maxWidth: 300,              // agar rapi di tengah
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  previewImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    width: '100%',
    backgroundColor: '#0033FF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },

  backButton: {
    width: '100%',
    backgroundColor: '#0033FF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
