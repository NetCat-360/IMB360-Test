import { StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "../../../utils/scaling";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  scrollContent: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(40),
  },

  subtitle: {
    color: "#A0A0A0",
    fontSize: moderateScale(14),
    marginTop: verticalScale(20),
    textAlign: "center",
  },

  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(24),
  },

  stepCircle: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(29),
    borderWidth: 1,
    borderColor: "#0ECBE6",
    justifyContent: "center",
    alignItems: "center",
  },

  activeStep: {
    backgroundColor: "#0ECBE6",
  },

  stepText: {
    color: "#FFF",
    fontSize: moderateScale(22),
    fontWeight: "600",
  },

  line: {
    height: 1,
    width: scale(35),
    backgroundColor: "#FFF",
  },

  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: "#FFF",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },

  label: {
    color: "#FFF",
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginTop: verticalScale(14),
    marginBottom: verticalScale(8),
  },

  required: {
    color: "red",
  },

  input: {
    height: verticalScale(40),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#0ECBE6",
    paddingHorizontal: 16,
    color: "#FFF",
    backgroundColor: "#2A272B",
  },

  dropdown: {
    height: verticalScale(40),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#0ECBE6",
    backgroundColor: "#2A272B",
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  campaignDropdown: {
    marginTop: verticalScale(8),
    borderWidth: 1,
    borderColor: "#0ECBE6",
    borderRadius: moderateScale(14),
    backgroundColor: "#2A272B",
    maxHeight: verticalScale(280),
    overflow: "hidden",
  },

  categoryHeading: {
    color: "#0ECBE6",
    fontSize: moderateScale(13),
    fontWeight: "700",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
  },

  campaignItem: {
    color: "#FFF",
    fontSize: moderateScale(15),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(18),
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3A",
  },

  selectedText: {
    color: "#FFF",
    fontSize: moderateScale(15),
  },

  placeholder: {
    color: "#9A9A9A",
  },

  dropdownArrow: {
    color: "#FFF",
    fontSize: 20,
  },

  descriptionContainer: {
    height: verticalScale(100),
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#0ECBE6",
    backgroundColor: "#2A272B",
    padding: 8,
  },

  descriptionInput: {
    flex: 1,
    color: "#FFF",
    textAlignVertical: "top",
  },

  characterCount: {
    color: "red",
    alignSelf: "flex-end",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  halfWidth: {
    width: "48%",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(30),
  },

  previousButton: {
    backgroundColor: "#808080",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 14,
  },

  nextButton: {
    backgroundColor: "#0ECBE6",
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderRadius: 14,
    marginLeft: "auto",
  },

  buttonText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: verticalScale(10),
  },

  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: "#A0A0A0",
    marginTop: 4,
  },

  checkedBox: {
    backgroundColor: "#0ECBE6",
    borderColor: "#0ECBE6",
  },

  checkboxTextContainer: {
    marginLeft: scale(16),
    flex: 1,
  },

  checkboxTitle: {
    color: "#FFF",
    fontSize: moderateScale(17),
    fontWeight: "600",
    marginLeft: verticalScale(10),
  },

  checkboxDesc: {
    color: "#8A8A8A",
    fontSize: moderateScale(14),
    marginTop: 2,
  },

  tagHelper: {
    color: "#8A8A8A",
    fontSize: moderateScale(13),
    marginTop: verticalScale(8),
  },

  platformDropdown: {
    marginTop: verticalScale(1),
    borderWidth: 1,
    borderColor: "#0ECBE6",
    borderRadius: moderateScale(14),
    backgroundColor: "#2A272B",
    maxHeight: verticalScale(400),
    overflow: "hidden",
  },

  platformItem: {
    color: "#FFF",
    fontSize: moderateScale(15),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(18),
    borderBottomWidth: 1,
    borderBottomColor: "#3A3A3A",
  },
});

export default styles;
