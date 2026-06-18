import React, { useCallback, useMemo, useState, useReducer } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from '../../../utils/scaling';
import { Colors } from '../../../config/theme';
import Typography from '../../../styles/typography';
import { CURRENCY } from '../../../config/constants';
import TextField from '../../../components/common/TextField/TextField';
import { AppStackParamList } from '../../../types/navigation';
import styles from './styles';


interface CampaignItem {
  id: string;
  companyName: string;
  duration: string;
  description: string;
  appliedCount: number;
  budgetMin: string;
  budgetMax: string;
  deadline: string;
  minFollowers: string;
  minEngagement: string;
  audienceText: string;
  categories: string[];
  deliverables: string[];
}

interface FilterDropdownProps {
  label: string;
  iconName: string;
  onPress: () => void;
  isOpen?: boolean;
}

const CATEGORY_OPTIONS: string[] = [
  'Clothing', 'Footwear', 'Accessories', 'Jewelry', 'Luxury Products',
  'Cosmetics', 'Haircare', 'Skincare', 'Fragrance', 'E-Clothing',
  'Restaurants', 'Packaged Food', 'Snacks', 'Alcoholic Drinks',
  'Non-Alcoholic Drinks', 'Healthcare', 'Supplements', 'Nutrition',
  'Gyms', 'Sportswear', 'Consumer Tech', 'Gadgets', 'Apps', 'Gaming',
  'SaaS', 'Cars', 'Bikes', 'Electric Vehicles', 'Auto Parts',
  'Ride Sharing', 'Hotels', 'Airlines', 'Tourism Boards', 'Cruises',
  'Experience Providers', 'Banks', 'Insurance', 'Fintech', 'Investments',
  'Crypto', 'Online Stores', 'Marketplaces', 'Malls', 'Discount Stores',
  'Luxury Retail', 'Luxury Goods', 'Watches', 'Premium Fashion',
  'High-end Travel', 'Art', 'Movies', 'Music', 'OTT Streaming',
  'Sports Leagues', 'Events', 'E-Learning', 'EdTech', 'Institutions',
  'Skill Platforms', 'Books', 'Furniture', 'Real Estate', 'Home Appliances',
  'Interior Decor', 'Smart Home', 'Sports Brands', 'Adventure Gear',
  'Outdoor Lifestyle', 'Athletic Wear', 'Kids Products', 'Toys',
  'Maternity', 'Baby Care', 'Maternity Services', 'NGOs', 'CSR Campaigns',
  'Environment', 'Equality', 'Community Support', 'Festivals',
  'Conferences', 'Exhibitions', 'Webinars', 'Workshops', 'Agri-tech',
  'Farming Products', 'Eco Brands', 'Sustainable Goods', 'Organic Food',
  'Mobile Networks', 'Internet Services', 'Satellite', 'Telecom Devices',
  '5G Services', 'Green Energy', 'Oil & Gas', 'Power Companies',
  'Renewable', 'Utility Providers'
];

const BUDGET_OPTIONS: string[] = [
  'Under ₱ 10,000',
  '₱ 10,000 - ₱ 25,000',
  '₱ 25,000 - ₱ 50,000',
  '₱ 50,000+'
];

const PLATFORM_OPTIONS: string[] = [
  'Instagram', 'Youtube', 'TikTok', 'Facebook', 'Twitter', 'LinkedIn',
  'Snapchat', 'Pinterest', 'Reddit', 'Telegram', 'WhatsApp', 'Discord',
  'Twitch', 'Quora', 'WeChat', 'Weibo', 'Kuaishou', 'Douyin',
  'VK (VKontakte)', 'LINE', 'Threads', 'Tumblr', 'Medium', 'BeReal', 'Lemon8'
];

const FilterDropdown = ({ label, iconName, onPress, isOpen = false }: FilterDropdownProps) => (
  <Pressable style={styles.dropdownRow} onPress={onPress}>
    <View style={styles.dropdownLeftContainer}>
      <Ionicons name={iconName} size={moderateScale(18)} color={Colors.textSecondary} style={styles.dropdownIcon} />
      <Text style={[Typography.body, styles.dropdownLabelText]}>{label}</Text>
    </View>
    <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={moderateScale(14)} color={Colors.textMuted} />
  </Pressable>
);

