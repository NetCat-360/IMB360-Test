import React from 'react';
import { View } from 'react-native';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  SvgXml,
} from 'react-native-svg';

import {
  NB_PROFILE_SVG,
  NB_PROFILE_ACTIVE_SVG,
  NB_CAMPAIGN_SVG,
  NB_CAMPAIGN_ACTIVE_SVG,
  NB_EXPLORE_SVG,
  NB_EXPLORE_ACTIVE_SVG,
  NB_ANALYTICS_SVG,
  NB_ANALYTICS_ACTIVE_SVG,
  NB_ASSETS_SVG,
  NB_ASSETS_ACTIVE_SVG,
  navbarIconContainerStyle,
} from './navbarIcons';

import {
  BottomTabParamList,
  AppStackParamList,
  CampaignStackParamList,
  ExploreStackParamList,
} from '../types/navigation';

<<<<<<< HEAD
/**
 * TAB SCREENS
 */
import { Colors } from '../config/theme';
import AssetsScreen from '../screens/assets/AssetsScreen';
import InfluencerProfileScreen from '../screens/explore/InfluencerProfileScreen';
import RequestQuoteScreen from '../screens/explore/RequestQuoteScreen';
import AddAssetsScreen
from '../screens/assets/addAssets/AddAssetsScreen';
/**
 * STACK SCREENS
 */
import HomeScreen from '../screens/influencer/home/HomeScreen';
import CampaignScreen from '../screens/influencer/campaign/CampaignScreen'
import ExploreScreen from '../screens/influencer/explore/ExploreScreen';
import AnalyticsScreen from '../screens/influencer/analytics/AnalyticsScreen';
import CampaignQueueScreen from '../screens/influencer/CampaignQueue/CampaignQueueScreen';
import ContentScreen from '../screens/influencer/content/ContentScreen';
import OverviewScreen from '../screens/influencer/overview/OverviewScreen';
import MyEarnings from '../screens/influencer/MyEarnings/MyEarnings';
import AddContentScreen from '../screens/influencer/content/AddContentScreen';
import EditContentScreen from '../screens/influencer/content/EditContentScreen';

import PricingScreen from '../screens/influencer/pricing/PricingScreen';
import AddPricingScreen from '../screens/influencer/pricing/AddPricingScreen';
import EditPricingScreen from '../screens/influencer/pricing/EditPricingScreen';

import CampaignURLScreen from '../screens/influencer/CampaignQueue/CampaignURLScreen';
import ApplyCampaignScreen from '../screens/influencer/campaign/ApplyCampaignScreen';
=======
import {
  Colors,
} from '../config/theme';

/* -------------------------------------------------------------------------- */
/*                                   SCREENS                                  */
/* -------------------------------------------------------------------------- */

import HomeScreen
from '../screens/home/HomeScreen';

import CampaignScreen
from '../screens/campaign/CampaignScreen';

import ExploreScreen
from '../screens/explore/ExploreScreen';

import AnalyticsScreen
from '../screens/analytics/AnalyticsScreen';

import AssetsScreen
from '../screens/assets/AssetsScreen';

import AssetDetailsScreen
from '../screens/assets/AssetDetailsScreen';

import AddAssetsScreen
from '../screens/assets/addAssets/AddAssetsScreen';

import CampaignQueueScreen
from '../screens/CampaignQueue/CampaignQueueScreen';

import ContentScreen
from '../screens/content/ContentScreen';
>>>>>>> 6473a80eb8d377fc7e4be1d554cbe733f98a9372

import OverviewScreen
from '../screens/overview/OverviewScreen';

import MyEarnings
from '../screens/MyEarnings/MyEarnings';

import InfluencerProfileScreen
from '../screens/explore/InfluencerProfileScreen';

import RequestQuoteScreen
from '../screens/explore/RequestQuoteScreen';

import AddContentScreen
from '../screens/content/AddContentScreen';

import EditContentScreen
from '../screens/content/EditContentScreen';

import PricingScreen
from '../screens/pricing/PricingScreen';

import AddPricingScreen
from '../screens/pricing/AddPricingScreen';

import EditPricingScreen
from '../screens/pricing/EditPricingScreen';

