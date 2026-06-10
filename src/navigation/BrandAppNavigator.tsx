import React from 'react';
import {
  View,
  Image,
} from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  moderateScale,
  verticalScale,
} from '../utils/scaling';

import { Colors }
from '../config/theme';

/* -------------------------------------------------------------------------- */
/*                                   SCREENS                                  */
/* -------------------------------------------------------------------------- */

import BrandProfileScreen
from '../screens/brand/profile/BrandPorfileScreen';

import AddAssetsScreen
from '../screens/assets/addAssets/AddAssetsScreen';

import BrandOverviewScreen
from '../screens/brand/Overview/BrandOverviewScreen';

import BrandCampaignsScreen
from '../screens/brand/campaigns/BrandCampaignsScreen';

import CampaignBidsScreen
from '../screens/brand/campaignBids/BrandCampaignBidsScreen';

import PortfolioScreen
from '../screens/brand/campaignBids/PortfolioScreen';

import TotalSpendScreen
from '../screens/brand/totalspend/TotalSpendScreen';

import CreateCampaignScreen
from '../screens/brand/createCampaign/CreateCampaignScreen';

import AssetsScreen
from '../screens/assets/AssetsScreen';

import AssetDetailsScreen
from '../screens/assets/AssetDetailsScreen';

import Campaigns
from '../screens/campaign/Campaigns';

import SettingsScreen
from '../screens/settings/SettingsScreen';

import ManageAccountScreen
from '../screens/settings/ManageAccount/ManageAccountScreen';

import BioScreen
from '../screens/settings/Bio/BioScreen';

import SocialMediaScreen
from '../screens/settings/SocialMedia/SocialMediaScreen';

import AdditionalInfoScreen
from '../screens/settings/AdditionalInfo/AdditionalInfoScreen';

import ViewPlansScreen
from '../screens/settings/ViewPlans/ViewPlansScreen';

import SubscriptionScreen
from '../screens/settings/Subscription/SubscriptionScreen';

import ChangePasswordScreen
from '../screens/settings/ChangePassword/ChangePasswordScreen';

/* -------------------------------------------------------------------------- */
/*                                NAVIGATORS                                  */
/* -------------------------------------------------------------------------- */

const Tab =
  createBottomTabNavigator();

const Stack =
  createNativeStackNavigator();

/* -------------------------------------------------------------------------- */
/*                               TEMP SCREEN                                  */
/* -------------------------------------------------------------------------- */

const ExploreScreen =
  () => null;

/* -------------------------------------------------------------------------- */
/*                            PROFILE STACK                                   */
/* -------------------------------------------------------------------------- */

function BrandProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:
          false,

        contentStyle: {
          backgroundColor:
            Colors.bgBlack,
        },
      }}
    >
      <Stack.Screen
        name="BrandProfile"
        component={
          BrandProfileScreen
        }
      />

      <Stack.Screen
        name="AddAssets"
        component={
          AddAssetsScreen
        }
      />

      <Stack.Screen
        name="BrandOverview"
        component={
          BrandOverviewScreen
        }
      />

      <Stack.Screen
        name="BrandCampaigns"
        component={
          BrandCampaignsScreen
        }
      />

      <Stack.Screen
        name="CampaignBids"
        component={
          CampaignBidsScreen
        }
      />

      <Stack.Screen
        name="PortfolioScreen"
        component={
          PortfolioScreen
        }
      />

      <Stack.Screen
        name="TotalSpend"
        component={
          TotalSpendScreen
        }
      />

      <Stack.Screen
        name="CreateCampaign"
        component={
          CreateCampaignScreen
        }
      />

      <Stack.Screen
        name="Settings"
        component={
          SettingsScreen
        }
      />

      <Stack.Screen
        name="ManageAccount"
        component={
          ManageAccountScreen
        }
      />

      <Stack.Screen
        name="Bio"
        component={
          BioScreen
        }
      />

      <Stack.Screen
        name="SocialMedia"
        component={
          SocialMediaScreen
        }
      />

      <Stack.Screen
        name="AdditionalInfo"
        component={
          AdditionalInfoScreen
        }
      />

      <Stack.Screen
        name="ViewPlans"
        component={
          ViewPlansScreen
        }
      />

      <Stack.Screen
        name="Subscription"
        component={
          SubscriptionScreen
        }
      />

      <Stack.Screen
        name="ChangePassword"
        component={
          ChangePasswordScreen
        }
      />
    </Stack.Navigator>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ASSETS STACK                                  */
