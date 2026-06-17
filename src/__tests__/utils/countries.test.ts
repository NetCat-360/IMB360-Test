import { COUNTRIES } from '../../utils/countries';

describe('COUNTRIES', () => {
  it('is an array with entries', () => {
    expect(Array.isArray(COUNTRIES)).toBe(true);
    expect(COUNTRIES.length).toBeGreaterThan(0);
  });

  it('each entry has correct shape', () => {
    for (const country of COUNTRIES) {
      expect(country).toHaveProperty('code');
      expect(country).toHaveProperty('flag');
      expect(country).toHaveProperty('name');
      expect(country).toHaveProperty('callingCode');
      expect(typeof country.code).toBe('string');
      expect(typeof country.flag).toBe('string');
      expect(typeof country.name).toBe('string');
      expect(typeof country.callingCode).toBe('string');
    }
  });

  it('contains specific countries', () => {
    const us = COUNTRIES.find(c => c.code === 'US');
    expect(us).toBeDefined();
    expect(us!.name).toBe('United States');
    expect(us!.callingCode).toBe('+1');

    const ph = COUNTRIES.find(c => c.code === 'PH');
    expect(ph).toBeDefined();
    expect(ph!.name).toBe('Philippines');
    expect(ph!.callingCode).toBe('+63');

    const gb = COUNTRIES.find(c => c.code === 'GB');
    expect(gb).toBeDefined();
    expect(gb!.name).toBe('United Kingdom');
  });

  it('all country codes are unique and uppercase', () => {
    const codes = COUNTRIES.map(c => c.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const code of codes) {
      expect(code).toBe(code.toUpperCase());
    }
  });

  it('all calling codes start with +', () => {
    for (const country of COUNTRIES) {
      expect(country.callingCode.startsWith('+')).toBe(true);
    }
  });

  it('all names are non-empty strings', () => {
    for (const country of COUNTRIES) {
      expect(country.name.trim().length).toBeGreaterThan(0);
    }
  });
});
