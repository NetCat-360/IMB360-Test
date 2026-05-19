// src/navigation/AppNavigator.tsx
// Fixes applied:
//   1. Tab bar icons replaced with react-native-vector-icons (MaterialCommunityIcons)
//      — the package is already installed, just unused
//   2. CampaignQueue screen registered in ProfileStack
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, verticalScale } from '../utils/scaling';
import { Colors } from '../config/theme';

// Home stack screens
import HomeScreen from '../screens/home/HomeScreen';
import OverviewScreen from '../screens/overview/OverviewScreen';
import ContentScreen from '../screens/content/ContentScreen';
import PricingScreen from '../screens/pricing/PricingScreen';
import MyEarnings from '../screens/MyEarnings/MyEarnings';
import CampaignQueueScreen from '../screens/CampaignQueue/CampaignQueueScreen';

// ── Placeholder tab screens ──────────────────────────────────────────────────
const PlaceholderScreen = ({ label }: { label: string }) => (
  <View style={placeholderStyles.container}>
    <Text style={placeholderStyles.text}>{label}</Text>
  </View>
);

const CampaignsScreen  = () => <PlaceholderScreen label="Campaigns" />;
const ExploreScreen    = () => <PlaceholderScreen label="Explore" />;
const AnalyticsScreen  = () => <PlaceholderScreen label="Analytics" />;
const AssetsScreen     = () => <PlaceholderScreen label="Assets" />;

const placeholderStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgBlack, justifyContent: 'center', alignItems: 'center' },
  text: { color: Colors.lime, fontSize: moderateScale(18), fontWeight: 'bold' },
});
// ────────────────────────────────────────────────────────────────────────────

// ProfileStack — Home + all sub-screens pushed on top
const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator
    screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.bgBlack } }}
  >
    <ProfileStack.Screen name="Home"          component={HomeScreen} />
    <ProfileStack.Screen name="Overview"      component={OverviewScreen} />
    <ProfileStack.Screen name="Content"       component={ContentScreen} />
    <ProfileStack.Screen name="Pricing"       component={PricingScreen} />
    <ProfileStack.Screen name="MyEarnings"    component={MyEarnings} />
    {/* FIX: CampaignQueue registered so navigation.navigate('CampaignQueue') works */}
    <ProfileStack.Screen name="CampaignQueue" component={CampaignQueueScreen} />
  </ProfileStack.Navigator>
);

// ── Tab icon using react-native-vector-icons ─────────────────────────────────
// FIX: replaced emoji Text components with proper vector icons.
// react-native-vector-icons is already in package.json — just wasn't used.
const TabIcon = ({
  name,
  focused,
}: {
  name: string;
  focused: boolean;
}) => (
  <Icon
    name={name}
    size={moderateScale(22)}
    color={focused ? Colors.teal : '#666666'}
  />
);
// ────────────────────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bgSurface,
          borderTopColor: Colors.borderDefault,
          borderTopWidth: 1,
          height: verticalScale(60),
          paddingBottom: verticalScale(8),
          paddingTop: verticalScale(6),
        },
        tabBarActiveTintColor: Colors.teal,
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: moderateScale(10),
          fontFamily: 'Poppins-SemiBold',
          marginTop: verticalScale(2),
        },
      }}
    >
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="account-outline" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Campaigns"
        component={CampaignsScreen}
        options={{
          tabBarLabel: 'Campaigns',
          tabBarIcon: ({ focused }) => <TabIcon name="bullhorn-outline" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon name="compass-outline" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ focused }) => <TabIcon name="chart-bar" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Assets"
        component={AssetsScreen}
        options={{
          tabBarLabel: 'Assets',
          tabBarIcon: ({ focused }) => <TabIcon name="folder-outline" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
