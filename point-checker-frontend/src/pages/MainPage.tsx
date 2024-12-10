import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { CoordinateForm } from '../components/graph/CoordinateForm';
import { Graph } from '../components/graph/Graph';
import { ResultsTable } from '../components/results/ResultsTable';
import { Point } from '../types';
import { checkPoint, getUserPoints } from '../api/points';

interface MainPageProps {
  username: string;
  token: string;
  onLogout: () => void;
}

export function MainPage({ username, token, onLogout }: MainPageProps) {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<string>('');
  const [r, setR] = useState<number>(1);
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    loadPoints();
  }, []);

  const loadPoints = async () => {
    try {
      const loadedPoints = await getUserPoints(token);
      setPoints(loadedPoints);
    } catch (error) {
      console.error('Failed to load points:', error);
    }
  };

  const handleYChange = (value: string) => {
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= -3 && Number(value) <= 3)) {
      setY(value);
    }
  };

  const handleSubmit = async () => {
    if (y === '' || isNaN(Number(y))) {
      alert('Please enter a valid Y coordinate');
      return;
    }

    try {
      const result = await checkPoint(x, Number(y), r, token);
      setPoints([result, ...points]);
      setY('');
    } catch (error) {
      console.error('Failed to check point:', error);
      alert('Failed to check point. Please try again.');
    }
  };

  const handlePointClick = async (clickX: number, clickY: number) => {
    try {
      const result = await checkPoint(clickX, clickY, r, token);
      setPoints([result, ...points]);
    } catch (error) {
      console.error('Failed to check point:', error);
      alert('Failed to check point. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Point Checker</h1>
            <p className="text-sm text-gray-600">Welcome, {username}!</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <CoordinateForm
              x={x}
              y={y}
              r={r}
              onXChange={setX}
              onYChange={handleYChange}
              onRChange={setR}
            />
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Check Point
              </button>
            </div>
            <Graph points={points} r={r} onPointClick={handlePointClick} />
          </div>
          <div>
            <ResultsTable points={points} />
          </div>
        </div>
      </main>
    </div>
  );
}