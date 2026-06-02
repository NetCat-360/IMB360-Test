import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StatusBar, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { AuthNavigationProp } from '../../types/navigation';

const ONBOARDING_DATA = [
  {
    title: 'FIND CREATORS',
    subtitle: 'FOR ',
    highlight: 'YOUR BRAND',
    description: 'Discover creators that align with your brand, audience, and campaign goals.',
    image: require('../../assets/images/splash1.png'),
  },
  {
    title: 'GROW FASTER',
    subtitle: 'WITH ',
    highlight: 'CREATORS',
    description: 'Connect with the right creators, launch impactful campaigns, and grow your audience faster.',
    image: require('../../assets/images/splash2.png'),
  },
  {
    title: 'READY TO SCALE',
    subtitle: 'YOUR ',
    highlight: 'INFLUENCE ?',
    description: 'Find the right creators, build impactful collaborations, and grow your brand with confidence.',
    image: require('../../assets/images/splash3.png'),
  },
];

const OnboardingScreen = ({ navigation }: { navigation: AuthNavigationProp<'Onboarding'> }) => {
  const [index, setIndex] = useState(0);
  const data = ONBOARDING_DATA[index];

  useEffect(() => {
    const backAction = () => {
      if (index > 0) {
        setIndex(prev => prev - 1);
        return true; 
      }
      return false; 
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [index]);

  const handleNext = () => {
    if (index < ONBOARDING_DATA.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      // Takes user to Role Selection from the last slide
      navigation.replace('RoleSelection');
    }
  };

  const handleBack = () => {
    if (index > 0) setIndex(prev => prev - 1);
  };

  // 2. Redirect function for the skip button
  const handleSkip = () => {
    navigation.replace('RoleSelection');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.header}>
        {index > 0 ? (
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </Pressable>
        ) : <View />}
        
        {index === 0 ? (
          // 3. Wired up the onPress event here
          <Pressable onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        ) : <View />}
      </View>

      <View style={styles.content} key={data.title}>
        <Animated.View 
          entering={FadeInRight.duration(400).springify().damping(15)}
          exiting={FadeOutLeft.duration(300)}
          style={styles.imageContainer}
        >
          <Image source={data.image} style={styles.image} resizeMode="contain" />
        </Animated.View>

        <Animated.View 
          entering={FadeInRight.duration(400).delay(100).springify().damping(15)}
          exiting={FadeOutLeft.duration(300)}
          style={styles.textContainer}
        >
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>{data.subtitle}</Text>
            <Text style={styles.highlight}>{data.highlight}</Text>
          </View>
          <Text style={styles.description}>{data.description}</Text>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={handleNext}>
          <LinearGradient
            colors={['#00b9c0', '#b6d82c']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {index === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <Text style={styles.buttonIcon}>›</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;