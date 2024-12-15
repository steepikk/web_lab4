import React, { useRef, useEffect } from 'react';
import { Point } from '../../types';

interface GraphProps {
  points: Point[];
  r: number;
  onPointClick: (x: number, y: number) => void;
}

export function Graph({ points, r, onPointClick }: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const size = 400;
  const scale = size / 3;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    // Рисуем оси
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(0, size / 2); // Ось X
    ctx.lineTo(size, size / 2);
    ctx.moveTo(size / 2, 0); // Ось Y
    ctx.lineTo(size / 2, size);
    ctx.stroke();

    // Добавляем стрелки
    ctx.beginPath();
    ctx.moveTo(size - 10, size / 2 - 5); // Стрелка на X
    ctx.lineTo(size, size / 2);
    ctx.lineTo(size - 10, size / 2 + 5);
    ctx.moveTo(size / 2 - 5, 10); // Стрелка на Y
    ctx.lineTo(size / 2, 0);
    ctx.lineTo(size / 2 + 5, 10);
    ctx.stroke();

    // Подписи осей
    ctx.fillStyle = '#000';
    ctx.font = '14px Arial';
    ctx.fillText('X', size - 20, size / 2 - 10);
    ctx.fillText('Y', size / 2 + 10, 20);

    // Рисуем области
    ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
    ctx.beginPath();
    ctx.fillRect(size / 2 - r * scale / 2, size / 2 - r * scale, r * scale / 2, r * scale);

    ctx.beginPath();
    ctx.moveTo(size / 2, size / 2);
    ctx.lineTo(size / 2 - r * scale, size / 2);
    ctx.lineTo(size / 2, size / 2 + r * scale);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, r * scale / 2, 0, Math.PI / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.closePath();
    ctx.fill();

    // Рисуем точки
    points.forEach((point) => {
      const x = size / 2 + point.x * scale;
      const y = size / 2 - point.y * scale;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = point.hit ? '#4CAF50' : '#F44336';
      ctx.fill();
    });

    // Добавляем черточки и подписи R
    ctx.font = '12px Arial';
    ctx.fillStyle = '#000';
    // Ось X
    for (let i = -2; i <= 2; i++) {
      const x = size / 2 + i * (scale * r / 2); // Масштабируем черточки относительно R
      ctx.beginPath();
      ctx.moveTo(x, size / 2 - 5);
      ctx.lineTo(x, size / 2 + 5);
      ctx.stroke();
      if (i !== 0) {
        const label = i === 2 ? 'R' : i === 1 ? 'R/2' : i === -1 ? '-R/2' : '-R';
        ctx.fillText(label, x - 10, size / 2 + 20);
      }
    }

    // Ось Y
    for (let i = -2; i <= 2; i++) {
      const y = size / 2 - i * (scale * r / 2); // Масштабируем черточки относительно R
      ctx.beginPath();
      ctx.moveTo(size / 2 - 5, y);
      ctx.lineTo(size / 2 + 5, y);
      ctx.stroke();
      if (i !== 0) {
        const label = i === 2 ? 'R' : i === 1 ? 'R/2' : i === -1 ? '-R/2' : '-R';
        ctx.fillText(label, size / 2 + 10, y + 5);
      }
    }
  }, [points, r]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) - size / 2) / scale;
    const y = (size / 2 - (e.clientY - rect.top)) / scale;

    onPointClick(x, y);
  };

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onClick={handleCanvasClick}
      className="border border-gray-300 rounded-lg cursor-crosshair"
    />
  );
}
