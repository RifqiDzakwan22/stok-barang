import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useInventory } from './context/InventoryContext';

const imageMap: Record<string, any> = {
  'beras': require('@/assets/images/beras.png'),
  'minyak': require('@/assets/images/minyak.png'),
  'teh': require('@/assets/images/teh.png'),
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

export default function InventoryScreen() {
  const router = useRouter();
  const { items, editItem, deleteItem } = useInventory();
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editQty, setEditQty] = React.useState('');
  const [previewName, setPreviewName] = React.useState('');

  const handleEdit = (id: number) => {
    if (!editQty) return;
    editItem(id, parseInt(editQty));
    setEditingId(null);
    setEditQty('');
  };

  const handleDelete = (id: number) => {
    Alert.alert('Konfirmasi', 'Yakin ingin menghapus barang ini?', [
      { text: 'Batal' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: () => deleteItem(id),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📦Stok Barang</Text>

      <Image
        source={require('@/assets/images/inventory-hero.png')}
        style={styles.heroImage}
        resizeMode="contain"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/add')}
        >
          <Text style={styles.buttonText}>➕ Tambahkan Barang</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/history')}
        >
          <Text style={styles.buttonText}>📄 Lihat Riwayat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <View style={styles.itemInfo}><Text style={styles.headerText}>Nama Barang</Text></View>
        <View style={styles.qtyCol}><Text style={styles.headerText}>Jumlah</Text></View>
        <View style={styles.editCol}><Text style={styles.headerText}>Ubah</Text></View>
        <View style={styles.deleteCol}><Text style={styles.headerText}>Hapus</Text></View>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.itemInfo}>
              <Image
                source={imageMap[item.name.toLowerCase()] || require('@/assets/images/beras.png')}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>

            <View style={styles.qtyCol}>
              {editingId === item.id ? (
                <TextInput
                  style={styles.inputEdit}
                  value={editQty}
                  onChangeText={setEditQty}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.qty}>{item.qty}</Text>
              )}
            </View>

            <View style={styles.editCol}>
              {editingId === item.id ? (
                <TouchableOpacity onPress={() => handleEdit(item.id)}>
                  <Text style={styles.editIcon}>💾</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => {
                  setEditingId(item.id);
                  setEditQty(item.qty.toString());
                }}>
                  <Text style={styles.editIcon}>✏️</Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.deleteCol}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteIcon}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  heroImage: { width: 400, height: 200, alignSelf: 'center', marginBottom: 10 },
  previewImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#0033FF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#B4B4FF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 6,
  },
  headerText: { fontWeight: 'bold', color: '#000' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 6,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#000',
  },
  qtyCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qty: {
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  editCol: {
    flex: 0.5,
    alignItems: 'center',
  },
  inputEdit: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    width: 50,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  editIcon: {
    fontSize: 16,
  },
  deleteCol: {
    flex: 0.5,
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 16,
    color: 'red',
  },
});
