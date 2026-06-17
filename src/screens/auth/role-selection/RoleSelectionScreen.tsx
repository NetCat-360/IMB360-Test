import React from 'react';
import { View, Text, Pressable, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

// SVG Asset Imports matching your project directories
import RoleBrandSvg from '../../../assets/images/Role Brand.svg';
import RoleCreatorSvg from '../../../assets/images/Role Creator.svg';

import { AuthNavigationProp } from '../../../types/navigation';

type NavigationProp = AuthNavigationProp<'RoleSelection'>;

export const RoleSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleAction = (role: 'BRAND' | 'CREATOR', flow: 'JOIN' | 'LOGIN') => {
    if (flow === 'LOGIN') {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Register', { role });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <View style={styles.scrollContainer}>
        
        {/* BRAND VIEWPORT SPLIT */}
        <View style={[styles.section, styles.brandSection]}>
          <View style={styles.contentRow}>
            
            <View style={styles.textContainer}>
              <Text style={styles.label}>I'M A</Text>
              <Text style={[styles.title, styles.brandHighlight]}>BRAND</Text>
              <Text style={styles.description}>
                Scale your campaigns and find the perfect creators for your brand
              </Text>
              
              <View style={styles.buttonContainer}>
                <Pressable onPress={() => handleAction('BRAND', 'JOIN')}>
                  <LinearGradient
                    colors={['#00B9C0', '#B6D82C']} // Teal-to-lime dynamic vector
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.btnText}>JOIN AS BRAND</Text>
                  </LinearGradient>
                </Pressable>

                <Pressable 
                  style={styles.loginButton} 
                  onPress={() => handleAction('BRAND', 'LOGIN')}
                >
                  <Text style={styles.loginText}>Login</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.imageContainer}>
              <RoleBrandSvg width="100%" height="100%" />
            </View>

          </View>
        </View>

        {/* HUD INTERMEDIARY SYSTEM BREAKPOINT */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLineLeft} />
          <View style={styles.dividerCircle} />
          <View style={styles.dividerLineRight} />
        </View>

        {/* CREATOR VIEWPORT SPLIT */}
        <View style={[styles.section, styles.creatorSection]}>
          {/* Reversing row structure horizontally matches the image layout composition */}
          <View style={[styles.contentRow, styles.rowReverse]}>
            
            <View style={styles.imageContainer}>
              <RoleCreatorSvg width="100%" height="100%" />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.label}>I'M A</Text>
              <Text style={[styles.title, styles.creatorHighlight]}>CREATOR</Text>
              <Text style={styles.description}>
                Partner with top brands and grow your influence
              </Text>

              <View style={styles.buttonContainer}>
                <Pressable onPress={() => handleAction('CREATOR', 'JOIN')}>
                  <LinearGradient
                    colors={['#00B9C0', '#B6D82C']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.btnText}>JOIN AS CREATOR</Text>
                  </LinearGradient>
                </Pressable>

                <Pressable 
                  style={styles.loginButton} 
                  onPress={() => handleAction('CREATOR', 'LOGIN')}
                >
                  <Text style={styles.loginText}>Login</Text>
                </Pressable>
              </View>
            </View>

          </View>
        </View>

      </View>
    </View>
  );
};

export default RoleSelectionScreen;