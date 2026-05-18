import React, { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, TextInput, StatusBar,
  KeyboardAvoidingView, Platform, StyleSheet, Modal, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';
import { COUNTRIES } from '../../../utils/countries';
import { AuthNavigationProp, AuthRouteProp } from '../../../types/navigation';
import FloatingInput from '../../../components/common/FloatingInput';
import { useToast } from '../../../hooks/useToast';
import styles from './styles';

interface Country {
  code: string;
  flag: string;
  name: string;
  callingCode: string;
}

// Typed props — no more 'any'
type Props = {
  navigation: AuthNavigationProp<'Register'>;
  route: AuthRouteProp<'Register'>;
};

const RegisterScreen = ({ navigation, route }: Props) => {
  const userRole = route?.params?.role || 'CREATOR';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'US',
    flag: '🇺🇸',
    name: 'United States',
    callingCode: '+1',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Single line replaces ~30 lines of duplicated toast logic
  const { message: toastMessage, toastOpacity, showToast } = useToast();

  const isEmailValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

  const isFormComplete =
    name.trim() !== '' &&
    isEmailValid(email) &&
    phone.trim() !== '' &&
    password.trim() !== '';

  const filteredCountries = COUNTRIES.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.callingCode.includes(searchQuery)
  );

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearchQuery('');
  };

  const validateAndSubmit = async () => {
    if (!toggleCheckBox) {
      showToast('Please accept the Privacy Policy and Terms of use.');
      return;
    }

    const signupDataPayload = {
      fullName: name,
      emailAddress: email.toLowerCase().trim(),
      phoneNumber: `${selectedCountry.callingCode}${phone}`,
      password,
      role: userRole,
    };

    // TODO: Replace with real API call
    console.log('Sending Registration Payload to API Backend:', signupDataPayload);
    showToast(`Account created successfully as a ${userRole}!`);
  };

  const handleSendVerificationCode = () => {
    if (!isEmailValid(email)) {
      showToast('Please enter a valid email address.');
      return;
    }
    // TODO: Replace with real API call
    showToast('Verification code sent successfully!');
  };

  // Animated style for the toast slide-up effect
  const animatedToastStyle = useAnimatedStyle(() => ({
    opacity: toastOpacity.value,
    transform: [{ translateY: interpolate(toastOpacity.value, [0, 1], [15, 0]) }],
  }));

  const renderCountryCodePicker = () => (
    <TouchableOpacity
      style={localStyles.codePickerWrapper}
      activeOpacity={0.7}
      onPress={() => setModalVisible(true)}
    >
      <Text style={localStyles.flagText}>{selectedCountry.flag}</Text>
      <Text style={localStyles.callingCodeText}>{selectedCountry.callingCode}</Text>
      <Text style={localStyles.dropdownArrow}>▼</Text>
    </TouchableOpacity>
  );

  const renderVerificationButton = () => (
    <TouchableOpacity onPress={handleSendVerificationCode} style={styles.inlineActionWrapper}>
      <Text style={styles.inlineActionText}>Send Code</Text>
    </TouchableOpacity>
  );

  const renderPasswordToggle = () => (
    <TouchableOpacity
      onPress={() => setSecurePassword(!securePassword)}
      style={styles.inlineActionWrapper}
    >
      <Text style={[styles.inlineActionText, { color: '#666666' }]}>
        {securePassword ? 'Show' : 'Hide'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.fixedContentContainer}>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <View style={styles.formFlowWrapper}>
            <Image
              source={require('../../../assets/images/IMB360_v2.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.screenHeaderTitle}>CREATE YOUR ACCOUNT</Text>

            {/* All inputs now use the shared FloatingInput component */}
            <FloatingInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <FloatingInput
              label="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              rightComponent={renderVerificationButton()}
            />

            <FloatingInput
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              prefixComponent={renderCountryCodePicker()}
            />

            <FloatingInput
              label="Create a Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={securePassword}
              rightComponent={renderPasswordToggle()}
            />

            <Text style={styles.passRequirementText}>
              Password must be 8 characters long and must contain a special character, number, a-z, A-Z.
            </Text>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.customCheckbox, toggleCheckBox && styles.customCheckboxChecked]}
                onPress={() => setToggleCheckBox(!toggleCheckBox)}
              >
                {toggleCheckBox && <Text style={styles.checkmarkIcon}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>
                I accept{' '}
                <Text style={styles.underlineText}>Privacy Policy</Text>
                {' '}and{' '}
                <Text style={styles.underlineText}>Terms of use</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, { opacity: isFormComplete ? 1 : 0.4 }]}
              onPress={validateAndSubmit}
              disabled={!isFormComplete}
            >
              <LinearGradient
                colors={['#00b9c0', '#b6d82c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButtonLayout}
              >
                <Text style={styles.submitButtonText}>Register</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.dividerText}>Or continue with</Text>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={require('../../../assets/images/apple.png')}
                  style={[styles.socialIcon, { tintColor: '#ffffff' }]}
                />
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.redirectLinkWrapper}
          >
            <Text style={styles.footerRedirectText}>
              Already have an account? <Text style={styles.linkTextInline}>Login</Text>
            </Text>
          </TouchableOpacity>

          {toastMessage ? (
            <Animated.View style={[styles.toastContainer, animatedToastStyle]}>
              <Text style={styles.toastText}>{toastMessage}</Text>
            </Animated.View>
          ) : null}

        </View>
      </KeyboardAvoidingView>

      {/* Country Selection Overlay Sheet */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            <View style={localStyles.modalHeader}>
              <Text style={localStyles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => { setModalVisible(false); setSearchQuery(''); }}>
                <Text style={localStyles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={localStyles.searchBar}
              placeholder="Search country name or calling code..."
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />

            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.code}
              initialNumToRender={15}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={localStyles.countryItem}
                  onPress={() => handleCountrySelect(item)}
                >
                  <Text style={localStyles.itemFlag}>{item.flag}</Text>
                  <Text style={localStyles.itemName}>{item.name}</Text>
                  <Text style={localStyles.itemCallingCode}>{item.callingCode}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  codePickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: scale(12),
    paddingRight: scale(8),
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#2C2C2E',
    marginRight: scale(8),
  },
  flagText: {
    fontSize: moderateScale(16),
    marginRight: scale(4),
  },
  callingCodeText: {
    color: '#ffffff',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  dropdownArrow: {
    color: '#666666',
    fontSize: moderateScale(9),
    marginLeft: scale(4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#121214',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    height: '75%',
    paddingTop: verticalScale(20),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(15),
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  closeButton: {
    color: '#666666',
    fontSize: moderateScale(18),
    padding: scale(4),
  },
  searchBar: {
    backgroundColor: '#1C1C1E',
    color: '#ffffff',
    borderRadius: moderateScale(8),
    height: verticalScale(42),
    paddingHorizontal: scale(12),
    marginHorizontal: scale(20),
    marginBottom: verticalScale(15),
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  itemFlag: {
    fontSize: moderateScale(20),
    marginRight: scale(14),
  },
  itemName: {
    flex: 1,
    color: '#ffffff',
    fontSize: moderateScale(15),
  },
  itemCallingCode: {
    color: '#b6d82c',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});

export default RegisterScreen;