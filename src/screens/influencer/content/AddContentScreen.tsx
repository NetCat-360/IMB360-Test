// src/screens/content/AddContentScreen.tsx
import React, { useReducer, useCallback } from 'react';
import {
  View, Text, Pressable, ScrollView,
  StatusBar, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import TextField from '../../../components/common/TextField/TextField';
import { Colors } from '../../../config/theme';
import { AppNavigationProp } from '../../../types/navigation';
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
}: { options: string[]; onSelect: (v: string) => void; onClose: () => void }) => {
  const handleOptionPress = useCallback((item: string) => {
    onSelect(item);
    onClose();
  }, [onSelect, onClose]);

  const renderPickerItem = useCallback(({ item }: { item: string }) => (
    <Pressable
      style={pickerStyles.option}
      onPress={() => handleOptionPress(item)}
    >
      <Text style={pickerStyles.optionText}>{item}</Text>
    </Pressable>
  ), [handleOptionPress]);

  return (
    <View style={pickerStyles.overlay}>
      <Pressable style={pickerStyles.backdrop} onPress={onClose} />
      <View style={pickerStyles.sheet}>
        <FlatList
          data={options}
          keyExtractor={opt => opt}
          renderItem={renderPickerItem}
        />
      </View>
    </View>
  );
};



type FormAction =
  | { type: 'SET_PLATFORM'; payload: string }
  | { type: 'SET_CONTENT_TYPE'; payload: string }
  | { type: 'SET_CONTENT_URL'; payload: string };

interface FormState {
  platform: string;
  contentType: string;
  contentUrl: string;
}

const initialFormState: FormState = {
  platform: '',
  contentType: '',
  contentUrl: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_PLATFORM':
      return { ...state, platform: action.payload };
    case 'SET_CONTENT_TYPE':
      return { ...state, contentType: action.payload };
    case 'SET_CONTENT_URL':
      return { ...state, contentUrl: action.payload };
    default:
      return state;
  }
}

type PickerAction =
  | { type: 'SET_SHOW_PLATFORM_PICKER'; payload: boolean }
  | { type: 'SET_SHOW_TYPE_PICKER'; payload: boolean };

interface PickerState {
  showPlatformPicker: boolean;
  showTypePicker: boolean;
}

const initialPickerState: PickerState = {
  showPlatformPicker: false,
  showTypePicker: false,
};

function pickerReducer(state: PickerState, action: PickerAction): PickerState {
  switch (action.type) {
    case 'SET_SHOW_PLATFORM_PICKER':
      return { ...state, showPlatformPicker: action.payload };
    case 'SET_SHOW_TYPE_PICKER':
      return { ...state, showTypePicker: action.payload };
    default:
      return state;
  }
}

const AddContentScreen = ({ navigation }: Props) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
  const [pickerState, dispatchPicker] = useReducer(pickerReducer, initialPickerState);

  const canSave = formState.platform && formState.contentType;

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
            value={formState.platform}
            onPress={() => dispatchPicker({ type: 'SET_SHOW_PLATFORM_PICKER', payload: true })}
          />

          <Text style={styles.fieldLabel}>Type</Text>
          <Dropdown
            label="Select Content Type"
            value={formState.contentType}
            onPress={() => dispatchPicker({ type: 'SET_SHOW_TYPE_PICKER', payload: true })}
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
            value={formState.contentUrl}
            onChangeText={(text) => dispatchForm({ type: 'SET_CONTENT_URL', payload: text })}
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

      {pickerState.showPlatformPicker && (
        <PickerOverlay
          options={PLATFORMS}
          onSelect={(v) => dispatchForm({ type: 'SET_PLATFORM', payload: v })}
          onClose={() => dispatchPicker({ type: 'SET_SHOW_PLATFORM_PICKER', payload: false })}
        />
      )}
      {pickerState.showTypePicker && (
        <PickerOverlay
          options={CONTENT_TYPES}
          onSelect={(v) => dispatchForm({ type: 'SET_CONTENT_TYPE', payload: v })}
          onClose={() => dispatchPicker({ type: 'SET_SHOW_TYPE_PICKER', payload: false })}
        />
      )}
    </>
  );
};



export default AddContentScreen; 