const campaignData: CampaignItem[] = [
  {
    id: '1',
    companyName: 'WebHelp365',
    duration: '3 Months',
    description: 'We are looking for tech-savvy influencers to explore and review our latest CMS features. Focus on functionality, UI/UX and performance.',
    appliedCount: 27,
    budgetMin: '1.5K',
    budgetMax: '4.0K',
    deadline: 'Oct 15, 2024',
    minFollowers: '50.0K',
    minEngagement: '4.2%',
    audienceText: 'Influencers should have an audience primarily composed of young professionals, tech enthusiasts',
    categories: ['Technology', 'CMS', 'Product Review', 'Software', 'WebHelp365'],
    deliverables: [
      '1x In-depth YouTube video review (min 8 mins)',
      '3x High-fidelity Instagram Stories with direct links',
      'Functionality walkthrough of WebHelp365 CMS',
      'Authentic UX feedback & product critique'
    ]
  }
];

function BrowseCampaignsHeader() {
  return (
    <View style={styles.browseCampaignsOuterBlockContainer}>
      <Text style={[Typography.displayMedium, styles.browseCampaignsTitleMainText]}>
        BROWSE <Text style={styles.browseCampaignsTitleHighlightText}>CAMPAIGNS</Text>
      </Text>
      <View style={styles.aiBadgeFloatingContainer}>
        <Ionicons name="sparkles" size={moderateScale(10)} color={Colors.teal} style={styles.aiBadgeSparkleIcon} />
        <Text style={[Typography.caption, styles.aiBadgeLabelText]}>AI Browse Campaign</Text>
      </View>
    </View>
  );
}

function FilterToggleRow({ onToggle }: { onToggle: () => void }) {
  return (
    <View style={styles.filterControlActionRow}>
      <Text style={[Typography.h2, styles.filterResultStaticLabelText]}>Filter Result</Text>
      <Pressable onPress={onToggle} style={styles.funnelTouchAreaBox}>
        <Ionicons name="funnel-outline" size={moderateScale(20)} color={Colors.textPrimary} />
      </Pressable>
    </View>
  );
}

