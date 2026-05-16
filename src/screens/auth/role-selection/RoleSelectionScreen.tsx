import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export type RoleType = 'BRAND' | 'CREATOR' | null;

const RoleSelectionScreen = ({ navigation }: any) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    
    // Navigate to the Registration screen, passing the selected role as a parameter
    navigation.navigate('Register', { role: selectedRole });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header Area */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CHOOSE YOUR PROFILE</Text>
      </View>

      {/* Interactive Selection Cards Container */}
      <View style={styles.cardsContainer}>
        
        {/* BRAND CARD */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedRole('BRAND')}
          style={[
            styles.card,
            selectedRole === 'BRAND' && styles.cardSelectedBrand,
            selectedRole !== null && selectedRole !== 'BRAND' && styles.cardDimmed,
          ]}
        >
          <View style={styles.imageWrapper}>
            <Image 
              source={require('../../../assets/images/brand.png')} // Updated Asset Path
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
        </TouchableOpacity>

        {/* CREATOR CARD */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedRole('CREATOR')}
          style={[
            styles.card,
            selectedRole === 'CREATOR' && styles.cardSelectedCreator,
            selectedRole !== null && selectedRole !== 'CREATOR' && styles.cardDimmed,
          ]}
        >
          <View style={styles.imageWrapper}>
            <Image 
              source={require('../../../assets/images/creator-illustration.png')} // Updated Asset Path
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
        </TouchableOpacity>

      </View>

      {/* Dynamic Action Bottom Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={handleContinue}
          disabled={selectedRole === null}
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

export default RoleSelectionScreen;