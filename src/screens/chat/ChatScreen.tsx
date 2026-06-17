import React from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useNavigation,
} from "@react-navigation/native";

import ScreenHeader
from "../../components/ScreenHeader";

import {
  RootState,
} from "../../store/store";

import {
  deleteChat,
} from "../../store/slices/chatSlice";

import {
  scale,
  verticalScale,
  moderateScale,
} from "../../utils/scaling";

import {
  Colors,
} from "../../config/theme";

export default function
ChatScreen() {

  const navigation =
    useNavigation<any>();

  const dispatch =
    useDispatch();

  const chats =
    useSelector(
      (
        state:
          RootState
      ) =>
        state.chat
          .chats
    );

  const renderItem =
    ({
      item,
    }: any) => {

      const lastMessage =
        item.messages[
          item.messages
            .length - 1
        ];

      return (
        <Pressable
          style={
            styles.chatCard
          }
          onPress={() =>
            navigation.navigate(
              "ChatRoom",
              {
                chatId:
                  item.id,
              }
            )
          }
        >
          {/* AVATAR */}
          <View
            style={
              styles.avatar
            }
          >
            <Text
              style={
                styles.avatarText
              }
            >
              {
                item.initials
              }
            </Text>
          </View>

          {/* INFO */}
          <View
            style={
              styles.infoContainer
            }
          >
            <Text
              style={
                styles.name
              }
            >
              {
                item.name
              }
            </Text>

            <Text
              style={
                item.status ===
                "Online"
                  ? styles.online
                  : styles.offline
              }
            >
              {
                item.status
              }
            </Text>

            <Text
              numberOfLines={
                1
              }
              style={
                styles.lastMessage
              }
            >
              {lastMessage
                ?.text ??
                "No messages yet"}
            </Text>
          </View>

          {/* DELETE */}
          <Pressable
            onPress={() =>
              dispatch(
                deleteChat(
                  item.id
                )
              )
            }
            style={
              styles.deleteButton
            }
          >
            <Text
              style={
                styles.deleteText
              }
            >
              −
            </Text>
          </Pressable>
        </Pressable>
      );
    };

  return (
    <SafeAreaView
      style={
        styles.container
      }
      edges={[]}
    >
      <ScreenHeader
        title="Chats"
        onBack={() =>
          navigation.goBack()
        }
      />

      <FlatList
        data={chats}
        keyExtractor={(
          item
        ) =>
          item.id
        }
        renderItem={
          renderItem
        }
        contentContainerStyle={
          styles.listContainer
        }
      />
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#000",
    },

    listContainer:
      {
        padding:
          scale(20),
      },

    chatCard: {
      borderWidth: 1,
      borderColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          18
        ),
      padding:
        scale(16),
      flexDirection:
        "row",
      alignItems:
        "center",
      marginBottom:
        verticalScale(
          12
        ),
      backgroundColor:
        "#050505",
    },

    avatar: {
      width:
        scale(56),
      height:
        scale(56),
      borderRadius:
        scale(28),
      backgroundColor:
        Colors.teal,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    avatarText: {
      color:
        "#000",
      fontWeight:
        "700",
      fontSize:
        moderateScale(
          18
        ),
    },

    infoContainer:
      {
        flex: 1,
        marginLeft:
          scale(14),
      },

    name: {
      color:
        "#FFF",
      fontSize:
        moderateScale(
          18
        ),
      fontWeight:
        "700",
    },

    online: {
      color:
        "#3CFF57",
      marginTop:
        verticalScale(
          0
        ),
    },

    offline: {
      color:
        "#A0A0A0",
      marginTop:
        verticalScale(
          0
        ),
    },

    lastMessage:
      {
        color:
          "#8A8A8A",
        marginTop:
          verticalScale(
            4
          ),
      },

    deleteButton:
      {
        width:
          scale(38),
        height:
          scale(38),
        borderRadius:
          scale(19),
        borderWidth: 1,
        borderColor:
          "#FF4D4D",
        justifyContent:
          "center",
        alignItems:
          "center",
      },

    deleteText: {
      color:
        "#FF4D4D",
      fontSize:
        moderateScale(
          28
        ),
      fontWeight:
        "600",
      top: -1,
    },
  });