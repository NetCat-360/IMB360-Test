import {
  sanitizeText,
  sanitizeEmail,
  sanitizePhone,
  containsFourByteUnicode,
  safeDatabaseText,
  isStrongPassword,
} from '../../security/sanitize';

describe('sanitizeText', () => {
  it('returns empty string for falsy inputs', () => {
    expect(sanitizeText('')).toBe('');
    expect(sanitizeText(null as unknown as string)).toBe('');
    expect(sanitizeText(undefined as unknown as string)).toBe('');
  });

  it('strips HTML tags', () => {
    expect(sanitizeText('<script>alert("xss")</script>')).toBe('alert("xss")');
    expect(sanitizeText('<b>bold</b>')).toBe('bold');
    expect(sanitizeText('<a href="bad">link</a>')).toBe('link');
  });

  it('removes control characters', () => {
    const input = 'hello\x00world\x1Ftest';
    expect(sanitizeText(input)).toBe('helloworldtest');
  });

  it('trims whitespace', () => {
    expect(sanitizeText('  hello  ')).toBe('hello');
    expect(sanitizeText('\t\n\r\nhello\n')).toBe('hello');
  });

  it('respects maxLength', () => {
    const long = 'a'.repeat(500);
    expect(sanitizeText(long, 10).length).toBe(10);
    expect(sanitizeText(long, 100).length).toBe(100);
  });

  it('normalizes unicode (NFKC)', () => {
    // NFKC normalizes full-width chars to their ASCII equivalents
    expect(sanitizeText('Ｈｅｌｌｏ')).toBe('Hello');
  });
});

describe('sanitizeEmail', () => {
  it('lowercases the email', () => {
    expect(sanitizeEmail('Test@Example.COM')).toBe('test@example.com');
  });

  it('strips HTML from email', () => {
    expect(sanitizeEmail('<b>user@test.com</b>')).toBe('user@test.com');
  });

  it('trims whitespace and control chars', () => {
    expect(sanitizeEmail('  User@Test.com\n')).toBe('user@test.com');
  });

  it('caps at 320 chars', () => {
    const long = 'a'.repeat(300) + '@b.com';
    expect(sanitizeEmail(long).length).toBeLessThanOrEqual(320);
  });

  it('returns empty for empty input', () => {
    expect(sanitizeEmail('')).toBe('');
  });
});

describe('sanitizePhone', () => {
  it('keeps only digits and plus sign', () => {
    expect(sanitizePhone('+1 (555) 123-4567')).toBe('+15551234567');
    expect(sanitizePhone('+63-912-345-6789')).toBe('+639123456789');
  });

  it('removes letters and other chars', () => {
    expect(sanitizePhone('abc+123def456')).toBe('+123456');
  });

  it('caps at 20 chars', () => {
    const long = '+12345678901234567890123456';
    expect(sanitizePhone(long).length).toBeLessThanOrEqual(20);
  });

  it('returns empty for input with no digits or plus', () => {
    expect(sanitizePhone('abc')).toBe('');
    expect(sanitizePhone('(!@#$%)')).toBe('');
  });

  it('handles empty string', () => {
    expect(sanitizePhone('')).toBe('');
  });
});

describe('containsFourByteUnicode', () => {
  it('returns false for ASCII strings', () => {
    expect(containsFourByteUnicode('hello')).toBe(false);
    expect(containsFourByteUnicode('')).toBe(false);
  });

  it('returns false for 3-byte unicode (BMP)', () => {
    expect(containsFourByteUnicode('你好')).toBe(false);
    expect(containsFourByteUnicode('ñ')).toBe(false);
  });

  it('returns true for 4-byte unicode (supplementary planes)', () => {
    expect(containsFourByteUnicode('😀')).toBe(true);
    expect(containsFourByteUnicode('hello👍world')).toBe(true);
  });

  it('returns true for multiple emoji', () => {
    expect(containsFourByteUnicode('👨‍👩‍👧‍👦')).toBe(true);
  });
});

describe('safeDatabaseText', () => {
  it('removes 4-byte unicode', () => {
    expect(safeDatabaseText('hello😀world')).toBe('helloworld');
    expect(safeDatabaseText('👍👍👍')).toBe('');
  });

  it('preserves BMP characters', () => {
    expect(safeDatabaseText('hello ñandú 你好')).toBe('hello ñandú 你好');
  });

  it('strips HTML and control chars', () => {
    expect(safeDatabaseText('<b>hello</b>\x00world')).toBe('helloworld');
  });

  it('respects maxLength', () => {
    const long = 'a'.repeat(300);
    expect(safeDatabaseText(long, 50).length).toBe(50);
  });

  it('returns empty for empty input', () => {
    expect(safeDatabaseText('')).toBe('');
  });
});

describe('isStrongPassword', () => {
  it('returns true for strong passwords', () => {
    expect(isStrongPassword('Abcd1234!')).toBe(true);
    expect(isStrongPassword('Str0ng!Pass')).toBe(true);
    expect(isStrongPassword('aB3$defgh')).toBe(true);
  });

  it('returns false for passwords without uppercase', () => {
    expect(isStrongPassword('abcd1234!')).toBe(false);
  });

  it('returns false for passwords without lowercase', () => {
    expect(isStrongPassword('ABCD1234!')).toBe(false);
  });

  it('returns false for passwords without digit', () => {
    expect(isStrongPassword('Abcdefgh!')).toBe(false);
  });

  it('returns false for passwords without special char', () => {
    expect(isStrongPassword('Abcd1234')).toBe(false);
  });

  it('returns false for short passwords', () => {
    expect(isStrongPassword('Ab1!a')).toBe(false);
    expect(isStrongPassword('Ab1!')).toBe(false);
  });
});
