import React, {
    useState,
  } from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../../../components/ScreenHeader";
import {
    NativeStackNavigationProp,
  } from
  "@react-navigation/native-stack";
  
  import {
    AppStackParamList,
  } from
  "../../../types/navigation";
  
  type BrandNavProp =
    NativeStackNavigationProp<
      AppStackParamList
    >;
import {
    setSelectedTab,
    acceptBid,
    rejectBid,
    releasePayment,
    reportIssue,
  } from "../../../store/slices/Brand/brandCampaignBidsSlice";

import {
  moderateScale,
  verticalScale,
} from "../../../utils/scaling";

const CampaignBidsScreen = () => {
    const navigation =
    useNavigation<
      BrandNavProp
    >();
  const dispatch = useDispatch();
  const [
    modalType,
    setModalType,
  ] = useState<
    | "accept"
    | "reject"
    | "report"
    | "release"
    | null
  >(null);
  
  const [
    selectedId,
    setSelectedId,
  ] = useState<
    number | null
  >(null);

  const {
    selectedTab,
    bids,
    recentActivity,
  } = useSelector(
    (state: any) =>
      state.brandCampaignBids
  );
  console.log(
    "modalType:",
    modalType
  );

  const renderBidCard = ({
    item,
  }: any) => {
    return (
      <View style={styles.card}>
       <View style={styles.cardTop}>
  {/* Left Side */}
  <View
    style={{
      flexDirection: "row",
      flex: 1,
    }}
  >
    <View
      style={[
        styles.avatar,
        {
          backgroundColor:
            item.avatarColor,
        },
      ]}
    >
      <Text
        style={
          styles.avatarText
        }
      >
        {
          item.creatorInitials
        }
      </Text>
    </View>

    <View
      style={
        styles.userInfo
      }
    >
      <Text
        style={
          styles.creatorName
        }
      >
        {item.creatorName}
      </Text>

      <Text
        style={
          styles.campaignName
        }
      >
        {item.campaignName}
      </Text>
    </View>
  </View>

  {/* Right Side Buttons */}
  <View
    style={
      styles.actionContainer
    }
  >
    <View
      style={
        styles.actionRow
      }
    >
      <TouchableOpacity
        style={
          styles.acceptBtn
        }
        onPress={() => {
            setSelectedId(
              item.id
            );
          
            setModalType(
              "accept"
            );
          }}
      >
        <Text
          style={
            styles.actionText
          }
        >
          Accept
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          styles.rejectBtn
        }
        onPress={() => {
            setSelectedId(
              item.id
            );
          
            setModalType(
              "reject"
            );
          }}
      >
        <Text
          style={
            styles.actionText
          }
        >
          Reject
        </Text>
      </TouchableOpacity>
    </View>

    <View
      style={
        styles.actionRow
      }
    >
      <TouchableOpacity
        style={
          styles.outlineBtn
        }
      >
        <Text
          style={
            styles.outlineText
          }
        >
          Message
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  style={
    styles.outlineBtn
  }
  onPress={() =>
    navigation.navigate(
      "PortfolioScreen",
      {
        bid: item,
      }
    )
  }
>
  <Text
    style={
      styles.outlineText
    }
  >
    Portfolio
  </Text>
</TouchableOpacity>
    </View>
  </View>
</View>

        <View
          style={
            styles.bottomRow
          }
        >
          <Text
            style={
              styles.amount
            }
          >
            ₹{" "}
            {item.amount.toLocaleString()}
          </Text>

          <Text
            style={
              styles.date
            }
          >
            {item.date}
          </Text>
        </View>
      </View>
    );
  };
  const renderRecentCard =
