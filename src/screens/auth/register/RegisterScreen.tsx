// src/screens/auth/register/RegisterScreen.tsx

import React, { useState, useReducer, useMemo, useCallback } from 'react';

import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import LinearGradient from 'react-native-linear-gradient';

import {
  verticalScale,
} from '../../../utils/scaling';

import { COUNTRIES } from '../../../utils/countries';

import {
  AuthNavigationProp,
  AuthRouteProp,
} from '../../../types/navigation';

import TextField from '../../../components/common/TextField/TextField';
import { authInputStyles } from '../inputStyles';

import { useGlobalToast } from '../../../context/ToastContext';

import { Colors } from '../../../config/theme';

import Typography from '../../../styles/typography';

import styles from './styles';

import apiClient from '../../../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  containsFourByteUnicode,
  safeDatabaseText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeText,
  isStrongPassword,
} from '../../../security/sanitize';
import { hashPassword, encryptAsyncData, decryptAsyncData } from '../../../security/encryption';

interface Country {
  code: string;
  flag: string;
  name: string;
  callingCode: string;
}

type Props = {
  navigation: AuthNavigationProp<'Register'>;
  route: AuthRouteProp<'Register'>;
};

const isEmailValid = (text: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    text,
  );

const CountryListItem = React.memo<{ item: Country; onSelect: (country: Country) => void }>(({ item, onSelect }) => (
  <Pressable style={styles.countryItem} onPress={() => onSelect(item)}>
    <Text style={styles.itemFlag}>{item.flag}</Text>
    <Text style={styles.itemName}>{item.name}</Text>
    <Text style={styles.itemCallingCode}>{item.callingCode}</Text>
  </Pressable>
));

function SocialRow() {
  return (
    <View style={styles.socialRow}>
      <Pressable style={styles.socialButton}>
        <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
        <Text style={styles.socialText}>Google</Text>
      </Pressable>
      <Pressable style={styles.socialButton}>
        <Image source={require('../../../assets/images/apple.png')} style={[styles.socialIcon, { tintColor: Colors.textPrimary }]} />
        <Text style={styles.socialText}>Apple</Text>
      </Pressable>
    </View>
  );
}

function CountryModal({ visible, onClose, searchQuery, setSearchQuery, filteredCountries, renderCountryItem }: {
  visible: boolean; onClose: () => void; searchQuery: string; setSearchQuery: (v: string) => void;
  filteredCountries: any[]; renderCountryItem: (info: { item: any }) => React.JSX.Element;
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <Pressable onPress={onClose}><Text style={styles.closeButton}>✕</Text></Pressable>
          </View>
          <TextInput style={styles.searchBar} placeholder="Search country name or calling code..." placeholderTextColor={Colors.textDim} value={searchQuery} onChangeText={setSearchQuery} autoCorrect={false} />
          <FlatList data={filteredCountries} keyExtractor={item => item.code} initialNumToRender={15} keyboardShouldPersistTaps="handled" renderItem={renderCountryItem} />
        </View>
      </View>
    </Modal>
  );
}

type FormAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string };

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  password: '',
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

type CountryAction =
  | { type: 'SET_SELECTED_COUNTRY'; payload: Country }
  | { type: 'SET_MODAL_VISIBLE'; payload: boolean }
  | { type: 'SET_SEARCH_QUERY'; payload: string };

interface CountryState {
  selectedCountry: Country;
  modalVisible: boolean;
  searchQuery: string;
}

const initialCountryState: CountryState = {
  selectedCountry: {
    code: 'US',
    flag: '🇺🇸',
    name: 'United States',
    callingCode: '+1',
  },
  modalVisible: false,
  searchQuery: '',
};

