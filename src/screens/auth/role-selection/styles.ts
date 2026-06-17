import { StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Pitch black canvas
  },
  scrollContainer: {
    flexGrow: 1,
  },
  section: {
    height: height / 2, // Perfect symmetrical viewport split
    paddingHorizontal: scale(20),
    justifyContent: 'center',
    position: 'relative',
  },
  brandSection: {
    paddingTop: verticalScale(20),
  },
  creatorSection: {
    paddingBottom: verticalScale(20),
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Dynamic layout reversal for the Creator section to match image_b0ee89.png
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  textContainer: {
    width: '45%',
    zIndex: 2,
  },
  imageContainer: {
    width: '55%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: moderateScale(18),
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: moderateScale(26),
    fontWeight: '900',
    marginTop: verticalScale(2),
    marginBottom: verticalScale(6),
    letterSpacing: 1,
  },
  brandHighlight: {
    color: '#00B9C0', // Brand Neon Teal
  },
  creatorHighlight: {
    color: '#B6D82C', // Creator Neon Lime
  },
  description: {
    fontSize: moderateScale(11),
    color: '#8E8E93',
    lineHeight: moderateScale(15),
    marginBottom: verticalScale(16),
  },
  buttonContainer: {
    width: '100%',
    gap: verticalScale(8),
  },
  gradientButton: {
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: moderateScale(12),
    letterSpacing: 0.5,
  },
  loginButton: {
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    backgroundColor: '#1C1C1E',
  },
  loginText: {
    color: '#AEAEB2',
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  // Center Line Divider with the middle circle node
  dividerContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -20 }],
    zIndex: 10,
    pointerEvents: 'none',
  },
  dividerLineLeft: {
    flex: 1,
    height: 2,
    backgroundColor: '#00B9C0',
  },
  dividerLineRight: {
    flex: 1,
    height: 2,
    backgroundColor: '#B6D82C',
  },
  dividerCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    borderWidth: 2,
    borderColor: '#545456',
    backgroundColor: '#000000',
    marginHorizontal: scale(4),
  },
});