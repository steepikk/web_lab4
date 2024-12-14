import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
  error: string | null;
  loading: boolean;
}

export function LoginPage({ onLogin, onRegister, error, loading }: LoginPageProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div
      className="h-screen w-full flex flex-col  justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/pic.webp)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center mb-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900">Информация о студенте</h1>
        <p className="mt-2 text-gray-600">ФИО: Ваше ФИО</p>
        <p className="text-gray-600">Группа: P3234</p>
        <p className="text-gray-600">Вариант: 12345</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex-1">
        {isLoginMode ? (
          <LoginForm 
            onLogin={onLogin} 
            onSwitchToRegister={() => setIsLoginMode(false)}
            loading={loading}
          />
        ) : (
          <RegisterForm 
            onRegister={onRegister} 
            onSwitchToLogin={() => setIsLoginMode(true)}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
