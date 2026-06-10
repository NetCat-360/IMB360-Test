import { StyleSheet } from "react-native";
import { moderateScale, verticalScale, scale } from "../../../utils/scaling";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  yearWrapper: {
    alignItems: "flex-end",
    marginTop: verticalScale(18),
    marginRight: moderateScale(24),

    position: "relative",
    zIndex: 100,
  },

  yearButton: {
    backgroundColor: "#09C7E6",
    borderRadius: moderateScale(12),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(8),
    minWidth: scale(105),
    justifyContent: "space-between",
  },

  yearText: {
    color: "#000",
    fontWeight: "600",
  },

  arrow: {
    color: "#000",
  },

  dropdown: {
    position: "absolute",

    top: verticalScale(34),
    right: 0,

    backgroundColor: "#111",
    borderRadius: moderateScale(16),

    width: scale(105),

    overflow: "hidden",

    zIndex: 999,
    elevation: 10,
  },

  dropdownItem: {
    padding: 14,
  },

  dropdownText: {
    color: "#FFF",
  },

  topCard: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: 20,
    marginHorizontal: 24,
    marginTop: 12,
    padding: 8,
  },

  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  walletCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#032B38",
    justifyContent: "center",
    alignItems: "center",
  },

  walletIcon: {
    width: 31,
    height: 24,
    tintColor: "#00D9FF",
  },

  totalLabel: {
    color: "#FFF",
    fontSize: 18,
  },

  totalAmount: {
    color: "#00FF1E",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 6,
  },

  tabBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: 18,
    marginHorizontal: 24,
    marginTop: 20,
    overflow: "hidden",
  },

  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
    paddingHorizontal: moderateScale(0),
    paddingTop: verticalScale(0),
    paddingBottom: verticalScale(0),
  },

  tab: {
    flex: 1,
    height: verticalScale(42),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(14),
  },

  activeTab: {
    backgroundColor: "#09C7E6",
  },

  tabText: {
    color: "#FFF",
    fontSize: moderateScale(15),
    fontWeight: "500",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 30,
  },

  nextButton: {
    alignSelf: "flex-end",

    marginTop: verticalScale(18),
    marginRight: moderateScale(28),
    marginBottom: verticalScale(20),

    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(14),

    paddingHorizontal: moderateScale(22),
    paddingVertical: verticalScale(10),

    backgroundColor: "#000",
  },

  nextText: {
    color: "#FFF",
    fontSize: 18,
  },

  card: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: 14,
    margin: 16,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    color: "#FFF",
  },

  cardAmount: {
    color: "#00FF1E",
    fontWeight: "700",
  },
});

export default styles;
