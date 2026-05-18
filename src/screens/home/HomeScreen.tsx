import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/scaling'

function StatItem({
  number,
  label,
}: {
  number: string
  label: string
}) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>
        {number}
      </Text>

      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  )
}

function MenuItem({
  icon,
  title,
  onPress,
}: {
  icon?: any
  title: string
  onPress?: () => void
}) {
  return (
    <TouchableOpacity
      style={styles.menuCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuContent}>
        {icon && (
          <Image
            source={icon}
            style={styles.menuIcon}
          />
        )}

        <Text style={styles.menuText}>
          {title}
        </Text>
      </View>

      <Image
        source={require('../../assets/images/rightarrow.png')}
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  )
}

export default function HomeScreen() {
  const navigation = useNavigation<any>()

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={require('../../assets/images/IMB360_v2.png')}
          style={styles.topBarLogo}
          resizeMode="contain"
        />

        <View style={styles.topBarActions}>
          <TouchableOpacity
            style={styles.topBarIcon}
          >
            <Text
              style={
                styles.topBarIconText
              }
            >
              💬
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topBarIcon}
          >
            <Text
              style={
                styles.topBarIconText
              }
            >
              ⚙️
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* Banner */}
        <View style={styles.banner} />

        {/* Profile */}
        <View style={styles.profileRow}>
          <View style={styles.avatar} />

          <View>
            <Text style={styles.name}>
              Username
            </Text>

            <Text
              style={styles.username}
            >
              @username01
            </Text>
          </View>
        </View>

        {/* Bio */}
        <View
          style={styles.bioContainer}
        >
          <Text style={styles.bio}>
            Digital creator |
            Fashion & Lifestyle
          </Text>

          <Text style={styles.bio}>
            Helping brands grow 🚀
          </Text>

          <TouchableOpacity>
            <Text
              style={styles.website}
            >
              Add website 🔗
            </Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={
              styles.actionButton
            }
          >
            <Text
              style={
                styles.actionText
              }
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.actionButton
            }
          >
            <Image
              source={require('../../assets/images/pointslogo.png')}
              style={
                styles.pointsIcon
              }
            />

            <Text
              style={
                styles.actionText
              }
            >
              Points
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.actionButton
            }
          >
            <Text
              style={
                styles.actionText
              }
            >
              Add Assets
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoRow}>
          <Text
            style={styles.infoText}
          >
            📅 Joined December
            2025
          </Text>

          <Text
            style={styles.infoText}
          >
            📍 Delhi, India
          </Text>
        </View>

        {/* Stats */}
        <View
          style={
            styles.statsContainer
          }
        >
          <StatItem
            number="10"
            label="Following"
          />

          <StatItem
            number="3.76K"
            label="Followers"
          />

          <StatItem
            number="65.4%"
            label="Engagement"
          />

          <StatItem
            number="4"
            label="Rating"
          />
        </View>

        {/* Menu */}
        <MenuItem
          title="Overview"
          icon={require('../../assets/images/overviewlogo.png')}
          onPress={() =>
            navigation.navigate(
              'Overview'
            )
          }
        />

        <MenuItem
          title="Content"
          onPress={() => navigation.navigate('Content')}
          icon={require('../../assets/images/contentlogo.png')}
        />

        <MenuItem
          title="Pricing"
          onPress={() => navigation.navigate('Pricing')}
          icon={require('../../assets/images/pricinglogo.png')}
        />

        <MenuItem
          title="Campaign Queue"
        />

        <MenuItem
          title="My Earnings"
          icon={require('../../assets/images/earninglogo.png')}
          onPress={() =>
            navigation.navigate(
              'MyEarnings'
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  scrollContent: {
    paddingBottom:
      verticalScale(30),
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    paddingHorizontal:
      scale(16),
    paddingVertical:
      verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor:
      '#1C1C1E',
  },

  topBarLogo: {
    width: scale(100),
    height:
      verticalScale(28),
  },

  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  topBarIcon: {
    marginLeft: scale(16),
  },

  topBarIconText: {
    fontSize:
      moderateScale(20),
  },

  // Banner
  banner: {
    height:
      verticalScale(75),
    backgroundColor:
      '#EAEAEA',
    marginHorizontal:
      scale(15),
    marginTop:
      verticalScale(12),
    borderRadius:
      moderateScale(18),
  },

  // Profile
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:
      verticalScale(10),
    paddingHorizontal:
      scale(24),
  },

  avatar: {
    width: scale(70),
    height: scale(70),
    borderRadius:
      scale(40),
    backgroundColor:
      '#4DFF88',
    marginRight:
      scale(16),
  },

  name: {
    color: '#FFF',
    fontSize:
      moderateScale(24),
    fontWeight: '800',
  },

  username: {
    color: '#9A9A9A',
    fontSize:
      moderateScale(15),
    marginTop:
      verticalScale(1),
  },

  // Bio
  bioContainer: {
    paddingHorizontal:
      scale(24),
    marginTop:
      verticalScale(5),
  },

  bio: {
    color: '#FFF',
    fontSize:
      moderateScale(14),
    lineHeight:
      verticalScale(18),
  },

  website: {
    color: '#00D5FF',
    fontSize:
      moderateScale(14),
    marginTop:
      verticalScale(4),
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    paddingHorizontal:
      scale(20),
    marginTop:
      verticalScale(7),
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'center',
    backgroundColor:
      '#00D5FF',
    paddingVertical:
      verticalScale(6),
    paddingHorizontal:
      scale(10),
    borderRadius:
      moderateScale(10),
  },

  pointsIcon: {
    width: scale(18),
    height: scale(14),
    resizeMode: 'contain',
    marginRight:
      scale(6),
  },

  actionText: {
    color: '#000',
    fontWeight: '400',
    fontSize:
      moderateScale(16),
  },

  // Info
  infoRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    paddingHorizontal:
      scale(24),
    marginTop:
      verticalScale(10),
  },

  infoText: {
    color: '#AAA',
    fontSize:
      moderateScale(12),
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    borderWidth: 1,
    borderColor:
      '#00D5FF',
    borderRadius:
      moderateScale(18),
    marginHorizontal:
      scale(20),
    paddingVertical:
      verticalScale(10),
    marginTop:
      verticalScale(15),
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statNumber: {
    color: '#FFF',
    fontSize:
      moderateScale(16),
    fontWeight: '600',
  },

  statLabel: {
    color: '#FFF',
    fontSize:
      moderateScale(12),
    marginTop:
      verticalScale(2),
  },

  // Menu
  menuCard: {
    height:
      verticalScale(30),
    borderWidth: 1,
    borderColor:
      '#00D5FF',
    borderRadius:
      moderateScale(10),
    marginHorizontal:
      scale(60),
    marginTop:
      verticalScale(15),
    paddingHorizontal:
      scale(18),
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
  },

  menuText: {
    flex: 1,
    color: '#FFF',
    fontSize:
      moderateScale(18),
    textAlign: 'center',
    fontWeight: '400',
  },

  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent:
      'center',
  },

  menuIcon: {
    width: scale(32),
    height: scale(32),
    resizeMode: 'cover',
    marginRight:
      scale(-22),
  },
  arrowIcon: {
    width: scale(14),
    height: scale(25),
    resizeMode: 'contain',
  },
})