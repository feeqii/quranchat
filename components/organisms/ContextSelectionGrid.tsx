import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SelectableContextChip } from '../atoms/SelectableContextChip';
import { theme } from '../../constants/theme';

interface ContextOption {
  id: string;
  label: string;
  icon: string;
}

interface ContextSelectionGridProps {
  selectedContexts: string[];
  onContextToggle: (contextId: string) => void;
}

const CONTEXT_OPTIONS: ContextOption[] = [
  { id: 'work', label: 'Work', icon: '💼' },
  { id: 'school', label: 'School', icon: '📚' },
  { id: 'career', label: 'Career', icon: '📈' },
  { id: 'exercise', label: 'Exercise', icon: '🏃‍♂️' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'love', label: 'Love', icon: '❤️' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'hobbies', label: 'Hobbies', icon: '🎨' },
  { id: 'friends', label: 'Friends', icon: '👥' },
  { id: 'socialmedia', label: 'Social Media', icon: '💬' },
  { id: 'food', label: 'Food', icon: '🍽️' },
  { id: 'weather', label: 'Weather', icon: '🌤️' },
];

export const ContextSelectionGrid: React.FC<ContextSelectionGridProps> = ({
  selectedContexts,
  onContextToggle,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const containerPadding = theme.spacing.lg * 2; // Left + right padding
  const gridGap = theme.spacing.md;
  const numColumns = 3;
  
  // Calculate chip width to fit 3 columns with proper spacing
  const availableWidth = screenWidth - containerPadding - (gridGap * (numColumns - 1));
  const chipWidth = availableWidth / numColumns;

  const renderContextChip = (context: ContextOption, index: number) => {
    const isSelected = selectedContexts.includes(context.id);
    
    return (
      <View
        key={context.id}
        style={[
          styles.chipWrapper,
          { width: chipWidth },
          // Add margin for spacing between items
          (index + 1) % numColumns !== 0 && { marginRight: gridGap },
          index >= numColumns && { marginTop: gridGap },
        ]}
      >
        <SelectableContextChip
          label={context.label}
          icon={context.icon}
          isSelected={isSelected}
          onPress={() => onContextToggle(context.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {CONTEXT_OPTIONS.map((context, index) => renderContextChip(context, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  chipWrapper: {
    // Width is set dynamically based on screen size
  },
}); 