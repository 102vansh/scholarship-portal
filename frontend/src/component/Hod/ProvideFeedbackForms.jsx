// src/components/ProvideFeedbackForm.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProvideFeedbackForm = ({ application, onClose }) => {
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`http://localhost:6001/api/v1/application/feedbackhod/${application.id}`, { feedback }, {
                headers: { 'Content-Type': 'application/json' },withCredentials: true
            });
            console.log('Feedback submitted successfully');
            toast.success('Feedback submitted successfully');
            onClose();
        } catch (err) {
            setError('Error submitting feedback');
            console.error(err);
            toast.error('Error submitting feedback');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Provide Feedback</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full p-2 border rounded-lg mb-4"
                        rows="4"
                        placeholder="Enter your feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>
                <button className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProvideFeedbackForm;
