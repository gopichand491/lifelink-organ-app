import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { borderRadius, shadows } from '../../constants/theme';

export type IconVariant = 'soft' | 'solid' | 'ring';
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

interface CategoryIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  size?: IconSize;
  variant?: IconVariant;
  style?: ViewStyle;
}

const SIZE_MAP = {
  sm: { box: 44, icon: 22, radius: 12 },
  md: { box: 52, icon: 26, radius: 14 },
  lg: { box: 60, icon: 30, radius: 16 },
  xl: { box: 88, icon: 44, radius: 44 },
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  color,
  size = 'md',
  variant = 'soft',
  style,
}) => {
  const dims = SIZE_MAP[size];

  const containerStyle: ViewStyle = {
    width: dims.box,
    height: dims.box,
    borderRadius: dims.radius,
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (variant === 'solid') {
    Object.assign(containerStyle, { backgroundColor: color });
  } else if (variant === 'ring') {
    Object.assign(containerStyle, {
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: `${color}30`,
    });
  } else {
    Object.assign(containerStyle, { backgroundColor: `${color}14` });
  }

  return (
    <View style={[containerStyle, variant === 'ring' && shadows.card, style]}>
      <MaterialCommunityIcons
        name={name}
        size={dims.icon}
        color={variant === 'solid' ? '#FFFFFF' : color}
      />
    </View>
  );
};
