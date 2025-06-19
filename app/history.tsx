import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useInventory } from './context/InventoryContext';

export default function HistoryScreen() {
  const router = useRouter();
  const { history } = useInventory(); // ambil dari context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Riwayat Aktivitas</Text>

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>No</Text>
        <Text style={styles.tableHeaderText}>Keterangan</Text>
      </View>

      {history.length === 0 ? (
        <Text style={styles.empty}>Belum ada riwayat.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text>{index + 1}</Text>
              <Text>{item}</Text>
            </View>
          )}
        />
      )}

      {/* Tombol kembali biru di bawah */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Kembali 🔙</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#B4B4FF',
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F3F3F3',
    marginVertical: 4,
    borderRadius: 8,
  },
  empty: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#0033FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
