import React, { useEffect, useRef } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { useAppDispatch } from '../../hooks/redux';
import { loginSuccess } from '../../store/slices/authSlice';
import { getUserFromKeychain, getAccessToken } from '../../security/encryption';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence, 
  withSpring,
  Easing,
  interpolate
} from 'react-native-reanimated';
import styles from './styles';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useAppDispatch();

  const blob1Value = useSharedValue(0);
  const blob2Value = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Start Lava Lamp Animations
    blob1Value.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 5000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 5000, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );

    blob2Value.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 6000, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );

    // Start Logo Animation
    logoOpacity.value = withTiming(1, { duration: 1200 });
    logoScale.value = withSpring(1, { damping: 12, stiffness: 90 });

    // Check for existing session, then transition
    const init = async () => {
      const [token, user] = await Promise.all([
        getAccessToken(),
        getUserFromKeychain<any>(),
      ]);

      if (token && user) {
        dispatch(loginSuccess({ user, accessToken: token, refreshToken: token }));
        return;
      }

      navigationTimerRef.current = setTimeout(() => {
        navigation.replace('Onboarding');
      }, 3000);
    };

    init();
    return () => {
      if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    };
  // All deps (shared values, navigation, dispatch) are stable refs — this effect runs once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedBlob1 = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(blob1Value.value, [0, 1], [-50, 80]) },
      { translateX: interpolate(blob1Value.value, [0, 1], [-30, 40]) },
    ],
  }));

  const animatedBlob2 = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(blob2Value.value, [0, 1], [80, -50]) },
      { translateX: interpolate(blob2Value.value, [0, 1], [40, -20]) },
    ],
  }));

  const animatedLogo = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Animated.View style={[styles.blobGreen, animatedBlob1]} />
      <Animated.View style={[styles.blobBlue, animatedBlob2]} />
      <View style={styles.glowBlob} />
      <Animated.View style={[styles.logoContainer, animatedLogo]}>
        <Image
          source={require('../../assets/images/IMB360.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;