import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';
import { OptionCard } from './OptionCard';

interface OptionGroupProps {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

export const OptionGroup: React.FC<OptionGroupProps> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <OptionCard
          key={index}
          label={option}
          selected={selected === option}
          onPress={() => onSelect(option)}
          style={styles.optionCard}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  optionCard: {
    marginBottom: theme.spacing.md,
  },
}); 