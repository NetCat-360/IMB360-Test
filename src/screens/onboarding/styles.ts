import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    height: verticalScale(50),
  },
  backButton: {
    padding: scale(5),
  },
  backText: {
    color: '#FFFFFF',
    fontSize: moderateScale(26),
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    textDecorationLine: 'underline',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: scale(30),
    paddingTop: verticalScale(20),
  },
  imageContainer: {
    width: moderateScale(300),
    height: moderateScale(300),
    marginBottom: verticalScale(30),
  },
  image: {
    width: '100%',
    height: '100%',
    transform: [
        {
            scale: 1.3,
        },
    ],
},
  textContainer: {
    paddingTop: verticalScale(10),
    width: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  subtitleRow: {
    flexDirection: 'row',
    marginTop: verticalScale(2),
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(26),
    fontWeight: 'bold',
  },
  highlight: {
    color: '#00b9c0',
    fontSize: moderateScale(26),
    fontWeight: 'bold',
  },
  description: {
    color: '#9E9E9E',
    fontSize: moderateScale(15),
    lineHeight: verticalScale(22),
    marginTop: verticalScale(12),
  },
  footer: {
    paddingHorizontal: scale(30),
    paddingBottom: verticalScale(60), // Pushes the button higher up
    alignItems: 'center', // Centers the shortened button
    marginTop: verticalScale(30)
  },
  buttonGradient: {
    height: verticalScale(40),
    width: scale(190), // Shortened button length
    borderRadius: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 4px rgba(0,185,192,0.3)',
  },
  buttonText: {
    color: '#000000',
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  buttonIcon: {
    color: '#000000',
    fontSize: moderateScale(20),
    marginLeft: scale(8),
  },
});

export default styles;