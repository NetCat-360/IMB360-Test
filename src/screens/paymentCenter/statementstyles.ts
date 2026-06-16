import {
    StyleSheet,
  } from 'react-native';
  
  import {
    scale,
    verticalScale,
    moderateScale,
  } from '../../utils/scaling';
  
  const styles =
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor:
          '#000',
      },
  
      scrollContent: {
        paddingHorizontal:
          scale(18),
        paddingBottom:
          verticalScale(60),
      },
  
      /* ---------------- TABS ---------------- */
  
      tabContainer: {
        flexDirection:
          'row',
        borderWidth: 1,
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(14),
        overflow:
          'hidden',
        marginTop:
          verticalScale(16),
        height:
          verticalScale(35),
      },
  
      tabButton: {
        flex: 1,
        justifyContent:
          'center',
        alignItems:
          'center',
        backgroundColor:
          '#000',
      },
  
      activeTab: {
        backgroundColor:
          '#14B8C4',
      },
  
      tabText: {
        color:
          '#FFF',
        fontSize:
          moderateScale(16),
        fontWeight:
          '500',
      },
  
      activeTabText: {
        color:
          '#000',
        fontSize:
          moderateScale(16),
        fontWeight:
          '600',
      },
  
      /* ---------------- CARD ---------------- */
  
      statementCard: {
        borderWidth: 1,
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(16),
        padding:
          scale(18),
        backgroundColor:
          '#000',
        marginTop:
          verticalScale(22),
      },
  
      statementHeader: {
        flexDirection:
          'row',
        alignItems:
          'center',
        marginBottom:
          verticalScale(20),
      },
  
      statementIconCircle: {
        width:
          scale(58),
        height:
          scale(58),
        borderRadius:
          scale(29),
        borderWidth: 1,
        borderColor:
          '#00FF00',
        justifyContent:
          'center',
        alignItems:
          'center',
        backgroundColor:
          '#05220A',
      },
  
      statementIcon: {
        width:
          scale(28),
        height:
          scale(28),
        resizeMode:
          'contain',
      },
  
      statementTitle: {
        color:
          '#FFF',
        fontSize:
          moderateScale(20),
        fontWeight:
          '600',
        marginLeft:
          scale(16),
      },
  
      /* ---------------- DATES ---------------- */
  
      dateRow: {
        flexDirection:
          'row',
        marginBottom:
          verticalScale(8),
      },
  
      inputLabel: {
        color:
          '#FFF',
        fontSize:
          moderateScale(16),
        fontWeight:
          '600',
        marginBottom:
          verticalScale(10),
      },
  
      dateInput: {
        borderWidth: 1,
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(12),
        backgroundColor:
          '#2B2B2B',
        height:
          verticalScale(44),
        flexDirection:
          'row',
        justifyContent:
          'space-between',
        alignItems:
          'center',
        paddingHorizontal:
          scale(14),
      },
  
      dateText: {
        color:
          '#FFF',
        fontSize:
          moderateScale(14),
      },
  
      helperText: {
        color:
          '#7F7F7F',
        fontSize:
          moderateScale(14),
        marginTop:
          verticalScale(6),
      },
  
      /* ---------------- DROPDOWN ---------------- */
  
      dropdownButton: {
        borderWidth: 1,
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(12),
        backgroundColor:
          '#2B2B2B',
        height:
          verticalScale(44),
        paddingHorizontal:
          scale(16),
        flexDirection:
          'row',
        justifyContent:
          'space-between',
        alignItems:
          'center',
        marginBottom:
          verticalScale(8),
      },
  
      dropdownText: {
        color:
          '#FFF',
        fontSize:
          moderateScale(16),
      },
  
      dropdownMenu: {
        backgroundColor:
          '#2B2B2B',
        borderRadius:
          moderateScale(12),
        overflow:
          'hidden',
        marginBottom:
          verticalScale(22),
      },
  
      dropdownItem: {
        height:
          verticalScale(42),
        paddingHorizontal:
          scale(16),
        flexDirection:
          'row',
        justifyContent:
          'space-between',
        alignItems:
          'center',
        borderBottomWidth:
          0.5,
        borderBottomColor:
          '#3B3B3B',
      },
  
      dropdownItemText: {
        color:
          '#FFF',
        fontSize:
          moderateScale(15),
      },
  
      /* ---------------- BUTTON ---------------- */
  
      generateButton: {
        backgroundColor:
          '#14B8C4',
        borderRadius:
          moderateScale(12),
        height:
          verticalScale(40),
        justifyContent:
          'center',
        alignItems:
          'center',
        marginTop:
          verticalScale(14),
      },
  
      generateText: {
        color:
          '#000',
        fontSize:
          moderateScale(18),
        fontWeight:
          '500',
      },
  
      /* ---------------- FOOTER ---------------- */
  
      footerCard: {
        borderWidth: 1,
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(12),
        backgroundColor:
          '#052329',
        paddingVertical:
          verticalScale(14),
        paddingHorizontal:
          scale(16),
        marginTop:
          verticalScale(18),
        flexDirection:
          'row',
        justifyContent:
          'space-between',
        alignItems:
          'center',
      },
  
      footerText: {
        color:
          '#FFF',
        fontSize:
          moderateScale(14),
        flex: 1,
        marginRight:
          scale(10),
      },
      /* ---------------- HISTORY ---------------- */

      historyCard: {
        borderWidth: 1,
        borderColor: '#00BCD4',
        borderRadius: moderateScale(16),
        backgroundColor: '#000',
        marginTop: verticalScale(22),
        minHeight: verticalScale(100),
        paddingTop: verticalScale(0),
      },
  
  historyTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D2D',
    marginHorizontal: scale(0),
    marginTop: verticalScale(0),
  },
  
  historyActiveTab: {
    backgroundColor: '#14B8C4',
    height: verticalScale(42),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    marginRight: scale(0),
    minWidth: scale(100),
  },
  
  historyInactiveTab: {
    height: verticalScale(42),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    marginRight: scale(0),
    minWidth: scale(100),
  },
  
  historyActiveText: {
    color: '#000',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  
  historyInactiveText: {
    color: '#FFF',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  
  emptyHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(160),
    paddingBottom: verticalScale(180),
  },
  
  emptyIconCircle: {
    width: scale(58),
    height: scale(58),
    borderRadius: scale(29),
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  
  emptyDollar: {
    color: '#BDBDBD',
    fontSize: moderateScale(34),
    fontWeight: '300',
  },
  
  emptyText: {
    color: '#E5E5E5',
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  historyTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(0),
  },
    });
  
  export default styles;