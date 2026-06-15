import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

<<<<<<< HEAD
import styles from "../screens/influencer/campaign/CampaignStyles";
=======
import styles
from "../screens/campaign/CampaignStyles";
>>>>>>> 6473a80eb8d377fc7e4be1d554cbe733f98a9372

type AppHeaderProps = {
  showSettings?: boolean;
  showChat?: boolean;
};

export default function
AppHeader({
  showSettings = true,
  showChat = true,
}: AppHeaderProps) {

  const navigation =
    useNavigation<any>();

  return (
    <View style={styles.topBar}>
      <Image
        source={require(
          "../assets/images/IMB360_v2.png"
        )}
        style={
          styles.topBarLogo
        }
        resizeMode="contain"
      />

      <View
        style={
          styles.topBarActions
        }
      >
        {/* CHAT */}
        {showChat && (
          <TouchableOpacity
            style={
              styles.topBarIcon
            }
            onPress={() => {
              navigation.navigate(
                "Chat"
              );
            }}
          >
            <Text
              style={
                styles.topBarIconText
              }
            >
              💬
            </Text>
          </TouchableOpacity>
        )}

        {/* SETTINGS */}
        {showSettings && (
          <TouchableOpacity
            style={
              styles.topBarIcon
            }
            onPress={() => {
              navigation.navigate(
                "Settings"
              );
            }}
          >
            <Text
              style={
                styles.topBarIconText
              }
            >
              ⚙️
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}