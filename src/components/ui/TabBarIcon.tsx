import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

interface TabBarIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  focused: boolean;
  color: string;
  size?: number;
  highlightColor?: string;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  name,
  focused,
  color,
  size = 24,
  highlightColor = colors.primary,
}) => (
  <View style={[styles.wrap, focused && { backgroundColor: `${highlightColor}18` }]}>
    <MaterialCommunityIcons
      name={name}
      size={focused ? size + 2 : size}
      color={focused ? highlightColor : color}
    />
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    width: 48,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
