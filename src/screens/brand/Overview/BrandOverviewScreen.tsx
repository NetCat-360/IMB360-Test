// src/screens/brand/overview/BrandOverviewScreen.tsx

import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import ScreenHeader from "../../../components/ScreenHeader";
import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  LineChart,
} from "react-native-chart-kit";

import {
  Dropdown,
} from
"react-native-element-dropdown";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import AppHeader
from "../../../components/AppHeader";

import {
  RootState,
} from "../../../store/store";

import {
  setBrandMonth,
} from "../../../store/slices/Brand/brandOverviewSlice";

import {
  scale,
  verticalScale,
  moderateScale,
} from "../../../utils/scaling";
import styles from "./styles";

import {
  Colors,
} from "../../../config/theme";
import {
  BrandNavigationProp,
} from '../../../types/navigation';

import Typography
from "../../../styles/typography";

function RunningCampaignsSection({ currentData }: { currentData: any }) {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.heading}>Running Campaigns</Text>
        <Text style={styles.heading}>Budget</Text>
      </View>
      <View style={styles.divider} />
      {currentData.runningCampaigns.map((item: any) => (
        <View key={item.id} style={styles.campaignRow}>
          <Text style={styles.campaignName}>{item.name}</Text>
          <Text style={styles.campaignBudget}>₹{item.budget.toLocaleString()}</Text>
        </View>
      ))}
      <View style={styles.bottomDivider} />
      <View style={styles.rowBetween}>
        <Text style={styles.totalText}>Total Budget</Text>
        <Text style={styles.totalBudget}>₹{currentData.totalBudget.toLocaleString()}</Text>
      </View>
    </View>
  );
}

function PerformanceChartSection({ overview, dispatch, screenWidth }: { overview: any; dispatch: any; screenWidth: number }) {
  const currentData = overview.monthlyData[overview.selectedMonth];
  return (
    <View style={styles.card}>
      <View style={styles.chartHeader}>
        <Text style={styles.heading}>Current Month Campaign Performance</Text>
        <View style={styles.dropdownRow}>
          <View style={styles.dropdownWrapper}>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropdownMenu}
              placeholderStyle={styles.selectedText}
              selectedTextStyle={styles.selectedText}
              itemTextStyle={styles.dropdownText}
              maxHeight={220}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
              activeColor="#1A1A1A"
              data={overview.availableMonths.map((month: string) => ({ label: month, value: month }))}
              labelField="label"
              valueField="value"
              value={overview.selectedMonth}
              onChange={(item: any) => dispatch(setBrandMonth(item.value))}
            />
          </View>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: currentData.campaignPerformance.labels,
            datasets: currentData.campaignPerformance.datasets.map((item: any) => ({
              data: item.data,
              color: () => item.color,
              strokeWidth: 3,
            })),
          }}
          width={screenWidth - scale(80)}
          height={240}
          withDots={false}
          withShadow={false}
          withInnerLines
          withOuterLines={false}
          fromZero
          bezier={false}
          chartConfig={{
            backgroundGradientFrom: "#000",
            backgroundGradientTo: "#000",
            decimalPlaces: 0,
            color: () => "#fff",
            labelColor: () => "#666",
            propsForBackgroundLines: { stroke: "#222" },
            propsForLabels: { fontSize: 11 },
          }}
          style={{ borderRadius: moderateScale(12) }}
        />
      </View>
    </View>
  );
}

const BrandOverviewScreen =
({
  navigation,
}: any) => {
  const { width: screenWidth } = useWindowDimensions();
  const dispatch =
    useDispatch();

  const overview =
    useSelector(
      (
        state:
          RootState
      ) =>
        state
          .brandOverview
    );

  const currentData =
    overview
      .monthlyData[
        overview
          .selectedMonth
      ];

  return (
    <SafeAreaView
      style={
        styles.container
      }
      edges={[]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.bgBlack
        }
      />

      {/* Header */}
      <ScreenHeader
  title="Profile Overview"
  onBack={() =>
    navigation.goBack()
  }
/>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <RunningCampaignsSection currentData={currentData} />
        <PerformanceChartSection overview={overview} dispatch={dispatch} screenWidth={screenWidth} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default
  BrandOverviewScreen;