// src/screens/content/ContentScreen.tsx
import React, { useState } from 'react'; 
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../config/theme';
import { AppNavigationProp } from '../../types/navigation';
import { tabStyles, cardStyles, emptyStyles, mainStyles } from './styles';

type Props = { navigation: AppNavigationProp<'Content'> };

type FilterKey = 'all' | 'instagram' | 'youtube' | 'facebook' | 'twitter';

const FILTER_TABS: { key: FilterKey; icon?: any; label?: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'instagram', icon: require('../../assets/images/Instagram.png') },
  { key: 'youtube',   icon: require('../../assets/images/youtube.png') },
  { key: 'facebook',  icon: require('../../assets/images/facebook.png') },
  { key: 'twitter',   icon: require('../../assets/images/Twitter.png') },
];

const FilterTab = ({
  label, active, onPress, icon,
}: { label?: string; active: boolean; onPress: () => void; icon?: any }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[tabStyles.tab, active && tabStyles.activeTab]}
    activeOpacity={0.8}
  >
    {icon ? (
      <Image source={icon} style={tabStyles.tabIcon} resizeMode="contain" />
    ) : (
      <Text style={[tabStyles.tabLabel, active && tabStyles.activeLabel]}>{label}</Text>
    )}
  </TouchableOpacity>
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
      <TouchableOpacity style={cardStyles.deleteBtn} onPress={onDelete} activeOpacity={0.7}>
        <Text style={cardStyles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
    <View style={[cardStyles.footer, { borderTopColor: item.color + '55' }]}>
      <Image source={item.platformIcon} style={cardStyles.footerIcon} resizeMode="contain" />
      <TouchableOpacity style={[cardStyles.viewBtn, { borderColor: item.color }]} onPress={onEdit}>
        <Text style={[cardStyles.viewBtnText, { color: item.color }]}>EDIT</Text>
      </TouchableOpacity>
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
    <TouchableOpacity style={emptyStyles.addBtn} onPress={onAdd} activeOpacity={0.8}>
      <Text style={emptyStyles.addBtnText}>+ Add Content</Text>
    </TouchableOpacity>
  </View>
);

const ContentScreen = ({ navigation }: Props) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [content] = useState<ContentItem[]>([]);

  const filtered = activeFilter === 'all'
    ? content
    : content.filter(item => item.platform === activeFilter);

  const isEmpty = filtered.length === 0;

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
          <TouchableOpacity onPress={() => navigation.goBack()} style={mainStyles.backBtn}>
            <Text style={mainStyles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={mainStyles.headerTitle}>Content</Text>
          <TouchableOpacity
            style={mainStyles.headerAddBtn}
            onPress={() => navigation.navigate('AddContent')}
            activeOpacity={0.8}
          >
            <Text style={mainStyles.headerAddBtnText}>+ Add</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>

      <View style={mainStyles.body}>
        <View style={mainStyles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={mainStyles.filterStrip}
          >
            {FILTER_TABS.map(tab => (
              <FilterTab
                key={tab.key}
                label={tab.label}
                icon={tab.icon}
                active={activeFilter === tab.key}
                onPress={() => setActiveFilter(tab.key)}
              />
            ))}
          </ScrollView>
        </View>

        {isEmpty ? (
          <EmptyState onAdd={() => navigation.navigate('AddContent')} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={mainStyles.grid}>
            <View style={mainStyles.gridRow}>
              {filtered.map(item => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onEdit={() => navigation.navigate('EditContent', { contentId: item.id })}
                  onDelete={() => {}}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default ContentScreen;