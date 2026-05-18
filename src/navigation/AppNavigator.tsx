import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { moderateScale, scale, verticalScale } from '../utils/scaling';

// Home stack screens
import HomeScreen from '../screens/home/HomeScreen';
import OverviewScreen from '../screens/overview/OverviewScreen';
import ContentScreen from '../screens/content/ContentScreen';
import PricingScreen from '../screens/pricing/PricingScreen';

// ── Placeholder tab screens ──────────────────────────────────────────────────
// Replace each one with real screens as you build them out.
const PlaceholderScreen = ({ label }: { label: string }) => (
  <View style={placeholderStyles.container}>
    <Text style={placeholderStyles.text}>{label}</Text>
  </View>
);

const CampaignsScreen = () => <PlaceholderScreen label="Campaigns" />;
const ExploreScreen   = () => <PlaceholderScreen label="Explore" />;
const AnalyticsScreen = () => <PlaceholderScreen label="Analytics" />;
const AssetsScreen    = () => <PlaceholderScreen label="Assets" />;

const placeholderStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#b6d82c', fontSize: moderateScale(18), fontWeight: 'bold' },
});
// ────────────────────────────────────────────────────────────────────────────

// The Profile tab is its own stack so Overview/Content/Pricing can
// be pushed on top of HomeScreen with the teal gradient header.
const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' } }}>
    <ProfileStack.Screen name="Home"     component={HomeScreen} />
    <ProfileStack.Screen name="Overview" component={OverviewScreen} />
    <ProfileStack.Screen name="Content"  component={ContentScreen} />
    <ProfileStack.Screen name="Pricing"  component={PricingScreen} />
  </ProfileStack.Navigator>
);

// ── Tab icon components ──────────────────────────────────────────────────────
// Using simple text glyphs until you add react-native-vector-icons properly.
// Swap these out for <Icon> components whenever you're ready.
const TabIcon = ({ emoji, focused }: { emoji: string; focused: boolean }) => (
  <Text style={{ fontSize: moderateScale(20), opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
);
// ────────────────────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0A',
          borderTopColor: '#1C1C1E',
          borderTopWidth: 1,
          height: verticalScale(60),
          paddingBottom: verticalScale(8),
          paddingTop: verticalScale(6),
        },
        tabBarActiveTintColor: '#00b9c0',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: moderateScale(10),
          fontWeight: '600',
          marginTop: verticalScale(2),
        },
      }}
    >
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Campaigns"
        component={CampaignsScreen}
        options={{
          tabBarLabel: 'Campaigns',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📣" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🔍" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📊" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Assets"
        component={AssetsScreen}
        options={{
          tabBarLabel: 'Assets',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🗂️" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;