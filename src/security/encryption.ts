import * as Keychain from 'react-native-keychain';

// ── SHA-256 ──────────────────────────────────────────────────────────────────

export function hashPassword(password: string): string {
  return sha256(password);
}

// ── Keychain storage (hardware-encrypted) ─────────────────────────────────────

const KC_USER = 'imb360_user';
const KC_ACCESS_TOKEN = 'imb360_access_token';
const KC_REFRESH_TOKEN = 'imb360_refresh_token';
const KC_ENCRYPTION_KEY = 'imb360_encryption_key';

export async function saveUserToKeychain(user: object): Promise<void> {
  await Keychain.setGenericPassword('user', JSON.stringify(user), {
    service: KC_USER,
  });
}

export async function getUserFromKeychain<T>(): Promise<T | null> {
  try {
    const creds = await Keychain.getGenericPassword({ service: KC_USER });
    if (creds) return JSON.parse(creds.password) as T;
    return null;
  } catch {
    return null;
  }
}

export async function removeUserFromKeychain(): Promise<void> {
  await Keychain.resetGenericPassword({ service: KC_USER });
}

export async function saveAccessToken(token: string): Promise<void> {
  await Keychain.setGenericPassword('token', token, {
    service: KC_ACCESS_TOKEN,
  });
}

export async function getAccessToken(): Promise<string | null> {
  try {
    const creds = await Keychain.getGenericPassword({ service: KC_ACCESS_TOKEN });
    return creds ? creds.password : null;
  } catch {
    return null;
  }
}

export async function saveRefreshToken(token: string): Promise<void> {
  await Keychain.setGenericPassword('token', token, {
    service: KC_REFRESH_TOKEN,
  });
}

export async function getRefreshToken(): Promise<string | null> {
  try {
    const creds = await Keychain.getGenericPassword({ service: KC_REFRESH_TOKEN });
    return creds ? creds.password : null;
  } catch {
    return null;
  }
}

export async function removeTokensFromKeychain(): Promise<void> {
  await Keychain.resetGenericPassword({ service: KC_ACCESS_TOKEN });
  await Keychain.resetGenericPassword({ service: KC_REFRESH_TOKEN });
}

function base64Encode(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i], b2 = bytes[i + 1] || 0, b3 = bytes[i + 2] || 0;
    result += chars[b1 >> 2];
    result += chars[((b1 & 3) << 4) | (b2 >> 4)];
    result += i + 1 < bytes.length ? chars[((b2 & 15) << 2) | (b3 >> 6)] : '=';
    result += i + 2 < bytes.length ? chars[b3 & 63] : '=';
  }
  return result;
}

function base64Decode(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '=') break;
    const idx = chars.indexOf(str[i]);
    if (idx >= 0) bytes.push(idx);
  }
  for (let i = 0; i < bytes.length; i += 4) {
    const b1 = bytes[i], b2 = bytes[i + 1], b3 = bytes[i + 2], b4 = bytes[i + 3];
    result += String.fromCharCode((b1 << 2) | (b2 >> 4));
    if (i + 2 < bytes.length) result += String.fromCharCode(((b2 & 15) << 4) | (b3 >> 2));
    if (i + 3 < bytes.length) result += String.fromCharCode(((b3 & 3) << 6) | b4);
  }
  return result;
}

// ── AsyncStorage encryption (key stored in Keychain) ─────────────────────────

async function getOrCreateEncryptionKey(): Promise<string> {
  try {
    const creds = await Keychain.getGenericPassword({
      service: KC_ENCRYPTION_KEY,
    });
    if (creds) return creds.password;
  } catch {}

  const key = generateRandomKey();
  await Keychain.setGenericPassword('key', key, {
    service: KC_ENCRYPTION_KEY,
  });
  return key;
}

