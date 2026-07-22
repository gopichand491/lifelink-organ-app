import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, UserRole } from '../../types';
import { Header, Button, ScreenContainer, Card } from '../../components/ui';
import { ROLES } from '../../constants/app';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RoleSelection'>;
};

export const RoleSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { setRole, updateUser } = useAuth();
  const [selected, setSelected] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);
    await setRole(selected);
    await updateUser({ role: selected });
    setLoading(false);
    navigation.replace('Main');
  };

  return (
    <View style={styles.flex}>
      <Header title="Select Your Role" subtitle="Choose how you'll use LifeLink" />
      <ScreenContainer scroll padding>
        <Text style={styles.intro}>
          Select the role that best describes you. You can update this later in settings.
        </Text>

        {ROLES.map((item) => (
          <TouchableOpacity key={item.role} onPress={() => setSelected(item.role)} activeOpacity={0.8}>
            <Card style={selected === item.role ? [styles.roleCard, styles.roleCardSelected] : styles.roleCard}>
              <View style={[styles.roleIcon, selected === item.role && styles.roleIconSelected]}>
                <MaterialCommunityIcons
                  name={item.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                  size={28}
                  color={selected === item.role ? colors.accent : colors.secondary}
                />
              </View>
              <View style={styles.roleInfo}>
                <Text style={styles.roleTitle}>{item.title}</Text>
                <Text style={styles.roleDesc}>{item.description}</Text>
              </View>
              {selected === item.role && (
                <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} />
              )}
            </Card>
          </TouchableOpacity>
        ))}

        <Button
          title="Continue"
          onPress={handleContinue}
          loading={loading}
          disabled={!selected}
          style={styles.btn}
        />
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  intro: { ...typography.bodySmall, marginBottom: spacing.lg },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleCardSelected: { borderColor: colors.primary },
  roleIcon: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    backgroundColor: `${colors.secondary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  roleIconSelected: { backgroundColor: colors.primary },
  roleInfo: { flex: 1 },
  roleTitle: { ...typography.h3, marginBottom: 2 },
  roleDesc: { ...typography.caption },
  btn: { marginTop: spacing.lg },
});
