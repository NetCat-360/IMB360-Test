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

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />
      <View style={styles.content}>
        <Text style={Typography.h2}>Explore</Text>
        <Text style={[Typography.body, { color: Colors.textSecondary }]}>
          Discover new opportunities here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
