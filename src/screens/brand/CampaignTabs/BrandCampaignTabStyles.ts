import {
    StyleSheet,
  } from "react-native";
  
  import {
    scale,
    verticalScale,
    moderateScale,
  } from "../../../utils/scaling";
  
  import {
    Colors,
  } from "../../../config/theme";
  
  const styles =
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:
          "#000",
      },
  
      scrollContent: {
        paddingBottom:
          verticalScale(
            120
          ),
      },
  
      /* TITLE */
  
      screenTitle: {
        color: "#FFF",
        fontSize:
          moderateScale(
            30
          ),
        fontWeight:
          "700",
        marginTop:
          verticalScale(
            12
          ),
        marginLeft:
          scale(22),
      },
  
      /* STATS */
  
      statsGrid: {
        flexDirection:
          "row",
  
        flexWrap:
          "wrap",
  
        justifyContent:
          "space-between",
  
        paddingHorizontal:
          scale(20),
  
        marginTop:
          verticalScale(
            15
          ),
      },
  
      statCard: {
        width: "48%",
  
        borderRadius:
          moderateScale(
            18
          ),
  
        borderWidth: 1,
        paddingTop: verticalScale(6),
  
        paddingVertical:
          verticalScale(
            2
          ),
  
        paddingHorizontal:
          scale(20),
  
        marginBottom:
          verticalScale(
            14
          ),
  
        backgroundColor:
          "#111",
      },
  
      cyanBorder: {
        borderColor:
          "#00D9FF",
      },
  
      purpleBorder: {
        borderColor:
          "#C700FF",
      },
  
      blueBorder: {
        borderColor:
          "#00A3FF",
      },
  
      orangeBorder: {
        borderColor:
          "#FF8A00",
      },
  
      statHeading: {
        color: "#FFFFFF",
      
        fontSize:
          moderateScale(
            12
          ),
      
        fontWeight:
          "600",
      
        textAlign:
          "center",
      
        alignSelf:
          "center",
      },
  
      statValue: {
        color: "#39FF14",
      
        fontSize:
          moderateScale(
            22
          ),
      
        fontWeight:
          "700",
      
        marginTop:
          verticalScale(
            2
          ),
      
        textAlign:
          "center",
      
        alignSelf:
          "center",
      },
  
      /* SEARCH */
  
      searchRow: {
        flexDirection:
          "row",
  
        alignItems:
          "center",
  
        paddingHorizontal:
          scale(22),
  
        marginTop:
          verticalScale(
            4
          ),
      },
  
      searchBox: {
        flex: 1,
  
        borderWidth: 1,
  
        borderColor:
          "#2C2C2C",
  
        borderRadius:
          moderateScale(
            16
          ),
  
        backgroundColor:
          "#111",
  
        height:
          verticalScale(
            40
          ),
  
        justifyContent:
          "center",
  
        paddingHorizontal:
          scale(18),
      },
  
      searchInput: {
        color: "#FFF",
  
        fontSize:
          moderateScale(
            14
          ),
      },
  
      filterButton: {
        marginLeft:
          scale(12),
  
        borderWidth: 1,
  
        borderColor:
          "#00D9FF",
  
        borderRadius:
          moderateScale(
            16
          ),
  
        paddingHorizontal:
          scale(18),
  
        height:
          verticalScale(
            40
          ),
  
        justifyContent:
          "center",
  
        backgroundColor:
          "#111",
      },
  
      filterText: {
        color: "#FFF",
        fontWeight:
          "600",
      },
  
      dropdownContainer: {
        marginHorizontal:
          scale(22),
  
        marginTop:
          verticalScale(
            8
          ),
  
        borderRadius:
          moderateScale(
            18
          ),
  
        backgroundColor:
          "#111",
  
        borderWidth: 1,
  
        borderColor:
          "#2A2A2A",
      },
  
      dropdownItem: {
        paddingVertical:
          verticalScale(
            14
          ),
  
        paddingHorizontal:
          scale(20),
  
        borderBottomWidth:
          1,
  
        borderBottomColor:
          "#232323",
      },
  
      dropdownText: {
        color: "#FFF",
        fontSize:
          moderateScale(
            14
          ),
      },
  
      /* CARD */
  
      campaignCard: {
        marginHorizontal:
          scale(22),
      
        marginTop:
          verticalScale(
            18
          ),
      
        borderRadius:
          moderateScale(
            24
          ),
      
        borderWidth: 1,
      
        borderColor:
          "#00D9FF",
      
        backgroundColor:
          "#090909",
      
        padding:
          moderateScale(
            18
          ),
      
        paddingTop:
          verticalScale(
            26
          ),
      
        position:
          "relative",
      },
  
      statusPill: {
        position: "absolute",
      
        top:
          verticalScale(0),
        
      
        right:
          scale(4),
      
        flexDirection:
          "row",
      
        alignItems:
          "center",
      
        borderRadius:
          moderateScale(
            999
          ),
      
        backgroundColor:
          "#0F2B15",
      
        paddingHorizontal:
          scale(12),
      
        paddingVertical:
          verticalScale(
            6
          ),
      
        zIndex: 10,
      },
  
      statusDot: {
        width:
          scale(8),
  
        height:
          scale(8),
  
        borderRadius:
          scale(4),
  
        backgroundColor:
          "#39FF14",
  
        marginRight:
          scale(8),
      },
  
      statusText: {
        color: "#39FF14",
        fontWeight:
          "700",
      },
  
      cardHeader: {
        flexDirection:
          "row",
      },
  
      logo: {
        width:
          scale(60),
  
        height:
          scale(60),
  
        marginRight:
          scale(14),
      },
  
      campaignTitle: {
        color: "#FFF",
  
        fontSize:
          moderateScale(
            22
          ),
  
        fontWeight:
          "700",
      },
  
      socialRow: {
        flexDirection:
          "row",
  
        marginTop:
          verticalScale(
            0
          ),
      },
  
      socialIcon: {
        width:
          scale(18),
  
        height:
          scale(18),
  
        marginRight:
          scale(8),
      },
  
      roiText: {
        color: "#B3B3B3",
  
        paddingTop:
          verticalScale(
            4
          ),
      },
  
      metricRow: {
        flexDirection:
          "row",
      
        justifyContent:
          "space-between",
      
        marginTop:
          verticalScale(20),
      
        borderWidth: 1,
      
        borderColor:
          "#00D9FF",
      
        borderRadius:
          moderateScale(14),
      
        paddingVertical:
          verticalScale(10),
      
        paddingHorizontal:
          scale(2),
      },
      
      metricBox: {
        flex: 1,
      
        alignItems:
          "center",
      
        justifyContent:
          "center",
      },
  
      metricHeading: {
        color: "#FFFFFF",
        fontWeight:"bold",
  
        fontSize:
          moderateScale(
            12
          ),
  
        textAlign:
          "center",
      },
  
      metricValue: {
        color: "#34eb40",
  
        fontWeight:
          "700",
  
        fontSize:
          moderateScale(
            20
          ),
  
        marginTop:
          verticalScale(
            8
          ),
      },
  
      cpeText: {
        textAlign: "right",
        color: "#B3B3B3",
  
        marginTop:
          verticalScale(
            18
          ),
        flexDirection:"row-reverse",
  
        fontWeight:
          "700",
      },
  
      chartCard: {
        marginTop:
          verticalScale(
            20
          ),
  
        borderRadius:
          moderateScale(
            18
          ),
  
        backgroundColor:
          "#111",
  
        paddingVertical:
          verticalScale(
            18
          ),
  
        overflow:
          "hidden",
      },
  
      chartTitle: {
        color: "#FFF",
  
        fontWeight:
          "700",
  
        fontSize:
          moderateScale(
            18
          ),
  
        marginLeft:
          scale(18),
  
        marginBottom:
          verticalScale(
            12
          ),
      },
  
      progressTitle: {
        color: "#FFF",
        fontSize: 19,
  
        fontWeight:
          "700",
  
        marginTop:
          verticalScale(
            24
          ),
  
        marginBottom:
          verticalScale(
            12
          ),
      },
  
      progressBarBg: {
        height:
          verticalScale(
            10
          ),
  
        borderRadius:
          999,
  
        backgroundColor:
          "#1E1E1E",
      },
  
      progressBarFill: {
        height: "100%",
        borderRadius: 999,
        backgroundColor:
          "#00D9FF",
      },
  
      detailsCard: {
        backgroundColor:
          "#111",
  
        borderRadius:
          moderateScale(
            20
          ),
  
        padding:
          moderateScale(
            18
          ),
  
        marginTop:
          verticalScale(
            24
          ),
      },
  
      detailsTitle: {
        color: "#FFF",
        fontWeight:
          "700",
        fontSize:
          moderateScale(
            18
          ),
        marginBottom:
          verticalScale(
            18
          ),
      },
  
      detailRow: {
        flexDirection:
          "row",
        alignItems:
          "center",
        marginBottom:
          verticalScale(
            18
          ),
      },
  
      iconCircle: {
        width:
          scale(44),
        height:
          scale(44),
        borderRadius:
          scale(22),
        borderWidth: 1,
        borderColor:
          "#00D9FF",
        justifyContent:
          "center",
        alignItems:
          "center",
        marginRight:
          scale(14),
      },
  
      detailLabel: {
        color: "#00D9FF",
        fontWeight:
          "700",
      },
  
      detailValue: {
        color: "#FFF",
        marginTop:
          verticalScale(
            4
          ),
      },
  
      budgetUsedText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight:
          "700",
        marginTop:
          verticalScale(
            4
          ),
      },
  
      topInfluencerTitle: {
        color: "#FFF",
        fontWeight:
          "700",
        marginBottom:
          verticalScale(
            12
          ),
      },
  
      avatarRow: {
        flexDirection:
          "row",
        alignItems:
          "center",
      },
  
      avatar: {
        width:
          scale(32),
        height:
          scale(32),
        borderRadius:
          scale(23),
        borderWidth: 2,
        borderColor:
          "#000",
      },
  
      plusAvatar: {
        width:
          scale(32),
        height:
          scale(32),
        borderRadius:
          scale(23),
        backgroundColor:
          "#1A1A1A",
        justifyContent:
          "center",
        alignItems:
          "center",
        marginLeft:
          scale(-12),
      },
  
      plusText: {
        color: "#FFF",
        fontWeight:
          "700",
      },
  
      viewButton: {
        alignSelf:
          "flex-end",
      
        height:
          verticalScale(
            40
          ),
      
        minWidth:
          scale(100),
      
        paddingHorizontal:
          scale(18),
      
        borderRadius:
          moderateScale(
            14
          ),
      
        backgroundColor:
          Colors.teal,
      
        justifyContent:
          "center",
      
        alignItems:
          "center",
      
        marginTop:
          verticalScale(
            15
          ),
      },
      
      viewButtonText: {
        color: "#000",
      
        fontWeight:
          "700",
      
        fontSize:
          moderateScale(
            15
          ),
      },
      iconText: {
        color: "#FFF",
        fontSize:
          moderateScale(18),
      },
    });
  
  export default
  styles;