// src/screens/brand/profile/BrandProfileScreen.tsx

import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
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
import styles from './styles';

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

