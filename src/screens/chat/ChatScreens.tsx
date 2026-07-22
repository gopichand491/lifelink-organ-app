import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Header, EmptyState } from '../../components/ui';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { SAMPLE_CHATS, SAMPLE_MESSAGES } from '../../data/sampleData';

type ListProps = { navigation: NativeStackNavigationProp<RootStackParamList, 'ChatList'> };

export const ChatListScreen: React.FC<ListProps> = ({ navigation }) => (
  <View style={styles.flex}>
    <Header title="Messages" showBack={navigation.canGoBack()} />
    <FlatList
      data={SAMPLE_CHATS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<EmptyState title="No conversations" message="Start chatting with donors or hospitals" icon="chat-outline" />}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() => navigation.navigate('ChatConversation', { chatId: item.id, name: item.participantNames[0] })}
        >
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="account" size={28} color={colors.secondary} />
          </View>
          <View style={styles.chatInfo}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName}>{item.participantNames[0]}</Text>
              <Text style={styles.chatTime}>{new Date(item.lastMessageTime).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.chatPreview} numberOfLines={1}>{item.lastMessage}</Text>
          </View>
          {item.unreadCount > 0 && (
            <View style={styles.unread}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    />
  </View>
);

type ConvProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ChatConversation'>;
  route: RouteProp<RootStackParamList, 'ChatConversation'>;
};

export const ChatConversationScreen: React.FC<ConvProps> = ({ route }) => {
  const { chatId, name } = route.params;
  const messages = SAMPLE_MESSAGES[chatId] || [];
  const [text, setText] = useState('');
  const [localMessages, setLocalMessages] = useState(messages);

  const send = () => {
    if (!text.trim()) return;
    setLocalMessages([
      ...localMessages,
      {
        id: `m_${Date.now()}`,
        chatId,
        senderId: 'current',
        senderName: 'You',
        text: text.trim(),
        timestamp: new Date().toISOString(),
        read: true,
      },
    ]);
    setText('');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header title={name} showBack />
      <FlatList
        data={localMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messages}
        renderItem={({ item }) => {
          const isMe = item.senderId === 'current';
          return (
            <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
              <Text style={[styles.bubbleText, isMe && styles.bubbleTextMe]}>{item.text}</Text>
              <Text style={[styles.bubbleTime, isMe && styles.bubbleTimeMe]}>
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          );
        }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor={colors.textLight}
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <MaterialCommunityIcons name="send" size={22} color={colors.accent} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  chatItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.lg, marginBottom: spacing.sm },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: `${colors.secondary}15`, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md },
  chatInfo: { flex: 1 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  chatName: { ...typography.body, fontWeight: '600' },
  chatTime: { ...typography.caption },
  chatPreview: { ...typography.caption, marginTop: 4, color: colors.textSecondary },
  unread: { backgroundColor: colors.primary, borderRadius: 12, minWidth: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  unreadText: { color: colors.accent, fontSize: 12, fontWeight: '700' },
  messages: { padding: spacing.md, flexGrow: 1 },
  bubble: { maxWidth: '80%', padding: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.sm },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleOther: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderBottomLeftRadius: 4 },
  bubbleText: { ...typography.body },
  bubbleTextMe: { color: colors.accent },
  bubbleTime: { ...typography.caption, marginTop: 4, textAlign: 'right' },
  bubbleTimeMe: { color: 'rgba(255,255,255,0.7)' },
  inputRow: { flexDirection: 'row', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface, alignItems: 'flex-end', gap: spacing.sm },
  input: { flex: 1, ...typography.body, backgroundColor: colors.background, borderRadius: borderRadius.lg, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
