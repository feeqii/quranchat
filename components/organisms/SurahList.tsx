import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { SurahListItem } from '../atoms/SurahListItem';
import { SurahSearchBar } from '../molecules/SurahSearchBar';
import { Typography } from '../atoms/Typography';
import { theme } from '../../constants/theme';
import { surahList, Surah } from '../../constants/surahList';

interface SurahListProps {
  selectedSurahNumber: number | null;
  onSurahSelect: (surah: Surah) => void;
}

export const SurahList: React.FC<SurahListProps> = ({
  selectedSurahNumber,
  onSurahSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSurahs = useMemo(() => {
    if (searchQuery.trim() === '') {
      return surahList;
    }
    
    const query = searchQuery.toLowerCase();
    return surahList.filter(surah =>
      surah.name.toLowerCase().includes(query) ||
      surah.arabicName.includes(searchQuery) ||
      surah.number.toString().includes(query)
    );
  }, [searchQuery]);

  const renderSurahItem: ListRenderItem<Surah> = ({ item }) => (
    <SurahListItem
      number={item.number}
      name={item.name}
      arabicName={item.arabicName}
      verseCount={item.ayahs}
      revelationType={item.revelationType}
      isSelected={item.number === selectedSurahNumber}
      onPress={() => onSurahSelect(item)}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <SurahSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.countContainer}>
        <Typography variant="small" color={theme.colors.textSecondary}>
          {filteredSurahs.length} of {surahList.length} surahs
        </Typography>
      </View>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSurahs}
        renderItem={renderSurahItem}
        keyExtractor={(item) => item.number.toString()}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    backgroundColor: theme.colors.surface,
  },
  countContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.primarySoft,
    marginStart: theme.spacing.md + 32 + theme.spacing.md, // Align with text content
  },
}); 