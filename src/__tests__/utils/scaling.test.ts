import { scale, verticalScale, moderateScale } from '../../utils/scaling';

describe('scaling', () => {
  it('scale is a function', () => {
    expect(typeof scale).toBe('function');
  });

  it('verticalScale is a function', () => {
    expect(typeof verticalScale).toBe('function');
  });

  it('moderateScale is a function', () => {
    expect(typeof moderateScale).toBe('function');
  });

  it('scale returns the input unchanged (mock)', () => {
    expect(scale(10)).toBe(10);
    expect(scale(0)).toBe(0);
    expect(scale(-5)).toBe(-5);
  });

  it('verticalScale returns the input unchanged (mock)', () => {
    expect(verticalScale(20)).toBe(20);
  });

  it('moderateScale returns the input unchanged (mock)', () => {
    expect(moderateScale(15)).toBe(15);
  });
});
