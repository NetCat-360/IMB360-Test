import { CURRENCY } from '../../config/constants';

describe('constants', () => {
  it('CURRENCY is defined', () => {
    expect(CURRENCY).toBeDefined();
  });

  it('CURRENCY is the Philippine peso sign', () => {
    expect(CURRENCY).toBe('₱');
  });

  it('CURRENCY is a non-empty string', () => {
    expect(typeof CURRENCY).toBe('string');
    expect(CURRENCY.length).toBe(1);
  });
});
