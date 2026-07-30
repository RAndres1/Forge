import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';

interface Message {
  sender: 'user' | 'coach';
  text: string;
  isWarning?: boolean;
}

export function AICoachWidget() {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'coach',
      text: '🤖 Hola Atleta. Soy tu AI Coach de Forge. ¿Tienes alguna duda sobre tus pesos hoy o quieres una recomendación de progresión?',
    },
  ]);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText.trim();
    setInputText('');

    const newMessages: Message[] = [...messages, { sender: 'user', text: userMsg }];
    setMessages(newMessages);

    // Evaluate Guardrails locally or via API
    const lower = userMsg.toLowerCase();
    if (lower.includes('dolor') || lower.includes('hombro') || lower.includes('punzada') || lower.includes('lesion')) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'coach',
          text: '⚠️ He detectado que mencionas molestias o dolor físico en esa zona. Por tu seguridad, detén el ejercicio y consulta a un profesional médico antes de continuar levantando peso.',
          isWarning: true,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'coach',
          text: '¡Excelente! Basado en tu RPE promedio de la semana pasada (7.5), hoy estás en condiciones ideales para realizar 8 reps con 72.5 kg en banca. Mantén una técnica controlada.',
        },
      ]);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <TouchableOpacity style={styles.floatingBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.floatingBtnText}>🤖 COACH IA</Text>
      </TouchableOpacity>

      {/* CHAT MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.title}>🤖 FORGE AI COACH</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* MESSAGES SCROLL */}
            <ScrollView style={styles.messagesList}>
              {messages.map((m, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.msgBubble,
                    m.sender === 'user' ? styles.userBubble : styles.coachBubble,
                    m.isWarning && styles.warningBubble,
                  ]}
                >
                  <Text style={[styles.msgText, m.sender === 'user' && styles.userMsgText]}>
                    {m.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* INPUT AREA */}
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                placeholder="Pregunta a tu coach sobre tus cargas..."
                placeholderTextColor="#71717a"
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                <Text style={styles.sendBtnText}>Enviar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#18181b',
    height: '75%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  title: {
    color: '#60a5fa',
    fontWeight: '800',
    fontSize: 16,
  },
  closeText: {
    color: '#a1a1aa',
    fontSize: 20,
    fontWeight: '700',
  },
  messagesList: {
    flex: 1,
    marginVertical: 12,
  },
  msgBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '85%',
  },
  coachBubble: {
    backgroundColor: '#27272a',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#3b82f6',
    alignSelf: 'flex-end',
  },
  warningBubble: {
    backgroundColor: '#7f1d1d',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  msgText: {
    color: '#f4f4f5',
    fontSize: 14,
    lineHeight: 20,
  },
  userMsgText: {
    color: '#ffffff',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#27272a',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#09090b',
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#27272a',
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendBtnText: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 14,
  },
});
