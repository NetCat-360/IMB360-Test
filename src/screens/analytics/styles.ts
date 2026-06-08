import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  headerBarContainer: {
    height: verticalScale(50),
    backgroundColor: Colors.bgBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: '#00ACB34D',
  },
  appLogoImage: {
    width: scale(100),
    height: verticalScale(28),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
});
