import { StyleSheet, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(24),
  },
  card: {
    flexDirection: 'row',
    height: verticalScale(140),
    borderWidth: 1,
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(20),
    padding: scale(16),
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '35%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    width: '65%',
    paddingLeft: scale(12),
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(6),
    letterSpacing: 0.5,
  },
  brandHighlight: {
    color: '#00b9c0',
  },
  creatorHighlight: {
    color: '#b6d82c',
  },
  cardDescription: {
    color: '#888888',
    fontSize: moderateScale(12),
    lineHeight: verticalScale(16),
  },
  footer: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(30),
  },
  buttonTouchArea: {
    width: '100%',
    height: verticalScale(50),
  },
  buttonGradient: {
    flex: 1,
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  buttonText: {
    color: '#000000',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    color: '#000000',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    position: 'absolute',
    right: scale(24),
    top: Platform.OS === 'ios' ? verticalScale(10) : verticalScale(8),
  },
  buttonDisabled: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  buttonTextDisabled: {
    color: '#444444',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default styles;
