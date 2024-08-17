import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AllocateFunds = () => {
  const [scholarshipid, setScholarshipId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleAllocate = async () => {
    try {
      const response = await axios.post('http://localhost:6001/api/v1/scholarship/allocate', {
        scholarshipid,
        amount,
        // date,
      },{
        headers: { 'Content-Type': 'application/json' },withCredentials: true
    });
      setMessage(response.data.message);
      console.log(response.data);
      toast.success(message)
    } catch (error) {
      setMessage('Failed to allocate funds');
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Link to={'/createscholarship'}><button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"'>create Scholarship</button>  </Link>
      <h1 className="text-2xl font-bold mb-4">Allocate Funds</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Scholarship ID</label>
          <input
            type="text"
            value={scholarshipid}
            onChange={(e) => setScholarshipId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter scholarship ID"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div> */}
        <button
          onClick={handleAllocate}
          className="bg-blue-500 text-white p-3 rounded-md"
        >
          Allocate Funds
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AllocateFunds;
