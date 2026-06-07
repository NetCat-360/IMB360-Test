import React, { useState } from 'react'
import { View, Text, Pressable, ScrollView, StatusBar, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../config/theme'
import Typography from '../../styles/typography'
import { moderateScale } from '../../utils/scaling'
import TextField from '../../components/common/TextField/TextField'
import styles from './styles'

interface AssetCampaign {
  id: string
  brandName: string
  description: string
  startDate: string
  endDate: string
  location: string
  likes: number
  comments: number
  ratePerDay: number
}

interface FilterDropdownProps {
  label: string
  iconName: string
  onPress: () => void
  isOpen?: boolean
}

const CATEGORY_OPTIONS: string[] = [
  'Photo', 'Video', 'Document', 'Audio', 'Design', 'Presentation', 'Other'
]

const FilterDropdown = ({ label, iconName, onPress, isOpen = false }: FilterDropdownProps) => (
  <Pressable style={styles.dropdownRow} onPress={onPress}>
    <View style={styles.dropdownLeftContainer}>
      <Ionicons name={iconName} size={moderateScale(18)} color={Colors.textSecondary} style={styles.dropdownIcon} />
      <Text style={[Typography.body, styles.dropdownLabelText]}>{label}</Text>
    </View>
    <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={moderateScale(14)} color={Colors.textMuted} />
  </Pressable>
)

export default function AssetsScreen() {
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [cityQuery, setCityQuery] = useState('')
  const [pinQuery, setPinQuery] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  const campaigns: AssetCampaign[] = [
    {
      id: '1',
      brandName: 'W Motors',
      description: 'abcd efgh ijkl mnop qrst uvw xyz abcd efgh ijkl mnop qrst uvw xyz',
      startDate: '24/12/2025',
      endDate: '28/12/2025',
      location: 'Mathura, Uttar Pradesh',
      likes: 1,
      comments: 4,
      ratePerDay: 981,
    },
  ]

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible)
    if (isFilterVisible) {
      setIsCategoryOpen(false)
    }
  }

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category)
    setIsCategoryOpen(false)
  }

  const renderCampaignCard = ({ item }: { item: AssetCampaign }) => (
    <View style={styles.cardContainer}>
      <Text style={[Typography.displayMedium, styles.brandTitle]}>{item.brandName}</Text>

      <Text style={[Typography.body, styles.descriptionText]}>
        {item.description}
      </Text>

      <View style={styles.availabilityRow}>
        <Text style={[Typography.label, styles.availableLabel]}>AVAILABLE: </Text>
        <Text style={[Typography.body, styles.dateText]}>
          {item.startDate} TO {item.endDate}
        </Text>
      </View>

      <View style={styles.locationRow}>
        <Ionicons name="location" size={moderateScale(16)} color={Colors.error || '#FF3B30'} />
        <Text style={[Typography.body, styles.locationText]}>{item.location}</Text>
      </View>

      <View style={styles.bottomMetaRow}>
        <View style={styles.socialStats}>
          <View style={styles.statItem}>
            <Ionicons name="heart" size={moderateScale(16)} color={Colors.error || '#FF3B30'} />
            <Text style={[Typography.body, styles.statNumberText]}>{item.likes}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="chatbubble" size={moderateScale(16)} color={Colors.cyan} />
            <Text style={[Typography.body, styles.statNumberText]}>{item.comments}</Text>
          </View>
        </View>

        <View style={styles.pricingContainer}>
          <Text style={[Typography.h2, styles.priceText]}>₱ {item.ratePerDay}/Day</Text>
          <Pressable style={styles.rentButton}>
            <LinearGradient
              colors={[Colors.teal, Colors.lime]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={Typography.buttonPrimary}>Rent Now</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgBlack} />

      <View style={styles.headerImageContainer}>
        <View style={styles.logoRow}>
          <Ionicons name="people" size={moderateScale(24)} color={Colors.lime} />
          <Text style={[Typography.h1, styles.logoTextMain]}>
            IMB<Text style={styles.logoTextSub}>360</Text>
          </Text>
        </View>
      </View>

      <View style={styles.screenHeaderRow}>
        <Text style={Typography.displayLarge}>Assets</Text>
      </View>

      <View style={styles.filterBar}>
        <Text style={Typography.h2}>Filter Result</Text>
        <Pressable onPress={handleToggleFilter} style={styles.filterButton}>
          <Ionicons name="funnel-outline" size={moderateScale(20)} color={Colors.textPrimary} />
        </Pressable>
      </View>

      {isFilterVisible && (
        <View style={styles.filterDrawerStack}>
          <TextField
            placeholder="Search City Name"
            value={cityQuery}
            onChangeText={setCityQuery}
            containerStyle={styles.inputWrapperContainer}
            placeholderTextColor={Colors.textPrimary}
            style={{ color: Colors.textPrimary }}
            prefixComponent={
              <Ionicons name="search" size={moderateScale(18)} color={Colors.textSecondary} style={styles.inputSearchIcon} />
            }
          />

          <TextField
            placeholder="Search Area Pin"
            value={pinQuery}
            onChangeText={setPinQuery}
            containerStyle={styles.inputWrapperContainer}
            placeholderTextColor={Colors.textPrimary}
            style={{ color: Colors.textPrimary }}
            prefixComponent={
              <Ionicons name="search" size={moderateScale(18)} color={Colors.textSecondary} style={styles.inputSearchIcon} />
            }
          />

          <FilterDropdown
            label={selectedCategory}
            iconName="pricetag-outline"
            isOpen={isCategoryOpen}
            onPress={() => {
              setIsCategoryOpen(!isCategoryOpen)
            }}
          />

          {isCategoryOpen && (
            <View style={styles.dropdownExpandedListContent}>
              <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.dropdownScrollContainer}
              >
                <Pressable
                  style={styles.dropdownListItemTouchArea}
                  onPress={() => handleSelectCategory('All Categories')}
                >
                  <Text style={[Typography.body, selectedCategory === 'All Categories' ? styles.dropdownListItemTextActive : styles.dropdownListItemText]}>
                    All Categories
                  </Text>
                </Pressable>
                {CATEGORY_OPTIONS.map((category, idx) => {
                  const isLast = idx === CATEGORY_OPTIONS.length - 1
                  return (
                    <Pressable
                      key={category}
                      style={isLast ? styles.dropdownListItemTouchAreaLast : styles.dropdownListItemTouchArea}
                      onPress={() => handleSelectCategory(category)}
                    >
                      <Text style={[Typography.body, selectedCategory === category ? styles.dropdownListItemTextActive : styles.dropdownListItemText]}>
                        {category}
                      </Text>
                    </Pressable>
                  )
                })}
              </ScrollView>
            </View>
          )}

          <Pressable style={styles.submitBtn}>
            <LinearGradient
              colors={[Colors.teal, Colors.lime]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitGradient}
            >
              <Text style={[Typography.buttonPrimary, styles.submitBtnText]}>Search</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.submitBtn}>
            <LinearGradient
              colors={[Colors.teal, Colors.lime]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitGradient}
            >
              <Text style={[Typography.buttonPrimary, styles.submitBtnText]}>Add Assets</Text>
            </LinearGradient>
          </Pressable>
        </View>
      )}

      <FlatList
        data={campaigns}
        keyExtractor={(item) => item.id}
        renderItem={renderCampaignCard}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  )
}
