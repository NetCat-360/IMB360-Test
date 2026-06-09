// src/screens/brand/profile/BrandProfileScreen.tsx

import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import AppHeader
from '../../../components/AppHeader';

import {
  scale,
  verticalScale,
  moderateScale,
} from '../../../utils/scaling';

import { Colors }
from '../../../config/theme';

import Typography
from '../../../styles/typography';

import {
  BrandNavigationProp,
} from '../../../types/navigation';

function StatItem({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <View
      style={
        styles.statItem
      }
    >
      <Text
        style={
          styles.statNumber
        }
      >
        {number}
      </Text>

      <Text
        style={
          styles.statLabel
        }
      >
        {label}
      </Text>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  onPress,
}: {
  icon: any;
  title: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={
        styles.menuCard
      }
      activeOpacity={
        0.8
      }
      onPress={
        onPress
      }
    >
      <Image
        source={icon}
        style={
          styles.menuIcon
        }
        resizeMode="contain"
      />

      <Text
        style={
          styles.menuText
        }
      >
        {title}
      </Text>

      <Image
        source={require(
          '../../../assets/images/rightarrow.png'
        )}
        style={
          styles.arrowIcon
        }
      />
    </TouchableOpacity>
  );
}

export default function
BrandProfileScreen() {
  const navigation =
    useNavigation<
      BrandNavigationProp<
        'BrandProfile'
      >
    >();

  return (
    <SafeAreaView
      style={
        styles.container
      }
      edges={['top']}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />

      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* Banner */}
        <View
          style={
            styles.banner
          }
        />

        {/* Profile */}
        <View
          style={
            styles.profileSection
          }
        >
          <View
            style={
              styles.profileRow
            }
          >
            <View
              style={
                styles.avatar
              }
            />

            <View
              style={
                styles.profileInfo
              }
            >
              <Text
                style={
                  styles.name
                }
              >
                Username
              </Text>

              <Text
                style={
                  styles.username
                }
              >
                @username1212
              </Text>
            </View>

            <TouchableOpacity>
              <Image
                source={require(
                  '../../../assets/images/editprofile.png'
                )}
                style={
                  styles.editIcon
                }
              />
            </TouchableOpacity>
          </View>

          {/* Bio */}
          <View
            style={
              styles.bioContainer
            }
          >
            <Text
              style={[
                Typography.body,
              ]}
            >
              Digital creator |
              Fashion &
              Lifestyle
            </Text>

            <Text
              style={[
                Typography.body,
              ]}
            >
              Helping brands
              grow 🚀
            </Text>

            <TouchableOpacity>
              <Text
                style={
                  styles.website
                }
              >
                Add website 🔗
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}
        <View
          style={
            styles.buttonRow
          }
        >
          <TouchableOpacity
            style={
              styles.actionButton
            }
            onPress={() =>
              navigation.navigate(
                'AddAssets'
              )
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

          <TouchableOpacity
            style={
              styles.actionButton
            }
            onPress={() =>
              navigation.navigate(
                'CreateCampaign'
              )
            }
          >
            <Text
              style={
                styles.actionText
              }
            >
              Create Campaigns
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Row */}
        <View
          style={
            styles.infoRow
          }
        >
          <View
            style={
              styles.infoItem
            }
          >
            <Image
              source={require(
                '../../../assets/images/calendar.png'
              )}
              style={
                styles.infoIcon
              }
              resizeMode="contain"
            />

            <Text
              style={
                styles.infoText
              }
            >
              Joined
              December
              2025
            </Text>
          </View>

          <View
            style={
              styles.infoItem
            }
          >
            <Image
              source={require(
                '../../../assets/images/location.png'
              )}
              style={
                styles.infoIcon
              }
              resizeMode="contain"
            />

            <Text
              style={
                styles.infoText
              }
            >
              Delhi, India
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View
          style={
            styles.statsContainer
          }
        >
          <StatItem
            number="₹53350"
            label="Total Expense"
          />

          <StatItem
            number="₹0"
            label="Current Balance"
          />

          <StatItem
            number="4.1%"
            label="Engagement"
          />

          <StatItem
            number="12"
            label="Campaign"
          />
        </View>

        {/* Menu */}
        <MenuItem
          title="Overview"
          icon={require(
            '../../../assets/images/overviewlogo.png'
          )}
          onPress={() =>
            navigation.navigate(
              'BrandOverview'
            )
          }
        />

        <MenuItem
          title="Campaigns"
          icon={require(
            '../../../assets/images/campaign.png'
          )}
          onPress={() =>
            navigation.navigate(
              'BrandCampaigns'
            )
          }
        />

        <MenuItem
          title="Campaign Bids"
          icon={require(
            '../../../assets/images/earninglogo.png'
          )}
          onPress={() =>
            navigation.navigate(
              'CampaignBids'
            )
          }
        />

        <MenuItem
          title="Total Spend"
          icon={require(
            '../../../assets/images/earninglogo.png'
          )}
          onPress={() =>
            navigation.navigate(
              'TotalSpend'
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#000',
    },

    scrollContent: {
      paddingBottom:
        verticalScale(
          30
        ),
    },

    banner: {
      height:
        verticalScale(
          75
        ),
      backgroundColor:
        '#EAEAEA',
      marginHorizontal:
        scale(15),
      marginTop:
        verticalScale(
          12
        ),
      borderRadius:
        moderateScale(
          18
        ),
    },

    profileSection: {
      marginTop:
        verticalScale(
          0
        ),
    },

    profileRow: {
      flexDirection:
        'row',
      alignItems:
        'center',
      marginTop:
        verticalScale(
          10
        ),
      paddingHorizontal:
        scale(24),
    },

    avatar: {
      width:
        scale(70),
      height:
        scale(70),
      borderRadius:
        scale(40),
      backgroundColor:
        '#4DFF88',
      marginRight:
        scale(16),
    },

    profileInfo: {
      flex: 1,
    },

    name: {
      color: '#fff',
      fontSize:
        moderateScale(
          28
        ),
      fontWeight:
        '700',
    },

    username: {
      color: '#9A9A9A',
      fontSize:
        moderateScale(
          16
        ),
    },

    editIcon: {
      width:
        scale(24),
      height:
        scale(24),
      resizeMode:
        'contain',
    },

    bioContainer: {
      paddingHorizontal:
        scale(24),
      marginTop:
        verticalScale(
          5
        ),
    },

    website: {
      color:
        Colors.teal,
      marginTop:
        verticalScale(
          4
        ),
      fontSize:
        moderateScale(
          16
        ),
    },

    buttonRow: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      paddingHorizontal:
        scale(20),
      marginTop:
        verticalScale(
          10
        ),
    },

    actionButton: {
      width: '47%',
      backgroundColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          10
        ),
      justifyContent:
        'center',
      alignItems:
        'center',
      paddingVertical:
        verticalScale(
          8
        ),
    },

    actionText: {
      color: '#000',
      fontSize:
        moderateScale(
          17
        ),
      fontWeight:
        '600',
    },

    infoItem: {
      flexDirection:
        'row',
      alignItems:
        'center',
    },

    infoIcon: {
      width:
        scale(14),
      height:
        scale(14),
      marginRight:
        scale(5),
    },

    infoRow: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      marginTop:
        verticalScale(
          12
        ),
      paddingHorizontal:
        scale(20),
    },

    infoText: {
      color: '#A8A8A8',
      fontSize:
        moderateScale(
          13
        ),
    },

    statsContainer: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      borderWidth: 1,
      borderColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          18
        ),
      marginHorizontal:
        scale(10),
      marginTop:
        verticalScale(
          12
        ),
      paddingVertical:
        verticalScale(
          12
        ),
      paddingHorizontal:
        scale(10),
    },

    statItem: {
      flex: 1,
      alignItems:
        'center',
    },

    statNumber: {
      color: '#fff',
      fontWeight:
        '700',
      fontSize:
        moderateScale(
          18
        ),
    },

    statLabel: {
      color: '#fff',
      textAlign:
        'center',
      fontSize:
        moderateScale(
          12
        ),
      marginTop:
        verticalScale(
          4
        ),
    },

    menuCard: {
      height:
        verticalScale(
          35
        ),
      borderWidth: 1,
      borderColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          12
        ),
      marginHorizontal:
        scale(40),
      marginTop:
        verticalScale(
          10
        ),
      flexDirection:
        'row',
      alignItems:
        'center',
      paddingHorizontal:
        scale(18),
    },

    menuIcon: {
      width:
        scale(30),
      height:
        scale(30),
    },

    menuText: {
      flex: 1,
      textAlign:
        'center',
      color: '#fff',
      fontSize:
        moderateScale(
          18
        ),
      fontFamily:
        'Poppins-Regular',
    },

    arrowIcon: {
      width:
        scale(14),
      height:
        scale(22),
      resizeMode:
        'contain',
    },
  });