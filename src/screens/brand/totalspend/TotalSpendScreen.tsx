import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import ScreenHeader from "../../../components/ScreenHeader";

import { moderateScale, verticalScale, scale } from "../../../utils/scaling";

import {
  setSelectedTab,
  setSelectedYear,
} from "../../../store/slices/Brand/totalSpendSlice";

const TotalSpendScreen = () => {
  const tabSets = [
    ["campaign", "influencer", "paymentDate"],

    ["spentAmount", "status"],
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const { selectedYear, selectedTab, years, spendHistory } = useSelector(
    (state: any) => state.totalSpend
  );

  const selectedData =
    spendHistory.find((item: any) => item.year.toString() === selectedYear)
      ?.data || [];

  const totalSpend = selectedData.reduce(
    (sum: number, item: any) => sum + item.amount,
    0
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {selectedTab === "campaign"
          ? item.title
          : selectedTab === "influencer"
          ? item.influencer
          : item.paymentDate}
      </Text>

      <Text style={styles.cardAmount}>₹{item.amount.toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScreenHeader title="Total Spend" onBack={() => navigation.goBack()} />

      {/* YEAR BUTTON */}
      <View style={styles.yearWrapper}>
        <TouchableOpacity
          style={styles.yearButton}
          onPress={() => setShowYearDropdown(!showYearDropdown)}
        >
          <Text style={styles.yearText}>{selectedYear}</Text>

          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>

        {showYearDropdown && (
          <View style={styles.dropdown}>
            {years.map((year: number) => (
              <TouchableOpacity
                key={year}
                style={styles.dropdownItem}
                onPress={() => {
                  dispatch(setSelectedYear(year.toString()));

                  setShowYearDropdown(false);
                }}
              >
                <Text style={styles.dropdownText}>{year}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* TOTAL SPEND CARD */}
      <View style={styles.topCard}>
        <View style={styles.walletRow}>
          <View style={styles.walletCircle}>
            <Image
              source={require("../../../assets/images/spendlogo.png")}
              style={styles.walletIcon}
            />
          </View>

          <View>
            <Text style={styles.totalLabel}>Total Spend ({selectedYear})</Text>

            <Text style={styles.totalAmount}>
              ₱{totalSpend.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* TABS BOX */}
      <View style={styles.tabBox}>
        <View style={styles.tabContainer}>
          {tabSets[currentStep].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() =>
                dispatch(
                  setSelectedTab(
                    tab as "campaign" | "influencer" | "paymentDate"
                  )
                )
              }
            >
              <Text style={styles.tabText}>
                {tab === "paymentDate"
                  ? "Payment Date"
                  : tab === "spentAmount"
                  ? "Spent Amount"
                  : tab === "status"
                  ? "Status"
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* EMPTY STATE */}
        {selectedData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Text
                style={{
                  color: "#A0A0A0",
                  fontSize: 28,
                }}
              >
                📄
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No spending data available for {selectedYear}
            </Text>
          </View>
        ) : (
          <FlatList
            data={selectedData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* NEXT BUTTON */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => setCurrentStep(currentStep === 0 ? 1 : 0)}
      >
        <Text style={styles.nextText}>
          {currentStep === 0 ? "Next" : "Previous"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TotalSpendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  yearWrapper: {
    alignItems: "flex-end",
    marginTop: verticalScale(18),
    marginRight: moderateScale(24),

    position: "relative",
    zIndex: 100,
  },

  yearButton: {
    backgroundColor: "#09C7E6",
    borderRadius: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(8),
    minWidth: scale(105),
    justifyContent: "space-between",
  },

  yearText: {
    color: "#000",
    fontWeight: "600",
  },

  arrow: {
    color: "#000",
  },

  dropdown: {
    position: "absolute",

    top: verticalScale(34),
    right: 0,

    backgroundColor: "#111",
    borderRadius: moderateScale(16),

    width: scale(105),

    overflow: "hidden",

    zIndex: 999,
    elevation: 10,
  },

  dropdownItem: {
    padding: 14,
  },

  dropdownText: {
    color: "#FFF",
  },

  topCard: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: 20,
    marginHorizontal: 24,
    marginTop: 12,
    padding: 8,
  },

  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  walletCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#032B38",
    justifyContent: "center",
    alignItems: "center",
  },

  walletIcon: {
    width: 31,
    height: 24,
    tintColor: "#00D9FF",
  },

  totalLabel: {
    color: "#FFF",
    fontSize: 18,
  },

  totalAmount: {
    color: "#00FF1E",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 6,
  },

  tabBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: 18,
    marginHorizontal: 24,
    marginTop: 20,
    overflow: "hidden",
  },

  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(0),
    paddingBottom: verticalScale(0),
  },

  tab: {
    flex: 1,
    height: verticalScale(42),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(14),
  },

  activeTab: {
    backgroundColor: "#09C7E6",
  },

  tabText: {
    color: "#FFF",
    fontSize: moderateScale(15),
    fontWeight: "500",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 30,
  },

  nextButton: {
    alignSelf: "flex-end",

    marginTop: verticalScale(18),
    marginRight: moderateScale(28),
    marginBottom: verticalScale(20),

    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(14),

    paddingHorizontal: moderateScale(22),
    paddingVertical: verticalScale(10),

    backgroundColor: "#000",
  },

  nextText: {
    color: "#FFF",
    fontSize: 18,
  },

  card: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: 14,
    margin: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    color: "#FFF",
  },

  cardAmount: {
    color: "#00FF1E",
    fontWeight: "700",
  },
});
