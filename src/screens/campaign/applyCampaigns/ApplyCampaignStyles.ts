import { StyleSheet } from "react-native";

import {
  scale,
  verticalScale,
  moderateScale,
} from "../../../utils/scaling";

import { Colors } from "../../../config/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },

  scrollContent: {
    paddingHorizontal: scale(18),
    paddingBottom: verticalScale(30),
  },

  title: {
    color: "#fff",
    fontSize: moderateScale(22),
    fontWeight: "800",
    marginTop: verticalScale(18),
    textTransform: "uppercase",
  },

  infoCard: {
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(16),

    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),

    marginTop: verticalScale(20),
  },

  infoBlock: {},

  infoHeading: {
    color: "#E5E5E5",
    fontSize: moderateScale(12),
    fontWeight: "700",
  },

  budgetText: {
    color: "#3EFF5E",
    fontSize: moderateScale(16),
    fontWeight: "700",
    marginTop: verticalScale(6),
  },

  infoText: {
    color: "#AFAFAF",
    fontSize: moderateScale(16),
    marginTop: verticalScale(6),
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },

  halfWidth: {
    width: "48%",
  },

  label: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginBottom: verticalScale(10),
  },

  required: {
    color: "red",
  },

  input: {
    height: verticalScale(40),

    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(14),

    paddingHorizontal: scale(10),

    backgroundColor: "#2A262A",
    color: "#fff",
  },

  textArea: {
    height: verticalScale(100),

    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(14),

    padding: scale(16),

    backgroundColor: "#2A262A",
    color: "#fff",
  },

  experienceInput: {
    height: verticalScale(80),

    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(14),

    padding: scale(16),

    backgroundColor: "#2A262A",
    color: "#fff",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginTop: verticalScale(18),
    marginBottom: verticalScale(10),
  },
  portfolioBox: {
    minHeight: verticalScale(80),
  
    borderWidth: 1,
    borderColor: Colors.borderCyan,
    borderRadius: moderateScale(14),
  
    backgroundColor: "#2A262A",
  
    padding: scale(16),
  
    marginTop: verticalScale(4),
  },
  
  portfolioPlaceholder: {
    color: "#8F8F8F",
    fontSize: moderateScale(14),
  },
  
  fileItem: {
    backgroundColor: "#1F1F1F",
    borderRadius: moderateScale(10),
    padding: scale(10),
    marginBottom: verticalScale(10),
  },
  
  fileName: {
    color: "#fff",
    fontSize: moderateScale(14),
  },
  
  chooseFileButton: {
    marginTop: verticalScale(5),
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#72E35F",
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(1),
    paddingHorizontal: scale(10),
    minWidth: scale(100),
  },
  chooseFileText: {
    color: "#000",
    fontSize: moderateScale(16),
    fontWeight: "700",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: verticalScale(18),
  },
  checkedBox: {
    borderColor: "#11BBC6",
    backgroundColor:
      "#11BBC6",
    justifyContent:
      "center",
    alignItems: "center",
  },
  
  checkmark: {
    color: "#000",
    fontSize:
      moderateScale(14),
    fontWeight: "bold",
  },
  
  checkbox: {
    width: scale(24),
    height: scale(24),
    borderWidth: 1,
    borderColor: "#8F8F8F",
    marginTop: verticalScale(4),
  },
  
  termsText: {
    flex: 1,
    color: "#AFAFAF",
    fontSize: moderateScale(14),
    marginLeft: scale(12),
    lineHeight: moderateScale(22),
  },
  
  redText: {
    color: "#FF2D2D",
  },
  
  tipsCard: {
    backgroundColor: "#11BBC6",
    borderRadius: moderateScale(20),
  
    padding: moderateScale(24),
  
    marginTop: verticalScale(20),
  },
  
  tipsTitle: {
    color: "#000",
    fontSize: moderateScale(18),
    fontWeight: "700",
    marginBottom: verticalScale(20),
    marginLeft: verticalScale(10)
  },
  
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: verticalScale(16),
  },
  
  tipIcon: {
    width: scale(20),
    height: scale(20),
    marginRight: scale(14),
    marginTop: verticalScale(10),
  },
  
  tipText: {
    flex: 1,
    color: "#000",
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
  
  bottomButtonRow: {
    flexDirection: "row",
    alignItems: "center",
  
    marginTop: verticalScale(18),
    marginBottom: verticalScale(30),
  
    gap: scale(16),
  },
  
  cancelButton: {
    width: "47%",
    height: verticalScale(52),
  
    borderRadius: moderateScale(16),
  
    backgroundColor: "#302D32",
  
    justifyContent: "center",
    alignItems: "center",
  },
  
  cancelText: {
    color: "#B7B7B7",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
  
  submitButton: {
    flex: 1,
    height: verticalScale(52),
    marginLeft: scale(-8),
  },
  
  submitText: {
    color: "#000",
    fontSize: moderateScale(16),
    fontWeight: "700",
    textAlign: "center",
  },
});

export default styles;