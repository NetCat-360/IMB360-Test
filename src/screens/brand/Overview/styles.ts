import { StyleSheet } from "react-native";
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
        Colors.bgBlack,
    },

    scrollContent: {
      padding:
        scale(20),
      paddingBottom:
        verticalScale(
          40
        ),
    },

    card: {
      borderWidth: 1,
      borderColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          18
        ),
      padding:
        scale(16),
      marginBottom:
        verticalScale(
          20
        ),
      backgroundColor:
        "#000",
    },

    rowBetween: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      alignItems:
        "center",
    },

    heading: {
      color:
        Colors.textPrimary,
      fontFamily:
        "Poppins-SemiBold",
      fontWeight: 'bold',
      fontSize:
        moderateScale(
          18
        ),
    },

    divider: {
      height: 1,
      backgroundColor:
        "#333",
      marginVertical:
        verticalScale(
          14
        ),
    },

    bottomDivider: {
      height: 1,
      backgroundColor:
        "#333",
      marginTop:
        verticalScale(
          14
        ),
      marginBottom:
        verticalScale(
          14
        ),
    },

    campaignRow: {
      flexDirection:
        "row",
      justifyContent:
        "space-between",
      marginBottom:
        verticalScale(
          14
        ),
    },

    campaignName: {
      color:
        "#fff",
      fontFamily:
        "Poppins-Regular",
      fontSize:
        moderateScale(
          14
        ),
    },

    campaignBudget: {
      color:
        "#fff",
      fontFamily:
        "Poppins-Medium",
      fontSize:
        moderateScale(
          14
        ),
    },

    totalText: {
      color:
        "#fff",
      fontFamily:
        "Poppins-SemiBold",
      fontSize:
        moderateScale(
          16
        ),
    },

    totalBudget: {
      color:
        "#fff",
      fontFamily:
        "Poppins-SemiBold",
      fontSize:
        moderateScale(
          16
        ),
    },

    chartHeader: {
      marginBottom:
        verticalScale(
          14
        ),
    },

    dropdownWrapper: {
      width:
        scale(150),
    },
    
    dropdown: {
      height:
        verticalScale(
          30
        ),
    
      backgroundColor:
        Colors.teal,
    
      borderRadius:
        moderateScale(
          22
        ),
    
      paddingHorizontal:
        scale(30),
    },
    
    dropdownMenu: {
      backgroundColor:
        "#111",
    
      borderRadius:
        moderateScale(
          18
        ),
    
      borderWidth: 1,
    
      borderColor:
        Colors.teal,
    
      overflow:
        "hidden",
    },
    
    selectedText: {
      color:
        "#000",
    
      fontSize:
        moderateScale(
          15
        ),
    
      fontFamily:
        "Poppins-Medium",
    },
    
    dropdownText: {
      color:
        "#fff",
    
      fontSize:
        moderateScale(
          14
        ),
    
      fontFamily:
        "Poppins-Regular",
    },
    dropdownRow: {
      marginTop:
        verticalScale(
          1
        ),
    
      alignItems:
        "flex-end",
    },

    chartContainer: {
      alignItems:
        "center",
      justifyContent:
        "center",
      marginTop:
        verticalScale(
          1
        ),
    },
  });

export default styles;
