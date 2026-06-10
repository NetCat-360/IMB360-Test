import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";

import ScreenHeader from "../../../components/ScreenHeader";

import { moderateScale, verticalScale, scale } from "../../../utils/scaling";
import styles from "./styles";

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


