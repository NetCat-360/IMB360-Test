import React, { useEffect } from 'react';
import { Image, StatusBar, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
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

  const blob1Value = useSharedValue(0);
  const blob2Value = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);

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

    // Transition to Onboarding after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
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