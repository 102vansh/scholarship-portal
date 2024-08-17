// src/components/GenerateReports.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const GenerateReports = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:6001/api/application/reports?startDate=${startDate}&endDate=${endDate}`, {
                headers: { 'Content-Type': 'application/json' },withCredentials: true
            });
            setReports(response.data);
            toast.success('Reports generated successfully');
            console.log(response.data);
        } catch (err) {
            setError('Error generating reports');
            toast.error('Error generating reports');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Generate Scholarship Reports</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate Report'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

            {/* Display reports if any */}
            {reports.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Report Summary</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Applications</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount Awarded</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reports.map((report, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.scholarshipName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{report.totalApplications}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">${report.totalAmountAwarded}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Toaster />
        </div>
    );
};

export default GenerateReports;
