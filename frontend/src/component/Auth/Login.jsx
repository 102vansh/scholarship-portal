import React from 'react'
import toast,{Toaster} from 'react-hot-toast';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/Slices.js/UserSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");
    const dispatch = useDispatch()
    const submithandler= async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post(
                'http://localhost:6001/api/v1/user/login',{
                    
                    email,
                    password,
                    
                },{
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                })
                toast.success(data.message)
                console.log(data.user)
                dispatch(login(data.user))
                setEmail("")
                setPassword("")
                navigate("/")
                    }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
                    }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={submithandler} className="flex flex-col space-y-4">
              
              <div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter email" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter password" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
              <p className='text-center'>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
              <Toaster position="top-center" reverseOrder={false} />
            </form>
          </div>
        </div>
      );
}

export default Login