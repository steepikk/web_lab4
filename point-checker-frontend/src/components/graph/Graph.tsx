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

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw coordinate system
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.stroke();

    // Draw areas
    ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
    ctx.beginPath();
    
    // Rectangle in second quadrant
    ctx.fillRect(size/2 - r*scale/2, size/2 - r*scale, r*scale/2, r*scale);
    
    // Triangle in third quadrant
    ctx.beginPath();
    ctx.moveTo(size/2, size/2);
    ctx.lineTo(size/2 - r*scale, size/2);
    ctx.lineTo(size/2, size/2 + r*scale);
    ctx.closePath();
    ctx.fill();
    
    // Quarter circle in first quadrant
    ctx.beginPath();
    ctx.arc(size/2, size/2, r*scale/2, 0, Math.PI/2);
    ctx.lineTo(size/2, size/2);
    ctx.closePath();
    ctx.fill();

    // Draw points
    points.forEach(point => {
      const x = size/2 + point.x * scale;
      const y = size/2 - point.y * scale;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = point.hit ? '#4CAF50' : '#F44336';
      ctx.fill();
    });

  }, [points, r]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) - size/2) / scale;
    const y = (size/2 - (e.clientY - rect.top)) / scale;

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