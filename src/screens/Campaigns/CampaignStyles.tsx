import { StyleSheet } from 'react-native'
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../utils/scaling'

import { Colors } from '../../config/theme'
import Typography from '../../styles/typography'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            Colors.bgBlack,
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: verticalScale(330),
    },

    // HEADER
    topBar: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
        paddingHorizontal:
            scale(16),
        paddingVertical:
            verticalScale(10),
        borderBottomWidth: 1,
        borderBottomColor:
            Colors.borderDefault,
    },

    topBarLogo: {
        width: scale(100),
        height:
            verticalScale(28),
    },

    topBarActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    topBarIcon: {
        marginLeft:
            scale(16),
    },

    topBarIconText: {
        fontSize:
            moderateScale(20),
    },

    // TITLE
    headingContainer: {
        paddingHorizontal:
            scale(22),
        marginTop:
            verticalScale(20),
    },

    browseText: {
        ...Typography.h2,
        fontWeight: 'bold',
        color:
            Colors.textPrimary,
        textAlign: 'left',
    },

    campaignGreen: {
        color: '#4ced4c'
    },

    // AI BUTTON
    aiButton: {
        marginLeft:
            scale(22),
        marginTop:
            verticalScale(14),
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
        borderRadius:
            moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf:
            'flex-start',
        paddingHorizontal:
            scale(14),
        paddingVertical:
            verticalScale(8),
    },

    aiButtonText: {
        color:
            Colors.teal,
        marginLeft:
            scale(6),
        fontFamily:
            'Poppins-SemiBold',
        fontSize:
            moderateScale(13),
    },

    // FILTER
    filterRow: {
        marginTop:
            verticalScale(15),
        paddingHorizontal:
            scale(22),
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
    },
    filterBox: {
        paddingHorizontal:
            scale(22),
        marginTop:
            verticalScale(10),
    },

    searchBox: {
        height:
            verticalScale(30),
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
        borderRadius:
            moderateScale(14),
        backgroundColor:
            '#2A2A2A',
        justifyContent:
            'center',
        alignItems:
            'center',
        marginBottom:
            verticalScale(14),
        position: 'relative',
    },

    placeholderText: {
        color: '#888',
        marginLeft:
            scale(12),
        fontFamily:
            'Poppins-Regular',
    },

    dropdownItem: {
        height:
            verticalScale(30),
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
        borderRadius:
            moderateScale(14),
        justifyContent:
            'center',
        alignItems:
            'center',
        marginBottom:
            verticalScale(10),
        position: 'relative',
    },

    dropdownLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    dropdownText: {
        color:
            Colors.textPrimary,
        marginLeft:
            scale(12),
        fontFamily:
            'Poppins-Regular',
    },

    searchButton: {
        height:
            verticalScale(30),
        borderRadius:
            moderateScale(14),
        justifyContent:
            'center',
        alignItems:
            'center',
        marginTop:
            verticalScale(8),
        overflow: 'hidden',
    },

    searchButtonText: {
        color: '#000',
        fontFamily:
            'Poppins-SemiBold',
        fontSize:
            moderateScale(16),
    },

    filterText: {
        ...Typography.h2,
        fontWeight: 'bold',
        color:
            Colors.textPrimary,
    },

    filterButton: {
        width: scale(42),
        height: scale(42),
        justifyContent:
            'center',
        alignItems:
            'center',
    },
    dropdownIcon: {
        width: scale(15),
        height: scale(15),
        position: 'absolute',
        left: scale(12),
    },
    downArrow: {
        width: scale(12),
        height: scale(12),
        position: 'absolute',
        right: scale(16),
    },

    // CARD
    card: {
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
        borderRadius:
            moderateScale(18),
        marginHorizontal:
            scale(22),
        marginTop:
            verticalScale(15),
        padding:
            moderateScale(20),
        paddingBottom:
            verticalScale(-20),
        backgroundColor:
            Colors.bgBlack,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems:
            'center',
    },

    companyIcon: {
        width: scale(52),
        height: scale(52),
        borderRadius:
            moderateScale(14),
        backgroundColor:
            '#101010',
        justifyContent:
            'center',
        alignItems:
            'center',
        marginRight:
            scale(14),
    },

    companyName: {
        ...Typography.h1,
        fontWeight: '600',
        color:
            Colors.textPrimary,
    },

    companySubtext: {
        color:
            Colors.textMuted,
        fontSize:
            moderateScale(12),
        fontFamily:
            'Poppins-Regular',
        marginTop:
            verticalScale(2),
    },

    companyDescription: {
        color:
            Colors.textMuted,
        marginTop:
            verticalScale(20),
        fontFamily:
            'Poppins-Regular',
        lineHeight:
            moderateScale(24),
        fontSize:
            moderateScale(15),
    },

    // APPLIED
    appliedRow: {
        flexDirection: 'row',
        alignItems:
            'center',
        marginTop:
            verticalScale(20),
    },

    avatarContainer: {
        flexDirection: 'row',
        alignItems:
            'center',
    },

    avatar: {
        width: scale(30),
        height: scale(30),
        borderRadius:
            scale(15),
        backgroundColor:
            Colors.teal,
        borderWidth: 2,
        borderColor:
            Colors.bgBlack,
    },

    avatarOverlap: {
        marginLeft:
            scale(-10),
    },

    plusAvatar: {
        width: scale(30),
        height: scale(30),
        borderRadius:
            scale(15),
        backgroundColor:
            '#1A1A1A',
        justifyContent:
            'center',
        alignItems:
            'center',
        marginLeft:
            scale(-10),
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
    },

    plusText: {
        color:
            Colors.textPrimary,
        fontSize:
            moderateScale(10),
        fontFamily:
            'Poppins-SemiBold',
    },

    appliedText: {
        marginLeft:
            scale(12),
        color:
            Colors.textMuted,
        fontFamily:
            'Poppins-SemiBold',
        fontSize:
            moderateScale(13),
    },

    divider: {
        borderBottomWidth: 2,
        borderBottomColor:
            '#202020',
        marginVertical:
            verticalScale(20),
    },

    // INFO
    infoImage: {
        width: scale(24),
        height: scale(24),
    },

    aiimage: {
            width: scale(16),
            height: scale(16),
            marginLeft: verticalScale(-5)
        },
    
    infoBlock: {
        flexDirection: 'row',
        marginBottom:
            verticalScale(22),
        alignItems:
            'center',
    },

    infoIcon: {
        width: scale(46),
        height: scale(46),
        borderRadius:
            scale(23),
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
        justifyContent:
            'center',
        alignItems:
            'center',
        marginRight:
            scale(14),
    },


    infoLabel: {
        color:
            Colors.textPrimary,
        fontFamily:
            'Poppins-SemiBold',
        fontSize:
            moderateScale(13),
        fontWeight: 'bold'
    },

    infoValue: {
        color:
            Colors.textMuted,
        fontFamily:
            'Poppins-Regular',
        fontSize:
            moderateScale(16),
        marginTop:
            verticalScale(2),
    },

    budgetText: {
        color: '#4ced4c',
        fontFamily:
            'Poppins-SemiBold',
        fontWeight: 'bold',
        fontSize:
            moderateScale(16),
        marginTop:
            verticalScale(2),
    },

    // REQUIREMENTS
    requirementHeader: {
        flexDirection: 'row',
        alignItems:
            'center',
    },

    requirementTitle: {
        marginLeft:
            scale(10),
        ...Typography.h1,
        fontWeight: 'bold',
        color:
            Colors.textPrimary,
    },

    requirementRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        marginTop:
            verticalScale(20),
    },

    requirementCard: {
        width: '47%',
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
        borderRadius:
            moderateScale(14),
        paddingVertical:
            verticalScale(18),
        alignItems:
            'center',
    },

    reqTop: {
        color:
            Colors.textPrimary,
        fontFamily:
            'Poppins-SemiBold',
        fontSize:
            moderateScale(13),
        fontWeight: '700',
        letterSpacing: 0,
    },

    reqValue: {
        color: '#4ced4c',
        fontSize:
            moderateScale(24),
        fontFamily:
            'Poppins-Bold',
        fontWeight: 'bold',
        marginTop:
            verticalScale(10),
    },

    targetTitle: {
        marginTop:
            verticalScale(28),
        ...Typography.h2,
        color:
            Colors.textPrimary,
        fontWeight: 'bold'
    },

    targetText: {
        marginTop:
            verticalScale(14),
        color:'#b3b1ab',
        lineHeight:
            moderateScale(24),
        fontSize:
            moderateScale(16),
        fontFamily:
            'Poppins-Regular',
    },

    readMore: {
        color:
            Colors.teal,
        fontFamily:
            'Poppins-SemiBold',
    },
    categoryCard: {
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
        borderRadius:
            moderateScale(16),
        marginTop:
            verticalScale(24),
        padding:
            moderateScale(16),
        marginBottom:
            verticalScale(15)
    },

    categoryTitle: {
        ...Typography.h2,
        fontWeight: 'bold',
        color:
            Colors.textPrimary,
        marginBottom:
            verticalScale(18),
    },

    categoryRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        marginBottom:
            verticalScale(14),
    },

    categoryBox: {
        width: '46%',
        borderWidth: 1,
        borderColor:
            Colors.borderCyan,
        borderRadius:
            moderateScale(12),
        paddingVertical:
            verticalScale(10),
        justifyContent:
            'center',
        alignItems:
            'center',
    },

    categoryText: {
        color:
            Colors.textMuted,
        fontFamily:
            'Poppins-Regular',
        fontSize:
            moderateScale(14),
    },
    platformSection: {
        marginTop:
          verticalScale(30),
      },
      
      platformTitle: {
        ...Typography.h2,
        color:
          Colors.textPrimary,
        marginBottom:
          verticalScale(16),
      },
      platformicon:{
        width: verticalScale(20),
        height: verticalScale(20),
        resizeMode: 'center'

      },
      platformCard: {
        backgroundColor:
          '#2E2E2E',
        borderWidth: 1,
        borderColor:
          Colors.borderCyan,
        borderRadius:
          moderateScale(16),
      
        flexDirection: 'row',
        justifyContent:
          'space-between',
        alignItems:
          'center',
      
        paddingHorizontal:
          scale(14),
        paddingVertical:
          verticalScale(5),
      },
      
      deliverableCard: {
        backgroundColor:
          '#11BBC6',
        borderRadius:
          moderateScale(20),
      
        padding:
          moderateScale(22),
      
        marginTop:
          verticalScale(26),
      },
      deliverableIcon: {
        width: scale(16),
        height: scale(16),
        alignSelf: 'center',
    },
      
      deliverableTitle: {
        color: '#000',
        fontFamily:
          'Poppins-SemiBold',
        fontWeight: 'bold',
        fontSize:
          moderateScale(18),
      
        marginBottom:
          verticalScale(22),
      },
      
      deliverableRow: {
        flexDirection: 'row',
        alignItems:
          'flex-start',
      
        marginBottom:
          verticalScale(18),
      },
      
      deliverableText: {
        flex: 1,
      
        color: '#000',
        fontFamily:
          'Poppins-Regular',
      
        fontSize:
          moderateScale(16),
      
        lineHeight:
          moderateScale(20),
      
        marginLeft:
          scale(16),
      },
      
      applyButton: {
        marginTop:
          verticalScale(20),
        height:
          verticalScale(50),
        marginBottom:
          verticalScale(20),
          
      },
  
})
export default styles
