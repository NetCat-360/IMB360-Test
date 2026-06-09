import React from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SvgXml } from 'react-native-svg';

import {
  NB_DASHBOARD_SVG, NB_DASHBOARD_ACTIVE_SVG,
  NB_CAMPAIGN_SVG, NB_CAMPAIGN_ACTIVE_SVG,
  NB_EXPLORE_SVG, NB_EXPLORE_ACTIVE_SVG,
  NB_SETTINGS_SVG, NB_SETTINGS_ACTIVE_SVG,
  navbarIconContainerStyle,
} from './navbarIcons';

import {
  BrandBottomTabParamList,
  BrandStackParamList,
} from '../types/navigation';

import BrandDashboardScreen from '../screens/brand-dashboard/BrandDashboardScreen';
import CampaignScreen from '../screens/campaign/CampaignScreen';
import ExploreScreen from '../screens/explore/ExploreScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import InfluencerProfileScreen from '../screens/explore/InfluencerProfileScreen';
import ManageAccountScreen from '../screens/settings/ManageAccount/ManageAccountScreen';
import BioScreen from '../screens/settings/Bio/BioScreen';
import SocialMediaScreen from '../screens/settings/SocialMedia/SocialMediaScreen';
import AdditionalInfoScreen from '../screens/settings/AdditionalInfo/AdditionalInfoScreen';
import ViewPlansScreen from '../screens/settings/ViewPlans/ViewPlansScreen';
import SubscriptionScreen from '../screens/settings/Subscription/SubscriptionScreen';
import ChangePasswordScreen from '../screens/settings/ChangePassword/ChangePasswordScreen';

const Tab = createBottomTabNavigator<BrandBottomTabParamList>();
const Stack = createNativeStackNavigator<BrandStackParamList>();

function BrandTabs() {
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

        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'BrandDashboard':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_DASHBOARD_ACTIVE_SVG : NB_DASHBOARD_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                  />
                </View>
              );

            case 'BrandCampaign':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_CAMPAIGN_ACTIVE_SVG : NB_CAMPAIGN_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                  />
                </View>
              );

            case 'BrandExplore':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_EXPLORE_ACTIVE_SVG : NB_EXPLORE_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                  />
                </View>
              );

            case 'BrandSettings':
              return (
                <View style={[navbarIconContainerStyle, focused && { top: -12 }]}>
                  <SvgXml
                    xml={focused ? NB_SETTINGS_ACTIVE_SVG : NB_SETTINGS_SVG}
                    width={focused ? 50 : 32}
                    height={focused ? 50 : 32}
                  />
                </View>
              );
          }

          return null;
        },
      })}
    >
      <Tab.Screen
        name="BrandDashboard"
        component={BrandDashboardScreen}
      />
      <Tab.Screen
        name="BrandCampaign"
        component={CampaignScreen}
      />
      <Tab.Screen
        name="BrandExplore"
        component={ExploreScreen}
      />
      <Tab.Screen
        name="BrandSettings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

export default function BrandAppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BrandMainTabs"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        animationDuration: 300,
      }}
    >
      <Stack.Screen name="BrandMainTabs" component={BrandTabs} />
      <Stack.Screen name="Campaign" component={CampaignScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="InfluencerProfile" component={InfluencerProfileScreen} />
      <Stack.Screen name="ManageAccount" component={ManageAccountScreen} />
      <Stack.Screen name="Bio" component={BioScreen} />
      <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
      <Stack.Screen name="AdditionalInfo" component={AdditionalInfoScreen} />
      <Stack.Screen name="ViewPlans" component={ViewPlansScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
