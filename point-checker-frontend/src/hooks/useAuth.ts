import { useState, useEffect } from 'react';
import { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      username: '',
      isAuthenticated: false
    };
  });

  useEffect(() => {
    if (user.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (username: string, token: string) => {
    setUser({
      username,
      isAuthenticated: true,
      token
    });
  };

  const logout = () => {
    setUser({
      username: '',
      isAuthenticated: false
    });
  };

  return { user, login, logout };
}