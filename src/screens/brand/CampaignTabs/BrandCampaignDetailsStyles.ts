import {
    StyleSheet,
  } from "react-native";
  
  import {
    scale,
    verticalScale,
    moderateScale,
  } from "../../../utils/scaling";
  
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
            40
          ),
      },
  
      heroCard: {
        marginHorizontal:
          scale(20),
  
        marginTop:
          verticalScale(
            18
          ),
  
        backgroundColor:
          "#050505",
  
        borderRadius:
          moderateScale(
            16
          ),
  
        borderWidth: 1,
  
        borderColor:
          "#00D9FF",
  
        padding:
          moderateScale(
            18
          ),
  
        position:
          "relative",
      },
  
      statusPill: {
        position:
          "absolute",
  
        top:
          verticalScale(
            -1
          ),
  
        right:
          scale(0),
  
        flexDirection:
          "row",
  
        alignItems:
          "center",
  
        backgroundColor:
          "#0C811B",
  
        borderTopRightRadius:
          moderateScale(
            16
          ),
  
        borderBottomLeftRadius:
          moderateScale(
            12
          ),
  
        paddingHorizontal:
          scale(14),
  
        paddingVertical:
          verticalScale(
            7
          ),
      },
  
      statusDot: {
        width:
          scale(6),
  
        height:
          scale(6),
  
        borderRadius:
          scale(3),
  
        backgroundColor:
          "#39FF14",
  
        marginRight:
          scale(6),
      },
  
      statusText: {
        color:
          "#FFF",
  
        fontWeight:
          "600",
  
        fontSize:
          moderateScale(
            11
          ),
  
        textTransform:
          "capitalize",
      },
  
      topRow: {
        flexDirection:
          "row",
  
        marginTop:
          verticalScale(
            10
          ),
      },
  
      logo: {
        width:
          scale(52),
  
        height:
          scale(52),
  
        marginRight:
          scale(14),
  
        marginTop:
          verticalScale(
            4
          ),
      },
  
      title: {
        color:
          "#FFF",
  
        fontSize:
          moderateScale(
            20
          ),
  
        fontWeight:
          "700",
      },
  
      socialRow: {
        flexDirection:
          "row",
  
        alignSelf:
          "flex-start",
  
        borderWidth: 1,
  
        borderColor:
          "#1F4C4E",
  
        backgroundColor:
          "#101010",
  
        borderRadius:
          moderateScale(
            10
          ),
  
        paddingHorizontal:
          scale(8),
  
        paddingVertical:
          verticalScale(
            7
          ),
  
        marginTop:
          verticalScale(
            10
          ),
      },
  
      socialIcon: {
        width:
          scale(16),
  
        height:
          scale(16),
  
        marginRight:
          scale(7),
      },
  
      description: {
        color:
          "#8E8E8E",
  
        fontSize:
          moderateScale(
            16
          ),
  
        lineHeight:
          moderateScale(
            22
          ),
  
        marginTop:
          verticalScale(
            18
          ),
      },
  
      sectionCard: {
        marginTop:
          verticalScale(
            26
          ),
      },
      requirementHeader: {
        flexDirection:
          "row",
      
        alignItems:
          "center",
      
        marginBottom:
          verticalScale(
            14
          ),
      },
      
      shieldIcon: {
        width:
          scale(32),
      
        height:
          scale(32),
      
        resizeMode:
          "contain",
      
        marginRight:
          scale(10),
        marginTop: scale(-15)
      },
  
      sectionTitle: {
        color:
          "#FFF",
  
        fontSize:
          moderateScale(
            20
          ),
  
        fontWeight:
          "700",
  
        marginBottom:
          verticalScale(
            14
          ),
      },
  
      targetTitle: {
        color:
          "#FFF",
  
        fontSize:
          moderateScale(
            20
          ),
  
        fontWeight:
          "700",
  
        marginBottom:
          verticalScale(
            14
          ),
      },
  
      sectionText: {
        color:
          "#E2E2E2",
  
        fontSize:
          moderateScale(
            14
          ),
  
        lineHeight:
          moderateScale(
            28
          ),
      },
  
      requirementRow: {
        flexDirection:
          "row",
  
        borderWidth: 1,
  
        borderColor:
          "#00D9FF",
  
        borderRadius:
          moderateScale(
            12
          ),
  
        overflow:
          "hidden",
      },
  
      requirementBox: {
        flex: 1,
  
        paddingVertical:
          verticalScale(
            16
          ),
  
        alignItems:
          "center",
      },
  
      requirementLabel: {
        color:
          "#FFF",
  
        fontSize:
          moderateScale(
            11
          ),
  
        fontWeight:
          "700",
  
        letterSpacing:
          1,
      },
  
      requirementValue: {
        color:
          "#39FF14",
  
        fontSize:
          moderateScale(
            18
          ),
  
        fontWeight:
          "700",
  
        marginTop:
          verticalScale(
            8
          ),
      },
  
      timelineRow: {
        flexDirection:
          "row",
  
        alignItems:
          "center",
  
        marginTop:
          verticalScale(
            22
          ),
      },
  
      timelineIcon: {
        width:
          scale(52),
  
        height:
          scale(52),
  
        resizeMode:
          "contain",
  
        marginRight:
          scale(14),
      },
  
      budgetIcon: {
        width:
          scale(52),
  
        height:
          scale(52),
  
        resizeMode:
          "contain",
  
        marginRight:
          scale(14),
      },
  
      timelineLabel: {
        color:
          "#00D9FF",
  
        fontWeight:
          "700",
  
        fontSize:
          moderateScale(
            13
          ),
      },
  
      timelineValue: {
        color:
          "#FFF",
  
        fontWeight:
          "500",
  
        fontSize:
          moderateScale(
            14
          ),
  
        marginTop:
          verticalScale(
            4
          ),
      },
  
      budgetLabel: {
        color:
          "#D6E600",
  
        fontWeight:
          "700",
  
        fontSize:
          moderateScale(
            13
          ),
      },
  
      budgetRangeText: {
        color:
          "#39FF14",
  
        fontWeight:
          "700",
  
        fontSize:
          moderateScale(
            18
          ),
  
        marginTop:
          verticalScale(
            4
          ),
      },
  
      deliverableCard: {
        backgroundColor:
          "#13B7C2",
  
        borderRadius:
          moderateScale(
            14
          ),
  
        padding:
          moderateScale(
            20
          ),
  
        marginTop:
          verticalScale(
            28
          ),
      },
  
      deliverableTitle: {
        color:
          "#000",
  
        fontSize:
          moderateScale(
            18
          ),
  
        fontWeight:
          "500",
  
        marginBottom:
          verticalScale(
            20
          ),
      },
  
      deliverableRow: {
        flexDirection:
          "row",
  
        alignItems:
          "flex-start",
  
        marginBottom:
          verticalScale(
            15
          ),
      },
  
      checkIcon: {
        width:
          scale(22),
  
        height:
          scale(22),
  
        marginRight:
          scale(14),
  
        marginTop:
          verticalScale(
            10
          ),
      },
  
      deliverableText: {
        color:
          "#000",
  
        flex: 1,
  
        fontSize:
          moderateScale(
            16
          ),
  
        lineHeight:
          moderateScale(
            25
          ),
      },
      closeButtonWrapper: {
        alignSelf:
          "flex-end",
      
        marginTop:
          verticalScale(
            20
          ),
      
        marginBottom:
          verticalScale(
            6
          ),
      },
      
      closeButton: {
        width:
          scale(115),
      
        height:
          verticalScale(
            32
          ),
      
        borderRadius:
          moderateScale(
            12
          ),
      
        justifyContent:
          "center",
      
        alignItems:
          "center",
      },
      
      closeButtonText: {
        color:
          "#000",
      
        fontSize:
          moderateScale(
            18
          ),
      
        fontWeight:
          "500",
      },
    });
  
  export default
  styles;