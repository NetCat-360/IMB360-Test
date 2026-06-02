import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, scale } from '../../utils/scaling';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  blobGreen: {
    position: 'absolute',
    width: scale(280), // Increased for better coverage
    height: scale(280),
    borderRadius: scale(140),
    backgroundColor: '#b6d82c', // From handoff: #b6d82c
    opacity: 0.4, // Softened for better logo legibility
    top: height * 0.15,
    left: width * -0.05,
  },
  blobBlue: {
    position: 'absolute',
    width: scale(300),
    height: scale(300),
    borderRadius: scale(150),
    backgroundColor: '#00b9c0', // From handoff: #00b9c0
    opacity: 0.35,
    bottom: height * 0.12,
    right: width * -0.1,
  },
  glowBlob: {
    position: 'absolute',
    width: scale(400),
    height: scale(400),
    borderRadius: scale(200),
    backgroundColor: '#b6d82c',
    opacity: 0.05,
    zIndex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    // Add a subtle shadow to separate logo from blobs
    boxShadow: '0 0 0 transparent',
  },
  logo: {
    width: moderateScale(240),
    height: moderateScale(240),
  },
});

export default styles;