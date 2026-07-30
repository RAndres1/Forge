import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { calculateBarbellPlates } from '@forge/domain';

interface Props {
  visible: boolean;
  targetWeightKg: number;
  onClose: () => void;
}

export function PlateCalculatorModal({ visible, targetWeightKg, onClose }: Props) {
  const result = calculateBarbellPlates(targetWeightKg, 20);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <View style={styles.header}>
            <Text style={styles.title}>🏋️ CALCULADORA DE DISCOS</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.targetCard}>
            <Text style={styles.targetLabel}>PESO OBJETIVO TOTAL</Text>
            <Text style={styles.targetVal}>{targetWeightKg} kg</Text>
            <Text style={styles.barInfo}>Barra Olímpica (20 kg) + {result.weightPerSideKg} kg por lado</Text>
          </View>

          {/* VISUAL BARBELL REPRESENTATION */}
          <Text style={styles.sectionHeader}>CARGAR EN CADA LADO DE LA BARRA:</Text>

          <View style={styles.platesContainer}>
            {result.platesPerSide.length === 0 ? (
              <Text style={styles.emptyText}>Solo la barra olímpica (sin discos adicional)</Text>
            ) : (
              result.platesPerSide.map((p, idx) => (
                <View key={idx} style={[styles.plateChip, { borderColor: p.colorHex }]}>
                  <View style={[styles.plateDot, { backgroundColor: p.colorHex }]} />
                  <Text style={styles.plateText}>
                    {p.countPerSide}x Disco de {p.weightKg} kg
                  </Text>
                </View>
              ))
            )}
          </View>

          <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
            <Text style={styles.doneText}>¡LISTO PARA LEVANTAR! 💪</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#18181b',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#60a5fa',
    fontWeight: '900',
    fontSize: 16,
  },
  closeBtn: {
    color: '#a1a1aa',
    fontSize: 20,
    fontWeight: '700',
  },
  targetCard: {
    backgroundColor: '#09090b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
    marginBottom: 20,
  },
  targetLabel: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '800',
  },
  targetVal: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 4,
  },
  barInfo: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionHeader: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 12,
  },
  platesContainer: {
    gap: 10,
    marginBottom: 24,
  },
  emptyText: {
    color: '#a1a1aa',
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 12,
  },
  plateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27272a',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 6,
  },
  plateDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  plateText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  doneBtn: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  doneText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: 15,
  },
});
