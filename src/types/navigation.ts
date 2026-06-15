import { RouteProp } from '@react-navigation/native';

import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

/* -------------------------------------------------------------------------- */
/*                            BOTTOM TAB TYPES                                */
/* -------------------------------------------------------------------------- */

export type BottomTabParamList = {
  Profile: undefined;
  Campaign: undefined;
  Explore: undefined;
  Analytics: undefined;
  Assets: undefined;
};

export type CampaignStackParamList = {
  CampaignList: undefined;

  ApplyCampaign: {
    campaignId?: string;
  };
};

export type ExploreStackParamList = {
  ExploreList: undefined;

  InfluencerProfile:
    undefined;

  RequestQuote: {
    platformId: string;
    influencerName: string;
  };
};

/* -------------------------------------------------------------------------- */
/*                              AUTH STACK TYPES                              */
/* -------------------------------------------------------------------------- */

export type AuthStackParamList = {
  Splash: undefined;

  Onboarding:
    undefined;

  RoleSelection:
    undefined;

  AuthEntryPoint: {
    role?:
      | 'BRAND'
      | 'CREATOR';
  };

  Login:
    undefined;

  Register: {
    role?:
      | 'BRAND'
      | 'CREATOR';
  };

  ForgotPassword:
    undefined;

  Verification: {
    destination?: string;

    flow?:
      | 'password_reset'
      | 'registration';
  };

  ResetPassword: {
    verifiedOtp?:
      string;

    verifiedEmail?:
      string;
  };

  HomeDashboard:
    undefined;
};

/* -------------------------------------------------------------------------- */
/*                        BRAND BOTTOM TAB TYPES                              */
/* -------------------------------------------------------------------------- */

export type BrandBottomTabParamList =
  {
    Profile:
      undefined;

    Campaigns:
      undefined;

    Explore:
      undefined;

    Assets:
      undefined;
  };

/* -------------------------------------------------------------------------- */
/*                           BRAND STACK TYPES                                */
/* -------------------------------------------------------------------------- */

export type BrandStackParamList =
{
  /* Main */
  BrandMainTabs:
    undefined;

  /* Profile Flow */
  BrandProfile:
    undefined;

  AddAssets:
    undefined;

  BrandOverview:
    undefined;

  BrandCampaigns:
    undefined;

  CampaignBids:
    undefined;

  PortfolioScreen: {
    bid?: any;
  };

  TotalSpend:
    undefined;

  CreateCampaign:
    undefined;

  /* Campaign Flow */
  Campaigns:
    undefined;

  ApplyCampaign: {
    campaignId?: string;
  };

  /* Explore Flow */
  Explore:
    undefined;

  BrandExploreList:
    undefined;

  InfluencerProfile:
    undefined;

  RequestQuote: {
    platformId: string;
    influencerName: string;
  };

  /* Settings / Assets */
  Assets:
    undefined;

  Settings:
    undefined;

  Chat:
    undefined;

ChatRoom: {
  chatId: string;
};

  ManageAccount:
    undefined;

  Bio:
    undefined;

  SocialMedia:
    undefined;

  AdditionalInfo:
    undefined;

  ViewPlans:
    undefined;

  Subscription:
    undefined;

  ChangePassword:
    undefined;
};

export type AppStackParamList =
{
  MainTabs:
    undefined;

  Home:
    undefined;

  Overview:
    undefined;

  Content:
    undefined;

  AddContent:
    undefined;

  Chat:
    undefined;
    ChatRoom: {

      chatId: string;
    
    };

  EditContent: {
    contentId?: string;
  };

  Pricing:
    undefined;

  AddPricing:
    undefined;

  EditPricing: {
    pricingId?: string;
  };

  CampaignQueue:
    undefined;

  AddAssets:
    undefined;

  ApplyCampaign: {
    campaignId?: string;
  };

  CampaignURL: {
    campaignId?: string;
    url?: string;
  };

  MyEarnings:
    undefined;

  InfluencerProfile:
    undefined;

  RequestQuote: {
    platformId: string;
    influencerName: string;
  };

  Settings:
    undefined;

  ManageAccount:
    undefined;

  Bio:
    undefined;

  SocialMedia:
    undefined;

  AdditionalInfo:
    undefined;

  ViewPlans:
    undefined;

  Subscription:
    undefined;

  ChangePassword:
    undefined;

  AnalyticsScreen:
    undefined;

  AssetDetails:
    undefined;

  PortfolioScreen: {
    bid: any;
  };
  
};
/* -------------------------------------------------------------------------- */
/*                            NAVIGATION PROP TYPES                           */
/* -------------------------------------------------------------------------- */

export type AuthNavigationProp<
  T extends keyof AuthStackParamList,
> =
  NativeStackNavigationProp<
    AuthStackParamList,
    T
  >;

export type AuthRouteProp<
  T extends keyof AuthStackParamList,
> =
  RouteProp<
    AuthStackParamList,
    T
  >;

export type AppNavigationProp<
  T extends keyof AppStackParamList,
> =
  NativeStackNavigationProp<
    AppStackParamList,
    T
  >;

export type BrandNavigationProp<
  T extends keyof BrandStackParamList,
> =
  NativeStackNavigationProp<
    BrandStackParamList,
    T
  >;

export type AppRouteProp<
  T extends keyof AppStackParamList,
> =
  RouteProp<
    AppStackParamList,
    T
  >;

/* -------------------------------------------------------------------------- */
/*                            SCREEN PROP TYPES                               */
/* -------------------------------------------------------------------------- */

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