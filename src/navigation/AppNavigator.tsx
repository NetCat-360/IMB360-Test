import React from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SvgXml } from 'react-native-svg';

import { NB_PROFILE_SVG, NB_PROFILE_ACTIVE_SVG, NB_CAMPAIGN_SVG, NB_CAMPAIGN_ACTIVE_SVG, NB_EXPLORE_SVG, NB_EXPLORE_ACTIVE_SVG, NB_ANALYTICS_SVG, NB_ANALYTICS_ACTIVE_SVG, NB_ASSETS_SVG, NB_ASSETS_ACTIVE_SVG, navbarIconContainerStyle } from './navbarIcons';

import {
  BottomTabParamList,
  AppStackParamList,
  CampaignStackParamList,
  ExploreStackParamList,
} from '../types/navigation';

/**
 * TAB SCREENS
 */
import { Colors } from '../config/theme';
import HomeScreen from '../screens/home/HomeScreen';
import CampaignScreen from '../screens/campaign/CampaignScreen'
import ExploreScreen from '../screens/explore/ExploreScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import AssetsScreen from '../screens/assets/AssetsScreen';
import CampaignQueueScreen from '../screens/CampaignQueue/CampaignQueueScreen';
import ContentScreen from '../screens/content/ContentScreen';
import OverviewScreen from '../screens/overview/OverviewScreen';
import MyEarnings from '../screens/MyEarnings/MyEarnings';
import InfluencerProfileScreen from '../screens/explore/InfluencerProfileScreen';
import RequestQuoteScreen from '../screens/explore/RequestQuoteScreen';
import AddAssetsScreen
from '../screens/assets/addAssets/AddAssetsScreen';
/**
 * STACK SCREENS
 */
import AddContentScreen from '../screens/content/AddContentScreen';
import EditContentScreen from '../screens/content/EditContentScreen';

import PricingScreen from '../screens/pricing/PricingScreen';
import AddPricingScreen from '../screens/pricing/AddPricingScreen';
import EditPricingScreen from '../screens/pricing/EditPricingScreen';

import CampaignURLScreen from '../screens/CampaignQueue/CampaignURLScreen';
import ApplyCampaignScreen from '../screens/campaign/ApplyCampaignScreen';

import SettingsScreen from '../screens/settings/SettingsScreen';
import ManageAccountScreen from '../screens/settings/ManageAccount/ManageAccountScreen';
import BioScreen from '../screens/settings/Bio/BioScreen';
import SocialMediaScreen from '../screens/settings/SocialMedia/SocialMediaScreen';
import AdditionalInfoScreen from '../screens/settings/AdditionalInfo/AdditionalInfoScreen';
import ViewPlansScreen from '../screens/settings/ViewPlans/ViewPlansScreen';
import SubscriptionScreen from '../screens/settings/Subscription/SubscriptionScreen';
import ChangePasswordScreen from '../screens/settings/ChangePassword/ChangePasswordScreen';
import AssetDetailsScreen from '../screens/assets/AssetDetailsScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<AppStackParamList>();

/**
 * TABS
 */
const CampaignStack = createNativeStackNavigator<CampaignStackParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();

function CampaignStackNavigator() {
  return (
    <CampaignStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.bgBlack,
        },
      }}
    >
      <CampaignStack.Screen
        name="CampaignList"
        component={CampaignScreen}
      />
      <CampaignStack.Screen
        name="ApplyCampaign"
        component={ApplyCampaignScreen}
      />
    </CampaignStack.Navigator>
  );
}

function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen
        name="ExploreList"
        component={ExploreScreen}
      />
      <ExploreStack.Screen
        name="InfluencerProfile"
        component={InfluencerProfileScreen}
      />
      <ExploreStack.Screen
        name="RequestQuote"
        component={RequestQuoteScreen}
      />
    </ExploreStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 1,
          borderTopColor: '#00ACB3',
          height: 80,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarItemStyle: {
          paddingHorizontal: 0,
          marginHorizontal: -4,
        },

        tabBarActiveTintColor: '#00D2FF',
        tabBarInactiveTintColor: '#7A7A7A',

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 8,
        },

        tabBarIcon: ({ color, focused }) => { // eslint-disable-line react/no-unstable-nested-components
          switch (route.name) {
            case 'Profile':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_PROFILE_ACTIVE_SVG : NB_PROFILE_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                    color={color}
                  />
                </View>
              );

            case 'Campaign':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_CAMPAIGN_ACTIVE_SVG : NB_CAMPAIGN_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                    color={color}
                  />
                </View>
              );

            case 'Explore':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_EXPLORE_ACTIVE_SVG : NB_EXPLORE_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                    color={color}
                  />
                </View>
              );

            case 'Analytics':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_ANALYTICS_ACTIVE_SVG : NB_ANALYTICS_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                    color={color}
                  />
                </View>
              );

            case 'Assets':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_ASSETS_ACTIVE_SVG : NB_ASSETS_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                    color={color}
                  />
                </View>
              );
          }

          return null;
        },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
      />

<Tab.Screen
  name="Campaign"
  component={CampaignScreen}
/>

      <Tab.Screen
        name="Explore"
        component={ExploreStackNavigator}
      />

      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
      />

      <Tab.Screen
        name="Assets"
        component={AssetsScreen}
      />
    </Tab.Navigator>
  );
}

/**
 * ROOT NAVIGATOR
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 300,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        name="Overview"
        component={OverviewScreen}
      />

      <Stack.Screen
        name="Content"
        component={ContentScreen}
      />

      <Stack.Screen
        name="AddContent"
        component={AddContentScreen}
      />

      <Stack.Screen
        name="EditContent"
        component={EditContentScreen}
      />

      <Stack.Screen
        name="Pricing"
        component={PricingScreen}
      />

      <Stack.Screen
        name="AddPricing"
        component={AddPricingScreen}
      />

      <Stack.Screen
        name="EditPricing"
        component={EditPricingScreen}
      />

      <Stack.Screen
        name="CampaignQueue"
        component={CampaignQueueScreen}
      />

      <Stack.Screen
        name="CampaignURL"
        component={CampaignURLScreen}
      />

      <Stack.Screen
        name="MyEarnings"
        component={MyEarnings}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Stack.Screen
        name="ManageAccount"
        component={ManageAccountScreen}
      />

      <Stack.Screen
        name="Bio"
        component={BioScreen}
      />

      <Stack.Screen
        name="SocialMedia"
        component={SocialMediaScreen}
      />

      <Stack.Screen
        name="AdditionalInfo"
        component={AdditionalInfoScreen}
      />

      <Stack.Screen
        name="ViewPlans"
        component={ViewPlansScreen}
      />

      <Stack.Screen
        name="Subscription"
        component={SubscriptionScreen}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="AddAssets"
        component={
          AddAssetsScreen
        }
      />
      <Stack.Screen
  name="AssetDetails"
  component={AssetDetailsScreen}
/>
    </Stack.Navigator>
  );
}