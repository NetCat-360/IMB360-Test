import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../utils/scaling';
import { Colors } from '../../config/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgBlack,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
});
