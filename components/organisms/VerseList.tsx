import React from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { SurahVerse } from '../molecules/SurahVerse';
import { Spacer } from '../atoms/Spacer';
import { theme } from '../../constants/theme';
import { HighlightColor } from '../../store/useQuranStore';

interface Verse {
  numberInSurah: number;
  text: string;
}

interface VerseListProps {
  verses: Verse[];
  selectedVerses?: Set<number>;
  highlights?: Record<string, { color: HighlightColor }>;
  surahNumber: number;
  onVersePress?: (verseNumber: number) => void;
  isSelectable?: boolean;
}

export const VerseList: React.FC<VerseListProps> = ({
  verses,
  selectedVerses = new Set(),
  highlights = {},
  surahNumber,
  onVersePress,
  isSelectable = false,
}) => {
  const getVerseKey = (surahNum: number, verseNum: number) => `${surahNum}:${verseNum}`;
  
  const renderVerse: ListRenderItem<Verse> = ({ item }) => {
    const verseKey = getVerseKey(surahNumber, item.numberInSurah);
    const highlight = highlights[verseKey];
    
    return (
      <SurahVerse
        verseNumber={item.numberInSurah}
        verseText={item.text}
        isSelected={isSelectable && selectedVerses.has(item.numberInSurah)}
        highlightColor={highlight?.color || null}
        onPress={isSelectable && onVersePress ? () => onVersePress(item.numberInSurah) : undefined}
      />
    );
  };

  const renderFooter = () => (
    <>
      <Spacer size="xl" />
      <Spacer size="xl" />
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={verses}
        renderItem={renderVerse}
        keyExtractor={(item) => item.numberInSurah.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={renderFooter}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
    paddingTop: 8,
  },
}); 