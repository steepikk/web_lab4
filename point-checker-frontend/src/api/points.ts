import axios from 'axios';
import { Point } from '../types';

const API_URL = 'http://localhost:8080/api';

export const checkPoint = async (x: number, y: number, r: number, token: string) => {
  const response = await axios.post(
    `${API_URL}/points/check`,
    { x, y, r },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserPoints = async (token: string) => {
  const response = await axios.get(`${API_URL}/points`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};