import React from 'react';
import { Point } from '../../types';
import { Trash2 } from 'lucide-react';

interface ResultsTableProps {
    points: Point[];
    onDeletePoint: (pointId: number) => void;
    onClearAll: () => void;
}

export function ResultsTable({ points, onDeletePoint, onClearAll }: ResultsTableProps) {
    return (
        <div className="space-y-4">
            <div className="overflow-x-auto w-full">
              <table className="w-full divide-y divide-pink-200 text-center">
                <thead className="bg-pink-50">
                    <tr>
                        <th className="px-4 py-3 text-xs font-medium text-pink-500 uppercase">X</th>
                        <th className="px-4 py-3 text-xs font-medium text-pink-500 uppercase">Y</th>
                        <th className="px-4 py-3 text-xs font-medium text-pink-500 uppercase">R</th>
                        <th className="px-4 py-3 text-xs font-medium text-pink-500 uppercase">Hit</th>
                        <th className="px-4 py-3 text-xs font-medium text-pink-500 uppercase">Time</th>
                        <th className="px-4 py-3 text-xs font-medium text-pink-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-pink-200">
                    {points.map((point) => (
                        <tr key={point.id}>
                            <td className="px-4 py-2 text-sm">{point.x.toFixed(2)}</td>
                            <td className="px-4 py-2 text-sm">{point.y.toFixed(2)}</td>
                            <td className="px-4 py-2 text-sm">{point.r}</td>
                            <td className="px-4 py-2">
                                <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                                    point.hit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                    {point.hit ? 'Hit' : 'Miss'}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-sm">{new Date(point.timestamp).toLocaleString()}</td>
                            <td className="px-4 py-2 flex justify-center items-center">
                                <button
                                    onClick={() => onDeletePoint(point.id)}
                                    className="text-pink-600 hover:text-pink-900"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </div>

            <div className="flex justify-center items-center">
                <button
                    onClick={onClearAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                >
                    Clear All Points
                </button>
            </div>

            
            <div id="bottom"></div>

        </div>
    );
}