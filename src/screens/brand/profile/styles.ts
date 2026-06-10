import { StyleSheet } from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
} from '../../../utils/scaling';
import { Colors }
from '../../../config/theme';

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#000',
    },

    scrollContent: {
      paddingBottom:
        verticalScale(
          30
        ),
    },

    banner: {
      height:
        verticalScale(
          75
        ),
      backgroundColor:
        '#EAEAEA',
      marginHorizontal:
        scale(15),
      marginTop:
        verticalScale(
          12
        ),
      borderRadius:
        moderateScale(
          18
        ),
    },

    profileSection: {
      marginTop:
        verticalScale(
          0
        ),
    },

    profileRow: {
      flexDirection:
        'row',
      alignItems:
        'center',
      marginTop:
        verticalScale(
          10
        ),
      paddingHorizontal:
        scale(24),
    },

    avatar: {
      width:
        scale(70),
      height:
        scale(70),
      borderRadius:
        scale(40),
      backgroundColor:
        '#4DFF88',
      marginRight:
        scale(16),
    },

    profileInfo: {
      flex: 1,
    },

    name: {
      color: '#fff',
      fontSize:
        moderateScale(
          28
        ),
      fontWeight:
        '700',
    },

    username: {
      color: '#9A9A9A',
      fontSize:
        moderateScale(
          16
        ),
    },

    editIcon: {
      width:
        scale(24),
      height:
        scale(24),
      resizeMode:
        'contain',
    },

    bioContainer: {
      paddingHorizontal:
        scale(24),
      marginTop:
        verticalScale(
          5
        ),
    },

    website: {
      color:
        Colors.teal,
      marginTop:
        verticalScale(
          4
        ),
      fontSize:
        moderateScale(
          16
        ),
    },

    buttonRow: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      paddingHorizontal:
        scale(20),
      marginTop:
        verticalScale(
          10
        ),
    },

    actionButton: {
      width: '47%',
      backgroundColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          10
        ),
      justifyContent:
        'center',
      alignItems:
        'center',
      paddingVertical:
        verticalScale(
          8
        ),
    },

    actionText: {
      color: '#000',
      fontSize:
        moderateScale(
          17
        ),
      fontWeight:
        '600',
    },

    infoItem: {
      flexDirection:
        'row',
      alignItems:
        'center',
    },

    infoIcon: {
      width:
        scale(14),
      height:
        scale(14),
      marginRight:
        scale(5),
    },

    infoRow: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      marginTop:
        verticalScale(
          12
        ),
      paddingHorizontal:
        scale(20),
    },

    infoText: {
      color: '#A8A8A8',
      fontSize:
        moderateScale(
          13
        ),
    },

    statsContainer: {
      flexDirection:
        'row',
      justifyContent:
        'space-between',
      borderWidth: 1,
      borderColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          18
        ),
      marginHorizontal:
        scale(10),
      marginTop:
        verticalScale(
          12
        ),
      paddingVertical:
        verticalScale(
          12
        ),
      paddingHorizontal:
        scale(10),
    },

    statItem: {
      flex: 1,
      alignItems:
        'center',
    },

    statNumber: {
      color: '#fff',
      fontWeight:
        '700',
      fontSize:
        moderateScale(
          18
        ),
    },

    statLabel: {
      color: '#fff',
      textAlign:
        'center',
      fontSize:
        moderateScale(
          12
        ),
      marginTop:
        verticalScale(
          4
        ),
    },

    menuCard: {
      height:
        verticalScale(
          35
        ),
      borderWidth: 1,
      borderColor:
        Colors.teal,
      borderRadius:
        moderateScale(
          12
        ),
      marginHorizontal:
        scale(40),
      marginTop:
        verticalScale(
          10
        ),
      flexDirection:
        'row',
      alignItems:
        'center',
      paddingHorizontal:
        scale(18),
    },

    menuIcon: {
      width:
        scale(30),
      height:
        scale(30),
    },

    menuText: {
      flex: 1,
      textAlign:
        'center',
      color: '#fff',
      fontSize:
        moderateScale(
          18
        ),
      fontFamily:
        'Poppins-Regular',
    },

    arrowIcon: {
      width:
        scale(14),
      height:
        scale(22),
      resizeMode:
        'contain',
    },
  });

export default styles;
