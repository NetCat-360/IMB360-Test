import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

// ── Placeholder ─────────────────────────────────────────────────────────────
// Replace this with your real HomeScreen import once it's built:
// import HomeScreen from '../screens/home';
const HomeScreen = () => (
  <View style={placeholderStyles.container}>
    <Text style={placeholderStyles.text}>🏠 Home — App Shell Placeholder</Text>
  </View>
);

const placeholderStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  text: { color: '#b6d82c', fontSize: 18, fontWeight: 'bold' },
});
// ────────────────────────────────────────────────────────────────────────────

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      // Home is always the entry point for authenticated users
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // Re-enable gestures inside the app
      }}
    >
      {/* ── Main App Screens go here ────────────── */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/*
        Future screens get added here as the app grows, for example:
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} />
      */}
    </Stack.Navigator>
  );
};

export default AppNavigator;