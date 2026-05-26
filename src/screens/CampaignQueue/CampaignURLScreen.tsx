// src/screens/CampaignQueue/CampaignURLScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StatusBar, StyleSheet, TextInput, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import { AppNavigationProp, AppRouteProp } from '../../types/navigation';

type Props = {
  navigation: AppNavigationProp<'CampaignURL'>;
  route: AppRouteProp<'CampaignURL'>;
};

const PLATFORMS = [
  'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Snapchat',
  'LinkedIn', 'Twitter', 'Pinterest', 'Telegram', 'WhatsApp',
];

const Dropdown = ({ label, value, onPress }: { label: string; value: string; onPress: () => void }) => (
  <TouchableOpacity style={dropStyles.container} onPress={onPress} activeOpacity={0.8}>
    <Text style={[dropStyles.text, !value && dropStyles.placeholder]}>{value || label}</Text>
    <Text style={dropStyles.arrow}>▾</Text>
  </TouchableOpacity>
);
const dropStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.bgInput, borderRadius: moderateScale(10),
    paddingHorizontal: scale(14), paddingVertical: verticalScale(12),
    marginBottom: verticalScale(20), borderWidth: 1, borderColor: Colors.borderStrong,
  },
  text: { color: Colors.textPrimary, fontSize: moderateScale(14), fontFamily: 'Poppins-Regular' },
  placeholder: { color: Colors.textMuted },
  arrow: { color: Colors.textMuted, fontSize: moderateScale(14) },
});

const PickerOverlay = ({ options, onSelect, onClose }: { options: string[]; onSelect: (v: string) => void; onClose: () => void }) => (
  <View style={pickerStyles.overlay}>
    <TouchableOpacity style={pickerStyles.backdrop} onPress={onClose} />
    <View style={pickerStyles.sheet}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {options.map(opt => (
          <TouchableOpacity key={opt} style={pickerStyles.option} onPress={() => { onSelect(opt); onClose(); }}>
            <Text style={pickerStyles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  </View>
);
const pickerStyles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: moderateScale(20), borderTopRightRadius: moderateScale(20),
    maxHeight: verticalScale(340), paddingVertical: verticalScale(8),
  },
  option: {
    paddingHorizontal: scale(20), paddingVertical: verticalScale(13),
    borderBottomWidth: 1, borderBottomColor: Colors.borderDefault,
  },
  optionText: { color: Colors.textPrimary, fontSize: moderateScale(14), fontFamily: 'Poppins-Regular' },
});

const CampaignURLScreen = ({ navigation, route }: Props) => {
  const { campaignId } = route.params;
  const [platform, setPlatform] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const canSave = !!platform && !!contentUrl;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Campaign URL</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

          {/* Campaign info card */}
          <View style={styles.campaignCard}>
            <Image
              source={require('../../assets/images/earningcard.png')}
              style={styles.brandLogo}
            />
            <View>
              <Text style={styles.brandLabel}>Brand: <Text style={styles.brandValue}>Softiwo_IT Services</Text></Text>
              <Text style={styles.brandLabel}>Campaign Name: <Text style={styles.brandValue}>Softiwo_IT Services</Text></Text>
            </View>
          </View>

          <Text style={styles.fieldLabel}>Select Platform</Text>
          <Dropdown label="Select Platform" value={platform} onPress={() => setShowPicker(true)} />

          <Text style={styles.fieldLabel}>Add Content URL</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. https://example.com"
            placeholderTextColor={Colors.textMuted}
            value={contentUrl}
            onChangeText={setContentUrl}
            keyboardType="url"
            autoCapitalize="none"
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
            disabled={!canSave}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={canSave ? [Colors.teal, Colors.lime] : ['#333', '#333']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.saveBtnGradient}
            >
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {showPicker && <PickerOverlay options={PLATFORMS} onSelect={setPlatform} onClose={() => setShowPicker(false)} />}
    </>
  );
};

const styles = StyleSheet.create({
  header: { width: '100%' },
  headerInner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: scale(16), paddingBottom: verticalScale(14), paddingTop: verticalScale(4) },
  backBtn: { marginRight: scale(12), padding: scale(4) },
  backBtnText: { color: '#000', fontSize: moderateScale(22), fontWeight: 'bold' },
  headerTitle: { color: '#000', fontSize: moderateScale(20), fontWeight: 'bold' },
  body: { flex: 1, backgroundColor: Colors.bgBlack },
  scrollContent: { paddingHorizontal: scale(20), paddingTop: verticalScale(24), paddingBottom: verticalScale(20) },

  campaignCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: moderateScale(12),
    padding: scale(14),
    marginBottom: verticalScale(24),
    borderWidth: 1,
    borderColor: Colors.borderStrong,
    gap: scale(12),
  },
  brandLogo: { width: scale(44), height: scale(44), borderRadius: scale(22), backgroundColor: '#fff', resizeMode: 'contain' },
  brandLabel: { color: Colors.textMuted, fontSize: moderateScale(12), fontFamily: 'Poppins-Regular', marginBottom: verticalScale(2) },
  brandValue: { color: Colors.textPrimary, fontFamily: 'Poppins-Medium' },

  fieldLabel: { color: Colors.textSecondary, fontSize: moderateScale(13), fontFamily: 'Poppins-Medium', marginBottom: verticalScale(6) },
  input: {
    backgroundColor: Colors.bgInput, borderRadius: moderateScale(10),
    paddingHorizontal: scale(14), paddingVertical: verticalScale(12),
    marginBottom: verticalScale(14), color: Colors.textPrimary,
    fontSize: moderateScale(14), fontFamily: 'Poppins-Regular',
    borderWidth: 1, borderColor: Colors.borderStrong,
  },
  footer: { paddingHorizontal: scale(20), paddingVertical: verticalScale(16), borderTopWidth: 1, borderTopColor: Colors.borderDefault },
  saveBtn: { borderRadius: moderateScale(12), overflow: 'hidden' },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnGradient: { paddingVertical: verticalScale(14), alignItems: 'center' },
  saveBtnText: { color: '#000', fontSize: moderateScale(16), fontFamily: 'Poppins-SemiBold' },
});

export default CampaignURLScreen;
