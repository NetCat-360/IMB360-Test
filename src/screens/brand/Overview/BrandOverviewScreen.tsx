// src/screens/brand/overview/BrandOverviewScreen.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
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

import {
  Colors,
} from "../../../config/theme";
import {
  BrandNavigationProp,
} from '../../../types/navigation';

import Typography
from "../../../styles/typography";

const screenWidth =
  Dimensions.get(
    "window"
  ).width;

const BrandOverviewScreen =
({
  navigation,
}: any) => {
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

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* Running Campaigns */}
        <View
          style={
            styles.card
          }
        >
          <View
            style={
              styles.rowBetween
            }
          >
            <Text
              style={
                styles.heading
              }
            >
              Running
              Campaigns
            </Text>

            <Text
              style={
                styles.heading
              }
            >
              Budget
            </Text>
          </View>

          <View
            style={
              styles.divider
            }
          />

          {currentData
            .runningCampaigns
            .map(
              (
                item
              ) => (
                <View
                  key={
                    item.id
                  }
                  style={
                    styles
                      .campaignRow
                  }
                >
                  <Text
                    style={
                      styles
                        .campaignName
                    }
                  >
                    {
                      item.name
                    }
                  </Text>

                  <Text
                    style={
                      styles
                        .campaignBudget
                    }
                  >
                    ₹
                    {item.budget.toLocaleString()}
                  </Text>
                </View>
              )
            )}

          <View
            style={
              styles.bottomDivider
            }
          />

          <View
            style={
              styles.rowBetween
            }
          >
            <Text
              style={
                styles.totalText
              }
            >
              Total Budget
            </Text>

            <Text
              style={
                styles.totalBudget
              }
            >
              ₹
              {currentData
                .totalBudget
                .toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Performance Chart */}
        <View
          style={
            styles.card
          }
        >
          <View
  style={
    styles.chartHeader
  }
>
  <Text
    style={
      styles.heading
    }
  >
    Current Month
    Campaign
    Performance
  </Text>

  <View
    style={
      styles.dropdownRow
    }
  >
    <View
      style={
        styles.dropdownWrapper
      }
    >
      <Dropdown
  style={styles.dropdown}
  containerStyle={styles.dropdownMenu}
  placeholderStyle={styles.selectedText}
  selectedTextStyle={styles.selectedText}
  itemTextStyle={styles.dropdownText}

  maxHeight={220}
  autoScroll={false}
  showsVerticalScrollIndicator={false}

  activeColor="#1A1A1A" // FIX

  data={overview.availableMonths.map(
    (month) => ({
      label: month,
      value: month,
    })
  )}

  labelField="label"
  valueField="value"

  value={
    overview.selectedMonth
  }

  onChange={(item) =>
    dispatch(
      setBrandMonth(
        item.value
      )
    )
  }
/>
    </View>
  </View>
</View>

          <View
            style={
              styles.chartContainer
            }
          >
            <LineChart
              data={{
                labels:
                  currentData
                    .campaignPerformance
                    .labels,

                datasets:
                  currentData
                    .campaignPerformance
                    .datasets
                    .map(
                      (
                        item
                      ) => ({
                        data:
                          item.data,

                        color:
                          () =>
                            item.color,

                        strokeWidth:
                          3,
                      })
                    ),
              }}
              width={
                screenWidth -
                scale(80)
              }
              height={240}
              withDots={false}
              withShadow={false}
              withInnerLines
              withOuterLines={
                false
              }
              fromZero
              bezier={false}
              chartConfig={{
                backgroundGradientFrom:
                  "#000",

                backgroundGradientTo:
                  "#000",

                decimalPlaces:
                  0,

                color:
                  () =>
                    "#fff",

                labelColor:
                  () =>
                    "#666",

                propsForBackgroundLines:
                  {
                    stroke:
                      "#222",
                  },

                propsForLabels:
                  {
                    fontSize:
                      11,
                  },
              }}
              style={{
                borderRadius:
                  moderateScale(
                    12
                  ),
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        Colors.bgBlack,
    },

    scrollContent: {
      padding:
        scale(20),
      paddingBottom:
        verticalScale(
          40
        ),
    },

    card: {
      borderWidth: 1,
      borderColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          18
        ),
      padding:
        scale(16),
      marginBottom:
        verticalScale(
          20
        ),
      backgroundColor:
        "#000",
    },

    rowBetween: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    heading: {
      color:
        Colors.textPrimary,
      fontFamily:
        "Poppins-SemiBold",
      fontWeight: 'bold',
      fontSize:
        moderateScale(
          18
        ),
    },

    divider: {
      height: 1,
      backgroundColor:
        "#333",
      marginVertical:
        verticalScale(
          14
        ),
    },

    bottomDivider: {
      height: 1,
      backgroundColor:
        "#333",
      marginTop:
        verticalScale(
          14
        ),
      marginBottom:
        verticalScale(
          14
        ),
    },

    campaignRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom:
        verticalScale(
          14
        ),
    },

    campaignName: {
      color:
        "#fff",
      fontFamily:
        "Poppins-Regular",
      fontSize:
        moderateScale(
          14
        ),
    },

    campaignBudget: {
      color:
        "#fff",
      fontFamily:
        "Poppins-Medium",
      fontSize:
        moderateScale(
          14
        ),
    },

    totalText: {
      color:
        "#fff",
      fontFamily:
        "Poppins-SemiBold",
      fontSize:
        moderateScale(
          16
        ),
    },

    totalBudget: {
      color:
        "#fff",
      fontFamily:
        "Poppins-SemiBold",
      fontSize:
        moderateScale(
          16
        ),
    },

    chartHeader: {
      marginBottom:
        verticalScale(
          14
        ),
    },

    dropdownWrapper: {
      width:
        scale(150),
    },
    
    dropdown: {
      height:
        verticalScale(
          30
        ),
    
      backgroundColor:
        Colors.teal,
    
      borderRadius:
        moderateScale(
          22
        ),
    
      paddingHorizontal:
        scale(30),
    },
    
    dropdownMenu: {
      backgroundColor:
        "#111",
    
      borderRadius:
        moderateScale(
          18
        ),
    
      borderWidth: 1,
    
      borderColor:
        Colors.teal,
    
      overflow:
        "hidden",
    },
    
    selectedText: {
      color:
        "#000",
    
      fontSize:
        moderateScale(
          15
        ),
    
      fontFamily:
        "Poppins-Medium",
    },
    
    dropdownText: {
      color:
        "#fff",
    
      fontSize:
        moderateScale(
          14
        ),
    
      fontFamily:
        "Poppins-Regular",
    },
    dropdownRow: {
      marginTop:
        verticalScale(
          1
        ),
    
      alignItems:
        "flex-end",
    },

    chartContainer: {
      alignItems:
        "center",
      justifyContent:
        "center",
      marginTop:
        verticalScale(
          1
        ),
    },
  });

export default
  BrandOverviewScreen;