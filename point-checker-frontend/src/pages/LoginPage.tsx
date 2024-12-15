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
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="absolute inset-0">
        <img
          src="/ghg.gif"
          alt="Background GIF"
          className="object-cover w-full h-full"
          style={{ zIndex: -2 }}
        />
        <div
          className="absolute inset-0 bg-black opacity-50"
          style={{ zIndex: -1 }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-pink-900">Информация о студенте</h1>
          <p className="mt-2 text-pink-600">ФИО: Попов С.В. Козырева Э.В.</p>
          <p className="text-pink-600">Группа: P3234</p>
          <p className="text-pink-600">Вариант: 12345</p>
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
    </div>
  );
}
