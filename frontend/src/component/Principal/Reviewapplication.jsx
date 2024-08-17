// src/components/ReviewApplications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ReviewApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:6001/api/v1/application/getreview', {
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },withCredentials: true
                });
                setApplications(response.data);
                toast.success('Applications fetched successfully');
                console.log(response.data);
            } catch (err) {
                setError('Error fetching applications');
                toast.error('Error fetching applications');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        
        <div className="p-6 bg-white shadow-md rounded-lg">
            <Link to={'/notification'}><button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 position-absolute top-0 right-0">Communicate HODs</button></Link>
            <h2 className="text-2xl font-bold mb-4">Review Applications</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map(app => (
                        <tr key={app._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{app.studentid.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{app.studentid.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{app.scholarshipid.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${app.scholarshipid.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(app.submissionDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                                    onClick={() => handleApproval(app._id, true)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                    onClick={() => handleApproval(app._id, false)}
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between">
            <Link to={'/criteria'}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">Add Criteria</button></Link>
                <Link to={'/generatereport'}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 ml-4">Generate Report</button></Link>

                
            </div>
            <div>
            
            </div>
            <Toaster />
        </div>
    );
};

const handleApproval = async (id, isApproved) => {
    try {
        const url = `http://localhost:6001/api/v1/application/principalapprove/${id}`;
     const {data} =    await axios.post(url, {}, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        toast.success(`Application ${isApproved ? 'approved' : 'rejected'} successfully`);
    
    } catch (err) {
        toast.error(`Error ${isApproved ? 'approving' : 'rejecting'} application`);
        console.log(err);
    }
};

export default ReviewApplications;
