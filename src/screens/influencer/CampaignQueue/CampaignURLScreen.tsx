// src/screens/CampaignQueue/CampaignURLScreen.tsx

import React, { useState } from 'react';

import {
  View,
  Text,
  Pressable,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextField from '../../../components/common/TextField/TextField';

import {
  CampaignURLScreenProps,
} from '../../../types/navigation';
import { Colors } from '../../../config/theme';
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
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              ←
            </Text>
          </Pressable>

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

          <TextField
            value={campaignURL}
            onChangeText={setCampaignURL}
            placeholder="https://example.com"
            placeholderTextColor="#777"
            style={styles.input}
            autoCapitalize="none"
          />

          <Pressable
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>
              Submit URL
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      </SafeAreaView>
    </>
  );
}