function generateRandomKey(): string {
  let key = '';
  const chars = 'abcdef0123456789';
  for (let i = 0; i < 64; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

export async function encryptAsyncData(data: object): Promise<string> {
  const key = await getOrCreateEncryptionKey();
  const plaintext = JSON.stringify(data);
  const result = xorCipher(plaintext, key);
  return base64Encode(result);
}

export async function decryptAsyncData<T>(ciphertext: string): Promise<T | null> {
  try {
    const key = await getOrCreateEncryptionKey();
    const decoded = base64Decode(ciphertext);
    const plaintext = xorCipher(decoded, key);
    return JSON.parse(plaintext) as T;
  } catch {
    return null;
  }
}

// Stream cipher: XOR plaintext with a SHA-256‑derived keystream
function xorCipher(input: string, key: string): string {
  const keyHash = sha256(key);
  const blockSize = 32;
  let result = '';
  for (let i = 0; i < input.length; i++) {
    const ki = i % blockSize;
    const keyByte = parseInt(keyHash.slice(ki * 2, ki * 2 + 2), 16);
    result += String.fromCharCode(input.charCodeAt(i) ^ keyByte);
  }
  return result;
}

// ── SHA-256 implementation (pure JS) ─────────────────────────────────────────

function sha256(input: string): string {
  const rightRotate = (x: number, n: number) => (x >>> n) | (x << (32 - n));

  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  const utf8Encode = (s: string): string => {
    let result = '';
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if (c < 0x80) {
        result += String.fromCharCode(c);
      } else if (c < 0x800) {
        result += String.fromCharCode(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
      } else if (c < 0xd800 || c >= 0xe000) {
        result += String.fromCharCode(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
      } else {
        i++;
        const cp = 0x10000 + (((c & 0x3ff) << 10) | (s.charCodeAt(i) & 0x3ff));
        result += String.fromCharCode(
          0xf0 | ((cp >> 18) & 0x07),
          0x80 | ((cp >> 12) & 0x3f),
          0x80 | ((cp >> 6) & 0x3f),
          0x80 | (cp & 0x3f),
        );
      }
    }
    return result;
  };

  const rawBytes = utf8Encode(input);
  const msgLen = rawBytes.length * 8;

  let padded = '';
  for (let i = 0; i < rawBytes.length; i++) {
    padded += String.fromCharCode(rawBytes.charCodeAt(i));
  }
  padded += String.fromCharCode(0x80);

  while ((padded.length * 8) % 512 !== 448) {
    padded += String.fromCharCode(0x00);
  }

  for (let i = 7; i >= 0; i--) {
    padded += String.fromCharCode((msgLen >>> (i * 8)) & 0xff);
  }

  const words: number[] = [];
  for (let i = 0; i < padded.length; i += 4) {
    words.push(
      (padded.charCodeAt(i) << 24) |
      (padded.charCodeAt(i + 1) << 16) |
      (padded.charCodeAt(i + 2) << 8) |
      padded.charCodeAt(i + 3),
    );
  }

  let H0 = 0x6a09e667, H1 = 0xbb67ae85, H2 = 0x3c6ef372, H3 = 0xa54ff53a;
  let H4 = 0x510e527f, H5 = 0x9b05688c, H6 = 0x1f83d9ab, H7 = 0x5be0cd19;

  for (let block = 0; block < words.length; block += 16) {
    const W = words.slice(block, block + 16);
    for (let t = 16; t < 64; t++) {
      const s0 = rightRotate(W[t - 15], 7) ^ rightRotate(W[t - 15], 18) ^ (W[t - 15] >>> 3);
      const s1 = rightRotate(W[t - 2], 17) ^ rightRotate(W[t - 2], 19) ^ (W[t - 2] >>> 10);
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) >>> 0;
    }

    let a = H0, b = H1, c = H2, d = H3, e = H4, f = H5, g = H6, h = H7;

    for (let t = 0; t < 64; t++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ ((~e) & g);
      const temp1 = (h + S1 + ch + K[t] + W[t]) >>> 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;

      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }

    H0 = (H0 + a) >>> 0; H1 = (H1 + b) >>> 0;
    H2 = (H2 + c) >>> 0; H3 = (H3 + d) >>> 0;
    H4 = (H4 + e) >>> 0; H5 = (H5 + f) >>> 0;
    H6 = (H6 + g) >>> 0; H7 = (H7 + h) >>> 0;
  }

  const toHex = (n: number) => {
    const hex = n.toString(16);
    return '00000000'.slice(hex.length) + hex;
  };

  return toHex(H0) + toHex(H1) + toHex(H2) + toHex(H3) +
         toHex(H4) + toHex(H5) + toHex(H6) + toHex(H7);
}
