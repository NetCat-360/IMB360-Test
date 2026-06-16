import {
    StyleSheet,
  } from 'react-native';
  
  import {
    scale,
    verticalScale,
    moderateScale,
  } from '../../utils/scaling';
  
  import {
    Colors,
  } from '../../config/theme';
  
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
          verticalScale(40),
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
          '#FFFFFF',
        fontSize:
          moderateScale(16),
        fontWeight:
          '500',
      },
  
      activeTabText: {
        color:
          '#000',
        fontWeight:
          '600',
      },
  
      /* ---------------- EXPIRY ---------------- */
  
      expiryText: {
        color:
          '#FFD600',
        fontSize:
          moderateScale(13),
        fontWeight:
          '600',
        textAlign:
          'right',
        marginTop:
          verticalScale(16),
        marginBottom:
          verticalScale(16),
      },
  
      /* ---------------- BALANCE CARD ---------------- */
  
      balanceCard: {
        borderWidth: 1,
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(16),
        padding:
          scale(22),
        backgroundColor:
          '#000',
        flexDirection:
          'row',
        justifyContent:
          'space-between',
        marginBottom:
          verticalScale(18),
      },
  
      balanceLabel: {
        color:
          '#FFF',
        fontSize:
          moderateScale(16),
        fontWeight:
          '500',
        marginBottom:
          verticalScale(12),
      },
  
      balanceRow: {
        flexDirection:
          'row',
        alignItems:
          'flex-end',
      },
  
      balanceAmount: {
        color:
          '#00FF00',
        fontSize:
          moderateScale(28),
        fontWeight:
          '700',
      },
  
      pointsText: {
        color:
          '#A4A4A4',
        fontSize:
          moderateScale(15),
        marginLeft:
          scale(6),
        marginBottom:
          verticalScale(0),
      },
  
      accountWrapper: {
        alignItems:
          'flex-end',
      },
  
      accountTypeLabel: {
        color:
          '#FFF',
        fontSize:
          moderateScale(16),
        fontWeight:
          '500',
        marginBottom:
          verticalScale(14),
      },
  
      accountTypeBadge: {
        borderWidth: 1,
        marginLeft: verticalScale(10),
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(20),
        paddingHorizontal:
          scale(16),
        paddingVertical:
          verticalScale(6),
        minWidth:
          scale(120),
        alignItems:
          'center',
      },
  
      accountTypeText: {
        color:
          '#00BCD4',
        fontWeight:
          '600',
        fontSize:
          moderateScale(14),
      },
  
      /* ---------------- PURCHASE CARD ---------------- */
  
      purchaseCard: {
        borderWidth: 1,
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(16),
        backgroundColor:
          '#000',
        paddingHorizontal:
          scale(22),
        paddingVertical:
          verticalScale(28),
        marginBottom:
          verticalScale(20),
      },
  
      starCircle: {
        width:
          scale(72),
        height:
          scale(72),
        borderRadius:
          scale(36),
        borderWidth: 1,
        borderColor:
          Colors.teal,
        backgroundColor:
          '#062A2D',
        justifyContent:
          'center',
        alignItems:
          'center',
        alignSelf:
          'center',
        marginBottom:
          verticalScale(22),
      },
  
      starText: {
        color:
          '#00BCD4',
        fontSize:
          moderateScale(38),
        fontWeight:
          '300',
      },
  
      greenTitle: {
        color:
          '#00FF00',
        fontSize:
          moderateScale(26),
        fontWeight:
          '700',
        textAlign:
          'center',
        marginBottom:
          verticalScale(18),
      },
  
      descriptionWrapper: {
        alignItems:
          'center',
      },
  
      description: {
        color:
          '#A1A1A1',
        fontSize:
          moderateScale(16),
        textAlign:
          'center',
        lineHeight:
          moderateScale(22),
      },
  
      /* ---------------- INPUT ---------------- */
  
      purchaseInputContainer: {
        height:
          verticalScale(38),
        borderWidth: 1,
        borderColor:
          '#5A5A5A',
        borderRadius:
          moderateScale(14),
        backgroundColor:
          '#222',
        justifyContent:
          'center',
        paddingHorizontal:
          scale(20),
        marginTop:
          verticalScale(20),
      },
  
      purchaseInput: {
        color:
          '#FFF',
        fontSize:
          moderateScale(15),
        textAlign:
          'center',
      },
  
      input: {
        color:
          '#fff',
        fontSize:
          moderateScale(15),
      },
  
      /* ---------------- BUTTONS ---------------- */
  
      razorpayButton: {
        backgroundColor:
          '#14B8C4',
        height:
          verticalScale(36),
        width:
          '70%',
        alignSelf:
          'center',
        justifyContent:
          'center',
        alignItems:
          'center',
        borderRadius:
          moderateScale(12),
        marginTop:
          verticalScale(26),
      },
  
      razorpayText: {
        color:
          '#000',
        fontWeight:
          '500',
        fontSize:
          moderateScale(17),
      },
  
      withdrawButton: {
        backgroundColor:
          '#14B8C4',
        height:
          verticalScale(54),
        borderRadius:
          moderateScale(14),
        justifyContent:
          'center',
        alignItems:
          'center',
        marginTop:
          verticalScale(20),
      },
  
      withdrawText: {
        color:
          '#000',
        fontWeight:
          '700',
        fontSize:
          moderateScale(16),
      },
  
      /* ---------------- RATE CARD ---------------- */
  
      rateCard: {
        borderWidth: 1,
        borderColor:
          '#00BCD4',
        borderRadius:
          moderateScale(14),
        backgroundColor:
          '#021E22',
        paddingVertical:
          verticalScale(18),
        paddingHorizontal: verticalScale(3),
        marginTop:
          verticalScale(34),
        alignItems:
          'center',
      },
  
      rateText: {
        color:
          '#FFF',
        fontWeight:
          '600',
        fontSize:
          moderateScale(18),
        marginBottom:
          verticalScale(8),
      },
  
      rateSubtext: {
        color:
          '#FFF',
        fontSize:
          moderateScale(14),
        textAlign:
          'center',
        lineHeight:
          moderateScale(24),
      },
  
      /* ---------------- PAYMENT RELEASE ---------------- */
  
      bigCard: {
        backgroundColor:
          '#0B0B0B',
        borderRadius:
          moderateScale(24),
        borderWidth: 1,
        borderColor:
          '#1D1D1D',
        padding:
          scale(22),
      },
  
      withdrawAmount: {
        color:
          '#00FF00',
        fontWeight:
          '700',
        fontSize:
          moderateScale(32),
        marginTop:
          verticalScale(8),
      },
  
      methodCard: {
        flexDirection:
          'row',
        justifyContent:
          'space-between',
        alignItems:
          'center',
        backgroundColor:
          '#111',
        borderRadius:
          moderateScale(18),
        padding:
          scale(16),
        marginTop:
          verticalScale(14),
      },
  
      methodLeft: {
        flexDirection:
          'row',
        alignItems:
          'center',
      },
  
      methodIcon: {
        width:
          scale(44),
        height:
          scale(44),
        resizeMode:
          'contain',
        marginRight:
          scale(12),
      },
  
      methodTitle: {
        color:
          '#fff',
        fontWeight:
          '600',
        fontSize:
          moderateScale(15),
      },
  
      methodSubText: {
        color:
          '#8B8B8B',
        marginTop:
          verticalScale(4),
        fontSize:
          moderateScale(12),
      },
  
      plusText: {
        color:
          Colors.teal,
        fontSize:
          moderateScale(28),
        fontWeight:
          '700',
      },
      starIcon: {
        width:
          scale(38),
        height:
          scale(38),
      },
      /* ---------------- RELEASE TAB ---------------- */

