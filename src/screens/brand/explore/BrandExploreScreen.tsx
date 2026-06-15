import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, Image, Pressable, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Colors } from '../../../config/theme'
import Typography from '../../../styles/typography'
import styles from '../../explore/styles'

interface CreatorItem {
  id: string
  name: string
  handle: string
  bio: string
  location: string
  followers: string
  engagement: string
  rating: string
  priceMin: string
  priceMax: string
}

const MOCK_CREATORS: CreatorItem[] = [
  {
    id: '1',
    name: 'Rage',
    handle: '@ragecodess',
    bio: 'An I.T. Girl | Go Dev | Digital Creator',
    location: 'Delhi, India',
    followers: '3.76K',
    engagement: '65.4%',
    rating: '4',
    priceMin: '1000',
    priceMax: '5000',
  }
]

export default function BrandExploreScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [activeTab, setActiveTab] = useState<'influencers' | 'brands'>('brands')
  const [searchQuery, setSearchQuery] = useState('')

  const renderCreatorItem = ({ item }: { item: CreatorItem }) => (
    <View style={styles.cardContainer}>
      <View style={styles.mediaPlaceholder} />
      
      <View style={styles.profileHeaderRow}>
        <LinearGradient
          colors={[Colors.teal, Colors.lime]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatarGradient}
        />
        <View style={styles.profileNameContainer}>
          <Text style={Typography.displayMedium}>{item.name}</Text>
          <Text style={[Typography.bodySmall, { color: Colors.textSecondary }]}>{item.handle}</Text>
        </View>
      </View>

      <Text style={[Typography.body, styles.bioText]}>{item.bio}</Text>
      
      <View style={styles.locationRow}>
        <Pressable style={styles.websiteLink}>
          <Text style={[Typography.label, { color: Colors.cyan }]}>Add website</Text>
          <Ionicons name="link-outline" size={14} color={Colors.cyan} style={styles.linkIcon} />
        </Pressable>
        <Text style={[Typography.bodySmall, { color: Colors.textSecondary }]}>{item.location}</Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={Typography.statNumber}>{item.followers}</Text>
          <Text style={[Typography.caption, { color: Colors.textMuted }]}>Followers</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={Typography.statNumber}>{item.engagement}</Text>
          <Text style={[Typography.caption, { color: Colors.textMuted }]}>Engagement</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={Typography.statNumber}>{item.rating}</Text>
          <Text style={[Typography.caption, { color: Colors.textMuted }]}>Rating</Text>
        </View>
      </View>

      <View style={styles.pricingStrip}>
        <Text style={[Typography.body, { color: Colors.textSecondary }]}>Starting From</Text>
        <Text style={[Typography.body, { color: Colors.success, fontWeight: '600' }]}>
          ₱ {item.priceMin}-₱ {item.priceMax}
        </Text>
      </View>

      <View style={styles.actionGrid}>
        <Pressable style={styles.actionButton}>
          <Text style={[Typography.buttonSecondary, { color: Colors.textPrimary }]}>View Latest Content</Text>
          <Ionicons name="chevron-down" size={14} color={Colors.textPrimary} style={styles.dropdownIcon} />
        </Pressable>
        <Pressable 
          style={styles.actionButton}
          onPress={() => navigation.navigate('BrandInfluencerProfile')}
        >
          <Text style={[Typography.buttonSecondary, { color: Colors.textPrimary }]}>View Profile</Text>
        </Pressable>
      </View>

      <View style={styles.actionGrid}>
        <Pressable style={styles.actionButton}>
          <Text style={[Typography.buttonSecondary, { color: Colors.textPrimary }]}>Message</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={[Typography.buttonSecondary, { color: Colors.textPrimary }]}>💰 Bidding</Text>
        </Pressable>
      </View>
    </View>
  )

  return (
    <SafeAreaView edges={['top']} style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />
      
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../../assets/images/IMB360_v2.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentHeader}>
        <Text style={[Typography.displayLarge, styles.screenTitle]}>Explore</Text>
      </View>

      <View style={styles.tabOuterContainer}>
        <View style={styles.tabWrapper}>
          <Pressable
            style={[styles.tabButton, activeTab === 'influencers' && styles.tabButtonActive]}
            onPress={() => setActiveTab('influencers')}
          >
            <Text style={[Typography.buttonSecondary, activeTab === 'influencers' ? { color: Colors.textPrimary } : { color: Colors.textSecondary }]}>Influencers</Text>
          </Pressable>
          <Pressable
            style={[styles.tabButton, activeTab === 'brands' && styles.tabButtonActive]}
            onPress={() => setActiveTab('brands')}
          >
            <Text style={[Typography.buttonSecondary, activeTab === 'brands' ? { color: Colors.textPrimary } : { color: Colors.textSecondary }]}>Brands</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.searchWrapper}>
        <TextInput
          style={[Typography.body, styles.searchInput]}
          placeholder="Search name, city or PIN"
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={MOCK_CREATORS}
        renderItem={renderCreatorItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}
