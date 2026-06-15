import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "../../../utils/scaling";

const campaignBidStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  headerText: {
    fontSize: moderateScale(22),
    fontWeight: "700",
    color: "#000",
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: moderateScale(22),
    marginTop: verticalScale(24),
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(12),
    overflow: "hidden",
  },

  tab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: "center",
    backgroundColor: "#000",
  },

  activeTab: {
    backgroundColor: "#0ECBE6",
  },

  tabText: {
    color: "#FFF",
    fontSize: moderateScale(15),
    fontWeight: "500",
  },

  card: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(14),
    marginHorizontal: moderateScale(20),
    marginTop: verticalScale(22),
    padding: moderateScale(16),
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(26),
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: moderateScale(20),
  },

  userInfo: {
    marginLeft: moderateScale(12),
    flex: 1,
    maxWidth: "60%",
  },

  creatorName: {
    color: "#FFF",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },

  campaignName: {
    color: "#888",
    marginTop: verticalScale(4),
    fontSize: moderateScale(13),
  },

  actionContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: verticalScale(4),
  },

  actionRow: {
    flexDirection: "row",
    gap: moderateScale(8),
    marginBottom: verticalScale(6),
  },

  acceptBtn: {
    backgroundColor: "#0A8F00",
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(6),
    minWidth: moderateScale(4),
    alignItems: "center",
  },

  rejectBtn: {
    backgroundColor: "#A61700",
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(6),
    minWidth: moderateScale(4),
    alignItems: "center",
  },

  actionText: {
    color: "#FFF",
    fontSize: moderateScale(12),
    fontWeight: "600",
  },

  outlineBtn: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(9),
    paddingVertical: verticalScale(6),
    minWidth: moderateScale(4),
    alignItems: "center",
  },

  outlineText: {
    color: "#FFF",
    fontSize: moderateScale(12),
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(8),
  },

  amount: {
    color: "#00FF3B",
    fontSize: moderateScale(22),
    fontWeight: "700",
  },

  date: {
    color: "#8A8A8A",
    fontSize: moderateScale(14),
  },

  smallLabel: {
    color: "#8A8A8A",
    fontSize: moderateScale(12),
  },

  rating: {
    color: "#FFD700",
    fontSize: moderateScale(14),
    marginTop: verticalScale(4),
  },

  paymentBtn: {
    marginTop: verticalScale(6),
    backgroundColor: "#C49A00",
    borderRadius: moderateScale(18),
    paddingVertical: verticalScale(8),
    alignItems: "center",
  },

  releasedBtn: {
    backgroundColor: "#008A29",
  },

  reportedBtn: {
    backgroundColor: "#6E1A1A",
  },

  paymentText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: moderateScale(12),
  },

  reportBtn: {
    borderWidth: 1,
    borderColor: "#FF4040",
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: verticalScale(7),
  },

  reportText: {
    color: "#FF4040",
    fontWeight: "600",
    fontSize: moderateScale(12),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
  },

  modalCard: {
    width: "100%",
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(22),
    padding: moderateScale(24),
  },

  modalTitle: {
    color: "#FFF",
    fontSize: moderateScale(26),
    fontWeight: "700",
    textAlign: "center",
  },

  modalText: {
    color: "#8A8A8A",
    fontSize: moderateScale(16),
    textAlign: "center",
    marginTop: verticalScale(18),
    lineHeight: moderateScale(24),
  },

  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(30),
  },

  cancelBtn: {
    width: "40%",
    borderWidth: 1.5,
    borderColor: "#FF3B3B",
    borderRadius: moderateScale(16),
    alignItems: "center",
    paddingVertical: verticalScale(12),
  },

  confirmBtn: {
    width: "40%",
    backgroundColor: "#11C3D6",
    borderRadius: moderateScale(16),
    alignItems: "center",
    paddingVertical: verticalScale(12),
  },

  cancelText: {
    color: "#FFF",
    fontSize: moderateScale(18),
    fontWeight: "500",
  },

  confirmText: {
    color: "#000",
    fontSize: moderateScale(18),
    fontWeight: "600",
  },
});

const portfolioStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(18),
  },

  avatar: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFF",
    fontSize: moderateScale(28),
    fontWeight: "700",
  },

  name: {
    color: "#FFF",
    fontSize: moderateScale(22),
    fontWeight: "600",
  },

  profileBtn: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(14),
    alignSelf: "flex-start",
    marginTop: verticalScale(8),
    paddingHorizontal: moderateScale(18),
    paddingVertical: verticalScale(6),
  },

  profileText: {
    color: "#00D9FF",
    fontSize: moderateScale(14),
    fontWeight: "500",
  },

  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(26),
    paddingHorizontal: moderateScale(20),
  },

  infoCard: {
    width: "47%",
    borderWidth: 1,
    borderRadius: moderateScale(18),
    padding: moderateScale(18),
    backgroundColor: "#000",
  },

  cardTitle: {
    color: "#FFF",
    fontSize: moderateScale(16),
    fontWeight: "600",
  },

  price: {
    color: "#00FF47",
    fontSize: moderateScale(24),
    fontWeight: "700",
    marginTop: verticalScale(16),
  },

  timeline: {
    color: "#00A3FF",
    fontSize: moderateScale(26),
    fontWeight: "700",
    marginTop: verticalScale(16),
  },

  section: {
    borderWidth: 1,
    borderColor: "#00D9FF",
    borderRadius: moderateScale(18),
    marginTop: verticalScale(24),
    marginHorizontal: moderateScale(20),
    padding: moderateScale(20),
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: verticalScale(14),
  },

  sectionText: {
    color: "#8A8A8A",
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(34),
    paddingHorizontal: moderateScale(20),
  },

  acceptBtn: {
    width: "47%",
    backgroundColor: "#11C3D6",
    borderRadius: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(14),
  },

  rejectBtn: {
    width: "47%",
    borderWidth: 1.5,
    borderColor: "#FF3B3B",
    borderRadius: moderateScale(14),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: verticalScale(14),
  },

  acceptText: {
    color: "#000",
    fontSize: moderateScale(20),
    fontWeight: "600",
  },

  rejectText: {
    color: "#FF3B3B",
    fontSize: moderateScale(20),
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.55)",

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: moderateScale(18),
  },

  modalCard: {
    width: "100%",

    backgroundColor: "#000",

    borderWidth: 1.5,

    borderColor: "#00D9FF",

    borderRadius: moderateScale(20),

    paddingTop: verticalScale(28),

    paddingBottom: verticalScale(24),

    paddingHorizontal: moderateScale(22),
  },

  modalTitle: {
    color: "#FFF",

    fontSize: moderateScale(28),

    fontWeight: "800",

    textAlign: "center",
  },

  modalText: {
    color: "#9A9A9A",

    fontSize: moderateScale(16),

    textAlign: "center",

    marginTop: verticalScale(14),

    lineHeight: moderateScale(24),
  },

  modalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: verticalScale(28),
  },

  cancelBtn: {
    width: "42%",

    height: verticalScale(46),

    borderWidth: 1.5,

    borderColor: "#FF3B3B",

    borderRadius: moderateScale(14),

    justifyContent: "center",

    alignItems: "center",
  },

  confirmBtn: {
    width: "42%",

    height: verticalScale(46),

    backgroundColor: "#11C3D6",

    borderRadius: moderateScale(14),

    justifyContent: "center",

    alignItems: "center",
  },

  sampleSection: {
    marginTop: verticalScale(24),
    paddingHorizontal: moderateScale(20),
  },

  sampleTitle: {
    color: "#FFF",
    fontSize: moderateScale(20),
    fontWeight: "700",
    marginBottom: verticalScale(12),
  },

  sampleCard: {
    backgroundColor: "#2C2C2C",
    borderRadius: moderateScale(18),
    padding: moderateScale(18),
    alignItems: "center",
  },

  sampleRow: {
    flexDirection: "row",
    gap: moderateScale(12),
  },

  sampleBox: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(12),
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },

  viewAllBtn: {
    marginTop: verticalScale(18),
    backgroundColor: "#11C3D6",
    borderRadius: moderateScale(18),
    paddingHorizontal: moderateScale(30),
    paddingVertical: verticalScale(10),
  },

  viewAllText: {
    color: "#000",
    fontSize: moderateScale(15),
    fontWeight: "600",
  },

  cancelText: {
    color: "#FFF",

    fontSize: moderateScale(18),

    fontWeight: "500",
  },

  confirmText: {
    color: "#000",

    fontSize: moderateScale(18),

    fontWeight: "600",
  },
});

export { campaignBidStyles, portfolioStyles };
