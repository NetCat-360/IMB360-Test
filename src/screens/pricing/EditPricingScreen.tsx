// src/screens/pricing/EditPricingScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StatusBar, StyleSheet, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import { AppNavigationProp, AppRouteProp } from '../../types/navigation';

type Props = {
  navigation: AppNavigationProp<'EditPricing'>;
  route: AppRouteProp<'EditPricing'>;
};

const PLATFORMS = [
  'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Snapchat',
  'LinkedIn', 'Twitter', 'Pinterest', 'Telegram', 'WhatsApp', 'Twitch',
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
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.7)' },
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

const PriceInput = ({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) => (
  <View style={piStyles.row}>
    <Text style={piStyles.label}>{label}</Text>
    <TextInput
      style={piStyles.input}
      placeholder="Set Price"
      placeholderTextColor={Colors.textMuted}
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
    />
  </View>
);

const piStyles = StyleSheet.create({
  row: { marginBottom: verticalScale(14) },
  label: { color: Colors.textSecondary, fontSize: moderateScale(13), fontFamily: 'Poppins-Medium', marginBottom: verticalScale(6) },
  input: {
    backgroundColor: Colors.bgInput, borderRadius: moderateScale(10),
    paddingHorizontal: scale(14), paddingVertical: verticalScale(11),
    color: Colors.textPrimary, fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular', borderWidth: 1, borderColor: Colors.borderStrong,
  },
});

const EditPricingScreen = ({ navigation, route }: Props) => {
  // Pre-populate with existing data — swap with lookup by route.params.pricingId
  const [platform, setPlatform] = useState('Instagram');
  const [showPicker, setShowPicker] = useState(false);
  const [prices, setPrices] = useState({ reels: '₱ 1200', story: '₱ 1200', post: '₱ 1200', shortVideo: '₱ 1200', longVideo: '₱ 1200', meetup: '₱ 1200' });
  const update = (key: keyof typeof prices) => (val: string) => setPrices(p => ({ ...p, [key]: val }));

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Pricing</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.sectionLabel}>Select Platform</Text>
          <Dropdown label="Select Platform" value={platform} onPress={() => setShowPicker(true)} />
          <Text style={styles.sectionLabel}>Set Rates</Text>
          <PriceInput label="Reels"           value={prices.reels}      onChange={update('reels')} />
          <PriceInput label="Story"           value={prices.story}      onChange={update('story')} />
          <PriceInput label="Post"            value={prices.post}       onChange={update('post')} />
          <PriceInput label="Short Video"     value={prices.shortVideo} onChange={update('shortVideo')} />
          <PriceInput label="Long Video"      value={prices.longVideo}  onChange={update('longVideo')} />
          <PriceInput label="Meetup / Collab" value={prices.meetup}     onChange={update('meetup')} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()} activeOpacity={0.85}>
            <LinearGradient colors={[Colors.teal, Colors.lime]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveBtnGradient}>
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
  sectionLabel: { color: Colors.textSecondary, fontSize: moderateScale(13), fontFamily: 'Poppins-Medium', marginBottom: verticalScale(8) },
  footer: { paddingHorizontal: scale(20), paddingVertical: verticalScale(16), borderTopWidth: 1, borderTopColor: Colors.borderDefault },
  saveBtn: { borderRadius: moderateScale(12), overflow: 'hidden' },
  saveBtnGradient: { paddingVertical: verticalScale(14), alignItems: 'center' },
  saveBtnText: { color: '#000', fontSize: moderateScale(16), fontFamily: 'Poppins-SemiBold' },
});

export default EditPricingScreen;