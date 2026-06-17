import React from 'react';
import { View } from 'react-native';

import {
  createBottomTabNavigator,
} from './tabs';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { SvgXml } from 'react-native-svg';

import {
  NB_PROFILE_SVG,
  NB_PROFILE_ACTIVE_SVG,
  NB_CAMPAIGN_SVG,
  NB_CAMPAIGN_ACTIVE_SVG,
  NB_EXPLORE_SVG,
  NB_EXPLORE_ACTIVE_SVG,
  NB_ASSETS_SVG,
  NB_ASSETS_ACTIVE_SVG,
  navbarIconContainerStyle,
} from './navbarIcons';

import { BrandBottomTabParamList } from '../types/navigation';

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
import BrandCampaignDetailsScreen
from "../screens/brand/CampaignTabs/BrandCampaignDetailsScreen";

import Campaigns
from '../screens/brand/CampaignTabs/BrandCampaignTabScreen';

import SettingsScreen
from '../screens/settings/SettingsScreen';

import BrandExploreScreen
from '../screens/brand/explore/BrandExploreScreen';

import InfluencerProfileScreen
from '../screens/explore/InfluencerProfileScreen';

import RequestQuoteScreen
from '../screens/explore/RequestQuoteScreen';

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
from "../screens/chat/ChatScreen";
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import PaymentCenterScreen
from '../screens/paymentCenter/PaymentCenterScreen';
import PaymentStatementScreen
from '../screens/paymentCenter/PaymentStatementScreen';
/* -------------------------------------------------------------------------- */
/*                                NAVIGATORS                                  */
/* -------------------------------------------------------------------------- */

const Tab =
  createBottomTabNavigator<BrandBottomTabParamList>();

const Stack =
  createNativeStackNavigator();

/* -------------------------------------------------------------------------- */
/*                            EXPLORE STACK                                   */
/* -------------------------------------------------------------------------- */

function ExploreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor:
            Colors.bgBlack,
        },
      }}
    >
      <Stack.Screen
        name="BrandExploreList"
        component={
          BrandExploreScreen
        }
      />
      <Stack.Screen
        name="InfluencerProfile"
        component={
          InfluencerProfileScreen
        }
      />
      <Stack.Screen
        name="RequestQuote"
        component={
          RequestQuoteScreen
        }
      />
    </Stack.Navigator>
  );
}

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
  name="Chat"
  component={
    ChatScreen
  }
  options={{
    presentation:
      "transparentModal",
  }}
/>

<Stack.Screen
  name="ChatRoom"
  component={
    ChatRoomScreen
  }
  options={{
    presentation:
      "card",
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
        name="PaymentCenter"
        component={
            PaymentCenterScreen
        }

/>
<Stack.Screen
  name="PaymentStatement"
  component={
    PaymentStatementScreen
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

      <Stack.Screen
        name="Settings"
        component={
          SettingsScreen
        }
      />
      <Stack.Screen
  name="Chat"
  component={ChatScreen}
/>

<Stack.Screen
  name="ChatRoom"
  component={ChatRoomScreen}
/>
    </Stack.Navigator>
  );
}

/* -------------------------------------------------------------------------- */
/*                            CAMPAIGNS STACK                                 */
/* -------------------------------------------------------------------------- */

function CampaignsStack() {
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
        name="BrandCampaignTab"
        component={
          Campaigns
        }
      />
      <Stack.Screen
  name="BrandCampaignDetails"
  component={
    BrandCampaignDetailsScreen
  }
/>
<Stack.Screen
  name="Chat"
  component={
    ChatScreen
  }
/>
<Stack.Screen
  name="ChatRoom"
  component={
    ChatRoomScreen
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
          '#FFFFFF',

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

              case 'Campaigns':
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
            }

            return null;
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
          ExploreStack
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
          CampaignsStack
        }
      />
    </Tab.Navigator>
  );
}