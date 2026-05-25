// src/security/sanitize.ts

export const sanitizeText = (value: string, maxLength = 255): string => {
  if (!value) {
    return '';
  }

  return value
    .normalize('NFKC')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
};

export const sanitizeEmail = (email: string): string => {
  return sanitizeText(email.toLowerCase(), 320);
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^0-9+]/g, '').slice(0, 20);
};

export const containsFourByteUnicode = (value: string): boolean => {
  for (const char of value) {
    if (char.codePointAt(0)! > 0xffff) {
      return true;
    }
  }

  return false;
};

export const safeDatabaseText = (
  value: string,
  maxLength = 255,
): string => {
  const cleaned = sanitizeText(value, maxLength);

  return [...cleaned]
    .filter(char => char.codePointAt(0)! <= 0xffff)
    .join('');
};