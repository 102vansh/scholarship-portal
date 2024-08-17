import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CheckApplicationStatus = () => {
    const [scholarshipId, setScholarshipId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkStatus = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:6001/api/v1/application/status/${scholarshipId}`, {
                withCredentials: true, // Ensure cookies are sent with the request
            });
            setStatus(response.data.status);
            toast.success('Status fetched successfully');
        } catch (error) {
            toast.error('Error fetching status');
            console.error('Error fetching status:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Check Scholarship Application Status</h1>
            <div className="mb-4">
                <label htmlFor="scholarshipId" className="block text-gray-700 font-bold mb-2">
                    Scholarship ID
                </label>
                <input
                    id="scholarshipId"
                    type="text"
                    value={scholarshipId}
                    onChange={(e) => setScholarshipId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
            <button
                onClick={checkStatus}
                className="bg-blue-500 text-white p-2 rounded-md"
                disabled={loading}
            >
                {loading ? 'Checking...' : 'Check Status'}
            </button>
            {status && (
                <div className="mt-4 p-4 border border-gray-300 rounded-md">
                    <h2 className="text-lg font-semibold">Application Status</h2>
                    <p>{status}</p>
                </div>
            )}
        </div>
    );
};

export default CheckApplicationStatus;
