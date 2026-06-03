import React, { useState } from 'react';
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
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import { CURRENCY } from '../../config/constants';
import TextField from '../../components/common/TextField/TextField';
import { AppStackParamList } from '../../types/navigation';
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

export default function CampaignScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCampaignId, setExpandedCampaignId] = useState<string | null>(null);
  
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  const [isBudgetOpen, setIsBudgetOpen] = useState<boolean>(false);
  const [selectedBudget, setSelectedBudget] = useState<string>('All Budgets');

  const [isPlatformOpen, setIsPlatformOpen] = useState<boolean>(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All Platforms');

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

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
    if (isFilterVisible) {
      setIsCategoryOpen(false);
      setIsBudgetOpen(false);
      setIsPlatformOpen(false);
    }
  };

  const handleViewPress = (id: string) => {
    setExpandedCampaignId(expandedCampaignId === id ? null : id);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleSelectBudget = (budget: string) => {
    setSelectedBudget(budget);
    setIsBudgetOpen(false);
  };

  const handleSelectPlatform = (platform: string) => {
    setSelectedPlatform(platform);
    setIsPlatformOpen(false);
  };

  const renderCampaignCard = ({ item }: { item: CampaignItem }) => {
    const isExpanded = expandedCampaignId === item.id;

    return (
      <View style={styles.campaignCardWrapper}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.brandContainer}>
            <Image
              source={require('../../assets/images/overviewlogo.png')}
              style={styles.brandLogo}
            />
            <View style={styles.brandMeta}>
              <Text style={[Typography.h2, styles.brandNameText]}>{item.companyName}</Text>
              <View style={styles.socialPlatformRow}>
                <Image source={require('../../assets/images/Instagram.png')} style={styles.socialIcon} />
                <Image source={require('../../assets/images/facebook.png')} style={styles.socialIcon} />
                <Image source={require('../../assets/images/youtube.png')} style={styles.socialIcon} />
                <Image source={require('../../assets/images/Twitter.png')} style={styles.socialIcon} />
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
            <Text style={[Typography.statNumber, styles.budgetRangeValue]}>
              {CURRENCY}{item.budgetMin} - {CURRENCY}{item.budgetMax}
            </Text>
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
            <Pressable
              style={styles.alignedRightViewButtonAnchor}
              onPress={() => handleViewPress(item.id)}
            >
              <LinearGradient
                colors={[Colors.teal, Colors.lime]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientViewButtonContainer}
              >
                <Text style={[Typography.buttonSecondary, styles.viewButtonText]}>View</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        {isExpanded && (
          <View style={styles.expandedContentContainer}>
            <Text style={[Typography.h3, styles.expandedSectionTitle]}>Target Audience</Text>
            <Text style={[Typography.body, styles.audienceBodyText]}>
              {item.audienceText}{' '}
              <Text style={styles.readMoreAccent}>read more...</Text>
            </Text>

            <Text style={[Typography.h3, styles.expandedSectionTitle]}>Campaign Categories</Text>
            <View style={styles.categoryGridContainer}>
              {item.categories.map((cat, index) => (
                <View key={index} style={styles.categoryTagBubble}>
                  <Text style={[Typography.bodySmall, styles.categoryTagText]}>{cat}</Text>
                </View>
              ))}
            </View>

            <View style={styles.deliverablesCanvasBlock}>
              <Text style={[Typography.h3, styles.deliverablesCanvasTitle]}>Deliverables</Text>
              {item.deliverables.map((del, index) => (
                <View key={index} style={styles.deliverableItemRow}>
                  <Ionicons name="checkmark-circle" size={moderateScale(16)} color={Colors.bgBlack} style={styles.deliverableCheckIcon} />
                  <Text style={[Typography.bodySmall, styles.deliverableMessageText]}>{del}</Text>
                </View>
              ))}
            </View>

            <View style={styles.expandedActionControlsSplitRow}>
              <Pressable
                style={styles.expandedCollapseTriggerTextAnchor}
                onPress={() => handleViewPress(item.id)}
              >
                <Text style={[Typography.bodySmall, styles.collapseLabelActionText]}>Hide details</Text>
              </Pressable>

              <Pressable
                style={styles.fullWidthApplyButtonAnchor}
                onPress={() => navigation.navigate('ApplyCampaign', { campaignId: item.id })}
              >
                <LinearGradient
                  colors={[Colors.teal, Colors.lime]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientApplyButtonContainer}
                >
                  <Text style={[Typography.buttonPrimary, styles.applyButtonText]}>Apply Now</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />
      
      <View style={styles.headerBarContainer}>
        <Image
          source={require('../../assets/images/IMB360_v2.png')}
          style={styles.appLogoImage}
          resizeMode="contain"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollLayoutContent}>
        <View style={styles.browseCampaignsOuterBlockContainer}>
          <Text style={[Typography.displayMedium, styles.browseCampaignsTitleMainText]}>
            BROWSE <Text style={styles.browseCampaignsTitleHighlightText}>CAMPAIGNS</Text>
          </Text>
          <View style={styles.aiBadgeFloatingContainer}>
            <Ionicons name="sparkles" size={moderateScale(10)} color={Colors.teal} style={styles.aiBadgeSparkleIcon} />
            <Text style={[Typography.caption, styles.aiBadgeLabelText]}>AI Browse Campaign</Text>
          </View>
        </View>

        <View style={styles.filterControlActionRow}>
          <Text style={[Typography.h2, styles.filterResultStaticLabelText]}>Filter Result</Text>
          <Pressable onPress={handleToggleFilter} style={styles.funnelTouchAreaBox}>
            <Ionicons name="funnel-outline" size={moderateScale(20)} color={Colors.textPrimary} />
          </Pressable>
        </View>

        {isFilterVisible && (
          <View style={styles.filterDrawerStackInlineBlock}>
            <TextField
              label="Search campaign"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchTextInputElement}
            />
            
            <FilterDropdown 
              label={selectedCategory} 
              iconName="pricetag-outline" 
              isOpen={isCategoryOpen}
              onPress={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsBudgetOpen(false);
                setIsPlatformOpen(false);
              }} 
            />

            {isCategoryOpen && (
              <View style={styles.dropdownExpandedListContent}>
                <ScrollView 
                  nestedScrollEnabled={true} 
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={styles.dropdownScrollContainer}
                >
                  <Pressable 
                    style={styles.dropdownListItemTouchArea} 
                    onPress={() => handleSelectCategory('All Categories')}
                  >
                    <Text style={[Typography.body, selectedCategory === 'All Categories' ? styles.dropdownListItemTextActive : styles.dropdownListItemText]}>
                      All Categories
                    </Text>
                  </Pressable>
                  {CATEGORY_OPTIONS.map((category, idx) => {
                    const isLast = idx === CATEGORY_OPTIONS.length - 1;
                    return (
                      <Pressable 
                        key={category} 
                        style={isLast ? styles.dropdownListItemTouchAreaLast : styles.dropdownListItemTouchArea} 
                        onPress={() => handleSelectCategory(category)}
                      >
                        <Text style={[Typography.body, selectedCategory === category ? styles.dropdownListItemTextActive : styles.dropdownListItemText]}>
                          {category}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <FilterDropdown 
              label={selectedBudget} 
              iconName="wallet-outline" 
              isOpen={isBudgetOpen}
              onPress={() => {
                setIsBudgetOpen(!isBudgetOpen);
                setIsCategoryOpen(false);
                setIsPlatformOpen(false);
              }} 
            />

            {isBudgetOpen && (
              <View style={styles.dropdownExpandedListContent}>
                <ScrollView 
                  nestedScrollEnabled={true} 
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={styles.dropdownScrollContainer}
                >
                  <Pressable 
                    style={styles.dropdownListItemTouchArea} 
                    onPress={() => handleSelectBudget('All Budgets')}
                  >
                    <Text style={[Typography.body, selectedBudget === 'All Budgets' ? styles.dropdownListItemTextActive : styles.dropdownListItemText]}>
                      All Budgets
                    </Text>
                  </Pressable>
                  {BUDGET_OPTIONS.map((budget, idx) => {
                    const isLast = idx === BUDGET_OPTIONS.length - 1;
                    return (
                      <Pressable 
                        key={budget} 
                        style={isLast ? styles.dropdownListItemTouchAreaLast : styles.dropdownListItemTouchArea} 
                        onPress={() => handleSelectBudget(budget)}
                      >
                        <Text style={[Typography.body, selectedBudget === budget ? styles.dropdownListItemTextActive : styles.dropdownListItemText]}>
                          {budget}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <FilterDropdown 
              label={selectedPlatform} 
              iconName="desktop-outline" 
              isOpen={isPlatformOpen}
              onPress={() => {
                setIsPlatformOpen(!isPlatformOpen);
                setIsCategoryOpen(false);
                setIsBudgetOpen(false);
              }} 
            />

            {isPlatformOpen && (
              <View style={styles.dropdownExpandedListContent}>
                <ScrollView 
                  nestedScrollEnabled={true} 
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={styles.dropdownScrollContainer}
                >
                  <Pressable 
                    style={styles.dropdownListItemTouchArea} 
                    onPress={() => handleSelectPlatform('All Platforms')}
                  >
                    <Text style={[Typography.body, selectedPlatform === 'All Platforms' ? styles.dropdownListItemTextActive : styles.dropdownListItemText]}>
                      All Platforms
                    </Text>
                  </Pressable>
                  {PLATFORM_OPTIONS.map((platform, idx) => {
                    const isLast = idx === PLATFORM_OPTIONS.length - 1;
                    return (
                      <Pressable 
                        key={platform} 
                        style={isLast ? styles.dropdownListItemTouchAreaLast : styles.dropdownListItemTouchArea} 
                        onPress={() => handleSelectPlatform(platform)}
                      >
                        <Text style={[Typography.body, selectedPlatform === platform ? styles.dropdownListItemTextActive : styles.dropdownListItemText]}>
                          {platform}
                        </Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            <Pressable style={styles.searchSubmitButtonExecutionContainer}>
              <LinearGradient
                colors={[Colors.teal, Colors.lime]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.searchSubmitButtonGradientLayout}
              >
                <Text style={[Typography.buttonPrimary, styles.searchSubmitButtonLabelText]}>Search</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        <FlatList
          data={campaignData}
          renderItem={renderCampaignCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.campaignFlatListContainerPadding}
        />
      </ScrollView>
    </SafeAreaView>
  );
}