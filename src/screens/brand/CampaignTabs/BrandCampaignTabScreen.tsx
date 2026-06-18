import React, {
    useMemo,
    useState,
    useCallback,
  } from "react";
  
  import {
    View,
    Text,
    FlatList,
    Pressable,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
  } from "react-native";
  import {
    useNavigation,
  } from "@react-navigation/native";

  
  
  import {
    SafeAreaView,
  } from "react-native-safe-area-context";
  
  import {
    useSelector,
    useDispatch,
  } from "react-redux";
  
  import {
    BarChart,
    LineChart,
  } from "react-native-chart-kit";
  
  import {
    useWindowDimensions,
  } from "react-native";
  
  import {
    scale,
    verticalScale,
  } from "../../../utils/scaling";
  
  import {
    Colors,
  } from "../../../config/theme";
  
  import AppHeader
  from "../../../components/AppHeader";
  
  import styles
  from "./BrandCampaignTabStyles";
  
  import {
    RootState,
  } from "../../../store/store";
  
  import {
    setSearchQuery,
    setSelectedStatus,
    CampaignStatus,
    CampaignItem,
  } from "../../../store/slices/Brand/brandCampaignTabSlice";
  

  const chartConfig = {
    backgroundGradientFrom:
      "#1B1B1B",
  
    backgroundGradientTo:
      "#1B1B1B",
  
    decimalPlaces: 0,
  
    color: (
      opacity = 1
    ) =>
      `rgba(0, 217, 255, ${opacity})`,
  
    labelColor: () =>
      "#A5A5A5",
  
    propsForBackgroundLines:
      {
        stroke:
          "#2A2A2A",
      },
  };

  const statusOptions: CampaignStatus[] = [
    "All Status",
    "Ongoing",
    "Completed",
    "Paused",
  ];

  function StatsGrid({ stats }: { stats: any }) {
    return (
      <View style={styles.statsGrid}>
        <View style={[styles.statCard, styles.cyanBorder]}>
          <Text style={styles.statHeading}>ACTIVE CAMPAIGNS</Text>
          <Text style={styles.statValue}>{stats.activeCampaigns}</Text>
        </View>
        <View style={[styles.statCard, styles.purpleBorder]}>
          <Text style={styles.statHeading}>TOTAL REACH</Text>
          <Text style={styles.statValue}>{stats.totalReach}</Text>
        </View>
        <View style={[styles.statCard, styles.blueBorder]}>
          <Text style={styles.statHeading}>BUDGET SPENT</Text>
          <Text style={styles.statValue}>₹{stats.budgetSpent}</Text>
        </View>
        <View style={[styles.statCard, styles.orangeBorder]}>
          <Text style={styles.statHeading}>AVG. ROI</Text>
          <Text style={styles.statValue}>{stats.avgROI}%</Text>
        </View>
      </View>
    );
  }

  function SearchFilterRow({ searchQuery, selectedStatus, onSearchChange, onFilterPress }: { searchQuery: string; selectedStatus: string; onSearchChange: (text: string) => void; onFilterPress: () => void }) {
    return (
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <TextInput placeholder="Search campaigns..." placeholderTextColor="#7E7E7E" value={searchQuery} onChangeText={onSearchChange} style={styles.searchInput} />
        </View>
        <Pressable style={styles.filterButton} onPress={onFilterPress}>
          <Text style={styles.filterText}>{selectedStatus}</Text>
        </Pressable>
      </View>
    );
  }

  function StatusDropdown({ show, options, selected: _selected, onSelect, onClose }: { show: boolean; options: string[]; selected: string; onSelect: (item: string) => void; onClose: () => void }) {
    if (!show) return null;
    return (
      <View style={styles.dropdownContainer}>
        {options.map(item => (
          <Pressable key={item} style={styles.dropdownItem} onPress={() => { onSelect(item); onClose(); }}>
            <Text style={styles.dropdownText}>{item}</Text>
          </Pressable>
        ))}
      </View>
    );
  }

  function StatusPill({ status }: { status: string }) {
    return (
      <View style={styles.statusPill}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  }

  function CardHeader({ item }: { item: CampaignItem }) {
    return (
      <View style={styles.cardHeader}>
        <Image
          source={require("../../../assets/images/IMB360_v2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.campaignTitle}>{item.title}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: verticalScale(0),
            }}
          >
            <View style={styles.socialRow}>
              <Image source={require("../../../assets/images/Instagram.png")} style={styles.socialIcon} />
              <Image source={require("../../../assets/images/facebook.png")} style={styles.socialIcon} />
              <Image source={require("../../../assets/images/youtube.png")} style={styles.socialIcon} />
              <Image source={require("../../../assets/images/tiktok.png")} style={styles.socialIcon} />
              <Image source={require("../../../assets/images/linkedin.png")} style={styles.socialIcon} />
            </View>
            <View style={{ alignItems: "flex-start" }}>
              <Text style={styles.roiText}>{item.clicks}% CLICKS</Text>
              <Text style={styles.roiText}>{item.roi}% ROI</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function MetricsRow({ item }: { item: CampaignItem }) {
    return (
      <>
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricHeading}>BUDGET RANGE</Text>
            <Text style={styles.metricValue}>{item.budgetRange}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricHeading}>ENGAGEMENT</Text>
            <Text style={styles.metricValue}>{item.engagement}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricHeading}>REACH</Text>
            <Text style={styles.metricValue}>{item.reach}</Text>
          </View>
        </View>
        <Text style={styles.cpeText}>CPE - {item.cpe}</Text>
      </>
    );
  }

  function BudgetChart({ item, screenWidth }: { item: CampaignItem; screenWidth: number }) {
    return (
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Budget Used</Text>
        <BarChart
          data={{
            labels: ["Used", "Remaining"],
            datasets: [{ data: [item.budgetUsed, item.remainingBudget] }],
          }}
          width={screenWidth - 90}
          height={220}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
          withInnerLines
          yAxisLabel="₹"
          yAxisSuffix=""
        />
      </View>
    );
  }

  function TotalSpendChart({ item, screenWidth }: { item: CampaignItem; screenWidth: number }) {
    return (
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Total Spend</Text>
        <LineChart
          data={{
            labels: item.weeks,
            datasets: [{ data: item.totalSpend }],
          }}
          width={screenWidth - 90}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>
    );
  }

  function CampaignProgress({ progress }: { progress: number }) {
    return (
      <>
        <Text style={styles.progressTitle}>Campaign Progress</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </>
    );
  }

  function CampaignDetails({ item }: { item: CampaignItem }) {
    return (
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Campaign Details</Text>
        <View style={styles.detailRow}>
          <View style={styles.iconCircle}>
            <Image
              source={require("../../../assets/images/calendar.png")}
              style={{ width: scale(22), height: scale(22), tintColor: "#00D9FF", resizeMode: "contain" }}
            />
          </View>
          <View>
            <Text style={styles.detailLabel}>DURATION:</Text>
            <Text style={styles.detailValue}>{item.startDate} TO {item.endDate}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={[styles.iconCircle, { borderColor: "#FF00E5" }]}>
            <Image
              source={require("../../../assets/images/dollar.png")}
              style={{ width: scale(22), height: scale(22), tintColor: "#00D9FF", resizeMode: "contain" }}
            />
          </View>
          <View>
            <Text style={[styles.detailLabel, { color: "#FF00E5" }]}>BUDGET USED:</Text>
            <Text style={styles.budgetUsedText}>₹{item.usedBudget}</Text>
          </View>
        </View>
        <Text style={styles.topInfluencerTitle}>TOP PERFORMING INFLUENCER</Text>
        <View style={styles.avatarRow}>
          {item.topInfluencers?.map((influencer, index) => (
            <Image
              key={influencer.avatar + '-' + index}
              source={influencer.avatar}
              style={[styles.avatar, { marginLeft: index === 0 ? 0 : -12 }]}
            />
          ))}
          <View style={styles.plusAvatar}>
            <Text style={styles.plusText}>+1</Text>
          </View>
        </View>
      </View>
    );
  }

  function ViewDetailsButton({ onViewDetails, campaignId }: { onViewDetails: (id: string) => void; campaignId: string }) {
    return (
      <Pressable style={styles.viewButton} onPress={() => onViewDetails(campaignId)}>
        <Text style={styles.viewButtonText}>View Details</Text>
      </Pressable>
    );
  }

  function CampaignCard({ item, onViewDetails, screenWidth }: { item: CampaignItem; onViewDetails: (id: string) => void; screenWidth: number }) {
    return (
      <View style={styles.campaignCard}>
        <StatusPill status={item.status} />
        <CardHeader item={item} />
        <MetricsRow item={item} />
        <BudgetChart item={item} screenWidth={screenWidth} />
        <TotalSpendChart item={item} screenWidth={screenWidth} />
        <CampaignProgress progress={item.progress} />
        <CampaignDetails item={item} />
        <ViewDetailsButton onViewDetails={onViewDetails} campaignId={item.id} />
      </View>
    );
  }

