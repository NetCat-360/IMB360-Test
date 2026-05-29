// src/screens/CampaignQueue/CampaignURLScreen.tsx

import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CampaignURLScreenProps,
} from '../../types/navigation';
import { urlStyles as styles } from './styles';

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

