import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  SectionList,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Typography } from '../../components/atoms/Typography';
import { Icon } from '../../components/atoms/Icon';
import { theme } from '../../constants/theme';
import { useQuranStore } from '../../store/useQuranStore';
import { translations } from '../../lib/api/quranApi';

interface Translation {
  key: string;
  name: string;
}

interface TranslationSection {
  title: string;
  data: Translation[];
}

type TranslationSelectionModalNavigationProp = NativeStackNavigationProp<any, 'TranslationSelectionModal'>;

export const TranslationSelectionModal: React.FC = () => {
  const navigation = useNavigation<TranslationSelectionModalNavigationProp>();
  const { currentTranslation, setTranslation } = useQuranStore();

  const translationSections: TranslationSection[] = [
    {
      title: 'Arabic Editions',
      data: [
        { key: 'quran-uthmani', name: 'القرآن الكريم - النص العثماني' },
        { key: 'quran-simple', name: 'القرآن الكريم - النص المبسط' },
        { key: 'quran-simple-enhanced', name: 'القرآن الكريم - النص المبسط المحسن' },
        { key: 'quran-tajweed', name: 'القرآن الكريم - مع التجويد' },
      ],
    },
    {
      title: 'English Translations',
      data: [
        { key: 'en.sahih', name: 'Sahih International' },
        { key: 'en.pickthall', name: 'Pickthall' },
        { key: 'en.yusufali', name: 'Yusuf Ali' },
        { key: 'en.shakir', name: 'Shakir' },
        { key: 'en.mohsin', name: 'Mohsin Khan' },
        { key: 'en.hilali', name: 'Hilali & Khan' },
        { key: 'en.maududi', name: 'Maududi' },
        { key: 'en.arberry', name: 'Arberry' },
        { key: 'en.asad', name: 'Muhammad Asad' },
        { key: 'en.daryabadi', name: 'Daryabadi' },
        { key: 'en.qaribullah', name: 'Qaribullah & Darwish' },
      ],
    },
  ];

  const handleTranslationSelect = (translation: Translation) => {
    // Step 1: Close modal first
    navigation.goBack();
    
    // Step 2: Update translation after modal closes
    setTimeout(() => {
      setTranslation(translation.key);
    }, 100);
  };

  const renderSectionHeader = ({ section }: { section: TranslationSection }) => (
    <View style={styles.sectionHeader}>
      <Typography variant="subtitle" style={styles.sectionTitle}>
        {section.title}
      </Typography>
    </View>
  );

  const handleClose = () => {
    navigation.goBack();
  };

  const renderDragHandle = () => (
    <View style={styles.dragHandle}>
      <View style={styles.dragIndicator} />
    </View>
  );

  const renderTranslationItem: ListRenderItem<Translation> = ({ item }) => {
    const isSelected = item.key === currentTranslation;
    
    return (
      <TouchableOpacity
        style={[
          styles.translationItem,
          isSelected && styles.translationItemSelected,
        ]}
        onPress={() => handleTranslationSelect(item)}
      >
        <Typography
          variant="body"
          color={isSelected ? theme.colors.surface : theme.colors.textPrimary}
        >
          {item.name}
        </Typography>
        {isSelected && (
          <Icon.Check size={20} color={theme.colors.surface} />
        )}
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Icon.Close size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      
      <Typography variant="h2" color={theme.colors.textPrimary}>
        Select Translation
      </Typography>
      
      <View style={styles.headerSpacer} />
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={handleClose}
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        {renderDragHandle()}
        {renderHeader()}
        <SectionList
          sections={translationSections}
          renderItem={renderTranslationItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  listContent: {
    paddingVertical: theme.spacing.md,
  },
  translationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    borderRadius: theme.radii.md,
  },
  translationItemSelected: {
    backgroundColor: theme.colors.primary,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: theme.colors.textMuted,
    borderRadius: 2,
  },
  sectionHeader: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    color: theme.colors.textMuted,
    fontWeight: '600',
  },
}); 