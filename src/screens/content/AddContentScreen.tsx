// src/screens/content/AddContentScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StatusBar, StyleSheet, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';
import { AppNavigationProp } from '../../types/navigation';

type Props = { navigation: AppNavigationProp<'AddContent'> };

const PLATFORMS = [
  'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Snapchat',
  'LinkedIn', 'Twitter', 'Pinterest', 'Telegram', 'WhatsApp',
  'Quora', 'Reddit', 'Discord', 'WeChat', 'Weibo',
  'Kuaishou', 'Douyin', 'VK (VKontakte)', 'LINE', 'Threads',
  'Tumblr', 'Medium', 'BeReal', 'Lemon8',
];

const CONTENT_TYPES = ['Image', 'Reel', 'Story', 'Post', 'Short Video', 'Long Video'];

const Dropdown = ({
  label, value, onPress,
}: { label: string; value: string; onPress: () => void }) => (
  <TouchableOpacity style={dropStyles.container} onPress={onPress} activeOpacity={0.8}>
    <Text style={[dropStyles.text, !value && dropStyles.placeholder]}>
      {value || label}
    </Text>
    <Text style={dropStyles.arrow}>▾</Text>
  </TouchableOpacity>
);

const dropStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgInput,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(14),
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  text: { color: Colors.textPrimary, fontSize: moderateScale(14), fontFamily: 'Poppins-Regular' },
  placeholder: { color: Colors.textMuted },
  arrow: { color: Colors.textMuted, fontSize: moderateScale(14) },
});

// Simple inline picker overlay
const PickerOverlay = ({
  options, onSelect, onClose,
}: { options: string[]; onSelect: (v: string) => void; onClose: () => void }) => (
  <View style={pickerStyles.overlay}>
    <TouchableOpacity style={pickerStyles.backdrop} onPress={onClose} />
    <View style={pickerStyles.sheet}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt}
            style={pickerStyles.option}
            onPress={() => { onSelect(opt); onClose(); }}
          >
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
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: verticalScale(340),
    paddingVertical: verticalScale(8),
  },
  option: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(13),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },
  optionText: {
    color: Colors.textPrimary,
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
  },
});

const AddContentScreen = ({ navigation }: Props) => {
  const [platform, setPlatform] = useState('');
  const [contentType, setContentType] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);

  const canSave = platform && contentType;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <LinearGradient
        colors={[Colors.teal, Colors.lime]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']} style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Content</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.fieldLabel}>Select Platform</Text>
          <Dropdown
            label="Select Platform"
            value={platform}
            onPress={() => setShowPlatformPicker(true)}
          />

          <Text style={styles.fieldLabel}>Type</Text>
          <Dropdown
            label="Select Content Type"
            value={contentType}
            onPress={() => setShowTypePicker(true)}
          />

          <Text style={styles.fieldLabel}>Upload Media</Text>
          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
            <Text style={styles.uploadBtnText}>Select From Gallery</Text>
            <Text style={styles.uploadArrow}>▾</Text>
          </TouchableOpacity>

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

        {/* Save button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
            disabled={!canSave}
            onPress={() => {
              // TODO: Replace with real API POST
              navigation.goBack();
            }}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={canSave ? [Colors.teal, Colors.lime] : ['#333', '#333']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveBtnGradient}
            >
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {showPlatformPicker && (
        <PickerOverlay
          options={PLATFORMS}
          onSelect={setPlatform}
          onClose={() => setShowPlatformPicker(false)}
        />
      )}
      {showTypePicker && (
        <PickerOverlay
          options={CONTENT_TYPES}
          onSelect={setContentType}
          onClose={() => setShowTypePicker(false)}
        />
      )}
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
  backBtnText: { color: '#000', fontSize: moderateScale(22), fontWeight: 'bold' },
  headerTitle: { color: '#000', fontSize: moderateScale(20), fontWeight: 'bold' },

  body: { flex: 1, backgroundColor: Colors.bgBlack },
  scrollContent: { paddingHorizontal: scale(20), paddingTop: verticalScale(24), paddingBottom: verticalScale(20) },

  fieldLabel: {
    color: Colors.textSecondary,
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Medium',
    marginBottom: verticalScale(6),
  },

  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.bgInput,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(14),
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  uploadBtnText: { color: Colors.textMuted, fontSize: moderateScale(14), fontFamily: 'Poppins-Regular' },
  uploadArrow: { color: Colors.textMuted, fontSize: moderateScale(14) },

  input: {
    backgroundColor: Colors.bgInput,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(14),
    color: Colors.textPrimary,
    fontSize: moderateScale(14),
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },

  footer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: Colors.borderDefault,
  },
  saveBtn: { borderRadius: moderateScale(12), overflow: 'hidden' },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnGradient: {
    paddingVertical: verticalScale(14),
    alignItems: 'center',
  },
  saveBtnText: { color: '#000', fontSize: moderateScale(16), fontFamily: 'Poppins-SemiBold' },
});

export default AddContentScreen; 