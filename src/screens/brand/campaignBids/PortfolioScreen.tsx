import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from "react-redux";

import { useRoute, useNavigation } from "@react-navigation/native";

import ScreenHeader from "../../../components/ScreenHeader";

import { moderateScale, verticalScale } from "../../../utils/scaling";

import {
  acceptBid,
  rejectBid,
} from "../../../store/slices/Brand/brandCampaignBidsSlice";

const PortfolioScreen = () => {
  const route = useRoute<any>();

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { bid } = route.params;

  const [modalType, setModalType] = useState<"accept" | "reject" | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScreenHeader title="Portfolio" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        {/* Header */}
        <View style={styles.topRow}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: bid.avatarColor,
              },
            ]}
          >
            <Text style={styles.avatarText}>{bid.creatorInitials}</Text>
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: moderateScale(12),
            }}
          >
            <Text style={styles.name}>{bid.creatorName}</Text>

            <TouchableOpacity style={styles.profileBtn}>
              <Text style={styles.profileText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rate */}
        <View style={styles.rateRow}>
          <View
            style={[
              styles.infoCard,
              {
                borderColor: "#00FF47",
              },
            ]}
          >
            <Text style={styles.cardTitle}>Proposed Rates</Text>

            <Text style={styles.price}>₹{bid.amount.toLocaleString()}</Text>
          </View>

          <View
            style={[
              styles.infoCard,
              {
                borderColor: "#4C3DFF",
              },
            ]}
          >
            <Text style={styles.cardTitle}>Proposed Timeline</Text>

            <Text style={styles.timeline}>{bid.proposedTimeline}</Text>
          </View>
        </View>

        {/* Proposal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campaign Proposal</Text>

          <Text style={styles.sectionText}>{bid.campaignProposal}</Text>
        </View>

        <View
          style={[
            styles.section,
            {
              borderColor: "#D6D600",
            },
          ]}
        >
          <Text style={styles.sectionTitle}>Relevant Experience</Text>

          <Text style={styles.sectionText}>{bid.relevantExperience}</Text>
        </View>
        <View style={styles.sampleSection}>
          <Text style={styles.sampleTitle}>Profile Samples</Text>

          <View style={styles.sampleCard}>
            <View style={styles.sampleRow}>
              {bid.portfolioSamples.map((item: string, index: number) => (
                <View key={index} style={styles.sampleBox}>
                  <Text
                    style={{
                      color: "#777",
                    }}
                  >
                    IMG
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => setModalType("accept")}
          >
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={() => setModalType("reject")}
          >
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal */}
      {/* Modal */}
      <Modal visible={modalType !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {modalType === "accept" ? "Accept Bid" : "Reject Bid"}
            </Text>

            <Text style={styles.modalText}>
              {modalType === "accept"
                ? "Are you sure you want to accept this bid for this campaign ?"
                : "Are you sure you want to reject this bid for this campaign ?"}
            </Text>

            <View style={styles.modalRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalType(null)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  if (modalType === "accept") {
                    dispatch(acceptBid(bid.id));
                  } else {
                    dispatch(rejectBid(bid.id));
                  }

                  setModalType(null);

                  navigation.goBack();
                }}
              >
                <Text style={styles.confirmText}>
                  {modalType === "accept" ? "Accept" : "Reject"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(18),
  },

  avatar: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFF",
    fontSize: moderateScale(28),
    fontWeight: "700",
  },

  name: {
    color: "#FFF",
    fontSize: moderateScale(22),
    fontWeight: "600",
  },

  profileBtn: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(14),
    alignSelf: "flex-start",
    marginTop: verticalScale(8),
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(6),
  },

  profileText: {
    color: "#00D9FF",
    fontSize: moderateScale(14),
    fontWeight: "500",
  },

  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(26),
    paddingHorizontal: moderateScale(20),
  },

  infoCard: {
    width: "47%",
    borderWidth: 1,
    borderRadius: moderateScale(18),
    padding: moderateScale(18),
    backgroundColor: "#000",
  },

  cardTitle: {
    color: "#FFF",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },

  price: {
    color: "#00FF47",
    fontSize: moderateScale(24),
    fontWeight: "700",
    marginTop: verticalScale(16),
  },

  timeline: {
    color: "#00A3FF",
    fontSize: moderateScale(26),
    fontWeight: "700",
    marginTop: verticalScale(16),
  },

  section: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(18),
    marginTop: verticalScale(24),
    marginHorizontal: moderateScale(20),
    padding: moderateScale(20),
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: verticalScale(14),
  },

  sectionText: {
    color: "#8A8A8A",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(34),
    paddingHorizontal: moderateScale(20),
  },

  acceptBtn: {
    width: "47%",
    backgroundColor: "#11C3D6",
    borderRadius: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(14),
  },

  rejectBtn: {
    width: "47%",
    borderWidth: 1.5,
    borderColor: "#FF3B3B",
    borderRadius: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(14),
  },

  acceptText: {
    color: "#000",
    fontSize: moderateScale(20),
    fontWeight: "600",
  },

  rejectText: {
    color: "#FF3B3B",
    fontSize: moderateScale(20),
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.55)",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: moderateScale(18),
  },

  modalCard: {
    width: "100%",

    backgroundColor: "#000",

    borderWidth: 1.5,

    borderColor: "#00D9FF",

    borderRadius: moderateScale(20),

    paddingTop: verticalScale(28),

    paddingBottom: verticalScale(24),

    paddingHorizontal: moderateScale(22),
  },

  modalTitle: {
    color: "#FFF",

    fontSize: moderateScale(28),

    fontWeight: "800",

    textAlign: "center",
  },

  modalText: {
    color: "#9A9A9A",

    fontSize: moderateScale(16),

    textAlign: "center",

    marginTop: verticalScale(14),

    lineHeight: moderateScale(24),
  },

  modalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: verticalScale(28),
  },

  cancelBtn: {
    width: "42%",

    height: verticalScale(46),

    borderWidth: 1.5,

    borderColor: "#FF3B3B",

    borderRadius: moderateScale(14),

    justifyContent: "center",

    alignItems: "center",
  },

  confirmBtn: {
    width: "42%",

    height: verticalScale(46),

    backgroundColor: "#11C3D6",

    borderRadius: moderateScale(14),

    justifyContent: "center",

    alignItems: "center",
  },
  sampleSection: {
    marginTop: verticalScale(24),
    paddingHorizontal: moderateScale(20),
  },

  sampleTitle: {
    color: "#FFF",
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: verticalScale(12),
  },

  sampleCard: {
    backgroundColor: "#2C2C2C",
    borderRadius: moderateScale(18),
    padding: moderateScale(18),
    alignItems: "center",
  },

  sampleRow: {
    flexDirection: "row",
    gap: moderateScale(12),
  },

  sampleBox: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(12),
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },

  viewAllBtn: {
    marginTop: verticalScale(18),
    backgroundColor: "#11C3D6",
    borderRadius: moderateScale(18),
    paddingHorizontal: moderateScale(30),
    paddingVertical: verticalScale(10),
  },

  viewAllText: {
    color: "#000",
    fontSize: moderateScale(15),
    fontWeight: "600",
  },

  cancelText: {
    color: "#FFF",

    fontSize: moderateScale(18),

    fontWeight: "500",
  },

  confirmText: {
    color: "#000",

    fontSize: moderateScale(18),

    fontWeight: "600",
  },
});

export default PortfolioScreen;
