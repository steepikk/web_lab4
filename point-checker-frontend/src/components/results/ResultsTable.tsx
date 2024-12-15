import React from 'react';
import { Point } from '../../types';

interface ResultsTableProps {
    points: Point[];
}

export function ResultsTable({ points }: ResultsTableProps) {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full divide-y divide-pink-200">
                <thead className="bg-pink-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">X</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Y</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">R</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Hit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-pink-500 uppercase tracking-wider">Time</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-pink-200">
                {points.map((point, index) => (
                    <tr key={index}>
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

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}