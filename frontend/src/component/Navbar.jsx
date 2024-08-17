import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa'; // Import a user icon from react-icons
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
const navigate = useNavigate();
    const logouthandler = async() => {
try{
const {data} = await axios.get('http://localhost:6001/api/v1/user/logout',{withCredentials:true});
toast.success(data?.message);
console.log(data?.message);
navigate("/login");
}catch(error){
console.log(error);
toast.error(error.response?.data.message);
}

    }
  return (
    <nav className="bg-gray-800 text-white flex items-center justify-between p-4">
      <div className="text-xl font-bold">
        Scholarship Portal
      </div>
      <div className="flex items-center gap-3">
        <Link to ="/login" className="mr-4">
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
         
          Login
        </button>
        </Link>
        <button onClick={logouthandler} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">Logout</button>
       <Link to={"/profile"}><FaUser className="mr-2" /></Link> 
      </div>
    </nav>
  );
};

export default Navbar;
