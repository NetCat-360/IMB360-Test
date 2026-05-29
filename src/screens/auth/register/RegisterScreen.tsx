// src/screens/auth/register/RegisterScreen.tsx

import React, { useState, useMemo } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
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

import FloatingInput from '../../../components/common/FloatingInput';

import { useGlobalToast } from '../../../context/ToastContext';

import { Colors } from '../../../config/theme';

import Typography from '../../../styles/typography';

import styles from './styles';

import apiClient from '../../../api/client';

import {
  containsFourByteUnicode,
  safeDatabaseText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeText,
  isStrongPassword,
} from '../../../security/sanitize';

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

const RegisterScreen = ({
  navigation,
  route,
}: Props) => {
  const userRole =
    route?.params?.role || 'CREATOR';

  const [name, setName] = useState('');
  const [email, setEmail] =
    useState('');
  const [phone, setPhone] =
    useState('');
  const [password, setPassword] =
    useState('');

  const [toggleCheckBox, setToggleCheckBox] =
    useState(false);

  const [securePassword, setSecurePassword] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [selectedCountry, setSelectedCountry] =
    useState<Country>({
      code: 'US',
      flag: '🇺🇸',
      name: 'United States',
      callingCode: '+1',
    });

  const [modalVisible, setModalVisible] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  const { showToast } = useGlobalToast();

  const isEmailValid = (text: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      text,
    );

  const isFormComplete =
    name.trim() !== '' &&
    isEmailValid(email) &&
    phone.trim() !== '' &&
    password.trim().length >= 8;

  const filteredCountries =
    useMemo(
      () =>
        COUNTRIES.filter(
          item =>
            item.name
              .toLowerCase()
              .includes(
                searchQuery.toLowerCase(),
              ) ||
            item.callingCode.includes(
              searchQuery,
            ),
        ),
      [searchQuery],
    );

  const handleCountrySelect = (
    country: Country,
  ) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearchQuery('');
  };

  const validateAndSubmit =
    async () => {
      const cleanName =
        safeDatabaseText(name, 80);

      const cleanEmail =
        sanitizeEmail(email);

      const cleanPhone =
        sanitizePhone(phone);

      const cleanPassword =
        sanitizeText(password, 128);

      if (!toggleCheckBox) {
        showToast(
          'Please accept the Privacy Policy and Terms of use.',
          'error',
        );
        return;
      }

      if (
        containsFourByteUnicode(
          cleanName,
        )
      ) {
        showToast(
          'Emojis are not supported in name fields.',
          'error',
        );
        return;
      }

      if (
        !isEmailValid(cleanEmail)
      ) {
        showToast(
          'Please enter a valid email address.',
          'error',
        );
        return;
      }

      if (
        !isStrongPassword(
          password,
        )
      ) {
        showToast(
          'Password must contain uppercase, lowercase, number and special character.',
          'error',
        );
        return;
      }

      setLoading(true);

      try {
        const signupDataPayload = {
          fullName: cleanName,
          emailAddress: cleanEmail,
          phoneNumber: `${selectedCountry.callingCode}${cleanPhone}`,
          password: cleanPassword,
          role: userRole,
        };

        // Backend endpoint
        await apiClient.post(
          '/auth/register',
          signupDataPayload,
        );

        showToast(
          `Account created successfully as a ${userRole}!`,
          'success',
        );

        navigation.navigate(
          'Login',
        );
      } catch (error: any) {
        if (
          error?.response?.status ===
          409
        ) {
          showToast(
            'An account with this email already exists.',
            'error',
          );
        } else {
          showToast(
            'Registration failed. Please try again.',
            'error',
          );
        }
      } finally {
        setLoading(false);
      }
    };

  const handleSendVerificationCode =
    () => {
      const cleanEmail =
        sanitizeEmail(email);

      if (
        !isEmailValid(cleanEmail)
      ) {
        showToast(
          'Please enter a valid email address.',
          'error',
        );
        return;
      }

      // Replace with backend OTP endpoint
      showToast(
        'Verification code sent!',
        'success',
      );
    };

  const renderCountryCodePicker =
    () => (
      <TouchableOpacity
        style={
          styles.codePickerWrapper
        }
        activeOpacity={0.7}
        onPress={() =>
          setModalVisible(true)
        }
      >
        <Text
          style={styles.flagText}
        >
          {selectedCountry.flag}
        </Text>

        <Text
          style={
            styles.callingCodeText
          }
        >
          {
            selectedCountry.callingCode
          }
        </Text>

        <Text
          style={
            styles.dropdownArrow
          }
        >
          ▼
        </Text>
      </TouchableOpacity>
    );

  const renderVerificationButton =
    () => (
      <TouchableOpacity
        onPress={
          handleSendVerificationCode
        }
        style={
          styles.inlineActionWrapper
        }
      >
        <Text
          style={
            styles.inlineActionText
          }
        >
          Send Code
        </Text>
      </TouchableOpacity>
    );

  const renderPasswordToggle =
    () => (
      <TouchableOpacity
        onPress={() =>
          setSecurePassword(
            !securePassword,
          )
        }
        style={
          styles.inlineActionWrapper
        }
      >
        <Text
          style={[
            styles.inlineActionText,
            {
              color:
                Colors.textDim,
            },
          ]}
        >
          {securePassword
            ? 'Show'
            : 'Hide'}
        </Text>
      </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text
              style={
                styles.backButtonText
              }
            >
              ←
            </Text>
          </TouchableOpacity>

          <View
            style={
              styles.formFlowWrapper
            }
          >
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
                  marginVertical:
                    verticalScale(12),
                },
              ]}
            >
              CREATE YOUR ACCOUNT
            </Text>

            <FloatingInput
              label="Full Name"
              value={name}
              onChangeText={text =>
                setName(
                  sanitizeText(
                    text,
                    80,
                  ),
                )
              }
              autoCapitalize="words"
            />

            <FloatingInput
              label="Email address"
              value={email}
              onChangeText={text =>
                setEmail(
                  sanitizeText(
                    text,
                    320,
                  ),
                )
              }
              keyboardType="email-address"
              rightComponent={renderVerificationButton()}
            />

            <FloatingInput
              label="Phone"
              value={phone}
              onChangeText={text =>
                setPhone(
                  sanitizePhone(
                    text,
                  ),
                )
              }
              keyboardType="phone-pad"
              prefixComponent={renderCountryCodePicker()}
            />

            <FloatingInput
              label="Create a Password"
              value={password}
              onChangeText={text =>
                setPassword(
                  sanitizeText(
                    text,
                    128,
                  ),
                )
              }
              secureTextEntry={
                securePassword
              }
              rightComponent={renderPasswordToggle()}
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

            <View
              style={
                styles.checkboxContainer
              }
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.customCheckbox,
                  toggleCheckBox &&
                    styles.customCheckboxChecked,
                ]}
                onPress={() =>
                  setToggleCheckBox(
                    !toggleCheckBox,
                  )
                }
              >
                {toggleCheckBox && (
                  <Text
                    style={
                      styles.checkmarkIcon
                    }
                  >
                    ✓
                  </Text>
                )}
              </TouchableOpacity>

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

            <TouchableOpacity
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
              onPress={
                validateAndSubmit
              }
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
                <Text
                  style={
                    styles.submitButtonText
                  }
                >
                  {loading
                    ? 'Registering...'
                    : 'Register'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text
              style={styles.dividerText}
            >
              Or continue with
            </Text>

            <View style={styles.socialRow}>
              <TouchableOpacity
                style={styles.socialButton}
              >
                <Image
                  source={require('../../../assets/images/google.png')}
                  style={styles.socialIcon}
                />

                <Text
                  style={
                    styles.socialText
                  }
                >
                  Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
              >
                <Image
                  source={require('../../../assets/images/apple.png')}
                  style={[
                    styles.socialIcon,
                    {
                      tintColor:
                        Colors.textPrimary,
                    },
                  ]}
                />

                <Text
                  style={
                    styles.socialText
                  }
                >
                  Apple
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'Login',
              )
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
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
      >
        <View
          style={styles.modalOverlay}
        >
          <View
            style={styles.modalContent}
          >
            <View
              style={styles.modalHeader}
            >
              <Text
                style={
                  styles.modalTitle
                }
              >
                Select Country
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(
                    false,
                  );
                  setSearchQuery('');
                }}
              >
                <Text
                  style={
                    styles.closeButton
                  }
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.searchBar}
              placeholder="Search country name or calling code..."
              placeholderTextColor={
                Colors.textDim
              }
              value={searchQuery}
              onChangeText={
                setSearchQuery
              }
              autoCorrect={false}
            />

            <FlatList
              data={filteredCountries}
              keyExtractor={item =>
                item.code
              }
              initialNumToRender={15}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={
                    styles.countryItem
                  }
                  onPress={() =>
                    handleCountrySelect(
                      item,
                    )
                  }
                >
                  <Text
                    style={
                      styles.itemFlag
                    }
                  >
                    {item.flag}
                  </Text>

                  <Text
                    style={
                      styles.itemName
                    }
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={
                      styles.itemCallingCode
                    }
                  >
                    {
                      item.callingCode
                    }
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};



export default RegisterScreen;