import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import { PassportScreen } from './src/screens/PassportScreen';
import { CircleScreen } from './src/screens/CircleScreen';
import { ShopScreen } from './src/screens/ShopScreen';
import TrainScreen from './src/screens/TrainScreen';

type TabType = 'train' | 'passport' | 'circle' | 'shop';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('train');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#09090b" />

      {/* SCREEN CONTENT */}
      <View style={styles.contentContainer}>
        {currentTab === 'train' && <TrainScreen />}
        {currentTab === 'passport' && <PassportScreen />}
        {currentTab === 'circle' && <CircleScreen />}
        {currentTab === 'shop' && <ShopScreen />}
      </View>

      {/* BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, currentTab === 'train' && styles.tabItemActive]}
          onPress={() => setCurrentTab('train')}
        >
          <Text style={styles.tabIcon}>🏋️</Text>
          <Text style={[styles.tabLabel, currentTab === 'train' && styles.tabLabelActive]}>Entrenar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, currentTab === 'passport' && styles.tabItemActive]}
          onPress={() => setCurrentTab('passport')}
        >
          <Text style={styles.tabIcon}>📊</Text>
          <Text style={[styles.tabLabel, currentTab === 'passport' && styles.tabLabelActive]}>Pasaporte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, currentTab === 'circle' && styles.tabItemActive]}
          onPress={() => setCurrentTab('circle')}
        >
          <Text style={styles.tabIcon}>🛡️</Text>
          <Text style={[styles.tabLabel, currentTab === 'circle' && styles.tabLabelActive]}>Círculo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, currentTab === 'shop' && styles.tabItemActive]}
          onPress={() => setCurrentTab('shop')}
        >
          <Text style={styles.tabIcon}>🏬</Text>
          <Text style={[styles.tabLabel, currentTab === 'shop' && styles.tabLabelActive]}>Tienda</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  contentContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#18181b',
    borderTopWidth: 1,
    borderTopColor: '#27272a',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabItemActive: {
    backgroundColor: '#27272a',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    color: '#71717a',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#38bdf8',
  },
});
