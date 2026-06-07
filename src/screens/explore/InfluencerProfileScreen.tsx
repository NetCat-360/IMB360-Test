import React, { useState, useRef } from 'react'
import { View, Text, Pressable, ScrollView, StatusBar, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { SlideInRight, SlideOutLeft, SlideInLeft, SlideOutRight } from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Colors } from '../../config/theme'
import Typography from '../../styles/typography'
import styles from './styles'

interface ProfileData {
  name: string
  handle: string
  bio: string
  location: string
  following: string
  followers: string
  engagement: string
  rating: string
}

const MOCK_PROFILE: ProfileData = {
  name: 'Rage',
  handle: '@ragecodess',
  bio: 'An I.T. Girl | Go Dev | Digital Creator',
  location: 'Delhi, India',
  following: '10',
  followers: '3.76K',
  engagement: '65.4%',
  rating: '4',
}

type TabType = 'overview' | 'content' | 'pricing'

const TAB_ORDER: TabType[] = ['overview', 'content', 'pricing']

export default function InfluencerProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const prevTab = useRef<TabType>('overview')

  const handleTabChange = (tab: TabType) => {
    prevTab.current = activeTab
    setActiveTab(tab)
  }

  const tabDirection = (tab: TabType) => {
    const currentIdx = TAB_ORDER.indexOf(activeTab)
    const targetIdx = TAB_ORDER.indexOf(tab)
    const prevIdx = TAB_ORDER.indexOf(prevTab.current)

    if (tab !== activeTab) {
      const goingForward = targetIdx > prevIdx
      return goingForward
        ? { entering: SlideInRight.duration(300), exiting: SlideOutLeft.duration(200) }
        : { entering: SlideInLeft.duration(300), exiting: SlideOutRight.duration(200) }
    }

    const goingForward = currentIdx > prevIdx
    return goingForward
      ? { entering: SlideInRight.duration(300), exiting: SlideOutLeft.duration(200) }
      : { entering: SlideInLeft.duration(300), exiting: SlideOutRight.duration(200) }
  }

  return (
    <SafeAreaView edges={['top']} style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#0097B2" />

      <LinearGradient
        colors={['#0097B2', '#7ED957']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={[Typography.h1, styles.headerTitle]}>Influencers Profile</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.mediaRectangle} />

        <View style={styles.profileMetaRow}>
          <LinearGradient
            colors={[Colors.teal, Colors.lime]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.avatarGradient}
          />
          <View style={styles.nameWrapper}>
            <Text style={Typography.displayMedium}>{MOCK_PROFILE.name}</Text>
            <Text style={[Typography.bodySmall, { color: Colors.textSecondary }]}>{MOCK_PROFILE.handle}</Text>
          </View>
        </View>

        <Text style={[Typography.body, styles.bioText]}>{MOCK_PROFILE.bio}</Text>

        <View style={styles.locationRow}>
          <Pressable style={styles.linkContainer}>
            <Text style={[Typography.label, { color: Colors.cyan }]}>Add website</Text>
            <Ionicons name="link-outline" size={14} color={Colors.cyan} style={styles.linkIcon} />
          </Pressable>
          <Text style={[Typography.bodySmall, { color: Colors.textSecondary }]}>{MOCK_PROFILE.location}</Text>
        </View>

        <View style={styles.statsDashboardContainer}>
          <View style={styles.statBox}>
            <Text style={Typography.statNumber}>{MOCK_PROFILE.following}</Text>
            <Text style={[Typography.caption, { color: Colors.textMuted }]}>Following</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={Typography.statNumber}>{MOCK_PROFILE.followers}</Text>
            <Text style={[Typography.caption, { color: Colors.textMuted }]}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={Typography.statNumber}>{MOCK_PROFILE.engagement}</Text>
            <Text style={[Typography.caption, { color: Colors.textMuted }]}>Engagement</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={Typography.statNumber}>{MOCK_PROFILE.rating}</Text>
            <Text style={[Typography.caption, { color: Colors.textMuted }]}>Rating</Text>
          </View>
        </View>

        <View style={styles.primaryActionRow}>
          <Pressable style={styles.actionBtnLeft}>
            <LinearGradient
              colors={[Colors.teal, Colors.lime]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBtnBg}
            >
              <Ionicons name="person-add-outline" size={16} color={Colors.bgBlack} style={styles.btnIconSpace} />
              <Text style={[Typography.buttonPrimary, { color: Colors.bgBlack }]}>Follow</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.actionBtnRight}>
            <LinearGradient
              colors={[Colors.teal, Colors.lime]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBtnBg}
            >
              <Text style={[Typography.buttonPrimary, { color: Colors.bgBlack }]}>Message</Text>
            </LinearGradient>
          </Pressable>
        </View>

        <View style={styles.segmentedTabContainer}>
          <Pressable
            style={[styles.segmentButton, activeTab === 'overview' && styles.segmentButtonActive]}
            onPress={() => handleTabChange('overview')}
          >
            <Text style={[Typography.buttonSecondary, activeTab === 'overview' ? { color: Colors.textPrimary } : { color: Colors.textSecondary }]}>Overview</Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, activeTab === 'content' && styles.segmentButtonActive]}
            onPress={() => handleTabChange('content')}
          >
            <Text style={[Typography.buttonSecondary, activeTab === 'content' ? { color: Colors.textPrimary } : { color: Colors.textSecondary }]}>Content</Text>
          </Pressable>
          <Pressable
            style={[styles.segmentButton, activeTab === 'pricing' && styles.segmentButtonActive]}
            onPress={() => handleTabChange('pricing')}
          >
            <Text style={[Typography.buttonSecondary, activeTab === 'pricing' ? { color: Colors.textPrimary } : { color: Colors.textSecondary }]}>Pricing</Text>
          </Pressable>
        </View>

        {activeTab === 'overview' && (
          <Animated.View entering={tabDirection('overview').entering} exiting={tabDirection('overview').exiting}>
            <View style={styles.socialGridRow}>
              <View style={styles.socialPlatformCardCustomBorder}>
                <View style={styles.socialTopLine}>
                  <Ionicons name="logo-instagram" size={20} color={Colors.instagram} />
                  <Text style={[Typography.bodySmall, styles.socialHandleText]}>{MOCK_PROFILE.handle}</Text>
                </View>
                <View style={styles.socialMetricsRow}>
                  <View style={styles.socialMetricElement}>
                    <Text style={Typography.statNumber}>3.76K</Text>
                    <Text style={[Typography.caption, { color: Colors.textMuted }]}>Followers</Text>
                  </View>
                  <View style={styles.socialMetricElement}>
                    <Text style={Typography.statNumber}>87</Text>
                    <Text style={[Typography.caption, { color: Colors.textMuted }]}>Posts</Text>
                  </View>
                </View>
              </View>

              <View style={styles.socialPlatformCardCustomBorder}>
                <View style={styles.socialTopLine}>
                  <Ionicons name="logo-youtube" size={20} color={Colors.youtube} />
                  <Text style={[Typography.bodySmall, styles.socialHandleText]}>{MOCK_PROFILE.handle}</Text>
                </View>
                <View style={styles.socialMetricsRow}>
                  <View style={styles.socialMetricElement}>
                    <Text style={Typography.statNumber}>3.76K</Text>
                    <Text style={[Typography.caption, { color: Colors.textMuted }]}>Subcribers</Text>
                  </View>
                  <View style={styles.socialMetricElement}>
                    <Text style={Typography.statNumber}>87</Text>
                    <Text style={[Typography.caption, { color: Colors.textMuted }]}>Videos</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.socialGridRow}>
              <View style={styles.socialPlatformCardCustomBorder}>
                <View style={styles.socialTopLine}>
                  <Ionicons name="logo-facebook" size={20} color={Colors.facebook} />
                  <Text style={[Typography.bodySmall, styles.socialHandleText]}>{MOCK_PROFILE.handle}</Text>
                </View>
                <View style={styles.socialMetricsRow}>
                  <View style={styles.socialMetricElement}>
                    <Text style={Typography.statNumber}>3.76K</Text>
                    <Text style={[Typography.caption, { color: Colors.textMuted }]}>Followers</Text>
                  </View>
                  <View style={styles.socialMetricElement}>
                    <Text style={Typography.statNumber}>87</Text>
                    <Text style={[Typography.caption, { color: Colors.textMuted }]}>Posts</Text>
                  </View>
                </View>
              </View>

              <View style={styles.socialPlatformCardCustomBorder}>
                <View style={styles.socialTopLine}>
                  <Ionicons name="logo-twitter" size={20} color={Colors.textPrimary} />
                  <Text style={[Typography.bodySmall, styles.socialHandleText]}>{MOCK_PROFILE.handle}</Text>
                </View>
                <View style={styles.socialMetricsRow}>
                  <View style={styles.socialMetricElement}>
                    <Text style={Typography.statNumber}>3.76K</Text>
                    <Text style={[Typography.caption, { color: Colors.textMuted }]}>Followers</Text>
                  </View>
                  <View style={styles.socialMetricElement}>
                    <Text style={Typography.statNumber}>87</Text>
                    <Text style={[Typography.caption, { color: Colors.textMuted }]}>Posts</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.growthChartContainerCustomBorder}>
              <View style={styles.chartHeaderRow}>
                <Text style={Typography.h3}>Follower Growth</Text>
                <Pressable style={styles.dropdownSelector}>
                  <Text style={[Typography.caption, { color: Colors.bgBlack }]}>June 2024</Text>
                  <Ionicons name="chevron-down" size={12} color={Colors.bgBlack} style={styles.dropdownArrow} />
                </Pressable>
              </View>
              <View style={styles.mockChartVisualArea} />
            </View>

            <View style={styles.metaBlockSectionCustomBorder}>
              <Text style={[Typography.h2, styles.sectionBlockHeading]}>Content Categories</Text>
              <View style={styles.badgeWrapRow}>
                <View style={styles.pillBadgeContainerCustomBorder}>
                  <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]}>#Blog</Text>
                </View>
                <View style={styles.pillBadgeContainerCustomBorder}>
                  <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]}>#Photo</Text>
                </View>
                <View style={styles.pillBadgeContainerCustomBorder}>
                  <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]}>#VideoStream</Text>
                </View>
                <View style={styles.pillBadgeContainerCustomBorder}>
                  <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]}>#Tutorial</Text>
                </View>
              </View>
            </View>

            <View style={styles.metaBlockSectionCustomBorder}>
              <Text style={[Typography.h2, styles.sectionBlockHeading]}>Achivements</Text>
              <View style={styles.badgeWrapRow}>
                <View style={styles.pillBadgeContainerCustomBorder}>
                  <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]}>🏆 Top Creator 2023</Text>
                </View>
                <View style={styles.pillBadgeContainerCustomBorder}>
                  <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]}>✅ Verified Influencer</Text>
                </View>
              </View>
              <View style={[styles.badgeWrapRow, { marginTop: 8 }]}>
                <View style={styles.pillBadgeContainerCustomBorder}>
                  <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]}>👥 100K+ Followers</Text>
                </View>
                <View style={styles.pillBadgeContainerCustomBorder}>
                  <Text style={[Typography.bodySmall, { color: Colors.textPrimary }]}>🤝 Brand Partner</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {activeTab === 'content' && (
          <Animated.View entering={tabDirection('content').entering} exiting={tabDirection('content').exiting}>
            <View style={styles.contentGridSystem}>
              <View style={styles.contentColumnItem}>
                <ImageBackground 
                  source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500' }} 
                  style={styles.contentCardMediaFrame}
                  imageStyle={styles.contentCardImageRadius}
                >
                  <View style={styles.contentCardDimmingOverlay}>
                    <Text style={styles.contentOverlaySubtitleText}>You won't believe this is a website</Text>
                  </View>
                </ImageBackground>
                <Pressable style={styles.contentMediaActionFooter}>
                  <Ionicons name="logo-instagram" size={16} color={Colors.instagram} />
                  <Text style={styles.contentFooterActionLabel}>View</Text>
                </Pressable>
              </View>

              <View style={styles.contentColumnItem}>
                <ImageBackground 
                  source={{ uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500' }} 
                  style={styles.contentCardMediaFrame}
                  imageStyle={styles.contentCardImageRadius}
                >
                  <View style={styles.contentCardDimmingOverlay}>
                    <Text style={styles.contentOverlaySubtitleText}>Many of your apps are not working right now</Text>
                  </View>
                </ImageBackground>
                <Pressable style={styles.contentMediaActionFooter}>
                  <Ionicons name="logo-tiktok" size={14} color={Colors.textPrimary} />
                  <Text style={styles.contentFooterActionLabel}>View</Text>
                </Pressable>
              </View>

              <View style={styles.contentColumnItem}>
                <ImageBackground 
                  source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500' }} 
                  style={styles.contentCardMediaFrame}
                  imageStyle={styles.contentCardImageRadius}
                >
                  <View style={styles.contentCardDimmingOverlay}>
                    <Text style={styles.contentOverlaySubtitleText}>"Girls can't be good at coding, it's not their cup of tea."</Text>
                  </View>
                </ImageBackground>
                <Pressable style={styles.contentMediaActionFooter}>
                  <Ionicons name="logo-facebook" size={16} color={Colors.facebook} />
                  <Text style={styles.contentFooterActionLabel}>View</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        )}

        {activeTab === 'pricing' && (
          <Animated.View entering={tabDirection('pricing').entering} exiting={tabDirection('pricing').exiting} style={styles.pricingDeckContainer}>
            {[
              { id: 'instagram', label: 'Instagram', icon: 'logo-instagram', color: Colors.instagram },
              { id: 'facebook', label: 'Facebook', icon: 'logo-facebook', color: Colors.facebook },
              { id: 'youtube', label: 'Youtube', icon: 'logo-youtube', color: Colors.youtube },
              { id: 'tiktok', label: 'TikTok', icon: 'logo-tiktok', color: Colors.textPrimary },
              { id: 'snapchat', label: 'Snapchat', icon: 'logo-snapchat', color: '#FFFC00' },
              ].map((platform) => (
                <Pressable
                  key={platform.id}
                  style={[styles.platformAccordionWrapper, styles.accordionHeaderButton]}
                  onPress={() => navigation.navigate('RequestQuote', {
                    platformId: platform.id,
                    influencerName: MOCK_PROFILE.name,
                  })}
                >
                  <View style={styles.accordionLeftSection}>
                    <Ionicons
                      name={platform.icon}
                      size={20}
                      color={platform.color}
                      style={styles.platformHeaderIcon}
                    />
                    <Text style={[Typography.body, styles.platformHeaderText]}>{platform.label}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={Colors.textSecondary}
                  />
                </Pressable>
              ))}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}