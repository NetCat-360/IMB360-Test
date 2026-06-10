import { StyleSheet } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
} from "../../utils/scaling";

import { Colors } from "../../config/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Colors.bgBlack,
  },

  scrollContent: {
    paddingHorizontal:
      scale(20),
    paddingBottom:
      verticalScale(20),
  },

  title: {
    color: "#fff",
    fontSize:
      moderateScale(32),
    fontWeight: "700",
    marginTop:
      verticalScale(12),
  },

  filterHeader: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    marginTop:
      verticalScale(14),
  },

  filterTitle: {
    color: "#fff",
    fontSize:
      moderateScale(18),
    fontWeight: "600",
  },

  filterIcon: {
    width: scale(24),
    height: scale(24),
  },

  inputBox: {
    height:
      verticalScale(32),
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    backgroundColor:
      "#2B2B2B",
    flexDirection:
      "row",
    alignItems:
      "center",
    paddingHorizontal:
      scale(14),
    marginTop:
      verticalScale(10),
  },

  searchIcon: {
    width: scale(18),
    height: scale(18),
  },

  input: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
  },

  dropdown: {
    height:
      verticalScale(32),
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    backgroundColor:
      "#1B1B1B",
    justifyContent:
      "center",
    position:
      "relative",
    marginTop:
      verticalScale(12),
  },
  
  dropdownIcon: {
    width: scale(18),
    height: scale(18),
    position:
      "absolute",
    left: scale(16),
  },
  
  dropdownText: {
    color: "#fff",
    textAlign:
      "center",
  },
  
  downArrow: {
    width: scale(14),
    height: scale(14),
    position:
      "absolute",
    right: scale(16),
  },

  searchButton: {
    marginTop:
      verticalScale(10),
    height:
      verticalScale(32),
  },

  addButton: {
    marginTop:
      verticalScale(10),
    height:
      verticalScale(32),
  },

  card: {
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(15),
    padding:
      scale(16),
    marginTop:
      verticalScale(16),
  },

  companyName: {
    color: "#fff",
    fontSize:
      moderateScale(24),
    fontWeight: "700",
  },

  description: {
    color: "#9A9A9A",
    marginTop:
      verticalScale(10),
    lineHeight:
      moderateScale(20),
  },

  availableText: {
    color: Colors.borderCyan,
    fontWeight:
      "700",
    marginTop:
      verticalScale(10),
  },

  availableDate: {
    color: "#A9A9A9",
  },

  locationRow: {
    flexDirection:
      "row",
    alignItems:
      "center",
    marginTop:
      verticalScale(10),
  },

  locationIcon: {
    fontSize:
      moderateScale(18),
    color: "red",
  },

  locationText: {
    color: "#9A9A9A",
    marginLeft:
      scale(8),
  },

  bottomRow: {
    flexDirection:
      "row",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    marginTop:
      verticalScale(14),
  },

  rentPrice: {
    color: "#00F260",
    fontWeight:
      "700",
    fontSize:
      moderateScale(22),
  },

  rentButton: {
    width: scale(130),
    height:
      verticalScale(42),
    fontWeight:'bold'
  },
});

export default styles;