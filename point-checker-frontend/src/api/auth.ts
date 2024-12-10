import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface LoginResponse {
  token: string;
}

export interface AuthError {
  message: string;
  status: number;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    console.log('Login request:', { username, password });
    
    const response = await api.post<LoginResponse>('/auth/login', {
      username,
      password,
    });

    console.log('Received token:', response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Неверное имя пользователя или пароль');
      } else if (error.response?.status === 404) {
        throw new Error('Пользователь не найден');
      } else if (!error.response) {
        throw new Error('Ошибка сети. Проверьте подключение к серверу');
      }
    }
    throw new Error('Произошла ошибка при входе');
  }
};

export const register = async (username: string, password: string): Promise<void> => {
  try {
    await api.post('/auth/register', {
      username,
      password,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 409) {
        throw new Error('Пользователь с таким именем уже существует');
      } else if (!error.response) {
        throw new Error('Ошибка сети. Проверьте подключение к серверу');
      }
    }
    throw new Error('Произошла ошибка при регистрации');
  }
};