/* -------------------------------------------------------------------------- */

function AssetsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:
          false,

        contentStyle: {
          backgroundColor:
            Colors.bgBlack,
        },
      }}
    >
      <Stack.Screen
        name="AssetsHome"
        component={
          AssetsScreen
        }
      />

      <Stack.Screen
        name="AssetDetails"
        component={
          AssetDetailsScreen
        }
      />
    </Stack.Navigator>
  );
}

/* -------------------------------------------------------------------------- */
/*                              BRAND NAVIGATOR                               */
/* -------------------------------------------------------------------------- */

export default function
BrandNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }) => ({
        headerShown:
          false,

        tabBarStyle: {
          backgroundColor:
            Colors.bgSurface,

          borderTopWidth:
            1,

          borderTopColor:
            Colors.teal,

          height:
            verticalScale(
              60
            ),

          paddingBottom:
            verticalScale(
              4
            ),

          paddingTop:
            verticalScale(
              4
            ),
        },

        tabBarItemStyle:
          {
            paddingHorizontal:
              0,

            marginHorizontal:
              -4,
          },

        tabBarActiveTintColor:
          Colors.teal,

        tabBarInactiveTintColor:
          '#7A7A7A',

        tabBarLabelStyle:
          {
            fontSize:
              moderateScale(
                12
              ),

            fontWeight:
              '600',

            marginTop:
              verticalScale(
                2
              ),
          },

        tabBarIcon:
          ({ focused }) => {
            let icon;

            switch (
              route.name
            ) {
              case 'Profile':
                icon =
                  require(
                    '../assets/images/profilelogo.png'
                  );
                break;

              case 'Campaigns':
                icon =
                  require(
                    '../assets/images/campaignlogo.png'
                  );
                break;

              case 'Explore':
                icon =
                  require(
                    '../assets/images/explorelogo.png'
                  );
                break;

              case 'Assets':
                icon =
                  require(
                    '../assets/images/assetslogo.png'
                  );
                break;

              default:
                return null;
            }

            return (
              <View
                style={{
                  justifyContent:
                    'center',

                  alignItems:
                    'center',

                  top:
                    focused
                      ? -8
                      : 0,
                }}
              >
                <View
                  style={{
                    width:
                      focused
                        ? 52
                        : 20,

                    height:
                      focused
                        ? 52
                        : 20,

                    borderRadius:
                      24,

                    justifyContent:
                      'center',

                    alignItems:
                      'center',

                    backgroundColor:
                      focused
                        ? Colors.teal
                        : 'transparent',
                  }}
                >
                  <Image
                    source={
                      icon
                    }
                    style={{
                      width:
                        focused
                          ? 40
                          : 32,

                      height:
                        focused
                          ? 40
                          : 32,

                      resizeMode:
                        'contain',

                      tintColor:
                        focused
                          ? '#000'
                          : '#7A7A7A',
                    }}
                  />
                </View>
              </View>
            );
          },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={
          BrandProfileStack
        }
      />

      <Tab.Screen
        name="Explore"
        component={
          ExploreScreen
        }
      />

      <Tab.Screen
        name="Assets"
        component={
          AssetsStack
        }
      />

      <Tab.Screen
        name="Campaigns"
        component={
          Campaigns
        }
      />
    </Tab.Navigator>
  );
}