jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
}));

import axios from 'axios';

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates an axios instance with correct config', () => {
    jest.isolateModules(() => {
      const mockedCreate = axios.create as jest.Mock;
      mockedCreate.mockClear();
      require('../../api/client');
      expect(mockedCreate).toHaveBeenCalledTimes(1);
      expect(mockedCreate).toHaveBeenCalledWith({
        baseURL: 'http://localhost:5000',
        timeout: 15000,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    });
  });

  it('exports a default axios instance', () => {
    jest.isolateModules(() => {
      const apiClient = require('../../api/client').default;
      expect(apiClient).toBeDefined();
    });
  });

  it('instance has expected HTTP method functions', () => {
    jest.isolateModules(() => {
      const apiClient = require('../../api/client').default;
      expect(typeof apiClient.get).toBe('function');
      expect(typeof apiClient.post).toBe('function');
      expect(typeof apiClient.put).toBe('function');
      expect(typeof apiClient.delete).toBe('function');
    });
  });

  it('uses Config.API_BASE_URL for baseURL', () => {
    const originalEnv = process.env;
    jest.isolateModules(() => {
      const mockedCreate = axios.create as jest.Mock;
      mockedCreate.mockClear();
      require('../../api/client');
      const config = mockedCreate.mock.calls[0][0];
      expect(config.baseURL).toBe('http://localhost:5000');
    });
  });
});
