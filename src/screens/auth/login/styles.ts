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
    justifyContent: 'center', // Centers everything on the screen without scrolling
    paddingBottom: verticalScale(10)
  },
  backButton: { 
    alignSelf: 'flex-start', 
    position: 'absolute',
    top: verticalScale(10),
    left: scale(24),
    padding: scale(4),
    zIndex: 10
  },
  backButtonText: { 
    color: '#ffffff', 
    fontSize: moderateScale(24) 
  },
  logo: { 
    width: scale(180), 
    height: verticalScale(65), 
    marginTop: verticalScale(25) 
  },
  screenHeaderTitle: { 
    color: '#b6d82c', 
    fontSize: moderateScale(19), 
    fontWeight: 'bold', 
    marginTop: verticalScale(12),
    marginBottom: verticalScale(24), 
    letterSpacing: 0.5 
  },
  optionsRow: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: verticalScale(20) 
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  customCheckbox: { 
    width: scale(16), 
    height: scale(16), 
    borderWidth: 1.5, 
    borderColor: '#444444', 
    borderRadius: moderateScale(4), 
    marginRight: scale(8),
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
    fontSize: moderateScale(13) 
  },
  forgotPassText: { 
    color: '#ffffff', 
    fontSize: moderateScale(13), 
    textDecorationLine: 'underline' 
  },
  submitButton: { 
    width: '100%', 
    height: verticalScale(48), 
    borderRadius: moderateScale(24), 
    overflow: 'hidden',
    marginTop: verticalScale(5)
  },
  gradientButtonLayout: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  submitButtonText: { 
    color: '#000000', 
    fontSize: moderateScale(16), 
    fontWeight: 'bold' 
  },
  dividerText: { 
    color: '#444444', 
    fontSize: moderateScale(12), 
    marginVertical: verticalScale(16) 
  },
  socialRow: { 
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between' 
  },
  socialButton: { 
    flexDirection: 'row', 
    width: '47%', 
    height: verticalScale(44), 
    backgroundColor: '#1C1C1E', 
    borderWidth: 1, 
    borderColor: '#2C2C2E', 
    borderRadius: moderateScale(22), 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  socialIcon: { 
    width: scale(20), 
    height: scale(20), 
    marginRight: scale(8) 
  },
  socialText: { 
    color: '#ffffff', 
    fontSize: moderateScale(14), 
    fontWeight: '600' 
  },
  redirectLinkWrapper: { 
    marginTop: verticalScale(20) 
  },
  footerRedirectText: { 
    color: '#666666', 
    fontSize: moderateScale(13) 
  },
  linkTextInline: { 
    color: '#b6d82c', 
    fontWeight: 'bold', 
    textDecorationLine: 'underline' 
  }
});