({
  item,
}: any) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection:
            "row",
        }}
      >
        <View
          style={[
            styles.avatar,
            {
              backgroundColor:
                item.avatarColor,
            },
          ]}
        >
          <Text
            style={
              styles.avatarText
            }
          >
            {
              item.creatorInitials
            }
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            marginLeft:
              moderateScale(
                12
              ),
          }}
        >
          {/* Top Row */}
          <View
            style={{
              flexDirection:
                "row",
              justifyContent:
                "space-between",
            }}
          >
            <View>
              <Text
                style={
                  styles.creatorName
                }
              >
                {
                  item.creatorName
                }
              </Text>

              <Text
                style={
                  styles.campaignName
                }
              >
                {
                  item.campaignName
                }
              </Text>
            </View>

            <View>
              <Text
                style={
                  styles.smallLabel
                }
              >
                Rating
              </Text>

              <Text
                style={
                  styles.rating
                }
              >
                {"⭐".repeat(
                  item.rating
                )}
              </Text>
            </View>
          </View>

          {/* Payment */}
          <View
            style={{
              marginTop:
                verticalScale(
                  12
                ),
            }}
          >
            <Text
              style={
                styles.smallLabel
              }
            >
              Payment Status
            </Text>

            <TouchableOpacity
              disabled={
                item.paymentStatus !==
                "pending"
              }
              style={[
                styles.paymentBtn,

                item.paymentStatus ===
                  "released" &&
                  styles.releasedBtn,

                item.paymentStatus ===
                  "reported" &&
                  styles.reportedBtn,
              ]}
              onPress={() => {
                setSelectedId(
                  item.id
                );
              
                setModalType(
                  "release"
                );
              }}
            >
              <Text
                style={
                  styles.paymentText
                }
              >
                {item.paymentStatus ===
                "pending"
                  ? "Release Payment"
                  : item.paymentStatus ===
                    "released"
                  ? "Released"
                  : "Reported"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom */}
          <View
            style={{
              flexDirection:
                "row",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              marginTop:
                verticalScale(
                  16
                ),
            }}
          >
            <Text
              style={
                styles.amount
              }
            >
              ₹
              {item.amount.toLocaleString()}
            </Text>

            <TouchableOpacity
              disabled={
                item.paymentStatus ===
                "reported"
              }
              onPress={() => {
                setSelectedId(
                  item.id
                );
              
                setModalType(
                  "report"
                );
              }}
              style={
                styles.reportBtn
              }
            >
              <Text
                style={
                  styles.reportText
                }
              >
                {item.paymentStatus ===
                "reported"
                  ? "Reported"
                  : "Report"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

  return (
    <SafeAreaView
      style={styles.container}
      edges={[]}
    >
      {/* Header */}
      <ScreenHeader title="Campaign Bids" onBack={() => navigation.goBack()} />

      {/* Tabs */}
      <View
        style={styles.tabContainer}
      >
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab ===
              "campaignBids" &&
              styles.activeTab,
          ]}
          onPress={() =>
            dispatch(
              setSelectedTab(
                "campaignBids"
              )
            )
          }
        >
          <Text
            style={
              styles.tabText
            }
          >
            Campaign Bids
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab ===
              "recentActivity" &&
              styles.activeTab,
          ]}
          onPress={() =>
            dispatch(
              setSelectedTab(
                "recentActivity"
              )
            )
          }
        >
          <Text
            style={
              styles.tabText
            }
          >
            Recent Activity
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {
  selectedTab ===
  "campaignBids" ? (
    <FlatList
      data={bids}
      keyExtractor={item =>
        item.id.toString()
      }
      renderItem={
        renderBidCard
      }
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={
        false
      }
    />
  ) : (
    <FlatList
      data={
        recentActivity
      }
      keyExtractor={item =>
        item.id.toString()
      }
      renderItem={
        renderRecentCard
      }
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={
        false
      }
    />
  )
}
<Modal
  visible={modalType !== null}
  transparent
  animationType="fade"
  statusBarTranslucent
  onRequestClose={() =>
    setModalType(null)
  }
