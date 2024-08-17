import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import toast,{Toaster} from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Register = () => {
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[role,setRole] = useState('')
    const[department,setDepartment] = useState('')
console.log(name,email,password,role,department)
    const submithandler = async(e) =>{
        e.preventDefault()
        try{
const {data} = await axios.post(
    'http://localhost:6001/api/v1/user/register',{
        name,
        email,
        password,
        role,
        department
    },{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    })
    toast.success(data.message)
    console.log(data.user)
    setDepartment('')
    setEmail('')
    setName('')
    setPassword('')
    setRole('')
        }catch(error){
console.log(error)
toast.error(error.response.data.message)
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={submithandler} className="flex flex-col space-y-4">
          <div>
            <input 
              type="text"
              value={name} 
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter username" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
          <div>
            <select 
              value={role}
              onChange={(e)=>setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="hod">HOD</option>
              <option value="principal">Principal</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div>
            {
                role == 'student' ? <><input 
                value={department}
                onChange={(e)=>setDepartment(e.target.value)}
                type="text" 
                placeholder="Enter Department" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              /></> : null
            }
            
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
          <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
          <Toaster position="top-center" reverseOrder={false} />
        </form>
      </div>
    </div>
  );
}

export default Register;