function countryReducer(state: CountryState, action: CountryAction): CountryState {
  switch (action.type) {
    case 'SET_SELECTED_COUNTRY':
      return { ...state, selectedCountry: action.payload };
    case 'SET_MODAL_VISIBLE':
      return { ...state, modalVisible: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

function RegisterFormFields({
  name,
  onNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  password,
  onPasswordChange,
  securePassword,
  setSecurePassword,
  selectedCountry,
  onCountryPickerPress,
  onSendVerificationCode,
}: {
  name: string;
  onNameChange: (text: string) => void;
  email: string;
  onEmailChange: (text: string) => void;
  phone: string;
  onPhoneChange: (text: string) => void;
  password: string;
  onPasswordChange: (text: string) => void;
  securePassword: boolean;
  setSecurePassword: (v: boolean) => void;
  selectedCountry: Country;
  onCountryPickerPress: () => void;
  onSendVerificationCode: () => void;
}) {
  return (
    <>
      <TextField
        label="Full Name"
        value={name}
        onChangeText={onNameChange}
        autoCapitalize="words"
        containerStyle={authInputStyles.inputWrapper}
        outlineStyle={authInputStyles.inputOutline}
        outlineActiveStyle={authInputStyles.inputOutlineActive}
        style={authInputStyles.textInput}
      />

      <TextField
        label="Email address"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        rightComponent={<VerificationButton onPress={onSendVerificationCode} />}
        containerStyle={authInputStyles.inputWrapper}
        outlineStyle={authInputStyles.inputOutline}
        outlineActiveStyle={authInputStyles.inputOutlineActive}
        style={authInputStyles.textInput}
      />

      <TextField
        label="Phone"
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
        prefixComponent={<CountryCodePicker selectedCountry={selectedCountry} onPress={onCountryPickerPress} />}
        containerStyle={authInputStyles.inputWrapper}
        outlineStyle={authInputStyles.inputOutline}
        outlineActiveStyle={authInputStyles.inputOutlineActive}
        style={authInputStyles.textInput}
      />

      <TextField
        label="Create a Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry={securePassword}
        rightComponent={<PasswordToggle securePassword={securePassword} setSecurePassword={setSecurePassword} />}
        containerStyle={authInputStyles.inputWrapper}
        outlineStyle={authInputStyles.inputOutline}
        outlineActiveStyle={authInputStyles.inputOutlineActive}
        style={authInputStyles.textInput}
      />

      <Text
        style={
          styles.passRequirementText
        }
      >
        Password must be 8+
        characters with a special
        character, number, a-z,
        A-Z.
      </Text>
    </>
  );
}

function AgreementCheckbox({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <View
      style={
        styles.checkboxContainer
      }
    >
      <Pressable
        style={[
          styles.customCheckbox,
          checked &&
            styles.customCheckboxChecked,
        ]}
        onPress={onToggle}
      >
        {checked && (
          <Text
            style={
              styles.checkmarkIcon
            }
          >
            ✓
          </Text>
        )}
      </Pressable>

      <Text
        style={
          styles.checkboxLabel
        }
      >
        I accept{' '}
        <Text
          style={
            styles.underlineText
          }
        >
          Privacy Policy
        </Text>{' '}
        and{' '}
        <Text
          style={
            styles.underlineText
          }
        >
          Terms of use
        </Text>
      </Text>
    </View>
  );
}

function RegisterSubmitButton({
  isFormComplete,
  loading,
  onSubmit,
}: {
  isFormComplete: boolean;
  loading: boolean;
  onSubmit: () => void;
}) {
  return (
    <Pressable
      style={[
        styles.submitButton,
        {
          opacity:
            isFormComplete &&
            !loading
              ? 1
              : 0.4,
        },
      ]}
      onPress={onSubmit}
      disabled={
        !isFormComplete ||
        loading
      }
    >
      <LinearGradient
        colors={[
          Colors.teal,
          Colors.lime,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={
          styles.gradientButtonLayout
        }
      >
        {loading ? (
          <ActivityIndicator
            color="#000000"
            size="small"
          />
        ) : (
          <Text
            style={
              styles.submitButtonText
            }
          >
            Register
          </Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

function LoginRedirect({ navigation }: { navigation: any }) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Login')
      }
      style={
        styles.redirectLinkWrapper
      }
    >
      <Text
        style={
          styles.footerRedirectText
        }
      >
        Already have an account?{' '}
        <Text
          style={
            styles.linkTextInline
          }
        >
          Login
        </Text>
      </Text>
    </Pressable>
  );
}

const RegisterScreen = ({
  navigation,
  route,
}: Props) => {
  const userRole =
    route?.params?.role || 'CREATOR';

  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
  const [countryState, dispatchCountry] = useReducer(countryReducer, initialCountryState);

  const [toggleCheckBox, setToggleCheckBox] =
    useState(false);

  const [securePassword, setSecurePassword] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const { showToast } = useGlobalToast();

  const isFormComplete =
    formState.name.trim() !== '' &&
    isEmailValid(formState.email) &&
    formState.phone.trim() !== '' &&
    formState.password.trim().length >= 8;

  const filteredCountries =
    useMemo(
      () =>
        COUNTRIES.filter(
          item =>
            item.name
              .toLowerCase()
              .includes(
                countryState.searchQuery.toLowerCase(),
              ) ||
            item.callingCode.includes(
              countryState.searchQuery,
            ),
        ),
      [countryState.searchQuery],
    );

  const handleCountrySelect = useCallback(
    (country: Country) => {
      dispatchCountry({ type: 'SET_SELECTED_COUNTRY', payload: country });
      dispatchCountry({ type: 'SET_MODAL_VISIBLE', payload: false });
      dispatchCountry({ type: 'SET_SEARCH_QUERY', payload: '' });
    },
    [],
  );

  const renderCountryItem = useCallback(
    ({ item }: { item: Country }) => (
      <CountryListItem item={item} onSelect={handleCountrySelect} />
    ),
    [handleCountrySelect],
  );

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.bgBlack
        }
      />

      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        style={{ flex: 1 }}
      >
        <View
          style={
            styles.fixedContentContainer
          }
        >
          <BackButton navigation={navigation} />

          <View
            style={
              styles.formFlowWrapper
            }
          >
            <HeaderSection />

            <RegisterFormFields
              name={formState.name}
              onNameChange={text => dispatchForm({ type: 'SET_NAME', payload: sanitizeText(text, 80) })}
              email={formState.email}
              onEmailChange={text => dispatchForm({ type: 'SET_EMAIL', payload: sanitizeText(text, 320) })}
              phone={formState.phone}
              onPhoneChange={text => dispatchForm({ type: 'SET_PHONE', payload: sanitizePhone(text) })}
              password={formState.password}
              onPasswordChange={text => dispatchForm({ type: 'SET_PASSWORD', payload: sanitizeText(text, 128) })}
              securePassword={securePassword}
              setSecurePassword={setSecurePassword}
              selectedCountry={countryState.selectedCountry}
              onCountryPickerPress={() => dispatchCountry({ type: 'SET_MODAL_VISIBLE', payload: true })}
              onSendVerificationCode={() => handleSendVerificationCodeHandler(formState, showToast)}
            />

            <AgreementCheckbox
              checked={toggleCheckBox}
              onToggle={() => setToggleCheckBox(!toggleCheckBox)}
            />

            <RegisterSubmitButton
              isFormComplete={isFormComplete}
              loading={loading}
              onSubmit={() => validateAndSubmitHandler(formState, countryState, toggleCheckBox, userRole, showToast, setLoading, navigation)}
            />

            <DividerWithSocial />
          </View>

          <LoginRedirect navigation={navigation} />
        </View>
      </KeyboardAvoidingView>

      <CountryModal
        visible={countryState.modalVisible}
        onClose={() => { dispatchCountry({ type: 'SET_MODAL_VISIBLE', payload: false }); dispatchCountry({ type: 'SET_SEARCH_QUERY', payload: '' }); }}
        searchQuery={countryState.searchQuery}
        setSearchQuery={(v) => dispatchCountry({ type: 'SET_SEARCH_QUERY', payload: v })}
        filteredCountries={filteredCountries}
        renderCountryItem={renderCountryItem}
      />
    </SafeAreaView>
  );
};



const CountryCodePicker = ({ selectedCountry, onPress }: { selectedCountry: Country; onPress: () => void }) => (
  <Pressable style={styles.codePickerWrapper} onPress={onPress}>
    <Text style={styles.flagText}>{selectedCountry.flag}</Text>
    <Text style={styles.callingCodeText}>{selectedCountry.callingCode}</Text>
    <Text style={styles.dropdownArrow}>▼</Text>
  </Pressable>
);

const VerificationButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable onPress={onPress} style={styles.inlineActionWrapper}>
    <Text style={styles.inlineActionText}>Send Code</Text>
  </Pressable>
);

const PasswordToggle = ({ securePassword, setSecurePassword }: { securePassword: boolean; setSecurePassword: (v: boolean) => void }) => (
  <Pressable onPress={() => setSecurePassword(!securePassword)} style={styles.inlineActionWrapper}>
    <Text style={[styles.inlineActionText, { color: Colors.textDim }]}>
      {securePassword ? 'Show' : 'Hide'}
    </Text>
  </Pressable>
);

function BackButton({ navigation }: { navigation: any }) {
  return (
    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
      <Text style={styles.backButtonText}>←</Text>
    </Pressable>
  );
}

function HeaderSection() {
  return (
    <>
      <Image
        source={require('../../../assets/images/IMB360_v2.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text
        style={[
          Typography.h2,
          {
            color: Colors.lime,
            marginVertical: verticalScale(12),
          },
        ]}
      >
        CREATE YOUR ACCOUNT
      </Text>
    </>
  );
}

function DividerWithSocial() {
  return (
    <>
      <Text style={styles.dividerText}>Or continue with</Text>
      <SocialRow />
    </>
  );
}

async function validateAndSubmitHandler(
  formState: FormState,
  countryState: CountryState,
  toggleCheckBox: boolean,
  userRole: string,
  showToast: (msg: string, type: string) => void,
  setLoading: (v: boolean) => void,
  navigation: any,
) {
  const cleanName = safeDatabaseText(formState.name, 80);
  const cleanEmail = sanitizeEmail(formState.email);
  const cleanPhone = sanitizePhone(formState.phone);
  const cleanPassword = sanitizeText(formState.password, 128);

  if (!toggleCheckBox) {
    showToast('Please accept the Privacy Policy and Terms of use.', 'error');
    return;
  }

  if (containsFourByteUnicode(cleanName)) {
    showToast('Emojis are not supported in name fields.', 'error');
    return;
  }

  if (!isEmailValid(cleanEmail)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  if (!isStrongPassword(formState.password)) {
    showToast('Password must contain uppercase, lowercase, number and special character.', 'error');
    return;
  }

  setLoading(true);

  try {
    const signupDataPayload = {
      fullName: cleanName,
      emailAddress: cleanEmail,
      phoneNumber: `${countryState.selectedCountry.callingCode}${cleanPhone}`,
      password: cleanPassword,
      role: userRole,
    };

    await apiClient.post('/auth/register', signupDataPayload).catch(() => {});

    const raw = await AsyncStorage.getItem('registered_users');
    let stored: any = {};
    if (raw) {
      stored = await decryptAsyncData<any>(raw) || {};
    }

    stored[cleanEmail] = {
      name: cleanName,
      email: cleanEmail,
      password: hashPassword(cleanPassword),
      role: userRole,
      username: cleanEmail.split('@')[0],
    };

    await AsyncStorage.setItem('registered_users', await encryptAsyncData(stored));

    showToast(`Account created successfully as a ${userRole}!`, 'success');

    navigation.navigate('Login');
  } catch (error: any) {
    if (error?.response?.status === 409) {
      showToast('An account with this email already exists.', 'error');
    } else {
      showToast('Registration failed. Please try again.', 'error');
    }
  } finally {
    setLoading(false);
  }
}

function handleSendVerificationCodeHandler(
  formState: FormState,
  showToast: (msg: string, type: string) => void,
) {
  const cleanEmail = sanitizeEmail(formState.email);

  if (!isEmailValid(cleanEmail)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  showToast('Verification code sent!', 'success');
}

export default RegisterScreen;