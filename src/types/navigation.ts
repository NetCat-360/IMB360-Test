import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

/**
 * BOTTOM TAB TYPES
 */
export type BottomTabParamList = {
  Profile: undefined;
  Campaign: undefined;
  Explore: undefined;
  Analytics: undefined;
  Assets: undefined;
};

/**
 * ROOT STACK TYPES
 */
export type AppStackParamList = {
  MainTabs: undefined;

  Home: undefined;
  Overview: undefined;

  Content: undefined;
  AddContent: undefined;
  EditContent: {
    contentId?: string;
  };

  Pricing: undefined;
  AddPricing: undefined;
  EditPricing: {
    pricingId?: string;
  };

  CampaignQueue: undefined;

  CampaignURL: {
    campaignId?: string;
    url?: string;
  };

  MyEarnings: undefined;

  Settings: undefined;
};

/**
 * NAVIGATION PROP
 */
export type AppNavigationProp<
  T extends keyof AppStackParamList,
> = NativeStackNavigationProp<
  AppStackParamList,
  T
>;

/**
 * SCREEN PROP TYPES
 */
export type HomeScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'Home'
  >;

export type OverviewScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'Overview'
  >;

export type ContentScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'Content'
  >;

export type AddContentScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'AddContent'
  >;

export type EditContentScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'EditContent'
  >;

export type PricingScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'Pricing'
  >;

export type AddPricingScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'AddPricing'
  >;

export type EditPricingScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'EditPricing'
  >;

export type CampaignQueueScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'CampaignQueue'
  >;

export type CampaignURLScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'CampaignURL'
  >;

export type MyEarningsScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'MyEarnings'
  >;

export type SettingsScreenProps =
  NativeStackScreenProps<
    AppStackParamList,
    'Settings'
  >;