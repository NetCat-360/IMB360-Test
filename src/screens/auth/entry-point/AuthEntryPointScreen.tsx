import React from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { AuthNavigationProp, AuthStackParamList } from '../../../types/navigation';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: AuthNavigationProp<'AuthEntryPoint'>;
  route: RouteProp<AuthStackParamList, 'AuthEntryPoint'>;
};

const AuthEntryPointScreen = ({ route, navigation }: Props) => {
  // Extract selection fallback to 'CREATOR' gracefully if route values drop
  const { role } = route.params || { role: 'CREATOR' };
  const isBrand = role === 'BRAND';

  // Dynamic Assets Mapping
  const localIllustration = isBrand
    ? require('../../../assets/images/brand.png')
    : require('../../../assets/images/creator-illustration.png');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Top Utility Header Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Illustration Block */}
      <View style={styles.imageContainer}>
        <Image 
          source={localIllustration} 
          style={styles.heroImage} 
          resizeMode="contain" 
        />
      </View>

      {/* Dynamic Descriptive Content Area */}
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>
          I'M A <Text style={isBrand ? styles.brandHighlight : styles.creatorHighlight}>{role}</Text>
        </Text>
        
        <Text style={styles.descriptionText}>
          {isBrand 
            ? 'Scale your campaigns and find the perfect creators for your brand.'
            : 'I\'m an influencer looking to grow my reach through meaningful brand partnerships.'}
        </Text>
      </View>

      {/* Absolute Call To Action Stack */}
      <View style={styles.footer}>
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Register', { role })}
        >
          <LinearGradient
            colors={['#00b9c0', '#b6d82c']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {isBrand ? 'JOIN AS BRAND' : 'JOIN AS CREATOR/INFLUENCER'}
            </Text>
            <Text style={styles.primaryButtonIcon}>›</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Existing User Redirection Link */}
        <View style={styles.loginRedirectContainer}>
          <Text style={styles.loginNormalText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLinkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default AuthEntryPointScreen;