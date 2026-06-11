import React, {
    useState,
  } from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../../../components/ScreenHeader";
import { campaignBidStyles } from "./styles";
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

  const styles = campaignBidStyles;