>
  <TouchableOpacity
    activeOpacity={1}
    style={styles.modalOverlay}
    onPress={() =>
      setModalType(null)
    }
  >
    <TouchableOpacity
      activeOpacity={1}
      style={styles.modalCard}
      onPress={() => {}}
    >
      <Text style={styles.modalTitle}>
        {modalType === "accept"
          ? "Accept Bid"
          : modalType ===
            "reject"
          ? "Reject Bid"
          : modalType ===
            "report"
          ? "Report Issue"
          : "Release Payment"}
      </Text>

      <Text style={styles.modalText}>
        {modalType ===
        "accept"
          ? "Are you sure you want to accept this bid for this campaign?"
          : modalType ===
            "reject"
          ? "Are you sure you want to reject this bid for this campaign?"
          : modalType ===
            "report"
          ? "We're sorry you're not satisfied with the agent's service."
          : "Are you sure you want to release the payment?"}
      </Text>

      <View
        style={
          styles.modalButtonRow
        }
      >
        <TouchableOpacity
          style={
            styles.cancelBtn
          }
          onPress={() =>
            setModalType(
              null
            )
          }
        >
          <Text
            style={
              styles.cancelText
            }
          >
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.confirmBtn
          }
          onPress={() => {
            if (
              selectedId !==
              null
            ) {
              switch (
                modalType
              ) {
                case "accept":
                  dispatch(
                    acceptBid(
                      selectedId
                    )
                  );
                  break;

                case "reject":
                  dispatch(
                    rejectBid(
                      selectedId
                    )
                  );
                  break;

                case "release":
                  dispatch(
                    releasePayment(
                      selectedId
                    )
                  );
                  break;

                case "report":
                  dispatch(
                    reportIssue(
                      selectedId
                    )
                  );
                  break;
              }
            }

            setModalType(
              null
            );
          }}
        >
          <Text
            style={
              styles.confirmText
            }
          >
            {modalType ===
            "accept"
              ? "Accept"
              : modalType ===
                "reject"
              ? "Reject"
              : modalType ===
                "report"
              ? "Report"
              : "Release"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </TouchableOpacity>
</Modal>
    </SafeAreaView>
  );
};

