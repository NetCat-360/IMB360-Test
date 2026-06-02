import React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import styles from './styles';

export default function AnalyticsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />
      <View style={styles.content}>
        <Text style={Typography.h2}>Analytics</Text>
        <Text style={[Typography.body, { color: Colors.textSecondary }]}>
          View your performance analytics here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
