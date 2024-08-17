import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateScholarship = () => {
    const [name, setName] = useState('');
    const [criteria, setCriteria] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [fundsAvailable, setFundsAvailable] = useState('');
    const [fundallocated, setFundallocated] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:6001/api/v1/scholarship/createscholarship', {
                name,
                criteria,
                description,
                amount: parseFloat(amount),
                fundsAvailable: parseFloat(fundsAvailable),
                fundallocated: parseFloat(fundallocated),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            toast.success(response.data.message);
            navigate('/scholarships'); // Redirect to the scholarships list or any other page
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error creating scholarship');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Create Scholarship</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="criteria" className="block text-gray-700 font-bold mb-2">Criteria</label>
                    <input
                        type="text"
                        id="criteria"
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fundsAvailable" className="block text-gray-700 font-bold mb-2">Funds Available</label>
                    <input
                        type="number"
                        id="fundsAvailable"
                        value={fundsAvailable}
                        onChange={(e) => setFundsAvailable(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fundallocated" className="block text-gray-700 font-bold mb-2">Funds Allocated</label>
                    <input
                        type="number"
                        id="fundallocated"
                        value={fundallocated}
                        onChange={(e) => setFundallocated(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Scholarship'}
                </button>
            </form>
        </div>
    );
};

export default CreateScholarship;
