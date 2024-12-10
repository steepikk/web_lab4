import React, { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { useAuth } from './hooks/useAuth';
import { login, register } from './api/auth';

function App() {
  const { user, login: setUser, logout } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await login(username, password);
      setUser(username, response.token);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await register(username, password);
      // После успешной регистрации выполняем вход
      await handleLogin(username, password);
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {user.isAuthenticated ? (
        <MainPage 
          username={user.username} 
          token={user.token!} 
          onLogout={logout} 
        />
      ) : (
        <LoginPage 
          onLogin={handleLogin} 
          onRegister={handleRegister}
          error={error}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;