import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, StyleSheet, Platform } from 'react-native'; // Fixed: Added Platform here
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export type RoleType = 'BRAND' | 'CREATOR' | null;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const RoleSelectionScreen = ({ navigation }: any) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    
    // Smoothly passes chosen profile context to intermediate entry screen
    navigation.navigate('AuthEntryPoint', { role: selectedRole });
  };

  // Brand Card Dynamic Scale, Vignette tint, and Border Glow Animations
  const brandAnimatedStyle = useAnimatedStyle(() => {
    const isSelected = selectedRole === 'BRAND';
    const isDimmed = selectedRole !== null && selectedRole !== 'BRAND';
    
    return {
      transform: [{ scale: withTiming(isSelected ? 1.02 : 1, { duration: 250 }) }],
      opacity: withTiming(isDimmed ? 0.4 : 1, { duration: 250 }),
      borderColor: withTiming(isSelected ? '#00b9c0' : '#2C2C2E', { duration: 250 }),
      backgroundColor: withTiming(isSelected ? '#0A1416' : '#000000', { duration: 250 }),
    };
  }, [selectedRole]);

  // Creator Card Dynamic Scale, Vignette tint, and Border Glow Animations
  const creatorAnimatedStyle = useAnimatedStyle(() => {
    const isSelected = selectedRole === 'CREATOR';
    const isDimmed = selectedRole !== null && selectedRole !== 'CREATOR';
    
    return {
      transform: [{ scale: withTiming(isSelected ? 1.02 : 1, { duration: 250 }) }],
      opacity: withTiming(isDimmed ? 0.4 : 1, { duration: 250 }),
      borderColor: withTiming(isSelected ? '#b6d82c' : '#2C2C2E', { duration: 250 }),
      backgroundColor: withTiming(isSelected ? '#12160A' : '#000000', { duration: 250 }),
    };
  }, [selectedRole]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CHOOSE YOUR PROFILE</Text>
      </View>

      <View style={styles.cardsContainer}>
        
        {/* BRAND CARD */}
        <AnimatedTouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedRole('BRAND')}
          style={[styles.card, brandAnimatedStyle]}
        >
          <View style={styles.imageWrapper}>
            <Image 
              source={require('../../../assets/images/brand.png')}
              style={styles.cardImage} 
              resizeMode="contain" 
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.cardTitle}>I'M A <Text style={styles.brandHighlight}>BRAND</Text></Text>
            <Text style={styles.cardDescription}>
              Scale your campaigns and find the perfect creators for your products.
            </Text>
          </View>
        </AnimatedTouchableOpacity>

        {/* CREATOR CARD */}
        <AnimatedTouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedRole('CREATOR')}
          style={[styles.card, creatorAnimatedStyle]}
        >
          <View style={styles.imageWrapper}>
            <Image 
              source={require('../../../assets/images/creator-illustration.png')}
              style={styles.cardImage} 
              resizeMode="contain" 
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.cardTitle}>I'M A <Text style={styles.creatorHighlight}>CREATOR</Text></Text>
            <Text style={styles.cardDescription}>
              Partner with top brands, monetize your content, and grow your digital footprint.
            </Text>
          </View>
        </AnimatedTouchableOpacity>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={handleContinue}
          disabled={selectedRole === null}
          style={styles.buttonTouchArea}
        >
          {selectedRole ? (
            <LinearGradient
              colors={['#00b9c0', '#b6d82c']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Continue</Text>
              <Text style={styles.buttonIcon}>›</Text>
            </LinearGradient>
          ) : (
            <View style={styles.buttonDisabled}>
              <Text style={styles.buttonTextDisabled}>Select a Profile</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(24),
  },
  card: {
    flexDirection: 'row',
    height: verticalScale(140),
    borderWidth: 1,
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(20),
    padding: scale(16),
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '35%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    width: '65%',
    paddingLeft: scale(12),
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(6),
    letterSpacing: 0.5,
  },
  brandHighlight: {
    color: '#00b9c0',
  },
  creatorHighlight: {
    color: '#b6d82c',
  },
  cardDescription: {
    color: '#888888',
    fontSize: moderateScale(12),
    lineHeight: verticalScale(16),
  },
  footer: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(30),
  },
  buttonTouchArea: {
    width: '100%',
    height: verticalScale(50),
  },
  buttonGradient: {
    flex: 1,
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonText: {
    color: '#000000',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    color: '#000000',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    position: 'absolute',
    right: scale(24),
    top: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(8),
  },
  buttonDisabled: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  buttonTextDisabled: {
    color: '#444444',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default RoleSelectionScreen;