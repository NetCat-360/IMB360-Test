import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000' 
  },
  fixedContentContainer: { 
    flex: 1,
    paddingHorizontal: scale(24), 
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingTop: verticalScale(8),      
    paddingBottom: verticalScale(24) 
  },
  backButton: { 
    alignSelf: 'flex-start', 
    padding: scale(4),
    marginBottom: verticalScale(2)
  },
  backButtonText: { 
    color: '#ffffff', 
    fontSize: moderateScale(24) 
  },
  formFlowWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  logo: { 
    width: scale(150), 
    height: verticalScale(45),
    marginTop: verticalScale(-5)       
  },
  screenHeaderTitle: { 
    color: '#b6d82c', 
    fontSize: moderateScale(18), 
    fontWeight: 'bold', 
    marginTop: verticalScale(4),
    marginBottom: verticalScale(12), 
    letterSpacing: 0.5 
  },
  passRequirementText: { 
    color: '#666666', 
    fontSize: moderateScale(10), 
    alignSelf: 'flex-start', 
    fontStyle: 'italic', 
    marginTop: verticalScale(-8),
    marginBottom: verticalScale(10), 
    lineHeight: verticalScale(13) 
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignSelf: 'flex-start', 
    alignItems: 'center', 
    marginBottom: verticalScale(10) 
  },
  customCheckbox: { 
    width: scale(18), 
    height: scale(18), 
    borderWidth: 1.5, 
    borderColor: '#444444', 
    borderRadius: moderateScale(4), 
    marginRight: scale(10), 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  customCheckboxChecked: { 
    backgroundColor: '#b6d82c', 
    borderColor: '#b6d82c' 
  },
  checkmarkIcon: { 
    color: '#000000', 
    fontWeight: 'bold', 
    fontSize: moderateScale(11), 
    textAlign: 'center' 
  },
  checkboxLabel: { 
    color: '#888888', 
    fontSize: moderateScale(12) 
  },
  underlineText: { 
    textDecorationLine: 'underline', 
    color: '#ffffff' 
  },
  submitButton: { 
    width: '100%', 
    height: verticalScale(46), 
    borderRadius: moderateScale(23), 
    overflow: 'hidden'
  },
  gradientButtonLayout: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  submitButtonText: { 
    color: '#000000', 
    fontSize: moderateScale(15), 
    fontWeight: 'bold' 
  },
  dividerText: { 
    color: '#444444', 
    fontSize: moderateScale(12), 
    marginVertical: verticalScale(8) 
  },
  socialRow: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between' 
  },
  socialButton: { 
    flexDirection: 'row', 
    width: '47%', 
    height: verticalScale(42), 
    backgroundColor: '#1C1C1E', 
    borderWidth: 1, 
    borderColor: '#2C2C2E', 
    borderRadius: moderateScale(21), 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  socialIcon: { 
    width: scale(18), 
    height: scale(18), 
    marginRight: scale(8) 
  },
  socialText: { 
    color: '#ffffff', 
    fontSize: moderateScale(13), 
    fontWeight: '600' 
  },
  redirectLinkWrapper: { 
    marginTop: verticalScale(14),
    paddingVertical: verticalScale(4),
    alignItems: 'center'
  },
  footerRedirectText: { 
    color: '#666666', 
    fontSize: moderateScale(13) 
  },
  linkTextInline: { 
    color: '#b6d82c', 
    fontWeight: 'bold', 
    textDecorationLine: 'underline' 
  },
  codePickerWrapper: {
    height: '100%',
    paddingLeft: scale(14),
    paddingRight: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderRightColor: '#222222',
    marginRight: scale(4)
  },
  inlineActionWrapper: {
    paddingRight: scale(14),
    height: '100%',
    justifyContent: 'center'
  },
  inlineActionText: {
    color: '#00b9c0',
    fontSize: moderateScale(12),
    fontWeight: '600',
    textDecorationLine: 'underline'
  },
  toastContainer: {
    position: 'absolute',
    bottom: verticalScale(80), 
    backgroundColor: '#ff3b30', 
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(8),
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999
  },
  toastText: {
    color: '#ffffff',
    fontSize: moderateScale(13),
    fontWeight: '600',
    textAlign: 'center'
  }
});