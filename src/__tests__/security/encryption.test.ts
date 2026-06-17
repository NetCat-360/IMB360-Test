import Keychain from 'react-native-keychain';
import {
  hashPassword,
  saveUserToKeychain,
  getUserFromKeychain,
  removeUserFromKeychain,
  saveAccessToken,
  getAccessToken,
  saveRefreshToken,
  removeTokensFromKeychain,
  encryptAsyncData,
  decryptAsyncData,
} from '../../security/encryption';

jest.mock('react-native-keychain', () => {
  const store: Record<string, { username: string; password: string }> = {};
  return {
    setGenericPassword: jest.fn((username: string, password: string, options?: { service?: string }) => {
      if (options?.service) {
        store[options.service] = { username, password };
      }
      return Promise.resolve();
    }),
    getGenericPassword: jest.fn((options?: { service?: string }) => {
      if (options?.service && store[options.service]) {
        return Promise.resolve(store[options.service]);
      }
      return Promise.resolve(false);
    }),
    resetGenericPassword: jest.fn((options?: { service?: string }) => {
      if (options?.service) {
        delete store[options.service];
      }
      return Promise.resolve();
    }),
  };
});

const KNOWN_SHA256_EMPTY = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

describe('hashPassword', () => {
  it('returns a 64-char hex string', () => {
    const hash = hashPassword('test');
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  it('produces deterministic output', () => {
    expect(hashPassword('hello')).toBe(hashPassword('hello'));
  });

  it('produces correct SHA-256 for empty string', () => {
    expect(hashPassword('')).toBe(KNOWN_SHA256_EMPTY);
  });

  it('produces different hashes for different inputs', () => {
    expect(hashPassword('abc')).not.toBe(hashPassword('xyz'));
  });
});

describe('user keychain operations', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    // Ensure clean state by removing any pre-existing user
    await removeUserFromKeychain();
  });

  it('saveUserToKeychain stores user JSON', async () => {
    const user = { id: '1', name: 'Test' };
    await saveUserToKeychain(user);
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'user',
      JSON.stringify(user),
      { service: 'imb360_user' },
    );
  });

  it('getUserFromKeychain returns null when no user saved', async () => {
    const result = await getUserFromKeychain();
    expect(result).toBeNull();
  });

  it('getUserFromKeychain retrieves saved user', async () => {
    const user = { id: '1', name: 'Test' };
    await saveUserToKeychain(user);
    const result = await getUserFromKeychain<typeof user>();
    expect(result).toEqual(user);
  });

  it('getUserFromKeychain returns null on error', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    const result = await getUserFromKeychain();
    expect(result).toBeNull();
  });

  it('removeUserFromKeychain resets the service', async () => {
    await removeUserFromKeychain();
    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({ service: 'imb360_user' });
  });

  it('after remove, getUserFromKeychain returns null', async () => {
    await saveUserToKeychain({ id: '1' });
    await removeUserFromKeychain();
    const result = await getUserFromKeychain();
    expect(result).toBeNull();
  });
});

describe('access token keychain operations', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    // Ensure clean state
    await removeTokensFromKeychain();
  });

  it('saveAccessToken stores token', async () => {
    await saveAccessToken('my-token');
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'token',
      'my-token',
      { service: 'imb360_access_token' },
    );
  });

  it('getAccessToken returns null when no token stored', async () => {
    const token = await getAccessToken();
    expect(token).toBeNull();
  });

  it('getAccessToken retrieves saved token', async () => {
    await saveAccessToken('my-token');
    const token = await getAccessToken();
    expect(token).toBe('my-token');
  });

  it('getAccessToken returns null on error', async () => {
    (Keychain.getGenericPassword as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    const token = await getAccessToken();
    expect(token).toBeNull();
  });

  it('handles empty string token', async () => {
    await saveAccessToken('');
    const token = await getAccessToken();
    expect(token).toBe('');
  });
});

describe('refresh token keychain operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saveRefreshToken stores token', async () => {
    await saveRefreshToken('refresh-token');
    expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
      'token',
      'refresh-token',
      { service: 'imb360_refresh_token' },
    );
  });
});

describe('removeTokensFromKeychain', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('resets both access and refresh token services', async () => {
    await removeTokensFromKeychain();
    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({ service: 'imb360_access_token' });
    expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({ service: 'imb360_refresh_token' });
  });

  it('can be called even when no tokens exist', async () => {
    await expect(removeTokensFromKeychain()).resolves.not.toThrow();
  });
});

describe('encryptAsyncData / decryptAsyncData', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  it('round-trips an object', async () => {
    const data = { userId: 42, email: 'test@test.com' };
    const encrypted = await encryptAsyncData(data);
    expect(typeof encrypted).toBe('string');
    expect(encrypted.length).toBeGreaterThan(0);

    const decrypted = await decryptAsyncData<typeof data>(encrypted);
    expect(decrypted).toEqual(data);
  });

  it('returns null for invalid ciphertext', async () => {
    const result = await decryptAsyncData('!!!invalid!!!');
    expect(result).toBeNull();
  });

  it('round-trips an empty object', async () => {
    const encrypted = await encryptAsyncData({});
    const decrypted = await decryptAsyncData(encrypted);
    expect(decrypted).toEqual({});
  });

  it('round-trips a nested object', async () => {
    const data = { a: [1, 2, 3], b: { c: 'deep' } };
    const encrypted = await encryptAsyncData(data);
    const decrypted = await decryptAsyncData<typeof data>(encrypted);
    expect(decrypted).toEqual(data);
  });

  it('round-trips an array', async () => {
    const data = [1, 'two', { three: 3 }];
    const encrypted = await encryptAsyncData(data);
    const decrypted = await decryptAsyncData(encrypted);
    expect(decrypted).toEqual(data);
  });

  it('is deterministic with same key (key is cached)', async () => {
    const data = { msg: 'hello' };
    const encrypted1 = await encryptAsyncData(data);
    const encrypted2 = await encryptAsyncData(data);
    // Key is cached in getOrCreateEncryptionKey, so XOR with same key is deterministic
    expect(encrypted1).toBe(encrypted2);
  });
});

describe('cross-contamination prevention', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await removeUserFromKeychain();
    await removeTokensFromKeychain();
  });

  it('user and token storage are independent', async () => {
    await saveUserToKeychain({ id: '1' });
    await saveAccessToken('token123');

    const token = await getAccessToken();
    expect(token).toBe('token123');

    const user = await getUserFromKeychain();
    expect(user).toEqual({ id: '1' });

    await removeTokensFromKeychain();

    const tokenAfterRemoval = await getAccessToken();
    expect(tokenAfterRemoval).toBeNull();

    const userAfterRemoval = await getUserFromKeychain();
    expect(userAfterRemoval).toEqual({ id: '1' });
  });
});
