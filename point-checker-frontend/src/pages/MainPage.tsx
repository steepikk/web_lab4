import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { CoordinateForm } from '../components/graph/CoordinateForm';
import { Graph } from '../components/graph/Graph';
import { ResultsTable } from '../components/results/ResultsTable';
import { Point } from '../types';
import { checkPoint, getUserPoints, deletePoint, clearPoints } from '../api/points';

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
      setPoints((prevPoints) => [result, ...prevPoints]);
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

  const handleDeletePoint = async (pointId: number) => {
    try {
      await deletePoint(pointId, token);
      setPoints(points.filter(point => point.id !== pointId));
    } catch (error) {
      console.error('Failed to delete point:', error);
      alert('Failed to delete point. Please try again.');
    }
  };
  
  const handleClearAll = async () => {
    try {
      await clearPoints(token);
      setPoints([]);
    } catch (error) {
      console.error('Failed to clear points:', error);
      alert('Failed to clear points. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/bib.jpg")',
      }}
    >
      <header className="bg-white bg-opacity-80 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-pink-900">Point Checker</h1>
            <p className="text-sm text-pink-600">Welcome, {username}!</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
        <a
        href="#bottom"
        className="p-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-lg fixed bottom-8 right-8 w-12 h-12 flex justify-center items-center"
    >
        <span className="text-lg font-bold">↓</span>
    </a>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white bg-opacity-80 rounded-md mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
        <div className="space-y-4">
        <div className="inline-block bg-white bg-opacity-90 p-4 rounded-lg shadow-lg border border-gray-300">
          <Graph points={points} r={r} onPointClick={handlePointClick} />
        </div>
      </div>

      </div>

          <div className="space-y-4">
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
                className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
              >
                Check Point
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full">
          <ResultsTable 
          points={points}
          onDeletePoint={handleDeletePoint}
          onClearAll={handleClearAll} 
          />
        </div>
      </main>
    </div>
  );
}
