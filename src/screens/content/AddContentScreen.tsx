// src/screens/content/AddContentScreen.tsx
import React, { useState } from 'react';
import {
  View, Text, Pressable, ScrollView,
  StatusBar, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import TextField from '../../components/common/TextField/TextField';
import { Colors } from '../../config/theme';
import { AppNavigationProp } from '../../types/navigation';
import { addDropStyles as dropStyles, addPickerStyles as pickerStyles, addContentStyles as styles } from './styles';

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
  <Pressable style={dropStyles.container} onPress={onPress}>
    <Text style={[dropStyles.text, !value && dropStyles.placeholder]}>
      {value || label}
    </Text>
    <Text style={dropStyles.arrow}>▾</Text>
  </Pressable>
);



// Simple inline picker overlay
const PickerOverlay = ({
  options, onSelect, onClose,
}: { options: string[]; onSelect: (v: string) => void; onClose: () => void }) => (
  <View style={pickerStyles.overlay}>
    <Pressable style={pickerStyles.backdrop} onPress={onClose} />
    <View style={pickerStyles.sheet}>
      <FlatList
        data={options}
        keyExtractor={opt => opt}
        renderItem={({ item }) => (
          <Pressable
            style={pickerStyles.option}
            onPress={() => { onSelect(item); onClose(); }}
          >
            <Text style={pickerStyles.optionText}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  </View>
);



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
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </Pressable>
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
          <Pressable style={styles.uploadBtn}>
            <Text style={styles.uploadBtnText}>Select From Gallery</Text>
            <Text style={styles.uploadArrow}>▾</Text>
          </Pressable>

          <Text style={styles.fieldLabel}>Add Content URL</Text>
          <TextField
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
          <Pressable
            style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
            disabled={!canSave}
            onPress={() => {
              // TODO: Replace with real API POST
              navigation.goBack();
            }}
          >
            <LinearGradient
              colors={canSave ? [Colors.teal, Colors.lime] : ['#333', '#333']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveBtnGradient}
            >
              <Text style={styles.saveBtnText}>Save Changes</Text>
            </LinearGradient>
          </Pressable>
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



export default AddContentScreen; 