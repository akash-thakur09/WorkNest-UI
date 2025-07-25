// src/services/authService.test.ts
import axiosInstance from '../../src/services/axiosInstance';
import { loginService, registerService } from '../../src/services/authService';

jest.mock('../../src/services/axiosInstance');

const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loginService', () => {
    it('should call /auth/login with correct data and return response', async () => {
      const loginData = { email: 'akash@example.com', password: 'securepass' };
      const mockResponse = { token: 'abc123', user: { name: 'Akash' } };

      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await loginService(loginData);

      expect(mockedAxios.post).toHaveBeenCalledWith('/auth/login', loginData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('registerService', () => {
    it('should call /auth/register with correct data and return response', async () => {
      const registerData = {
        email: 'akash@example.com',
        password: 'securepass',
        name: 'Akash',
        userRole: 'admin',
        registrationDate: new Date('2025-07-25')
      };
      const mockResponse = { message: 'User registered successfully' };

      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await registerService(registerData);

      expect(mockedAxios.post).toHaveBeenCalledWith('/auth/register', registerData);
      expect(result).toEqual(mockResponse);
    });
  });
});
