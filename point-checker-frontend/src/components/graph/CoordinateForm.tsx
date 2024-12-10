import React from 'react';

interface CoordinateFormProps {
  x: number;
  y: string;
  r: number;
  onXChange: (value: number) => void;
  onYChange: (value: string) => void;
  onRChange: (value: number) => void;
}

export function CoordinateForm({ x, y, r, onXChange, onYChange, onRChange }: CoordinateFormProps) {
  const xValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
  
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">X Coordinate</label>
        <div className="flex flex-wrap gap-2">
          {xValues.map((value) => (
            <label key={value} className="inline-flex items-center">
              <input
                type="radio"
                name="x-coordinate"
                value={value}
                checked={x === value}
                onChange={() => onXChange(value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">{value}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Y Coordinate</label>
        <input
          type="text"
          value={y}
          onChange={(e) => onYChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter Y (-3 to 3)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Radius (R)</label>
        <div className="flex flex-wrap gap-2">
          {xValues.map((value) => (
            <label key={value} className="inline-flex items-center">
              <input
                type="radio"
                name="radius"
                value={value}
                checked={r === value}
                onChange={() => onRChange(value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">{value}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}