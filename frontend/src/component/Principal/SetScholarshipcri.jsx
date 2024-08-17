// src/components/SetScholarshipCriteria.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const SetScholarshipCriteria = () => {
    const [criteria, setCriteria] = useState('');
    const [guidelines, setGuidelines] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
        const { data } =  await axios.post('http://localhost:6001/api/v1/scholarship/criteria', { criteria, guidelines }, {
                headers: { 'Content-Type': 'application/json' },withCredentials: true
            });
            toast.success('Criteria updated successfully');
            console.log(data)
            setCriteria('');
            setGuidelines('');
        } catch (err) {
            setError('Error updating criteria');
            console.log(err)
            toast.error('Error updating criteria');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Set Scholarship Criteria and Guidelines</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">Criteria</label>
                    <textarea
                        id="criteria"
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                        className="mt-1 block w-full border-gray-800 rounded-md shadow-sm"
                        rows="4"
                        placeholder='Enter criteria here'
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="guidelines" className="block text-sm font-medium text-gray-700">Guidelines</label>
                    <textarea
                        id="guidelines"
                        value={guidelines}
                        onChange={(e) => setGuidelines(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        rows="4"
                        placeholder='Enter guidelines here'
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Criteria'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                
                <Toaster />
            </form>
        </div>
    );
};

export default SetScholarshipCriteria;