export default
  CampaignBidsScreen;

  const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        "#000",
    },


    headerText: {
      fontSize:
        moderateScale(22),
      fontWeight:
        "700",
      color: "#000",
    },

    tabContainer: {
      flexDirection:
        "row",
      marginHorizontal:
        moderateScale(22),
      marginTop:
        verticalScale(24),
      borderWidth: 1,
      borderColor:
        "#00D9FF",
      borderRadius:
        moderateScale(12),
      overflow: "hidden",
    },

    tab: {
      flex: 1,
      paddingVertical:
        verticalScale(10),
      alignItems:
        "center",
      backgroundColor:
        "#000",
    },

    activeTab: {
      backgroundColor:
        "#0ECBE6",
    },

    tabText: {
      color: "#FFF",
      fontSize:
        moderateScale(15),
      fontWeight:
        "500",
    },

    card: {
      borderWidth: 1,
      borderColor:
        "#00D9FF",
      borderRadius:
        moderateScale(14),
      marginHorizontal:
        moderateScale(20),
      marginTop:
        verticalScale(22),
      padding:
        moderateScale(16),
    },

    cardTop: {

        flexDirection: "row",
      
        alignItems: "flex-start",
      
      },

    avatar: {
      width:
        moderateScale(40),
      height:
        moderateScale(40),
      borderRadius:
        moderateScale(26),
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    avatarText: {
      color: "#FFF",
      fontWeight:
        "700",
      fontSize:
        moderateScale(20),
    },

    userInfo: {

        marginLeft:
      
          moderateScale(12),
      
        flex: 1,
      
        maxWidth: "60%",
      
      },

    creatorName: {
      color: "#FFF",
      fontSize:
        moderateScale(16),
      fontWeight:
        "600",
    },

    campaignName: {
      color: "#888",
      marginTop:
        verticalScale(4),
      fontSize:
        moderateScale(13),
    },

    actionContainer: {

        justifyContent:
      
          "flex-end",
      
        alignItems:
      
          "flex-end",
      
        marginTop:
      
          verticalScale(4),
      
      },

      actionRow: {

        flexDirection:
      
          "row",
      
        gap:
      
          moderateScale(8),
      
        marginBottom:
      
          verticalScale(6),
      
      },

      acceptBtn: {

        backgroundColor:
      
          "#0A8F00",
      
        borderRadius:
      
          moderateScale(16),
      
        paddingHorizontal:
      
          moderateScale(16),
      
        paddingVertical:
      
          verticalScale(6),
      
        minWidth:
      
          moderateScale(4),
      
        alignItems:
      
          "center",
      
      },

      rejectBtn: {

        backgroundColor:
      
          "#A61700",
      
        borderRadius:
      
          moderateScale(16),
      
        paddingHorizontal:
      
          moderateScale(16),
      
        paddingVertical:
      
          verticalScale(6),
      
        minWidth:
      
          moderateScale(4),
      
        alignItems:
      
          "center",
      
      },

      

actionText: {

    color: "#FFF",
  
    fontSize:
  
      moderateScale(12),
  
    fontWeight:
  
      "600",
  
  },

      outlineBtn: {

        borderWidth: 1,
      
        borderColor:
      
          "#00D9FF",
      
        borderRadius:
      
          moderateScale(16),
      
        paddingHorizontal:
      
          moderateScale(9),
      
        paddingVertical:
      
          verticalScale(6),
      
        minWidth:
      
          moderateScale(4),
      
        alignItems:
      
          "center",
      
      },

      outlineText: {

        color: "#FFF",
      
        fontSize:
      
          moderateScale(12),
      
      },

    bottomRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginTop:
        verticalScale(8),
    },

    amount: {
      color: "#00FF3B",
      fontSize:
        moderateScale(22),
      fontWeight:
        "700",
    },

    date: {
      color: "#8A8A8A",
      fontSize:
        moderateScale(14),
    },
    smallLabel: {
        color: "#8A8A8A",
        fontSize:
          moderateScale(12),
      },
      
      rating: {
        color: "#FFD700",
        fontSize:
          moderateScale(14),
        marginTop:
          verticalScale(4),
      },
      
      paymentBtn: {
        marginTop:
          verticalScale(6),
        backgroundColor:
          "#C49A00",
        borderRadius:
          moderateScale(18),
        paddingVertical:
          verticalScale(8),
        alignItems:
          "center",
      },
      
      releasedBtn: {
        backgroundColor:
          "#008A29",
      },
      
      reportedBtn: {
        backgroundColor:
          "#6E1A1A",
      },
      
      paymentText: {
        color: "#FFF",
        fontWeight:
          "600",
        fontSize:
          moderateScale(12),
      },
      
      reportBtn: {
        borderWidth: 1,
        borderColor:
          "#FF4040",
        borderRadius:
          moderateScale(16),
        paddingHorizontal:
          moderateScale(16),
        paddingVertical:
          verticalScale(7),
      },
      
      reportText: {
        color: "#FF4040",
        fontWeight:
          "600",
        fontSize:
          moderateScale(12),
      },
      modalOverlay: {
        flex: 1,
        backgroundColor:
          "rgba(0,0,0,0.65)",
        justifyContent:
          "center",
        alignItems:
          "center",
        padding:
          moderateScale(20),
      },
      
      modalCard: {
        width: "100%",
        backgroundColor:
          "#000",
        borderWidth: 1,
        borderColor:
          "#00D9FF",
        borderRadius:
          moderateScale(22),
        padding:
          moderateScale(24),
      },
      
      modalTitle: {
        color: "#FFF",
        fontSize:
          moderateScale(26),
        fontWeight:
          "700",
        textAlign:
          "center",
      },
      
      modalText: {
        color: "#8A8A8A",
        fontSize:
          moderateScale(16),
        textAlign:
          "center",
        marginTop:
          verticalScale(18),
        lineHeight:
          moderateScale(24),
      },
      
      modalButtonRow: {
        flexDirection:
          "row",
        justifyContent:
          "space-between",
        marginTop:
          verticalScale(30),
      },
      
      cancelBtn: {
        width: "40%",
        borderWidth: 1.5,
        borderColor:
          "#FF3B3B",
        borderRadius:
          moderateScale(16),
        alignItems:
          "center",
        paddingVertical:
          verticalScale(12),
      },
      
      confirmBtn: {
        width: "40%",
        backgroundColor:
          "#11C3D6",
        borderRadius:
          moderateScale(16),
        alignItems:
          "center",
        paddingVertical:
          verticalScale(12),
      },
      
      cancelText: {
        color: "#FFF",
        fontSize:
          moderateScale(18),
        fontWeight:
          "500",
      },
      
      confirmText: {
        color: "#000",
        fontSize:
          moderateScale(18),
        fontWeight:
          "600",
      },
  });