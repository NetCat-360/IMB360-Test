// src/styles/typography.ts
// ─────────────────────────────────────────────────────────────────────────────
// Poppins font family applied globally.
// The font files live in src/assets/fonts/ and are linked via react-native.config.js.
// Use these style objects anywhere text needs Poppins instead of the system font.
// ─────────────────────────────────────────────────────────────────────────────
import { StyleSheet } from 'react-native';
import { moderateScale } from '../utils/scaling';
import { Colors } from '../config/theme';

const Typography = StyleSheet.create({
  // Display
  displayLarge: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(34),
    color: Colors.textPrimary,
  },
  displayMedium: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(24),
    color: Colors.textPrimary,
  },

  // Headings
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(22),
    color: Colors.textPrimary,
  },
  h2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(18),
    color: Colors.textPrimary,
  },
  h3: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(16),
    color: Colors.textPrimary,
  },

  // Body
  body: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(14),
    color: Colors.textPrimary,
  },
  bodySmall: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
    color: Colors.textSecondary,
  },

  // Labels / UI
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: moderateScale(13),
    color: Colors.textMuted,
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(11),
    color: Colors.textDim,
  },

  // Buttons
  buttonPrimary: {
    fontFamily: 'Poppins-Bold',
    fontSize: moderateScale(15),
    color: '#000000',
  },
  buttonSecondary: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(13),
    color: Colors.textPrimary,
  },

  // Stat numbers on the home screen
  statNumber: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: moderateScale(16),
    color: Colors.textPrimary,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(12),
    color: Colors.textPrimary,
  },
});

export default Typography;
