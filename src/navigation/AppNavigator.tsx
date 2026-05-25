// src/navigation/AppNavigator.tsx

import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  moderateScale,
  verticalScale,
} from '../utils/scaling';

import { Colors } from '../config/theme';

import {
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/home/HomeScreen';

import SettingsScreen from '../screens/settings/SettingsScreen';

import OverviewScreen from '../screens/overview/OverviewScreen';

import ContentScreen from '../screens/content/ContentScreen';

import PricingScreen from '../screens/pricing/PricingScreen';

import MyEarnings from '../screens/MyEarnings/MyEarnings';

import CampaignQueueScreen from '../screens/CampaignQueue/CampaignQueueScreen';

import ManageAccountScreen from '../screens/settings/ManageAccount/ManageAccountScreen';

import BioScreen from '../screens/settings/Bio/BioScreen';

import SocialMediaScreen from '../screens/settings/SocialMedia/SocialMediaScreen';

import AdditionalInfoScreen from '../screens/settings/AdditionalInfo/AdditionalInfoScreen';

import ViewPlansScreen from '../screens/settings/ViewPlans/ViewPlansScreen';

import SubscriptionScreen from '../screens/settings/Subscription/SubscriptionScreen';

import ChangePasswordScreen from '../screens/settings/ChangePassword/ChangePasswordScreen';

// ─────────────────────────────────────────────
// Placeholder Screens
// ─────────────────────────────────────────────

const PlaceholderScreen = ({
  label,
}: {
  label: string;
}) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>
      {label}
    </Text>
  </View>
);

const CampaignsScreen = () => (
  <PlaceholderScreen label="Campaigns" />
);

const ExploreScreen = () => (
  <PlaceholderScreen label="Explore" />
);

const AnalyticsScreen = () => (
  <PlaceholderScreen label="Analytics" />
);

const AssetsScreen = () => (
  <PlaceholderScreen label="Assets" />
);

// ─────────────────────────────────────────────
// Profile Stack
// ─────────────────────────────────────────────

const ProfileStack =
  createNativeStackNavigator();

const ProfileStackNavigator =
  () => (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor:
            Colors.bgBlack,
        },
      }}
    >
      <ProfileStack.Screen
        name="Home"
        component={HomeScreen}
      />

      <ProfileStack.Screen
        name="Overview"
        component={OverviewScreen}
      />

      <ProfileStack.Screen
        name="Content"
        component={ContentScreen}
      />

      <ProfileStack.Screen
        name="Pricing"
        component={PricingScreen}
      />

      <ProfileStack.Screen
        name="MyEarnings"
        component={MyEarnings}
      />

      <ProfileStack.Screen
        name="CampaignQueue"
        component={
          CampaignQueueScreen
        }
      />

      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <ProfileStack.Screen
        name="ManageAccount"
        component={
          ManageAccountScreen
        }
      />

      <ProfileStack.Screen
        name="Bio"
        component={BioScreen}
      />

      <ProfileStack.Screen
        name="SocialMedia"
        component={
          SocialMediaScreen
        }
      />

      <ProfileStack.Screen
        name="AdditionalInfo"
        component={
          AdditionalInfoScreen
        }
      />

      <ProfileStack.Screen
        name="ViewPlans"
        component={
          ViewPlansScreen
        }
      />

      <ProfileStack.Screen
        name="Subscription"
        component={
          SubscriptionScreen
        }
      />

      <ProfileStack.Screen
        name="ChangePassword"
        component={
          ChangePasswordScreen
        }
      />
    </ProfileStack.Navigator>
  );

// ─────────────────────────────────────────────
// Tabs
// ─────────────────────────────────────────────

const Tab =
  createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor:
            Colors.bgSurface,

          borderTopColor:
            Colors.borderDefault,

          borderTopWidth: 1,

          height:
            verticalScale(60),

          paddingBottom:
            verticalScale(8),

          paddingTop:
            verticalScale(6),
        },

        tabBarActiveTintColor:
          Colors.teal,

        tabBarInactiveTintColor:
          '#666666',

        // TEMP FIX:
        // removed fontFamily
        tabBarLabelStyle: {
          fontSize:
            moderateScale(10),

          marginTop:
            verticalScale(2),
        },
      }}
    >
      <Tab.Screen
        name="ProfileTab"
        component={
          ProfileStackNavigator
        }
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(
              route,
            ) ?? 'Home';

          const hideFooterScreens =
            [
              'Settings',
              'ManageAccount',
              'Bio',
              'SocialMedia',
              'AdditionalInfo',
              'ViewPlans',
              'Subscription',
              'ChangePassword',
            ];

          return {
            tabBarStyle: {
              display:
                hideFooterScreens.includes(
                  routeName,
                )
                  ? 'none'
                  : 'flex',

              backgroundColor:
                Colors.bgSurface,

              borderTopColor:
                Colors.borderDefault,

              borderTopWidth: 1,

              height:
                verticalScale(60),

              paddingBottom:
                verticalScale(8),

              paddingTop:
                verticalScale(6),
            },

            tabBarLabel:
              'Profile',

            // TEMP FIX:
            // removed vector icons
            tabBarIcon: () => (
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                👤
              </Text>
            ),
          };
        }}
      />

      <Tab.Screen
        name="Campaigns"
        component={
          CampaignsScreen
        }
        options={{
          tabBarIcon: () => (
            <Text
              style={{
                fontSize: 18,
              }}
            >
              📢
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: () => (
            <Text
              style={{
                fontSize: 18,
              }}
            >
              🧭
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Analytics"
        component={
          AnalyticsScreen
        }
        options={{
          tabBarIcon: () => (
            <Text
              style={{
                fontSize: 18,
              }}
            >
              📊
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Assets"
        component={AssetsScreen}
        options={{
          tabBarIcon: () => (
            <Text
              style={{
                fontSize: 18,
              }}
            >
              📁
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,

    backgroundColor:
      Colors.bgBlack,

    justifyContent: 'center',

    alignItems: 'center',
  },

  placeholderText: {
    color: Colors.lime,

    fontSize:
      moderateScale(18),

    fontWeight: 'bold',
  },
});

export default AppNavigator;