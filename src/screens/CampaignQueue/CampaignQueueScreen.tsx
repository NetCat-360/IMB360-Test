// src/screens/CampaignQueue/CampaignQueueScreen.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Placeholder screen so the Campaign Queue menu item on HomeScreen
// doesn't dead-end. Replace the content with real campaign data from the API.
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import Typography from '../../styles/typography';
import { AppNavigationProp } from '../../types/navigation';

type Props = {
  navigation: AppNavigationProp<'CampaignQueue'>;
};

const CampaignQueueScreen = ({ navigation }: Props) => {
  return (
    <>
      <LinearGradient
        colors={[Colors.teal, Colors.lime]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Image
              source={require('../../assets/images/backbutton.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Campaign Queue</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        <Text style={[Typography.h2, { textAlign: 'center', marginBottom: verticalScale(8) }]}>
          Coming Soon
        </Text>
        <Text style={[Typography.body, { color: Colors.textMuted, textAlign: 'center' }]}>
          Your active and pending campaign collaborations will appear here.
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%' },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(14),
    paddingTop: verticalScale(4),
  },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backIcon: { width: scale(30), height: scale(30), resizeMode: 'contain' },
  headerTitle: {
    color: '#000000',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
  },
});

export default CampaignQueueScreen;
