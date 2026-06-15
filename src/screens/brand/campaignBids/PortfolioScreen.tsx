import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch } from "react-redux";

import { useRoute, useNavigation } from "@react-navigation/native";

import ScreenHeader from "../../../components/ScreenHeader";

import { moderateScale, verticalScale } from "../../../utils/scaling";
import { portfolioStyles as styles } from "./styles";

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
export default PortfolioScreen;
