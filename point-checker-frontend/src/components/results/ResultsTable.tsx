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
                <table className="w-full divide-y divide-pink-200">
                    <thead className="bg-pink-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">X</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Y</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">R</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Hit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-pink-200">
                    {points.map((point) => (
                        <tr key={point.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{point.x.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{point.y.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{point.r}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        point.hit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {point.hit ? 'Hit' : 'Miss'}
                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(point.timestamp).toLocaleDateString()} {new Date(point.timestamp).toLocaleTimeString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
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

            <div className="flex justify-between items-center">
                <a
                    href="#bottom"
                    className="p-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 shadow-lg fixed bottom-8 right-8 w-12 h-12 flex justify-center items-center"
                >
                    <span className="text-lg font-bold">↓</span>
                </a>
                
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