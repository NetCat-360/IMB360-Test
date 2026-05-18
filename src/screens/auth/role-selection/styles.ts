import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../utils/scaling';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    height: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: scale(24),
    justifyContent: 'center', // Centers the block on the screen
    paddingVertical: verticalScale(10),
  },
  card: {
    height: (height * 0.30),
    borderRadius: moderateScale(20),
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    overflow: 'hidden',
    marginBottom: verticalScale(24), // Explicit gap padding between cards
    
    // Default Base Shadow Configurations
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  imageWrapper: {
    width: '40%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    width: '60%',
    paddingLeft: scale(12),
    paddingRight: scale(4),
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  brandHighlight: {
    color: '#00b9c0',
  },
  creatorHighlight: {
    color: '#b6d82c',
  },
  cardDescription: {
    color: '#8E8E93',
    fontSize: moderateScale(13),
    lineHeight: verticalScale(18),
    marginTop: verticalScale(8),
  },
  footer: {
    paddingHorizontal: scale(30),
    paddingBottom: verticalScale(50),
    alignItems: 'center',
  },
  buttonGradient: {
    height: verticalScale(54),
    width: scale(190),
    borderRadius: moderateScale(27),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonDisabled: {
    height: verticalScale(54),
    width: scale(190),
    borderRadius: moderateScale(27),
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  buttonTextDisabled: {
    color: '#666666',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  buttonIcon: {
    color: '#000000',
    fontSize: moderateScale(20),
    marginLeft: scale(8),
  },
});

export default styles;