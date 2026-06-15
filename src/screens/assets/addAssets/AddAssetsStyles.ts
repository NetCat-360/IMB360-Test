import { StyleSheet } from "react-native";
import { Colors } from "../../../config/theme";
import {
  scale,
  verticalScale,
  moderateScale,
} from "../../../utils/scaling";

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
      verticalScale(10),
  },

  sectionHeading: {
    color: "#fff",
    fontSize:
      moderateScale(24),
    fontFamily:
      "Poppins",
    fontWeight: "bold",
    marginTop:
      verticalScale(14),
    marginBottom:
      verticalScale(14),
  },

  label: {
    color: "#fff",
    fontSize:
      moderateScale(16),
    fontFamily:
      "Poppins-SemiBold",
    marginBottom:
      verticalScale(10),
    marginTop:
      verticalScale(1),
  },

  required: {
    color: "red",
  },

  input: {
    height:
      verticalScale(40),
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    backgroundColor:
      "#2D2A2E",
    paddingHorizontal:
      scale(18),
    color: "#fff",
    fontFamily:
      "Poppins-Regular",
    marginBottom:
      verticalScale(10),
  },

  dropdown: {
    height:
      verticalScale(40),
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    backgroundColor:
      "#2D2A2E",
    flexDirection:
      "row",
    alignItems:
      "center",
    justifyContent:
      "space-between",
    paddingHorizontal:
      scale(18),
    marginBottom:
      verticalScale(14),
  },

  dropdownText: {
    color: "#9B9B9B",
    fontSize:
      moderateScale(16),
    fontFamily:
      "Poppins-Regular",
  },

  arrow: {
    width: scale(16),
    height: scale(16),
    tintColor: "#fff",
  },
  dropdownContainer: {
    maxHeight:
      verticalScale(180),
    backgroundColor:
      "#2D2A2E",
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    marginTop:
      verticalScale(-10),
    marginBottom:
      verticalScale(14),
    overflow: "hidden",
  },
  
  dropdownItem: {
    paddingVertical:
      verticalScale(10),
    paddingHorizontal:
      scale(18),
    borderBottomWidth: 0.5,
    borderBottomColor:
      "rgba(255,255,255,0.08)",
  },
  
  dropdownItemText: {
    color: "#fff",
    fontFamily:
      "Poppins-Regular",
    fontSize:
      moderateScale(15),
  },

  descriptionBox: {
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    backgroundColor:
      "#2D2A2E",
    minHeight:
      verticalScale(120),
    padding:
      scale(14),
    marginBottom:
      verticalScale(8),
  },

  textArea: {
    color: "#fff",
    fontFamily:
      "Poppins-Regular",
    fontSize:
      moderateScale(15),
    minHeight:
      verticalScale(80),
  },

  counter: {
    color: "#B0B0B0",
    fontSize:
      moderateScale(14),
    alignSelf:
      "flex-end",
  },

  maxText: {
    color: "#A1A1A1",
    fontSize:
      moderateScale(14),
    marginBottom:
      verticalScale(0),
  },

  row: {
    flexDirection:
      "row",
    justifyContent:
      "space-between",
  },
  amenitiesContainer: {
    maxHeight:
      verticalScale(220),
    backgroundColor:
      "#111",
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    paddingVertical:
      verticalScale(8),
    marginTop:
      verticalScale(-8),
    marginBottom:
      verticalScale(14),
  },
  
  checkboxRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    paddingHorizontal:
      scale(16),
    paddingVertical:
      verticalScale(10),
  },
  
  checkboxLabel: {
    color: "#fff",
    fontSize:
      moderateScale(16),
    fontFamily:
      "Poppins-Regular",
    flex: 1,
  },
  
  checkbox: {
    width: scale(22),
    height: scale(22),
    borderWidth: 1.5,
    borderColor: "#888",
    borderRadius:
      moderateScale(4),
  },
  
  checkboxSelected: {
    backgroundColor:
      Colors.cyan,
    borderColor:
      Colors.cyan,
  },

  halfContainer: {
    width: "48%",
  },

  uploadBox: {
    height:
      verticalScale(120),
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    backgroundColor:
      "#2D2A2E",
    justifyContent:
      "center",
    alignItems:
      "center",
    marginTop:
      verticalScale(8),
  },

  uploadIcon: {
    width: scale(40),
    height: scale(40),
    tintColor: "#B3B3B3",
    marginBottom:
      verticalScale(10),
  },

  uploadText: {
    color: "#9D9D9D",
    fontSize:
      moderateScale(15),
    fontFamily:
      "Poppins-Regular",
  },

  uploadInfo: {
    color: "#A1A1A1",
    fontSize:
      moderateScale(14),
    marginTop:
      verticalScale(8),
    marginBottom:
      verticalScale(18),
    fontFamily:
      "Poppins-Regular",
  },

  dateInput: {
    height:
      verticalScale(44),
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    backgroundColor:
      "#2D2A2E",
    flexDirection:
      "row",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    paddingHorizontal:
      scale(18),
  },

  dateText: {
    color: "#B0B0B0",
    fontSize:
      moderateScale(16),
    fontFamily:
      "Poppins-Regular",
  },

  placeholderText: {
    color: "#8E8E8E",
    fontSize:
      moderateScale(16),
    fontFamily:
      "Poppins-Regular",
  },

  calendarIcon: {
    width: scale(24),
    height: scale(24),
    tintColor:
      "#B0B0B0",
  },

  helperText: {
    color: "#A1A1A1",
    fontSize:
      moderateScale(13),
    marginTop:
      verticalScale(6),
    marginBottom:
      verticalScale(8),
    fontFamily:
      "Poppins-Regular",
  },

  warningText: {
    color: "red",
    fontSize:
      moderateScale(14),
    fontFamily:
      "Poppins-Regular",
    marginTop:
      verticalScale(16),
    lineHeight:
      moderateScale(22),
  },

  buttonRow: {
    flexDirection:
      "row",
    justifyContent:
      "space-between",
    marginTop:
      verticalScale(24),
    marginBottom:
      verticalScale(0),
  },

  cancelButton: {
    width: "47%",
    height:
      verticalScale(40),
    borderWidth: 1,
    borderColor:
      Colors.borderCyan,
    borderRadius:
      moderateScale(14),
    backgroundColor:
      "#2D2A2E",
    justifyContent:
      "center",
    alignItems:
      "center",
  },

  cancelText: {
    color: "#fff",
    fontSize:
      moderateScale(18),
    fontFamily:
      "Poppins-Bold",
    fontWeight: "bold",
  },

  createButton: {
    width: "47%",
    height:
      verticalScale(40),
    borderRadius:
      moderateScale(14),
    backgroundColor:
      Colors.cyan,
    justifyContent:
      "center",
    alignItems:
      "center",
  },

  createText: {
    color: "#000",
    fontSize:
      moderateScale(18),
    fontFamily:
      "Poppins",
    fontWeight: "bold",
  },
  stepperContainer: {
    flexDirection:
      "row",
  
    justifyContent:
      "center",
  
    alignItems:
      "center",
  
    marginTop:
      verticalScale(
        18
      ),
  
    marginBottom:
      verticalScale(
        18
      ),
  },
  
  stepRow: {
    flexDirection:
      "row",
  
    alignItems:
      "center",
  },
  
  stepCircle: {
    width: scale(42),
  
    height: scale(42),
  
    borderRadius:
      scale(21),
  
    borderWidth: 1,
  
    borderColor:
      Colors.teal,
  
    backgroundColor:
      "#111",
  
    justifyContent:
      "center",
  
    alignItems:
      "center",
  },
  
  activeStep: {
    backgroundColor:
      Colors.teal,
  },
  
  stepText: {
    color: "#FFF",
  
    fontWeight:
      "700",
  
    fontSize:
      moderateScale(
        15
      ),
  },
  
  stepLine: {
    width: scale(60),
  
    height: 1,
  
    backgroundColor:
      "#444",
  },
  
  activeLine: {
    backgroundColor:
      Colors.teal,
  },
});

export default styles;