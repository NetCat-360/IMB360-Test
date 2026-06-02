// src/screens/pricing/AddPricingScreen.tsx
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
import { addDropStyles as dropStyles, addPickerStyles as pickerStyles, addPiStyles as piStyles, addPriceStyles as styles } from './styles';

type Props = { navigation: AppNavigationProp<'AddPricing'> };

const PLATFORMS = [
  'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Snapchat',
  'LinkedIn', 'Twitter', 'Pinterest', 'Telegram', 'WhatsApp', 'Twitch',
];

const Dropdown = ({
  label, value, onPress,
}: { label: string; value: string; onPress: () => void }) => (
  <Pressable style={dropStyles.container} onPress={onPress}>
    <Text style={[dropStyles.text, !value && dropStyles.placeholder]}>{value || label}</Text>
    <Text style={dropStyles.arrow}>▾</Text>
  </Pressable>
);



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
          <Pressable style={pickerStyles.option} onPress={() => { onSelect(item); onClose(); }}>
            <Text style={pickerStyles.optionText}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  </View>
);



const PriceInput = ({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) => (
  <View style={piStyles.row}>
    <Text style={piStyles.label}>{label}</Text>
    <TextField
      style={piStyles.input}
      placeholder="Set Price"
      placeholderTextColor={Colors.textMuted}
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
    />
  </View>
);



const AddPricingScreen = ({ navigation }: Props) => {
  const [platform, setPlatform] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [prices, setPrices] = useState({
    reels: '', story: '', post: '', shortVideo: '', longVideo: '', meetup: '',
  });

  const update = (key: keyof typeof prices) => (val: string) =>
    setPrices(p => ({ ...p, [key]: val }));

  const canSave = !!platform;

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
          <Text style={styles.headerTitle}>Add Pricing</Text>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionLabel}>Select Platform</Text>
          <Dropdown label="Select Platform" value={platform} onPress={() => setShowPicker(true)} />

          <Text style={styles.sectionLabel}>Set Rates</Text>
          <PriceInput label="Reels"          value={prices.reels}       onChange={update('reels')} />
          <PriceInput label="Story"          value={prices.story}       onChange={update('story')} />
          <PriceInput label="Post"           value={prices.post}        onChange={update('post')} />
          <PriceInput label="Short Video"    value={prices.shortVideo}  onChange={update('shortVideo')} />
          <PriceInput label="Long Video"     value={prices.longVideo}   onChange={update('longVideo')} />
          <PriceInput label="Meetup / Collab" value={prices.meetup}    onChange={update('meetup')} />
        </ScrollView>

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

      {showPicker && (
        <PickerOverlay options={PLATFORMS} onSelect={setPlatform} onClose={() => setShowPicker(false)} />
      )}
    </>
  );
};



export default AddPricingScreen; 