function CampaignCard({ item, isExpanded, onViewPress, onApply }: { item: CampaignItem; isExpanded: boolean; onViewPress: () => void; onApply: () => void }) {
  return (
    <View style={styles.campaignCardWrapper}>
      <View style={styles.cardHeaderRow}>
        <View style={styles.brandContainer}>
          <Image source={require('../../../assets/images/overviewlogo.png')} style={styles.brandLogo} />
          <View style={styles.brandMeta}>
            <Text style={[Typography.h2, styles.brandNameText]}>{item.companyName}</Text>
            <View style={styles.socialPlatformRow}>
              <Image source={require('../../../assets/images/Instagram.png')} style={styles.socialIcon} />
              <Image source={require('../../../assets/images/facebook.png')} style={styles.socialIcon} />
              <Image source={require('../../../assets/images/youtube.png')} style={styles.socialIcon} />
              <Image source={require('../../../assets/images/Twitter.png')} style={styles.socialIcon} />
            </View>
          </View>
        </View>
        <Text style={[Typography.bodySmall, styles.durationText]}>{item.duration}</Text>
      </View>
      <Text style={[Typography.body, styles.descriptionText]}>{item.description}</Text>
      <View style={styles.appliedRow}>
        <View style={styles.avatarStack}>
          <View style={[styles.avatarCircle, styles.avatar1]} />
          <View style={[styles.avatarCircle, styles.avatar2]} />
          <View style={[styles.avatarCircle, styles.avatar3]} />
          <View style={[styles.avatarCircle, styles.avatarCountContainer]}>
            <Text style={styles.avatarCountText}>+24</Text>
          </View>
        </View>
        <Text style={[Typography.label, styles.appliedCounterText]}>{item.appliedCount} APPLIED</Text>
      </View>
      <View style={styles.metricsSplitRow}>
        <View style={styles.metricColumn}>
          <Text style={[Typography.label, styles.metricLabel]}>BUDGET RANGE</Text>
          <Text style={[Typography.statNumber, styles.budgetRangeValue]}>{CURRENCY}{item.budgetMin} - {CURRENCY}{item.budgetMax}</Text>
        </View>
        <View style={styles.metricColumn}>
          <Text style={[Typography.label, styles.metricLabel]}>DEADLINE</Text>
          <Text style={[Typography.body, styles.deadlineValue]}>{item.deadline}</Text>
        </View>
      </View>
      <View style={styles.requirementsContainer}>
        <View style={styles.requirementsHeaderRow}>
          <Ionicons name="shield-checkmark-outline" size={moderateScale(16)} color={Colors.textPrimary} style={styles.shieldIcon} />
          <Text style={[Typography.h3, styles.requirementsTitleText]}>Campaign Requirements</Text>
        </View>
        <View style={styles.requirementsSplitRow}>
          <View style={styles.requirementBlock}>
            <Text style={[Typography.caption, styles.requirementBlockLabel]}>MIN. FOLLOWERS</Text>
            <Text style={[Typography.statNumber, styles.requirementBlockValue]}>{item.minFollowers}</Text>
          </View>
          <View style={styles.requirementBlock}>
            <Text style={[Typography.caption, styles.requirementBlockLabel]}>MIN. ENGAGEMENT</Text>
            <Text style={[Typography.statNumber, styles.requirementBlockValue]}>{item.minEngagement}</Text>
          </View>
        </View>
      </View>
      {!isExpanded && (
        <View style={styles.cardActionAnchorRow}>
          <Pressable style={styles.alignedRightViewButtonAnchor} onPress={onViewPress}>
            <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientViewButtonContainer}>
              <Text style={[Typography.buttonSecondary, styles.viewButtonText]}>View</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )}
      {isExpanded && (
        <View style={styles.expandedContentContainer}>
          <Text style={[Typography.h3, styles.expandedSectionTitle]}>Target Audience</Text>
          <Text style={[Typography.body, styles.audienceBodyText]}>
            {item.audienceText} <Text style={styles.readMoreAccent}>read more...</Text>
          </Text>
          <Text style={[Typography.h3, styles.expandedSectionTitle]}>Campaign Categories</Text>
          <View style={styles.categoryGridContainer}>
            {item.categories.map((cat, index) => (
              <View key={cat} style={styles.categoryTagBubble}>
                <Text style={[Typography.bodySmall, styles.categoryTagText]}>{cat}</Text>
              </View>
            ))}
          </View>
          <View style={styles.deliverablesCanvasBlock}>
            <Text style={[Typography.h3, styles.deliverablesCanvasTitle]}>Deliverables</Text>
            {item.deliverables.map((del, index) => (
              <View key={del} style={styles.deliverableItemRow}>
                <Ionicons name="checkmark-circle" size={moderateScale(16)} color={Colors.bgBlack} style={styles.deliverableCheckIcon} />
                <Text style={[Typography.bodySmall, styles.deliverableMessageText]}>{del}</Text>
              </View>
            ))}
          </View>
          <View style={styles.expandedActionControlsSplitRow}>
            <Pressable style={styles.expandedCollapseTriggerTextAnchor} onPress={onViewPress}>
              <Text style={[Typography.bodySmall, styles.collapseLabelActionText]}>Hide details</Text>
            </Pressable>
            <Pressable style={styles.fullWidthApplyButtonAnchor} onPress={onApply}>
              <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradientApplyButtonContainer}>
                <Text style={[Typography.buttonPrimary, styles.applyButtonText]}>Apply Now</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

type FiltersAction =
  | { type: 'SET_IS_FILTER_VISIBLE'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'CLOSE_ALL_DROPDOWNS' }
  | { type: 'TOGGLE_CATEGORY' }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'TOGGLE_BUDGET' }
  | { type: 'SET_BUDGET'; payload: string }
  | { type: 'TOGGLE_PLATFORM' }
  | { type: 'SET_PLATFORM'; payload: string };

interface FiltersState {
  isFilterVisible: boolean;
  searchQuery: string;
  isCategoryOpen: boolean;
  selectedCategory: string;
  isBudgetOpen: boolean;
  selectedBudget: string;
  isPlatformOpen: boolean;
  selectedPlatform: string;
}

const initialFiltersState: FiltersState = {
  isFilterVisible: false,
  searchQuery: '',
  isCategoryOpen: false,
  selectedCategory: 'All Categories',
  isBudgetOpen: false,
  selectedBudget: 'All Budgets',
  isPlatformOpen: false,
  selectedPlatform: 'All Platforms',
};

function filtersReducer(state: FiltersState, action: FiltersAction): FiltersState {
  switch (action.type) {
    case 'SET_IS_FILTER_VISIBLE':
      return { ...state, isFilterVisible: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'CLOSE_ALL_DROPDOWNS':
      return { ...state, isCategoryOpen: false, isBudgetOpen: false, isPlatformOpen: false };
    case 'TOGGLE_CATEGORY':
      return { ...state, isCategoryOpen: !state.isCategoryOpen, isBudgetOpen: false, isPlatformOpen: false };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload, isCategoryOpen: false };
    case 'TOGGLE_BUDGET':
      return { ...state, isBudgetOpen: !state.isBudgetOpen, isCategoryOpen: false, isPlatformOpen: false };
    case 'SET_BUDGET':
      return { ...state, selectedBudget: action.payload, isBudgetOpen: false };
    case 'TOGGLE_PLATFORM':
      return { ...state, isPlatformOpen: !state.isPlatformOpen, isCategoryOpen: false, isBudgetOpen: false };
    case 'SET_PLATFORM':
      return { ...state, selectedPlatform: action.payload, isPlatformOpen: false };
    default:
      return state;
  }
}

export default function CampaignScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [filtersState, dispatchFilters] = useReducer(filtersReducer, initialFiltersState);
  const [expandedCampaignId, setExpandedCampaignId] = useState<string | null>(null);

  const handleToggleFilter = () => {
    dispatchFilters({ type: 'SET_IS_FILTER_VISIBLE', payload: !filtersState.isFilterVisible });
    if (filtersState.isFilterVisible) {
      dispatchFilters({ type: 'CLOSE_ALL_DROPDOWNS' });
    }
  };

  const handleViewPress = useCallback((id: string) => {
    setExpandedCampaignId(prev => prev === id ? null : id);
  }, []);

  const handleSelectCategory = useCallback((category: string) => {
    dispatchFilters({ type: 'SET_CATEGORY', payload: category });
  }, []);

  const handleSelectBudget = useCallback((budget: string) => {
    dispatchFilters({ type: 'SET_BUDGET', payload: budget });
  }, []);

  const handleSelectPlatform = useCallback((platform: string) => {
    dispatchFilters({ type: 'SET_PLATFORM', payload: platform });
  }, []);

  const categoryOptions = useMemo(() => ['All Categories', ...CATEGORY_OPTIONS], []);
  const budgetOptions = useMemo(() => ['All Budgets', ...BUDGET_OPTIONS], []);
  const platformOptions = useMemo(() => ['All Platforms', ...PLATFORM_OPTIONS], []);

  const defaultDropdownItemTextStyle = useMemo(() => [Typography.body, styles.dropdownListItemText], []);
  const activeDropdownItemTextStyle = useMemo(() => [Typography.body, styles.dropdownListItemTextActive], []);

  const renderCategoryItem = useCallback(({ item, index: _index }: { item: string; index: number }) => {
    const isLast = index === CATEGORY_OPTIONS.length;
    const isSelected = filtersState.selectedCategory === item;
    return (
      <Pressable
        style={isLast ? styles.dropdownListItemTouchAreaLast : styles.dropdownListItemTouchArea}
        onPress={() => handleSelectCategory(item)}
      >
        <Text style={isSelected ? activeDropdownItemTextStyle : defaultDropdownItemTextStyle}>
          {item}
        </Text>
      </Pressable>
    );
  }, [filtersState.selectedCategory, handleSelectCategory, defaultDropdownItemTextStyle, activeDropdownItemTextStyle]);

  const renderBudgetItem = useCallback(({ item, index: _index }: { item: string; index: number }) => {
    const isLast = index === BUDGET_OPTIONS.length;
    const isSelected = filtersState.selectedBudget === item;
    return (
      <Pressable
        style={isLast ? styles.dropdownListItemTouchAreaLast : styles.dropdownListItemTouchArea}
        onPress={() => handleSelectBudget(item)}
      >
        <Text style={isSelected ? activeDropdownItemTextStyle : defaultDropdownItemTextStyle}>
          {item}
        </Text>
      </Pressable>
    );
  }, [filtersState.selectedBudget, handleSelectBudget, defaultDropdownItemTextStyle, activeDropdownItemTextStyle]);

  const renderPlatformItem = useCallback(({ item, index: _index }: { item: string; index: number }) => {
    const isLast = index === PLATFORM_OPTIONS.length;
    const isSelected = filtersState.selectedPlatform === item;
    return (
      <Pressable
        style={isLast ? styles.dropdownListItemTouchAreaLast : styles.dropdownListItemTouchArea}
        onPress={() => handleSelectPlatform(item)}
      >
        <Text style={isSelected ? activeDropdownItemTextStyle : defaultDropdownItemTextStyle}>
          {item}
        </Text>
      </Pressable>
    );
  }, [filtersState.selectedPlatform, handleSelectPlatform, defaultDropdownItemTextStyle, activeDropdownItemTextStyle]);

  const renderCampaignItem = useCallback(({ item }: { item: any }) => (
    <CampaignCard item={item} isExpanded={expandedCampaignId === item.id} onViewPress={() => handleViewPress(item.id)} onApply={() => navigation.navigate('ApplyCampaign', { campaignId: item.id })} />
  ), [expandedCampaignId, handleViewPress, navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />
      
      <View style={styles.headerBarContainer}>
        <Image
          source={require('../../../assets/images/IMB360_v2.png')}
          style={styles.appLogoImage}
          resizeMode="contain"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollLayoutContent}>
        <BrowseCampaignsHeader />
        <FilterToggleRow onToggle={handleToggleFilter} />

        {filtersState.isFilterVisible && (
          <View style={styles.filterDrawerStackInlineBlock}>
            <TextField label="Search campaign" value={filtersState.searchQuery} onChangeText={(text) => dispatchFilters({ type: 'SET_SEARCH_QUERY', payload: text })} style={styles.searchTextInputElement} />
            <FilterDropdown label={filtersState.selectedCategory} iconName="pricetag-outline" isOpen={filtersState.isCategoryOpen} onPress={() => dispatchFilters({ type: 'TOGGLE_CATEGORY' })} />
            {filtersState.isCategoryOpen && (
              <View style={styles.dropdownExpandedListContent}>
                <FlatList nestedScrollEnabled showsVerticalScrollIndicator contentContainerStyle={styles.dropdownScrollContainer} data={categoryOptions} keyExtractor={(item) => item} renderItem={renderCategoryItem} />
              </View>
            )}
            <FilterDropdown label={filtersState.selectedBudget} iconName="wallet-outline" isOpen={filtersState.isBudgetOpen} onPress={() => dispatchFilters({ type: 'TOGGLE_BUDGET' })} />
            {filtersState.isBudgetOpen && (
              <View style={styles.dropdownExpandedListContent}>
                <FlatList nestedScrollEnabled showsVerticalScrollIndicator contentContainerStyle={styles.dropdownScrollContainer} data={budgetOptions} keyExtractor={(item) => item} renderItem={renderBudgetItem} />
              </View>
            )}
            <FilterDropdown label={filtersState.selectedPlatform} iconName="desktop-outline" isOpen={filtersState.isPlatformOpen} onPress={() => dispatchFilters({ type: 'TOGGLE_PLATFORM' })} />
            {filtersState.isPlatformOpen && (
              <View style={styles.dropdownExpandedListContent}>
                <FlatList nestedScrollEnabled showsVerticalScrollIndicator contentContainerStyle={styles.dropdownScrollContainer} data={platformOptions} keyExtractor={(item) => item} renderItem={renderPlatformItem} />
              </View>
            )}
            <Pressable style={styles.searchSubmitButtonExecutionContainer}>
              <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.searchSubmitButtonGradientLayout}>
                <Text style={[Typography.buttonPrimary, styles.searchSubmitButtonLabelText]}>Search</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        <FlatList
          data={campaignData}
          renderItem={renderCampaignItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.campaignFlatListContainerPadding}
        />
      </ScrollView>
    </SafeAreaView>
  );
}