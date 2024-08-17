// src/components/ApproveRejectApplication.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ApproveRejectApplication = ({ applicationId,fetchfunc }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
const {applications} = useSelector((state) => state.user)
    useEffect(() => {
       
    }, [applicationId]);

    const handleApproval = async (isApproved) => {
        setLoading(true);
        try {
          const {data} =   await axios.post(`http://localhost:6001/api/v1/application/approve/${applicationId}`, {}, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            console.log(`Application ${isApproved ? 'approved' : 'rejected'} successfully`);
            toast.success(data.message)

        } catch (err) {
            setError(`Error ${isApproved ? 'approving' : 'rejecting'} application`);
            console.log(err);
            toast.error(err.response.data.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                onClick={() => handleApproval(true)}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Approve'}
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => handleApproval(false)}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Reject'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Toaster />
        </div>
    );
};

export default ApproveRejectApplication;
