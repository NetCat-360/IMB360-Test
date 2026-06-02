import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    height: verticalScale(50),
    paddingHorizontal: scale(24),
    justifyContent: 'center',
    marginTop: verticalScale(10),
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: scale(4),
  },
  backText: {
    color: '#FFFFFF',
    fontSize: moderateScale(26),
  },
  imageContainer: {
    height: height * 0.42,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: scale(36),
    marginTop: verticalScale(15),
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  brandHighlight: {
    color: '#00b9c0',
  },
  creatorHighlight: {
    color: '#b6d82c',
  },
  descriptionText: {
    color: '#8E8E93',
    fontSize: moderateScale(15),
    textAlign: 'center',
    lineHeight: verticalScale(22),
    marginTop: verticalScale(16),
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: verticalScale(50),
  },
  primaryButton: {
    height: verticalScale(54),
    width: scale(290), // Elevated width footprint matching reference buttons
    borderRadius: moderateScale(15), // Smooth geometric curves
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: moderateScale(14),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primaryButtonIcon: {
    color: '#000000',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginLeft: scale(6),
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  loginNormalText: {
    color: '#8E8E93',
    fontSize: moderateScale(14),
  },
  loginLinkText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});

export default styles;