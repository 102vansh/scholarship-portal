// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProfilePage = () => {
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: '',
//     department: '',
//     profilePicture: '',
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:6001/api/v1/user/getmyprofile', { withCredentials: true }); // API endpoint to fetch profile data
//         setUser(response.data.user);
//         setIsLoading(false);
//         console.log(response.data.user);
//       } catch (error) {
//         setError('Failed to fetch user data');
//         setIsLoading(false);
//         console.log(error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>; // Display a loading state while fetching data
//   }

//   if (error) {
//     return <div>{error}</div>; // Display an error message if there was an issue fetching data
//   }

//   return (
//     <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Name</label>
//           <p className="p-3 border border-gray-300 rounded-md">{user.name}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Email</label>
//           <p className="p-3 border border-gray-300 rounded-md">{user.email}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Role</label>
//           <p className="p-3 border border-gray-300 rounded-md">{user.role}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Department</label>
//           <p className="p-3 border border-gray-300 rounded-md">{user.department}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    department: '',
    profilePicture: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:6001/api/v1/user/getmyprofile', { withCredentials: true });
        setUser(response.data.user);
        setIsLoading(false);
        console.log(response.data.user);
      } catch (error) {
        setError('Failed to fetch user data');
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white text-center py-4">
          <h2 className="text-2xl font-bold">{user.role} Profile</h2>
        </div>
        <div className="p-6">
          <div className="mb-6 border-b pb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <p className="text-gray-800">{user.name}</p>
          </div>
          <div className="mb-6 border-b pb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div className="mb-6 border-b pb-4">
            <label className="block text-gray-700 font-bold mb-2">Role</label>
            <p className="text-gray-800">{user.role}</p>
          </div>
          <div className="mb-6">
          {user?.role === 'student' ? (
  <>
    <label className="block text-gray-700 font-bold mb-2">Department</label>
    <p className="text-gray-800">{user.department}</p>
  </>
) : null}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
