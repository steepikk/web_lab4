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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
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
  );
}