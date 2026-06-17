// src/screens/content/ContentScreen.tsx
import React, { useState, useCallback } from 'react'; 
import {
  View, Text, Image, Pressable,
  StatusBar, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../config/theme';
import { AppNavigationProp } from '../../../types/navigation';
import { tabStyles, cardStyles, emptyStyles, mainStyles } from './styles';

type Props = { navigation: AppNavigationProp<'Content'> };

type FilterKey = 'all' | 'instagram' | 'youtube' | 'facebook' | 'twitter';

const FILTER_TABS: { key: FilterKey; icon?: any; label?: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'instagram', icon: require('../../../assets/images/Instagram.png') },
  { key: 'youtube',   icon: require('../../../assets/images/youtube.png') },
  { key: 'facebook',  icon: require('../../../assets/images/facebook.png') },
  { key: 'twitter',   icon: require('../../../assets/images/Twitter.png') },
];

const FilterTab = ({
  label, active, onPress, icon,
}: { label?: string; active: boolean; onPress: () => void; icon?: any }) => (
  <Pressable
    onPress={onPress}
    style={[tabStyles.tab, active && tabStyles.activeTab]}
  >
    {icon ? (
      <Image source={icon} style={tabStyles.tabIcon} resizeMode="contain" />
    ) : (
      <Text style={[tabStyles.tabLabel, active && tabStyles.activeLabel]}>{label}</Text>
    )}
  </Pressable>
);

type ContentItem = {
  id: string;
  platform: FilterKey;
  platformIcon: any;
  color: string;
  contentUrl?: string;
};

const ContentCard = ({
  item,
  onEdit,
  onDelete,
}: {
  item: ContentItem;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <View style={cardStyles.card}>
    <View style={cardStyles.thumbnail}>
      <Text style={cardStyles.thumbnailText}>🎬</Text>
      <Pressable style={cardStyles.deleteBtn} onPress={onDelete}>
        <Text style={cardStyles.deleteBtnText}>✕</Text>
      </Pressable>
    </View>
    <View style={[cardStyles.footer, { borderTopColor: item.color + '55' }]}>
      <Image source={item.platformIcon} style={cardStyles.footerIcon} resizeMode="contain" />
      <Pressable style={[cardStyles.viewBtn, { borderColor: item.color }]} onPress={onEdit}>
        <Text style={[cardStyles.viewBtnText, { color: item.color }]}>EDIT</Text>
      </Pressable>
    </View>
  </View>
);

const EmptyState = ({ onAdd }: { onAdd: () => void }) => (
  <View style={emptyStyles.container}>
    <Text style={emptyStyles.icon}>🎬</Text>
    <Text style={emptyStyles.title}>No content yet</Text>
    <Text style={emptyStyles.subtitle}>
      Add your first piece of content to show brands what you can create.
    </Text>
    <Pressable style={emptyStyles.addBtn} onPress={onAdd}>
      <Text style={emptyStyles.addBtnText}>+ Add Content</Text>
    </Pressable>
  </View>
);

const ContentScreen = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [content] = useState<ContentItem[]>([]);

  const filtered = activeFilter === 'all'
    ? content
    : content.filter(item => item.platform === activeFilter);

  const isEmpty = filtered.length === 0;

  const renderContentItem = useCallback(({ item }: { item: ContentItem }) => (
    <ContentCard
      item={item}
      onEdit={() => navigation.navigate('EditContent', { contentId: item.id })}
      onDelete={() => {}}
    />
  ), [navigation]);

  const handleFilterPress = useCallback((key: FilterKey) => {
    setActiveFilter(key);
  }, []);

  const renderFilterTabItem = useCallback(({ item }: { item: typeof FILTER_TABS[0] }) => (
    <FilterTab
      label={item.label}
      icon={item.icon}
      active={activeFilter === item.key}
      onPress={() => handleFilterPress(item.key)}
    />
  ), [activeFilter, handleFilterPress]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      <LinearGradient
        colors={[Colors.teal, Colors.lime]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={mainStyles.header}
      >
        <SafeAreaView edges={['top']} style={mainStyles.headerInner}>
          <Pressable onPress={() => navigation.goBack()} style={mainStyles.backBtn}>
            <Text style={mainStyles.backBtnText}>←</Text>
          </Pressable>
          <Text style={mainStyles.headerTitle}>Content</Text>
          <Pressable
            style={mainStyles.headerAddBtn}
            onPress={() => navigation.navigate('AddContent')}
          >
            <Text style={mainStyles.headerAddBtnText}>+ Add</Text>
          </Pressable>
        </SafeAreaView>
      </LinearGradient>

      <View style={mainStyles.body}>
        <View style={mainStyles.filterContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={mainStyles.filterStrip}
            data={FILTER_TABS}
            keyExtractor={(item) => item.key}
            renderItem={renderFilterTabItem}
          />
        </View>

        {isEmpty ? (
          <EmptyState onAdd={() => navigation.navigate('AddContent')} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={mainStyles.grid}
            data={filtered}
            keyExtractor={item => item.id}
            renderItem={renderContentItem}
          />
        )}
      </View>
    </>
  );
};

export default ContentScreen;