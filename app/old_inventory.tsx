import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const router = useRouter();
const inventoryData = [
  { id: 1, name: 'Beras', qty: 10, image: require('@/assets/images/beras.png') },
  { id: 2, name: 'Minyak', qty: 8, image: require('@/assets/images/minyak.png') },
  { id: 3, name: 'Teh', qty: 5, image: require('@/assets/images/teh.png') },
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

export default function InventoryScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/inventory-hero.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Inventory{'\n'}<Text style={styles.bold}>StockFlow</Text></Text>
      </View>

      {/* Tombol-tombol */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button}onPress={() => router.push('/add')}><Text style={styles.buttonText}>Tambah</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}onPress={() => router.push('/delete')}><Text style={styles.buttonText}>Hapus</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}onPress={() => router.push('/history')}><Text style={styles.buttonText}>Histori</Text></TouchableOpacity>
      </View>

      {/* Search bar */}
      <TextInput style={styles.searchBar} placeholder="Cari Barang" placeholderTextColor="#777" />

      {/* Scrollable list */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tableHeader}>
  <View style={styles.itemInfo}>
    <Text style={styles.tableHeaderText}>Nama Barang</Text>
  </View>
  <View style={styles.qtyContainer}>
    <Text style={styles.tableHeaderText}>Jumlah</Text>
  </View>
  <View style={styles.editContainer}>
    <Text style={styles.tableHeaderText}>Ubah</Text>
  </View>
</View>

        {inventoryData.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
            
            <View style={styles.qtyContainer}>
               <Text style={styles.qty}>{item.qty}</Text> 
            </View>

            <TouchableOpacity
             style={styles.editContainer}
             onPress={() => router.push(`/edit/${item.id}`)}
             >
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  headerImage: { width: 100, height: 100 },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#000', marginLeft: 10 },
  bold: { fontWeight: 'bold', color: '#0033FF' },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  button: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  
  buttonText: { color: '#333', fontWeight: '600' },

  searchBar: {
    backgroundColor: '#EEE',
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 40,
    marginBottom: 10,
    color: '#000',
  },

  scrollContainer: { paddingBottom: 50 },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#B4B4FF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeaderText: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B4B4FF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
},

  itemRow: {
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

qtyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

qty: {
  fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier',
  fontWeight: 'bold',
  fontSize: 14,
  color: '#000',
  textAlign: 'center',
  lineHeight: 20, // optional untuk kestabilan vertikal
},

editContainer: {
  flex: 0.5,
  alignItems: 'center',
},

  editIcon: { 
    fontSize: 16 },

});
