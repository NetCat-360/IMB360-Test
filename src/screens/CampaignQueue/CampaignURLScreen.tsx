// src/screens/CampaignQueue/CampaignURLScreen.tsx

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../config/theme';

import Typography from '../../styles/typography';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/scaling';

import {
  CampaignURLScreenProps,
} from '../../types/navigation';

type Props = CampaignURLScreenProps;

export default function CampaignURLScreen({
  navigation,
  route,
}: Props) {
  const { campaignId, url } = route.params || {};

  const [campaignURL, setCampaignURL] = useState(
    url || '',
  );

  const handleSubmit = () => {
    if (!campaignURL.trim()) {
      Alert.alert(
        'Validation Error',
        'Please enter a campaign URL.',
      );
      return;
    }

    Alert.alert(
      'Success',
      'Campaign URL submitted successfully.',
    );

    navigation.goBack();
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.bgBlack}
      />

      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Campaign URL
          </Text>

          <View style={styles.placeholder} />
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.label}>
            Campaign ID
          </Text>

          <Text style={styles.campaignId}>
            {campaignId || 'No Campaign ID'}
          </Text>

          <Text style={styles.label}>
            Campaign URL
          </Text>

          <TextInput
            value={campaignURL}
            onChangeText={setCampaignURL}
            placeholder="https://example.com"
            placeholderTextColor="#777"
            style={styles.input}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>
              Submit URL
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },

  contentContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(40),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },

  backButton: {
    width: scale(42),
    height: scale(42),
    borderRadius: scale(21),
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    color: '#FFF',
    fontSize: moderateScale(22),
    fontWeight: '700',
  },

  headerTitle: {
    color: '#FFF',
    fontSize: moderateScale(20),
    fontWeight: '700',
  },

  placeholder: {
    width: scale(42),
  },

  card: {
    backgroundColor: '#111',
    borderRadius: moderateScale(18),
    padding: scale(20),
    borderWidth: 1,
    borderColor: '#1F1F1F',
  },

  label: {
    ...Typography.body,
    color: Colors.textMuted,
    marginBottom: verticalScale(8),
  },

  campaignId: {
    ...Typography.h3,
    marginBottom: verticalScale(22),
  },

  input: {
    height: verticalScale(55),
    borderRadius: moderateScale(14),
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: scale(16),
    color: '#FFF',
    marginTop: verticalScale(6),
    marginBottom: verticalScale(28),
  },

  submitButton: {
    height: verticalScale(55),
    borderRadius: moderateScale(14),
    backgroundColor: Colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitText: {
    color: '#000',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
});