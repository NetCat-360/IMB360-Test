import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
} from "../../utils/scaling";

import { Colors } from "../../config/theme";
import Typography from "../../styles/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  filterBox: {
    paddingHorizontal:
      scale(20),
  
    marginTop:
      verticalScale(8),
  },
  
  searchBox: {
    height:
      verticalScale(52),
  
    borderWidth: 1,
  
    borderColor:
      Colors.borderCyan,
  
    borderRadius:
      moderateScale(18),
  
    backgroundColor:
      "#1B1B1B",
  
    flexDirection:
      "row",
  
    alignItems:
      "center",
  
    paddingHorizontal:
      scale(16),
  
    marginBottom:
      verticalScale(14),
  },
  
  placeholderText: {
    color: "#888",
  
    fontFamily:
      "Poppins-Regular",
  
    fontSize:
      moderateScale(16),
  
    marginLeft:
      scale(12),
  
    flex: 1,
  
    textAlign:
      "center",
  },
  
  dropdownItem: {
    backgroundColor:
      "#1B1B1B",
  
    height:
      verticalScale(40),
  
    borderWidth: 1,
  
    borderColor:
      Colors.borderCyan,
  
    borderRadius:
      moderateScale(18),
  
    flexDirection:
      "row",
  
    alignItems:
      "center",
  
    justifyContent:
      "space-between",
  
    paddingHorizontal:
      scale(16),
  
    marginBottom:
      verticalScale(12),
  },
  
  dropdownLeft: {
    flexDirection:
      "row",
  
    alignItems:
      "center",
  
    flex: 1,
  },
  
  dropdownText: {
    color:
      Colors.textPrimary,
  
    fontFamily:
      "Poppins-Regular",
  
    fontSize:
      moderateScale(16),
  
    marginLeft:
      scale(14),
  },
  
  dropdownIcon: {
    width:
      scale(20),
  
    height:
      scale(20),
  
    resizeMode:
      "contain",
  },
  
  downArrow: {
    width:
      scale(16),
  
    height:
      scale(16),
  
    resizeMode:
      "contain",
  },
  
  searchButton: {
    height:
      verticalScale(52),
  
    borderRadius:
      moderateScale(18),
  
    marginTop:
      verticalScale(4),
  
    overflow:
      "hidden",
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(30),
  },

  // HEADER
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },

  topBarLogo: {
    width: scale(100),
    height: verticalScale(28),
  },

  topBarActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  topBarIcon: {
    marginLeft: scale(16),
  },

  topBarIconText: {
    fontSize: moderateScale(20),
  },

  // TITLE
  headingContainer: {
    paddingHorizontal: scale(22),
    marginTop: verticalScale(10),
  },

  browseText: {
    ...Typography.h1,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },

  campaignGreen: {
    color: "#4CED4C",
  },

  // AI BUTTON
  aiButton: {
    marginLeft: scale(22),
    marginTop: verticalScale(14),
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: scale(8),
    backgroundColor: "#1B1B1B",
    paddingVertical: verticalScale(8),
  },

  aiButtonText: {
    color: Colors.teal,
    marginLeft: scale(8),
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(13),
  },

  aiimage: {
    width: scale(16),
    height: scale(16),
  },

  // FILTER
  filterRow: {
    marginTop: verticalScale(8),
    paddingHorizontal: scale(22),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filterText: {
    ...Typography.h2,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },

  filterButton: {
    width: scale(42),
    height: scale(42),
    justifyContent: "center",
    alignItems: "center",
  },


  // CARD
  card: {
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(22),
    marginHorizontal: scale(22),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    padding: moderateScale(18),
    backgroundColor: "#090909",
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  companyLogo: {
    width: scale(52),
    height: scale(52),
    marginRight: scale(12),
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  companyName: {
    ...Typography.h1,
    color: Colors.textPrimary,
    fontWeight: "700",
    flex: 1,
  },

  timelineText: {
    color: "#919191",
    fontSize: moderateScale(13),
    fontFamily: "Poppins-Regular",
    marginLeft: scale(10),
  },

  socialContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: verticalScale(10),
  },

  socialIcon: {
    width: scale(18),
    height: scale(18),
    marginRight: scale(7),
  },

  companyDescription: {
    color: "#AFAFAF",
    marginTop: verticalScale(18),
    fontFamily: "Poppins-Regular",
    lineHeight: moderateScale(22),
    fontSize: moderateScale(14),
  },

  // APPLIED
  appliedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(18),
  },

  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: Colors.teal,
    borderWidth: 2,
    borderColor: Colors.bgBlack,
  },

  avatarOverlap: {
    marginLeft: scale(-10),
  },

  plusAvatar: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(-10),
    borderWidth: 1,
    borderColor: Colors.borderCyan,
  },

  plusText: {
    color: Colors.textPrimary,
    fontSize: moderateScale(10),
    fontFamily: "Poppins-SemiBold",
  },

  appliedText: {
    marginLeft: scale(12),
    color: "#9E9E9E",
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(13),
  },

  // INFO ROW
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(18),
  },

  infoLabel: {
    color: Colors.textPrimary,
    fontWeight:'bold',
    fontFamily: "Poppins-SemiBold",
    fontSize: moderateScale(12),
  },

  budgetText: {
    color: "#4CED4C",
    fontFamily: "Poppins-Bold",
    fontSize: moderateScale(18),
    marginTop: verticalScale(4),
  },

  deadlineText: {
    color: "#D0D0D0",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(15),
    marginTop: verticalScale(4),
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#232323",
    marginVertical: verticalScale(20),
  },

  // REQUIREMENTS
  requirementHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoImage: {
    width: scale(20),
    height: scale(24),
  },

  requirementTitle: {
    marginLeft: scale(10),
    color: Colors.textPrimary,
    fontSize: moderateScale(20),
    fontWeight: "700",
  },


  requirementSingleCard: {
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(14),
    marginTop: verticalScale(18),
    flexDirection: "row",
    backgroundColor: "#0B0B0B",
    paddingVertical: verticalScale(0),
  },
  
  requirementItem: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(10),
  },
  
  reqHeading: {
    color: "#FFFFFF",
    fontSize: moderateScale(12),
    fontWeight:'bold',
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    minHeight: verticalScale(42), // forces equal heading space
    textAlignVertical: "center",
  },
  
  reqValue: {
    color: "#4CED4C",
    fontSize: moderateScale(24),
    fontFamily: "Poppins-Bold",
    marginTop: verticalScale(0),
    textAlign: "center",
    marginBottom: moderateScale(12),
  },
  viewButton: {
    marginTop:
      verticalScale(12),
  
    width: "55%",
  
    alignSelf:
      "flex-end",
  
    height:
      verticalScale(32),
  },

  targetTitle: {
    marginTop: verticalScale(2),
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: "bold",
  },
  
  targetText: {
    marginTop: verticalScale(14),
    color: "#B3B1AB",
    lineHeight: moderateScale(24),
    fontSize: moderateScale(15),
    fontFamily: "Poppins-Regular",
  },
  
  readMore: {
    color: Colors.teal,
    fontFamily: "Poppins-SemiBold",
    marginTop: verticalScale(8),
  },
  
  categoryCard: {
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(16),
    marginTop: verticalScale(24),
    padding: moderateScale(16),
  },
  
  categoryTitle: {
    ...Typography.h2,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: verticalScale(18),
  },
  
  categoryBox: {
    width: "47%",
    height: verticalScale(30),
  
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(12),
  
    justifyContent: "center",
    alignItems: "center",
  },
  
  categoryText: {
    color: Colors.textMuted,
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(14),
  },
  
  deliverableCard: {
    backgroundColor: "#11BBC6",
    borderRadius: moderateScale(20),
    padding: moderateScale(22),
    marginTop: verticalScale(2),
  },
  
  deliverableTitle: {
    color: "#000",
    fontFamily: "Poppins-SemiBold",
    fontWeight: "bold",
    fontSize: moderateScale(18),
    marginBottom: verticalScale(22),
  },
  
  deliverableRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(18),
  },
  
  deliverableIcon: {
    width: scale(16),
    height: scale(16),
    alignSelf: "center",
  },
  
  deliverableText: {
    flex: 1,
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    marginLeft: scale(16),
  },
  applyButton: {
    marginTop: verticalScale(24),
    height: verticalScale(52),
    marginBottom: verticalScale(4),
  },
 
  
 
  
  searchIcon: {
    width:
      moderateScale(22),
  
    height:
      moderateScale(22),
  
    resizeMode:
      "contain",
  
    tintColor:
      "#B3B3B3",
  },
  
  
  filterDropdown: {
    height:
      verticalScale(52),
  
    borderWidth: 1,
  
    borderColor:
      Colors.teal,
  
    borderRadius:
      moderateScale(14),
  
    backgroundColor:
      "#151515",
  
    paddingHorizontal:
      moderateScale(16),
  
    flexDirection:
      "row",
  
    alignItems:
      "center",
  
    justifyContent:
      "space-between",
  },
  
 
 
  
  arrowIcon: {
    width:
      moderateScale(18),
  
    height:
      moderateScale(18),
  
    resizeMode:
      "contain",
  
    tintColor:
      "#FFF",
  },
  
  
});

export default styles;