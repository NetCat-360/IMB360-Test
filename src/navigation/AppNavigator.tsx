import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  BottomTabParamList,
  AppStackParamList,
} from '../types/navigation';

/**
 * TAB SCREENS
 */
import HomeScreen from '../screens/home/HomeScreen';

/**
 * STACK SCREENS
 */
import OverviewScreen from '../screens/overview/OverviewScreen';

import ContentScreen from '../screens/content/ContentScreen';
import AddContentScreen from '../screens/content/AddContentScreen';
import EditContentScreen from '../screens/content/EditContentScreen';

import PricingScreen from '../screens/pricing/PricingScreen';
import AddPricingScreen from '../screens/pricing/AddPricingScreen';
import EditPricingScreen from '../screens/pricing/EditPricingScreen';

import CampaignQueueScreen from '../screens/CampaignQueue/CampaignQueueScreen';
import CampaignURLScreen from '../screens/CampaignQueue/CampaignURLScreen';

import MyEarnings from '../screens/MyEarnings/MyEarnings';

import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createNativeStackNavigator<AppStackParamList>();

/**
 * TABS
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },

        tabBarActiveTintColor: '#00D2FF',
        tabBarInactiveTintColor: '#7A7A7A',

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },

        tabBarIcon: ({ color, focused }) => {
          let iconName = '';

          switch (route.name) {
            case 'Profile':
              iconName = focused
                ? 'person'
                : 'person-outline';
              break;

            case 'Campaign':
              iconName = focused
                ? 'megaphone'
                : 'megaphone-outline';
              break;

            case 'Explore':
              iconName = focused
                ? 'compass'
                : 'compass-outline';
              break;

            case 'Analytics':
              iconName = focused
                ? 'stats-chart'
                : 'stats-chart-outline';
              break;

            case 'Assets':
              iconName = focused
                ? 'folder'
                : 'folder-outline';
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Campaign"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Explore"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Analytics"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Assets"
        component={HomeScreen}
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
    </Stack.Navigator>
  );
}