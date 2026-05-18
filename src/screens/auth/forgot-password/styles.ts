import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000000' 
  },
  innerLayout: { 
    flex: 1, 
    paddingHorizontal: scale(24), 
    alignItems: 'center',
    justifyContent: 'center' // Keeps the recovery layout beautifully centered
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
    marginBottom: verticalScale(10), 
    letterSpacing: 0.5 
  },
  explanationText: { 
    color: '#666666', 
    fontSize: moderateScale(13), 
    textAlign: 'center', 
    marginBottom: verticalScale(24), 
    paddingHorizontal: scale(10), 
    lineHeight: verticalScale(18) 
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
  }
});