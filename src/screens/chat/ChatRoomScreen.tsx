import React, {
    useState,
  } from "react";
  
  import {
    View,
    Text,
    FlatList,
    TextInput,
    Pressable,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
  } from "react-native";
  import {
    useFocusEffect,
  } from "@react-navigation/native";
  
  import {
    SafeAreaView,
  } from "react-native-safe-area-context";
  
  import {
    useRoute,
    useNavigation,
  } from "@react-navigation/native";
  
  import {
    useDispatch,
    useSelector,
  } from "react-redux";
  
  import ScreenHeader
  from "../../components/ScreenHeader";
  
  import {
    RootState,
  } from "../../store/store";
  
  import {
    sendMessage,
  } from "../../store/slices/chatSlice";
  
  import LinearGradient
  from "react-native-linear-gradient";
  
  import {
    scale,
    verticalScale,
    moderateScale,
  } from "../../utils/scaling";
  
  import {
    Colors,
  } from "../../config/theme";
  
  export default function
  ChatRoomScreen() {
    
  
    const navigation =
      useNavigation<any>();
      useFocusEffect(
        React.useCallback(() => {
          const parent =
            navigation.getParent();
      
          parent?.setOptions({
            tabBarStyle: {
              display: "none",
            },
          });
      
          return () => {
            parent?.setOptions({
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
            });
          };
        }, [navigation])
      );
  
    const route =
      useRoute<any>();
  
    const dispatch =
      useDispatch();
  
    const [message,
      setMessage] =
      useState("");
  
    const chatId =
      route.params
        ?.chatId;
  
    const chat =
      useSelector(
        (
          state:
            RootState
        ) =>
          state.chat
            .chats
            .find(
              item =>
                item.id ===
                chatId
            )
      );
  
    if (!chat) {
      return null;
    }

    const handleSend =
      () => {
  
        if (
          !message.trim()
        ) {
          return;
        }
  
        dispatch(
          sendMessage({
            chatId,
            text:
              message,
          })
        );
  
        setMessage("");
      };
  
    const renderMessageItem = ({ item, index }: { item: { id: string; text: string; sender: string; timestamp: string }; index: number }) => {
      const isMine = item.sender === "me";
      const previousMessage = chat.messages[index - 1];
      const showAvatar = !isMine && previousMessage?.sender !== item.sender;

      return (
        <View
          style={[
            styles.messageWrapper,
            isMine
              ? styles.myMessageRow
              : styles.otherMessageRow,
          ]}
        >
          {!isMine && (
            showAvatar ? (
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor:
                      chat.avatarColor ||
                      "#5B21B6",
                  },
                ]}
              >
                <Text
                  style={
                    styles.avatarText
                  }
                >
                  {chat.name
                    .split(" ")
                    .map(word => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </Text>
              </View>
            ) : (
              <View
                style={
                  styles.avatarSpacer
                }
              />
            )
          )}

          <View
            style={{
              maxWidth: "78%",
            }}
          >
            <View
              style={[
                styles.messageBubble,
                isMine
                  ? styles.myBubble
                  : styles.otherBubble,
              ]}
            >
              <Text
                style={
                  styles.messageText
                }
              >
                {item.text}
              </Text>
            </View>

            <Text
              style={[
                styles.time,
                {
                  textAlign:
                    isMine
                      ? "right"
                      : "left",
                },
              ]}
            >
              {item.timestamp}
            </Text>
          </View>
        </View>
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
          title={
            chat.name
          }
          onBack={() =>
            navigation.goBack()
          }
        />
  
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={
            Platform.OS ===
            "ios"
              ? "padding"
              : "height"
          }
        >
          <FlatList
            data={
              chat.messages
            }
            keyExtractor={(
              item
            ) =>
              item.id
            }
            contentContainerStyle={
              styles.chatContainer
            }
            showsVerticalScrollIndicator={
              false
            }
            renderItem={renderMessageItem}
          />
  
          {/* INPUT */}
          <View
            style={
              styles.inputContainer
            }
          >
            <TextInput
              value={
                message
              }
              onChangeText={
                setMessage
              }
              placeholder="Type a message..."
              placeholderTextColor="#777"
              style={
                styles.input
              }
            />
  
            <Pressable
              onPress={
                handleSend
              }
            >
              <LinearGradient
                colors={[
                  "#00C6FF",
                  "#7BFF5B",
                ]}
                style={
                  styles.sendButton
                }
              >
                <Text
                  style={
                    styles.sendText
                  }
                >
                  Send
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
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
  
      chatContainer:
        {
          padding:
            scale(20),
        },
  
      messageWrapper:
        {
          marginBottom:
            verticalScale(
              10
            ),
        },
  
      myMessageRow: {
        flexDirection:
          "row",
        justifyContent:
          "flex-end",
        alignItems:
          "flex-end",
      },
  
      otherMessageRow:
        {
          flexDirection:
            "row",
          alignItems:
            "flex-end",
        },
  
      avatar: {
        width:
          scale(38),
        height:
          scale(38),
        borderRadius:
          scale(19),
        justifyContent:
          "center",
        alignItems:
          "center",
        marginRight:
          scale(8),
        marginBottom:
          verticalScale(
            18
          ),
      },
  
      avatarSpacer:
        {
          width:
            scale(46),
        },
  
      avatarText: {
        color:
          "#FFF",
        fontWeight:
          "700",
        fontSize:
          moderateScale(
            13
          ),
      },
  
      messageBubble:
        {
          borderRadius:
            moderateScale(
              18
            ),
          padding:
            scale(14),
        },
  
      myBubble: {
        backgroundColor:
          Colors.teal,
        borderBottomRightRadius:
          4,
      },
  
      otherBubble:
        {
          backgroundColor:
            "#171717",
          borderWidth: 1,
          borderColor:
            Colors.teal,
          borderBottomLeftRadius:
            4,
        },
  
      messageText:
        {
          color:
            "#FFF",
          fontSize:
            moderateScale(
              15
            ),
            lineHeight: moderateScale(20),
        },
  
      time: {
        color:
          "#777",
        fontSize:
          moderateScale(
            12
          ),
        marginTop:
          verticalScale(
            4
          ),
      },
  
      inputContainer:
        {
          flexDirection:
            "row",
          alignItems:
            "center",
          padding:
            scale(20),
          marginBottom: scale(5),
          borderTopWidth:
            1,
          borderTopColor:
            "#111",
          backgroundColor:
            "#000",
        },
  
      input: {
        flex: 1,
        height:
          verticalScale(
            46
          ),
        borderWidth: 1,
        borderColor:
          Colors.teal,
        borderRadius:
          moderateScale(
            16
          ),
        paddingHorizontal:
          scale(16),
        color:
          "#FFF",
        marginRight:
          scale(10),
        backgroundColor:
          "#111",
      },
  
      sendButton:
        {
          height:
            verticalScale(
              46
            ),
          paddingHorizontal:
            scale(20),
          borderRadius:
            moderateScale(
              16
            ),
          justifyContent:
            "center",
          alignItems:
            "center",
        },
  
      sendText: {
        color:
          "#000",
        fontWeight:
          "700",
        fontSize:
          moderateScale(
            16
          ),
      },
    });