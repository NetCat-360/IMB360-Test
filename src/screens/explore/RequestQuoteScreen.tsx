import React, { useState } from 'react'
import { View, Text, Pressable, ScrollView, StatusBar, TextInput, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Colors } from '../../config/theme'
import Typography from '../../styles/typography'
import { AppStackParamList } from '../../types/navigation'
import PaymentModal from '../../components/common/PaymentModal'
import styles from './styles'

type RequestQuoteRouteProp = RouteProp<AppStackParamList, 'RequestQuote'>

export default function RequestQuoteScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const route = useRoute<RequestQuoteRouteProp>()
  const { platformId, influencerName } = route.params

  const [servicesNeeded, setServicesNeeded] = useState('')
  const [budget, setBudget] = useState('')
  const [additionalGuidelines, setAdditionalGuidelines] = useState('')
  const [isPlatformDropdownOpen, setIsPlatformDropdownOpen] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>(['Story'])
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const platformMap: Record<string, { label: string; icon: string; color: string }> = {
    instagram: { label: 'Instagram', icon: 'logo-instagram', color: Colors.instagram },
    facebook: { label: 'Facebook', icon: 'logo-facebook', color: Colors.facebook },
    youtube: { label: 'Youtube', icon: 'logo-youtube', color: Colors.youtube },
    tiktok: { label: 'TikTok', icon: 'logo-tiktok', color: Colors.textPrimary },
    snapchat: { label: 'Snapchat', icon: 'logo-snapchat', color: '#FFFC00' },
  }

  const selectedPlatform = platformMap[platformId]

  const services = [
    { type: 'Reels', value: 1200 },
    { type: 'Story', value: 1200 },
    { type: 'Post', value: 1700 },
    { type: 'Short Video', value: 2000 },
    { type: 'Long Video', value: 3500 },
    { type: 'Meetup', value: 6000 },
  ]

  const totalEstimatedCost = services
    .filter((service) => selectedServices.includes(service.type))
    .reduce((sum, service) => sum + service.value, 0)

  const toggleService = (serviceType: string) => {
    setSelectedServices((prev) => {
      const updated = prev.includes(serviceType)
        ? prev.filter((s) => s !== serviceType)
        : [...prev, serviceType]
      
      setServicesNeeded(updated.join(', '))
      return updated
    })
  }

  return (
    <SafeAreaView edges={['top']} style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#00b9c0" />

      <LinearGradient
        colors={['#00b9c0', '#b6d82c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={24} color={Colors.bgBlack} />
        </Pressable>
        <Text style={[Typography.h1, { color: Colors.bgBlack }]}>Request Quote from {influencerName}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Platform */}
        <Text style={[Typography.h2, styles.sectionTitleQuote]}>Platform</Text>
        <Pressable
          style={styles.quotePlatformRow}
          onPress={() => setIsPlatformDropdownOpen(!isPlatformDropdownOpen)}
        >
          <View style={styles.accordionLeftSection}>
            <Ionicons name={selectedPlatform.icon} size={20} color={selectedPlatform.color} style={styles.platformHeaderIcon} />
            <Text style={[Typography.body, styles.platformHeaderText]}>{selectedPlatform.label}</Text>
          </View>
          <Ionicons
            name={isPlatformDropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={Colors.textSecondary}
          />
        </Pressable>

        {isPlatformDropdownOpen && (
          <View style={[styles.quoteDropdownList, { marginTop: 0 }]}>
            <View style={styles.servicesDropdownHeader}>
              <Text style={[Typography.label, { color: Colors.textMuted }]}>Select Services</Text>
            </View>
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.type)
              return (
                <Pressable
                  key={service.type}
                  style={styles.quoteDropdownItem}
                  onPress={() => toggleService(service.type)}
                >
                  <View style={styles.accordionLeftSection}>
                    <View style={[styles.checkboxOuter, isSelected && styles.checkboxOuterActive]}>
                      {isSelected && <Ionicons name="checkmark" size={14} color={Colors.bgBlack} />}
                    </View>
                    <Text style={[Typography.body, styles.platformHeaderText]}>{service.type}</Text>
                  </View>
                  <Text style={[Typography.body, { color: Colors.teal, fontWeight: '600' }]}>
                    ₱ {service.value.toLocaleString()}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        )}

        {/* 2. Services Needed */}
        <Text style={[Typography.h2, styles.sectionTitleQuote]}>Services Needed</Text>
        <TextInput
          style={styles.quoteInput}
          placeholder="Please select platforms to see available services"
          placeholderTextColor={Colors.textMuted}
          value={servicesNeeded}
          onChangeText={setServicesNeeded}
        />

        {/* 3. Estimated Cost */}
        <View style={styles.estimatedCostCard}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={[Typography.h3, { color: Colors.textPrimary, fontWeight: '700' }]}>Estimated Cost</Text>
            <Text style={styles.estimatedCostSubtext}>
              Your final amount is based on selected services. Includes: Influencer charges, Govt. Taxes, and Platform fee.
            </Text>
          </View>
          <Text style={[Typography.h2, { color: Colors.success, fontWeight: '700' }]}>
            ₱ {totalEstimatedCost.toLocaleString()}
          </Text>
        </View>

        {/* 4. Your Budget */}
        <Text style={[Typography.h2, styles.sectionTitleQuote]}>Your Budget</Text>
        <TextInput
          style={styles.quoteInput}
          placeholder="Enter your budget"
          placeholderTextColor={Colors.textMuted}
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />

        {/* 5. Project Timeline */}
        <Text style={[Typography.h2, styles.sectionTitleQuote]}>Project Timeline</Text>
        <View style={styles.dropdownSelectorQuote}>
          <Text style={[Typography.body, { color: Colors.textSecondary }]}>Select a suitable timeline</Text>
          <Ionicons name="chevron-down" size={18} color={Colors.textSecondary} />
        </View>

        {/* 6. Additional Guidelines */}
        <Text style={[Typography.h2, styles.sectionTitleQuote]}>Additional Guidelines</Text>
        <TextInput
          style={[styles.quoteInput, styles.quoteTextArea]}
          placeholder="Provide any additional details about your campaign, brand guidelines, specific requirements, deliverables, etc."
          placeholderTextColor={Colors.textMuted}
          multiline
          numberOfLines={4}
          value={additionalGuidelines}
          onChangeText={setAdditionalGuidelines}
        />

        {/* Informational Workflow Block */}
        <View style={styles.infoWorkflowCard}>
          <View style={styles.infoWorkflowTextContent}>
            <Text style={[Typography.h3, { color: Colors.textPrimary, fontWeight: '700', marginBottom: 8 }]}>
              What happens next:
            </Text>
            <Text style={styles.workflowBullet}>• {influencerName} will receive your quote request</Text>
            <Text style={styles.workflowBullet}>• They'll review your requirements and respond within 24-48 hours</Text>
            <Text style={styles.workflowBullet}>• You'll receive a detailed quote with pricing and timeline</Text>
            <Text style={styles.workflowBullet}>• You can then negotiate terms or accept the proposal</Text>
          </View>
          <View style={styles.workflowImagePlaceholder}>
            <Image
              source={require('../../assets/images/ICB.png')}
              style={styles.workflowImage}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Submission Action Button */}
        <Pressable style={styles.submitQuoteBtn} onPress={() => setShowPaymentModal(true)}>
          <LinearGradient
            colors={[Colors.teal, Colors.lime]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitGradient}
          >
            <Text style={[Typography.buttonPrimary, { color: Colors.bgBlack, fontWeight: '700' }]}>
              Submit ₱{totalEstimatedCost.toLocaleString()}
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>

      <PaymentModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirm={() => setShowPaymentModal(false)}
      />
    </SafeAreaView>
  )
}