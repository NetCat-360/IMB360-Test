jest.mock('../../utils/scaling', () => ({
  scale: (n: number) => n,
  verticalScale: (n: number) => n,
  moderateScale: (n: number) => n,
}));

jest.mock('../../config/theme', () => ({
  Colors: {
    textPrimary: '#FFFFFF',
    textSecondary: '#AAAAAA',
    textMuted: '#888888',
    textDim: '#666666',
    success: '#22C55E',
    error: '#FF3B30',
  },
}));

import Typography from '../../styles/typography';

describe('Typography', () => {
  it('exports a StyleSheet object', () => {
    expect(Typography).toBeDefined();
    expect(typeof Typography).toBe('object');
  });

  it('has all expected style keys', () => {
    const expectedKeys = [
      'displayLarge',
      'displayMedium',
      'h1',
      'h2',
      'h3',
      'body',
      'bodySmall',
      'label',
      'caption',
      'buttonPrimary',
      'buttonSecondary',
      'statNumber',
      'statLabel',
    ];

    for (const key of expectedKeys) {
      expect(Typography).toHaveProperty(key);
    }
  });

  it('each style has fontFamily, fontSize, and color', () => {
    for (const [, style] of Object.entries(Typography)) {
      const s = style as Record<string, unknown>;
      expect(s).toHaveProperty('fontFamily');
      expect(s).toHaveProperty('fontSize');
      expect(s).toHaveProperty('color');
    }
  });

  it('displayLarge uses Poppins-Bold', () => {
    expect(Typography.displayLarge.fontFamily).toBe('Poppins-Bold');
    expect(Typography.displayLarge.color).toBe('#FFFFFF');
  });

  it('body uses Poppins-Regular', () => {
    expect(Typography.body.fontFamily).toBe('Poppins-Regular');
    expect(Typography.body.fontSize).toBe(14);
  });

  it('bodySmall uses textSecondary color', () => {
    expect(Typography.bodySmall.color).toBe('#AAAAAA');
  });

  it('buttonPrimary has black text', () => {
    expect(Typography.buttonPrimary.color).toBe('#000000');
    expect(Typography.buttonPrimary.fontFamily).toBe('Poppins-Bold');
  });

  it('buttonSecondary has textPrimary color', () => {
    expect(Typography.buttonSecondary.color).toBe('#FFFFFF');
    expect(Typography.buttonSecondary.fontFamily).toBe('Poppins-SemiBold');
  });

  it('label uses textMuted', () => {
    expect(Typography.label.color).toBe('#888888');
  });

  it('caption uses textDim', () => {
    expect(Typography.caption.color).toBe('#666666');
  });
});
