import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SHOP_ITEMS_CATALOG } from '@forge/domain';

export function ShopScreen() {
  const userOre = 1250;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏬 TIENDA FORGE</Text>
        <Text style={styles.subtitle}>SALDO: 🪙 {userOre} FORGE ORE</Text>
      </View>

      <View style={styles.catalogGrid}>
        {SHOP_ITEMS_CATALOG.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>🪙 {item.priceOre} Ore</Text>
              <TouchableOpacity
                style={[
                  styles.buyBtn,
                  userOre < item.priceOre && styles.disabledBtn,
                ]}
              >
                <Text style={styles.buyText}>
                  {userOre >= item.priceOre ? 'CANJEAR' : 'BLOQUEADO'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#f4f4f5',
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: '#facc15',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 4,
  },
  catalogGrid: {
    gap: 16,
  },
  itemCard: {
    backgroundColor: '#18181b',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  itemName: {
    color: '#f4f4f5',
    fontSize: 16,
    fontWeight: '800',
  },
  itemDesc: {
    color: '#a1a1aa',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },
  priceText: {
    color: '#facc15',
    fontSize: 14,
    fontWeight: '800',
  },
  buyBtn: {
    backgroundColor: '#eab308',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledBtn: {
    backgroundColor: '#27272a',
  },
  buyText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '800',
  },
});