releaseTopCard: {
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: moderateScale(16),
    padding: scale(16),
    backgroundColor: '#000',
    marginBottom: verticalScale(4),
    marginTop: verticalScale(18)
  },
  
  releaseCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  releaseIconCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    borderWidth: 1,
    borderColor: '#00BCD4',
    backgroundColor: '#062A2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  releaseIcon: {
    width: scale(28),
    height: scale(28),
  },
  
  releaseTitle: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  
  releaseAmount: {
    color: '#00FF00',
    fontSize: moderateScale(28),
    fontWeight: '700',
    marginTop: verticalScale(8),
  },
  
  releaseSubtext: {
    color: '#8B8B8B',
    fontSize: moderateScale(13),
    marginTop: verticalScale(4),
  },
  
  /* ---------------- WITHDRAW CARD ---------------- */
  
  withdrawCard: {
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: moderateScale(16),
    backgroundColor: '#000',
    padding: scale(18),
    marginTop: verticalScale(18),
  },
  
  withdrawHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  
  moneyCircle: {
    width: scale(58),
    height: scale(58),
    borderRadius: scale(29),
    borderWidth: 1,
    borderColor: '#00FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  moneyIcon: {
    color: '#00FF00',
    fontSize: moderateScale(34),
    fontWeight: '400',
  },
  
  withdrawTitle: {
    color: '#FFF',
    fontSize: moderateScale(18),
    fontWeight: '500',
    marginLeft: scale(14),
  },
  
  withdrawAmountLabel: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginBottom: verticalScale(10),
  },
  
  withdrawInputContainer: {
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: moderateScale(12),
    backgroundColor: '#222',
    height: verticalScale(44),
    justifyContent: 'center',
    paddingHorizontal: scale(18),
  },
  
  withdrawInput: {
    color: '#FFF',
    fontSize: moderateScale(16),
  },
  
  minimumText: {
    color: '#A4A4A4',
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
  },
  
  /* ---------------- BANK / UPI ---------------- */
  
  detailCard: {

    borderWidth: 1,
  
    borderColor: '#00BCD4',
  
    borderRadius: moderateScale(14),
  
    padding: scale(18),
  
    marginTop: verticalScale(10), 
  
  },
  
  detailTitle: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '500',
  },
  
  bankIcon: {
    width: scale(44),
    height: scale(44),
    alignSelf: 'center',
    marginTop: verticalScale(18),
    resizeMode: 'contain',
  },
  
  noDetailsText: {
    color: '#8B8B8B',
    textAlign: 'center',
    marginTop: verticalScale(14),
    fontSize: moderateScale(14),
  },
  
  addButton: {
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: moderateScale(12),
    height: verticalScale(38),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: scale(26),
    marginTop: verticalScale(16),
  },
  
  addButtonText: {
    color: '#00BCD4',
    fontSize: moderateScale(15),
    fontWeight: '500',
  },
  
  /* ---------------- OR ---------------- */
  
  orContainer: {

    flexDirection: 'row',
  
    alignItems: 'center',
  
    marginTop: verticalScale(10),
  
    marginBottom: verticalScale(6), 
  
  },
  
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#004E57',
  },
  
  orBox: {
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: moderateScale(12),
    backgroundColor: '#062A2D',
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(10),
    marginHorizontal: scale(14),
  },
  
  orText: {
    color: '#00BCD4',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  
  /* ---------------- NOTICE ---------------- */
  
  noticeCard: {
    borderWidth: 1,
    borderColor: '#FFE600',
    borderRadius: moderateScale(14),
    backgroundColor: '#332D00',
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(18),
    marginTop: verticalScale(22),
  },
  
  noticeTitle: {
    color: '#FFE600',
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  
  noticeSubtext: {
    color: '#FFF',
    fontSize: moderateScale(14),
    marginTop: verticalScale(4),
  },
  
  /* ---------------- NEXT ---------------- */
  
  nextButton: {
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: moderateScale(12),
    alignSelf: 'flex-end',
    paddingHorizontal: scale(30),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(15),
  },
  
  nextText: {
    color: '#FFF',
    fontSize: moderateScale(17),
    fontWeight: '500',
  },
  
  /* ---------------- REQUEST BUTTON ---------------- */
  
  requestButton: {
    backgroundColor: '#14B8C4',
    height: verticalScale(42),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  
  requestText: {
    color: '#000',
    fontSize: moderateScale(18),
    fontWeight: '500',
  },



  modalOverlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.7)',
    justifyContent:
      'center',
    paddingHorizontal:
      scale(16),
  },
  
  modalContainer: {
    backgroundColor:
      '#000',
    borderWidth: 1,
    borderColor:
      '#00BCD4',
    borderRadius:
      moderateScale(18),
    padding:
      scale(22),
  },
  
  modalTitle: {
    color: '#FFF',
    fontSize:
      moderateScale(20),
    fontWeight: '700',
    marginBottom:
      verticalScale(10),
  },
  
  inputLabel: {
    color: '#FFF',
    fontSize:
      moderateScale(16),
    fontWeight: '500',
    marginBottom:
      verticalScale(10),
    marginTop:
      verticalScale(14),
  },
  
  required: {
    color: '#FF3B30',
  },
  
  modalInput: {
    borderWidth: 1,
    borderColor:
      '#00BCD4',
    borderRadius:
      moderateScale(14),
    backgroundColor:
      '#2B2B2B',
    height:
      verticalScale(36),
    paddingHorizontal:
      scale(18),
    color: '#FFF',
    fontSize:
      moderateScale(16),
  },
  
  modalButtonRow: {
    flexDirection:
      'row',
    justifyContent:
      'space-between',
    marginTop:
      verticalScale(34),
  },
  
  cancelButton: {
    borderWidth: 1,
    borderColor:
      '#FF3B30',
    borderRadius:
      moderateScale(12),
    height:
      verticalScale(44),
    width: '45%',
    justifyContent:
      'center',
    alignItems:
      'center',
  },
  
  cancelText: {
    color: '#FFF',
    fontSize:
      moderateScale(16),
  },
  
  addDetailsButton: {
    backgroundColor:
      '#14B8C4',
    borderRadius:
      moderateScale(12),
    height:
      verticalScale(44),
    width: '45%',
    justifyContent:
      'center',
    alignItems:
      'center',
  },
  
  addDetailsText: {
    color: '#000',
    fontSize:
      moderateScale(16),
    fontWeight: '500',
  },
  
  dropdownButton: {
    borderWidth: 1,
    borderColor:
      '#00BCD4',
    borderRadius:
      moderateScale(14),
    backgroundColor:
      '#2B2B2B',
    height:
      verticalScale(36),
    paddingHorizontal:
      scale(18),
    flexDirection:
      'row',
    justifyContent:
      'space-between',
    alignItems:
      'center',
  },
  
  dropdownText: {
    color: '#FFF',
    fontSize:
      moderateScale(16),
  },
  
  dropdownArrow: {
    color: '#AAA',
    fontSize:
      moderateScale(28),
  },
  
  dropdownMenu: {
    backgroundColor:
      '#2B2B2B',
    borderRadius:
      moderateScale(14),
    marginTop:
      verticalScale(4),
    overflow:
      'hidden',
  },
  
  dropdownItem: {
    flexDirection:
      'row',
    justifyContent:
      'space-between',
    paddingHorizontal:
      scale(15),
    paddingVertical: scale(5)
  },
  
  dropdownItemText: {
    color: '#FFF',
    fontSize:
      moderateScale(16),
  },
  
  checkMark: {
    color: '#FFF',
    fontSize:
      moderateScale(18),
  },
    });
  
  export default styles;