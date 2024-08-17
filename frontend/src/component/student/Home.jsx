// components/ScholarshipList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const ScholarshipList = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const 
        {data} = await axios.get('http://localhost:6001/api/v1/scholarship/getscholarship');
        setScholarships(data.scholarship);
      } catch (err) {
        setError('Failed to fetch scholarships');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Scholarships</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map(scholarship => (
          <div key={scholarship._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{scholarship.name}</h2>
            <p className="text-gray-700 mb-2"><strong>Criteria:</strong> {scholarship.criteria}</p>
            <p className="text-gray-700 mb-2"><strong>Description:</strong> {scholarship.description}</p>
            <p className="text-gray-700 mb-2"><strong>Deadline:</strong> {new Date(scholarship.deadline).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-2"><strong>Amount:</strong> ${scholarship.amount}</p>
            {
                user?.role !== 'student'?<p className="text-gray-700 mb-2"><strong>Funds Available:</strong> ${scholarship.fundsAvailable}</p>:null
            }
            <Link to={`/application/${scholarship._id}`}>
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Apply
</button>
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipList;