import CampaignURLScreen
from '../screens/CampaignQueue/CampaignURLScreen';

import ApplyCampaignScreen
from '../screens/campaign/ApplyCampaignScreen';

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

import ChatScreen
from '../screens/chat/ChatScreen';

import ChatRoomScreen
from '../screens/chat/ChatRoomScreen';

/* -------------------------------------------------------------------------- */
/*                                NAVIGATORS                                  */
/* -------------------------------------------------------------------------- */

const Tab =
  createBottomTabNavigator<BottomTabParamList>();

const Stack =
  createNativeStackNavigator<AppStackParamList>();

const CampaignStack =
  createNativeStackNavigator<CampaignStackParamList>();

const ExploreStack =
  createNativeStackNavigator<ExploreStackParamList>();

const AssetsStack =
  createNativeStackNavigator();

/* -------------------------------------------------------------------------- */
/*                            CAMPAIGN STACK                                  */
/* -------------------------------------------------------------------------- */

function CampaignStackNavigator() {
  return (
    <CampaignStack.Navigator
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor:
            Colors.bgBlack,
        },
      }}
    >
      <CampaignStack.Screen
        name="CampaignList"
        component={
          CampaignScreen
        }
      />

      <CampaignStack.Screen
        name="ApplyCampaign"
        component={
          ApplyCampaignScreen
        }
      />
    </CampaignStack.Navigator>
  );
}

/* -------------------------------------------------------------------------- */
/*                            EXPLORE STACK                                   */
/* -------------------------------------------------------------------------- */

function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerShown:
          false,
      }}
    >
      <ExploreStack.Screen
        name="ExploreList"
        component={
          ExploreScreen
        }
      />

      <ExploreStack.Screen
        name="InfluencerProfile"
        component={
          InfluencerProfileScreen
        }
      />

      <ExploreStack.Screen
        name="RequestQuote"
        component={
          RequestQuoteScreen
        }
      />
    </ExploreStack.Navigator>
  );
}

/* -------------------------------------------------------------------------- */
/*                             ASSETS STACK                                   */
/* -------------------------------------------------------------------------- */

