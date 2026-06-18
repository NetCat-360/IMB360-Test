import React, {
    useState,
    useRef,
    useCallback,
  } from "react";

import {
  Modal,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
    BidTab,
  } from "../../../store/slices/Brand/brandCampaignBidsSlice";

import {
  moderateScale,
  verticalScale,
} from "../../../utils/scaling";

function BidCard({ item, onAccept, onReject, onViewPortfolio }: { item: any; onAccept: () => void; onReject: () => void; onViewPortfolio: () => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
            <Text style={styles.avatarText}>{item.creatorInitials}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.creatorName}>{item.creatorName}</Text>
            <Text style={styles.campaignName}>{item.campaignName}</Text>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <View style={styles.actionRow}>
            <Pressable style={styles.acceptBtn} onPress={onAccept}><Text style={styles.actionText}>Accept</Text></Pressable>
            <Pressable style={styles.rejectBtn} onPress={onReject}><Text style={styles.actionText}>Reject</Text></Pressable>
          </View>
          <View style={styles.actionRow}>
            <Pressable style={styles.outlineBtn}><Text style={styles.outlineText}>Message</Text></Pressable>
            <Pressable style={styles.outlineBtn} onPress={onViewPortfolio}><Text style={styles.outlineText}>Portfolio</Text></Pressable>
          </View>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.amount}>₹ {item.amount.toLocaleString()}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );
}

function RecentActivityCard({ item, onRelease, onReport }: { item: any; onRelease: () => void; onReport: () => void }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
          <Text style={styles.avatarText}>{item.creatorInitials}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: moderateScale(12) }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={styles.creatorName}>{item.creatorName}</Text>
              <Text style={styles.campaignName}>{item.campaignName}</Text>
            </View>
            <View>
              <Text style={styles.smallLabel}>Rating</Text>
              <Text style={styles.rating}>{"⭐".repeat(item.rating)}</Text>
            </View>
          </View>
          <View style={{ marginTop: verticalScale(12) }}>
            <Text style={styles.smallLabel}>Payment Status</Text>
            <Pressable
              disabled={item.paymentStatus !== "pending"}
              style={[styles.paymentBtn, item.paymentStatus === "released" && styles.releasedBtn, item.paymentStatus === "reported" && styles.reportedBtn]}
              onPress={onRelease}
            >
              <Text style={styles.paymentText}>
                {item.paymentStatus === "pending" ? "Release Payment" : item.paymentStatus === "released" ? "Released" : "Reported"}
              </Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: verticalScale(16) }}>
            <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
            <Pressable disabled={item.paymentStatus === "reported"} onPress={onReport} style={styles.reportBtn}>
              <Text style={styles.reportText}>{item.paymentStatus === "reported" ? "Reported" : "Report"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

function TabBar({ selectedTab, onTabChange }: { selectedTab: string; onTabChange: (tab: string) => void }) {
  return (
    <View style={styles.tabContainer}>
      <Pressable style={[styles.tab, selectedTab === "campaignBids" && styles.activeTab]} onPress={() => onTabChange("campaignBids")}>
        <Text style={styles.tabText}>Campaign Bids</Text>
      </Pressable>
      <Pressable style={[styles.tab, selectedTab === "recentActivity" && styles.activeTab]} onPress={() => onTabChange("recentActivity")}>
        <Text style={styles.tabText}>Recent Activity</Text>
      </Pressable>
    </View>
  );
}

function ActionModal({ modalType, onClose, onConfirm }: { modalType: "accept" | "reject" | "report" | "release" | null; onClose: () => void; onConfirm: () => void }) {
  return (
    <Modal visible={modalType !== null} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <Text style={styles.modalTitle}>
            {modalType === "accept" ? "Accept Bid" : modalType === "reject" ? "Reject Bid" : modalType === "report" ? "Report Issue" : "Release Payment"}
          </Text>
          <Text style={styles.modalText}>
            {modalType === "accept"
              ? "Are you sure you want to accept this bid for this campaign?"
              : modalType === "reject"
              ? "Are you sure you want to reject this bid for this campaign?"
              : modalType === "report"
              ? "We're sorry you're not satisfied with the agent's service."
              : "Are you sure you want to release the payment?"}
          </Text>
          <View style={styles.modalButtonRow}>
            <Pressable style={styles.cancelBtn} onPress={onClose}><Text style={styles.cancelText}>Cancel</Text></Pressable>
            <Pressable style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmText}>
                {modalType === "accept" ? "Accept" : modalType === "reject" ? "Reject" : modalType === "report" ? "Report" : "Release"}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

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
  
  const selectedId = useRef<
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

  const handleModalConfirm = () => {
    if (selectedId.current !== null) {
      switch (modalType) {
        case "accept": dispatch(acceptBid(selectedId.current)); break;
        case "reject": dispatch(rejectBid(selectedId.current)); break;
        case "release": dispatch(releasePayment(selectedId.current)); break;
        case "report": dispatch(reportIssue(selectedId.current)); break;
      }
    }
    setModalType(null);
  };

  const renderBidItem = useCallback(({ item }: { item: any }) => (
    <BidCard
      item={item}
      onAccept={() => { selectedId.current = item.id; setModalType("accept"); }}
      onReject={() => { selectedId.current = item.id; setModalType("reject"); }}
      onViewPortfolio={() => navigation.navigate("PortfolioScreen", { bid: item })}
    />
  ), [navigation, setModalType]);

  const renderRecentActivityItem = useCallback(({ item }: { item: any }) => (
    <RecentActivityCard
      item={item}
      onRelease={() => { selectedId.current = item.id; setModalType("release"); }}
      onReport={() => { selectedId.current = item.id; setModalType("report"); }}
    />
  ), [setModalType]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScreenHeader title="Campaign Bids" onBack={() => navigation.goBack()} />
      <TabBar selectedTab={selectedTab} onTabChange={(tab) => dispatch(setSelectedTab(tab as BidTab))} />
      {selectedTab === "campaignBids" ? (
        <FlatList
          data={bids}
          keyExtractor={item => item.id.toString()}
          renderItem={renderBidItem}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={recentActivity}
          keyExtractor={item => item.id.toString()}
          renderItem={renderRecentActivityItem}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <ActionModal modalType={modalType} onClose={() => setModalType(null)} onConfirm={handleModalConfirm} />
    </SafeAreaView>
  );
};

export default
  CampaignBidsScreen;

  const styles = campaignBidStyles;