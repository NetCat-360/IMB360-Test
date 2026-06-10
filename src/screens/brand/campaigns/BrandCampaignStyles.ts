import { StyleSheet } from "react-native";
import { scale,verticalScale,moderateScale } from "react-native-size-matters";
import { Colors } from "../../../config/theme";

const styles =
StyleSheet.create({
container:{
flex:1,
backgroundColor:"#000",
},

content:{
padding:scale(20),
paddingBottom:verticalScale(50),
},

tabContainer:{
flexDirection:"row",
borderWidth:1,
borderColor:Colors.teal,
borderRadius:moderateScale(12),
overflow:"hidden",
marginBottom:verticalScale(22),
},

tab:{
flex:1,
paddingVertical:verticalScale(10),
alignItems:"center",
},

activeTab:{
backgroundColor:Colors.teal,
},

tabText:{
color:"#fff",
fontSize:moderateScale(15),
fontFamily:"Poppins-Medium",
},
activeText:{
color:"#000",
},
card:{
borderWidth:1,
borderColor:Colors.teal,
borderRadius:moderateScale(18),
padding:scale(16),
marginBottom:verticalScale(22),
},
rowBetween:{
flexDirection:"row",
justifyContent:"space-between",
},
title:{
color:"#fff",
fontSize:moderateScale(18),
fontFamily:"Poppins-SemiBold",
},
budgetLabel:{
color:"#777",
fontSize:moderateScale(12),
textAlign:"right",
},
budget:{
color:"#00FF47",
fontFamily:"Poppins-Bold",
fontSize:moderateScale(16),
},
badge:{
alignSelf:"flex-start",
paddingHorizontal:scale(10),
paddingVertical:verticalScale(4),
borderRadius:moderateScale(12),
marginTop:verticalScale(0),
},
badgeText:{
fontFamily:"Poppins-Medium",
fontSize:moderateScale(12),
},
dateLabel:{
color:"#777",
marginTop:verticalScale(8),
},
date:{
color:"#fff",
fontSize:moderateScale(16),
},
buttonRow:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:verticalScale(12),
},
outlineBtn:{
width:"47%",
borderWidth:1,
borderColor:Colors.teal,
paddingVertical:verticalScale(10),
borderRadius:moderateScale(10),
alignItems:"center",
},
fillBtn:{
width:"47%",
backgroundColor:Colors.teal,
paddingVertical:verticalScale(10),
borderRadius:moderateScale(10),
alignItems:"center",
},
viewText: {
    color:"#fff",
    fontFamily:"Poppins-Medium",
    fontSize:
      moderateScale(16),
  },
  
  fillBtnText: {
    color:"#000",
    fontFamily:"Poppins-SemiBold",
    fontSize:
      moderateScale(16),
      fontWeight:'bold',
  },
divider:{
height:1,
backgroundColor:"#333",
marginVertical:verticalScale(14),
},
historyRow:{
flexDirection:"row",
justifyContent:"space-between",
},
smallLabel:{
color:"#777",
fontSize:moderateScale(12),
},
smallValue:{
color:"#fff",
},
greenText:{
color:"#00FF47",
fontFamily:"Poppins-SemiBold",
},
modalOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.65)",
    justifyContent:
      "center",
    alignItems:
      "center",
  },
  
  modalCard: {
    width: "92%",
    backgroundColor:
      "#000",
    borderWidth: 1,
    borderColor:
      Colors.teal,
    borderRadius:
      moderateScale(18),
    padding:
      scale(20),
    alignItems:
      "center",
  },
  
  modalTitle: {
    color: "#fff",
    fontSize:
      moderateScale(20),
    fontFamily:
      "Poppins-Bold",
    marginBottom:
      verticalScale(8),
  },
  
  modalText: {
    color: "#8E8E93",
    fontSize:
      moderateScale(15),
    fontFamily:
      "Poppins-Regular",
    textAlign:
      "center",
    marginBottom:
      verticalScale(22),
  },
  
  modalButtonRow: {
    flexDirection:
      "row",
    justifyContent:
      "space-between",
    width: "100%",
  },
  
  cancelBtn: {
    width: "42%",
    borderWidth: 1,
    borderColor: "red",
    borderRadius:
      moderateScale(10),
    paddingVertical:
      verticalScale(10),
    alignItems:
      "center",
  },
  
  confirmBtn: {
    width: "42%",
    backgroundColor:
      Colors.teal,
    borderRadius:
      moderateScale(10),
    paddingVertical:
      verticalScale(10),
    alignItems:
      "center",
  },
  
  cancelText: {
    color: "#fff",
    fontSize:
      moderateScale(16),
    fontFamily:
      "Poppins-Medium",
  },
  
  confirmText: {
    color: "#000",
    fontSize:
      moderateScale(16),
    fontFamily:
      "Poppins-SemiBold",
  },
});
export default styles;