function AssetsStackNavigator() {
  return (
    <AssetsStack.Navigator
      screenOptions={{
        headerShown:
          false,

        contentStyle: {
          backgroundColor:
            Colors.bgBlack,
        },
      }}
    >
      <AssetsStack.Screen
        name="AssetsHome"
        component={
          AssetsScreen
        }
      />

      <AssetsStack.Screen
        name="AssetDetails"
        component={
          AssetDetailsScreen
        }
      />

      <AssetsStack.Screen
        name="Chat"
        component={
          ChatScreen
        }
      />

      <AssetsStack.Screen
        name="ChatRoom"
        component={
          ChatRoomScreen
        }
      />
    </AssetsStack.Navigator>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 MAIN TABS                                  */
/* -------------------------------------------------------------------------- */

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }) => ({
        headerShown:
          false,

        tabBarStyle: {
          backgroundColor:
            '#000',

          borderTopWidth:
            1,

          borderTopColor:
            '#00ACB3',

          height:
            80,

          paddingBottom:
            8,

          paddingTop:
            8,
        },

        tabBarItemStyle:
          {
            paddingHorizontal:
              0,

            marginHorizontal:
              -4,
          },

        tabBarActiveTintColor:
          '#00D2FF',

        tabBarInactiveTintColor:
          '#7A7A7A',

        tabBarLabelStyle:
          {
            fontSize:
              11,

            fontWeight:
              '600',

            marginTop:
              8,
          },

        tabBarIcon:
          ({ color, focused }) => {
            switch (
              route.name
            ) {
              case 'Profile':
                return (
                  <View style={[
                    navbarIconContainerStyle,
                    focused && {
                      top: -12,
                    },
                  ]}>
                    <SvgXml
                      xml={
                        focused
                          ? NB_PROFILE_ACTIVE_SVG
                          : NB_PROFILE_SVG
                      }
                      width={
                        focused
                          ? 50
                          : 32
                      }
                      height={
                        focused
                          ? 50
                          : 32
                      }
                      color={color}
                    />
                  </View>
                );

              case 'Campaign':
                return (
                  <View style={[
                    navbarIconContainerStyle,
                    focused && {
                      top: -12,
                    },
                  ]}>
                    <SvgXml
                      xml={
                        focused
                          ? NB_CAMPAIGN_ACTIVE_SVG
                          : NB_CAMPAIGN_SVG
                      }
                      width={focused ? 50 : 32}
                      height={focused ? 50 : 32}
                      color={color}
                    />
                  </View>
                );

              case 'Explore':
                return (
                  <View style={[
                    navbarIconContainerStyle,
                    focused && {
                      top: -12,
                    },
                  ]}>
                    <SvgXml
                      xml={
                        focused
                          ? NB_EXPLORE_ACTIVE_SVG
                          : NB_EXPLORE_SVG
                      }
                      width={focused ? 50 : 32}
                      height={focused ? 50 : 32}
                      color={color}
                    />
                  </View>
                );

              case 'Analytics':
                return (
                  <View style={[
                    navbarIconContainerStyle,
                    focused && {
                      top: -12,
                    },
                  ]}>
                    <SvgXml
                      xml={
                        focused
                          ? NB_ANALYTICS_ACTIVE_SVG
                          : NB_ANALYTICS_SVG
                      }
                      width={focused ? 50 : 32}
                      height={focused ? 50 : 32}
                      color={color}
                    />
                  </View>
                );

              case 'Assets':
                return (
                  <View style={[
                    navbarIconContainerStyle,
                    focused && {
                      top: -12,
                    },
                  ]}>
                    <SvgXml
                      xml={
                        focused
                          ? NB_ASSETS_ACTIVE_SVG
                          : NB_ASSETS_SVG
                      }
                      width={focused ? 50 : 32}
                      height={focused ? 50 : 32}
                      color={color}
                    />
                  </View>
                );
            }

            return null;
          },
      })}
    >
      <Tab.Screen
        name="Profile"
        component={
          HomeScreen
        }
      />

      <Tab.Screen
        name="Campaign"
        component={
          CampaignStackNavigator
        }
      />

      <Tab.Screen
        name="Explore"
        component={
          ExploreStackNavigator
        }
      />

      <Tab.Screen
        name="Analytics"
        component={
          AnalyticsScreen
        }
      />

      <Tab.Screen
        name="Assets"
        component={
          AssetsStackNavigator
        }
      />
    </Tab.Navigator>
  );
}

/* -------------------------------------------------------------------------- */
/*                             ROOT NAVIGATOR                                 */
/* -------------------------------------------------------------------------- */

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown:
          false,

        animation:
          'fade',

        animationDuration:
          300,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={
          MainTabs
        }
      />

      <Stack.Screen
        name="Home"
        component={
          HomeScreen
        }
      />

      <Stack.Screen
        name="Overview"
        component={
          OverviewScreen
        }
      />

      <Stack.Screen
        name="Content"
        component={
          ContentScreen
        }
      />

      <Stack.Screen
        name="AddContent"
        component={
          AddContentScreen
        }
      />

      <Stack.Screen
        name="EditContent"
        component={
          EditContentScreen
        }
      />

      <Stack.Screen
        name="Pricing"
        component={
          PricingScreen
        }
      />

      <Stack.Screen
        name="AddPricing"
        component={
          AddPricingScreen
        }
      />

      <Stack.Screen
        name="EditPricing"
        component={
          EditPricingScreen
        }
      />

      <Stack.Screen
        name="CampaignQueue"
        component={
          CampaignQueueScreen
        }
      />

      <Stack.Screen
        name="CampaignURL"
        component={
          CampaignURLScreen
        }
      />

      <Stack.Screen
        name="MyEarnings"
        component={
          MyEarnings
        }
      />

      <Stack.Screen
        name="Settings"
        component={
          SettingsScreen
        }
      />
     <Stack.Screen
  name="Chat"
  component={
    ChatScreen
  }
  options={{
    presentation:
      "modal",
  }}
/>

<Stack.Screen
  name="ChatRoom"
  component={
    ChatRoomScreen
  }
  options={{
    presentation:
      "modal",
  }}
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

      <Stack.Screen
        name="AddAssets"
        component={
          AddAssetsScreen
        }
      />
    </Stack.Navigator>
  );
}