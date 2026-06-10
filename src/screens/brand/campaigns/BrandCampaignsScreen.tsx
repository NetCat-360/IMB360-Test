import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch, useSelector } from "react-redux";

import ScreenHeader from "../../../components/ScreenHeader";

import styles from "./BrandCampaignStyles";

import { RootState } from "../../../store/store";

import {
  setSelectedTab,
  startCampaign,
  completeCampaign,
} from "../../../store/slices/Brand/brandCampaignSlice";

const tabs = ["ongoing", "upcoming", "history"];

export default function BrandCampaignsScreen({ navigation }: any) {
  const [showCompleteModal, setShowCompleteModal] = React.useState(false);
  const [showStartModal, setShowStartModal] = React.useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = React.useState<
    number | null
  >(null);

  const dispatch = useDispatch();

  const { selectedTab, campaigns } = useSelector(
    (state: RootState) => state.brandCampaign
  );

  const filtered = campaigns.filter((item) => item.status === selectedTab);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScreenHeader title="Campaigns" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const active = selectedTab === tab;

            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, active && styles.activeTab]}
                onPress={() => dispatch(setSelectedTab(tab as any))}
              >
                <Text style={[styles.tabText, active && styles.activeText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filtered.map((campaign) => (
          <View key={campaign.id} style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.title}>{campaign.title}</Text>

              <View>
                <Text style={styles.budgetLabel}>Budget</Text>

                <Text style={styles.budget}>
                  ₹{campaign.budget.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* Status Badge */}
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    selectedTab === "ongoing"
                      ? "#003F00"
                      : selectedTab === "upcoming"
                      ? "#062A5A"
                      : "#403500",
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  {
                    color:
                      selectedTab === "ongoing"
                        ? "#00FF47"
                        : selectedTab === "upcoming"
                        ? "#4DA3FF"
                        : "#FFE500",
                  },
                ]}
              >
                ● {selectedTab}
              </Text>
            </View>

            {selectedTab !== "history" ? (
              <>
                <Text style={styles.dateLabel}>Start Date</Text>

                <Text style={styles.date}>{campaign.startDate}</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.outlineBtn}>
                    <Text style={styles.viewText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.fillBtn}
                    onPress={() => {
                      setSelectedCampaignId(campaign.id);

                      if (selectedTab === "ongoing") {
                        setShowCompleteModal(true);
                      }

                      if (selectedTab === "upcoming") {
                        setShowStartModal(true);
                      }
                    }}
                  >
                    <Text style={styles.fillBtnText}>
                      {selectedTab === "ongoing" ? "Completed" : "Start"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.divider} />

                <View style={styles.historyRow}>
                  <View>
                    <Text style={styles.smallLabel}>Start Date</Text>

                    <Text style={styles.smallValue}>{campaign.startDate}</Text>
                  </View>

                  <View>
                    <Text style={styles.smallLabel}>Budget</Text>

                    <Text style={styles.greenText}>
                      ₹{campaign.budget.toLocaleString()}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.smallLabel}>Total Spent</Text>

                    <Text style={styles.greenText}>
                      ₹{campaign.totalSpent?.toLocaleString()}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
      <Modal transparent visible={showCompleteModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Complete Campaign</Text>

            <Text style={styles.modalText}>
              Are you sure you want to mark this campaign as completed?
            </Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowCompleteModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  if (selectedCampaignId) {
                    dispatch(completeCampaign(selectedCampaignId));
                  }

                  setShowCompleteModal(false);

                  setSelectedCampaignId(null);
                }}
              >
                <Text style={styles.confirmText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent visible={showStartModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Start Campaign</Text>

            <Text style={styles.modalText}>
              Are you sure you want to start this campaign?
            </Text>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowStartModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  if (selectedCampaignId) {
                    dispatch(startCampaign(selectedCampaignId));
                  }

                  setShowStartModal(false);

                  setSelectedCampaignId(null);
                }}
              >
                <Text style={styles.confirmText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