function ScreenTitle() {
  return (
    <Text style={styles.screenTitle}>Campaigns</Text>
  );
}

  export default function
  BrandCampaignTabScreen() {
    const navigation =
    useNavigation<any>();
    const { width: screenWidth } = useWindowDimensions();

    const dispatch =
      useDispatch();
  
    const {
      campaigns,
      stats,
      selectedStatus,
      searchQuery,
    } = useSelector(
      (
        state:
          RootState
      ) =>
        state.brandCampaignTab
    );
  
    const [
        showStatusDropdown,
        setShowStatusDropdown,
      ] = useState(
        false
      );
      
    const filteredCampaigns =
      useMemo(() => {
        return campaigns.filter(
          campaign => {
            const
              searchMatch =
                campaign.title
                  .toLowerCase()
                  .includes(
                    searchQuery.toLowerCase()
                  );
  
                  const statusMatch =
                  selectedStatus ===
                  "All Status"
                    ? true
                    : campaign.status ===
                    selectedStatus
                      .toLowerCase() as
                        "ongoing" |
                        "completed" |
                        "paused"
  
            return (
              searchMatch &&
              statusMatch
            );
          }
        );
      }, [
        campaigns,
        selectedStatus,
            searchQuery,
      ]);

      const handleViewDetails = useCallback((campaignId: string) => {
        navigation.navigate("BrandCampaignDetails", { campaignId });
      }, [navigation]);

      const renderCampaignItem = useCallback(({ item }: { item: CampaignItem }) => (
        <CampaignCard item={item} onViewDetails={handleViewDetails} screenWidth={screenWidth} />
      ), [handleViewDetails, screenWidth]);

      return (
        <SafeAreaView
          style={
            styles.container
          }
          edges={["top"]}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor={
              Colors.bgBlack
            }
          />
      
          <AppHeader />
      
          <ScrollView
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.scrollContent
            }
          >
            <ScreenTitle />
      
            <StatsGrid stats={stats} />
            <SearchFilterRow
              searchQuery={searchQuery}
              selectedStatus={selectedStatus}
              onSearchChange={(text) => dispatch(setSearchQuery(text))}
              onFilterPress={() => setShowStatusDropdown(!showStatusDropdown)}
            />
            <StatusDropdown
              show={showStatusDropdown}
              options={statusOptions}
              selected={selectedStatus}
              onSelect={(item) => dispatch(setSelectedStatus(item as CampaignStatus))}
              onClose={() => setShowStatusDropdown(false)}
            />
                  {/* CAMPAIGNS */}
      <FlatList
        data={
          filteredCampaigns
        }
        keyExtractor={item =>
          item.id
        }
        scrollEnabled={
          false
        }
        renderItem={renderCampaignItem}
      />
    </ScrollView>
  </SafeAreaView>
);
}
