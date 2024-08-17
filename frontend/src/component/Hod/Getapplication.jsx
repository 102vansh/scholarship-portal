// // src/components/DepartmentApplications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProvideFeedbackForm from './ProvideFeedbackForms';
 import ApproveRejectApplication from './ApproveRejectApplication';
import { useDispatch } from 'react-redux';
import { getapplications } from '../../redux/Slices.js/UserSlice';


const DepartmentApplications = () => {
    const dispatch = useDispatch();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const [selectedApplication, setSelectedApplication] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:6001/api/v1/application/listdepartmentapplication`, {
                    params: { department: query },
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },withCredentials: true
                });
                setApplications(response.data);
                console.log(response.data)
                dispatch(getapplications(response.data))
                setLoading(false);
            } catch (err) {
                setError('Error fetching applications');
                console.log(err)
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [query]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleProvideFeedback = (application) => {
                setSelectedApplication(application);
            };
        
            const handleCloseFeedback = () => {
                 setSelectedApplication(null);
             };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Department Applications</h2>
            <input 
                className='mb-4 p-4 m-2 rounded-lg border border-gray-300' 
                type="text" 
                placeholder="Search by department" 
                value={query} 
                onChange={e => setQuery(e.target.value)}
            />
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Approval</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map(app => (
                        <tr key={app.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{app.studentName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{app.studentEmail}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{app.scholarshipName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${app.scholarshipAmount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{app.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(app.submissionDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{app.departmentapproval ? 'Approved' : 'Pending' }</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2" onClick={() => handleProvideFeedback(app)}>Provide Feedback</button>
                                <ApproveRejectApplication applicationId={app.id}  />
                                {/* Add more action buttons as needed */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {applications.length === 0 && <p>No applications found</p>}
            {selectedApplication && (
                 <ProvideFeedbackForm application={selectedApplication} onClose={handleCloseFeedback} />
           )}
        </div>
    );
};

export default DepartmentApplications;

// src/components/DepartmentApplications.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProvideFeedbackForm from './ProvideFeedbackForms';
// import ApproveRejectApplication from './ApproveRejectApplication';

// const DepartmentApplications = () => {
//     const [applications, setApplications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedApplication, setSelectedApplication] = useState(null);
//     const [query, setQuery] = useState("");

//     useEffect(() => {
//         const fetchApplications = async () => {
//             try {
//                 const response = await axios.get('http://localhost:6001/api/v1/application/listdepartmentapplication', {
//                     params: { department: 'query' }, // Replace with actual department query
//                     headers: { 'Content-Type': 'application/json',  },withCredentials: true
//                 });
//                 setApplications(response.data);
//                 setLoading(false);
//                 console.log(response.data);
//             } catch (err) {
//                 setError('Error fetching applications');
//                 console.log(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchApplications();
//     }, [query]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     const handleProvideFeedback = (application) => {
//         setSelectedApplication(application);
//     };

//     const handleCloseFeedback = () => {
//         setSelectedApplication(null);
//     };

//     return (
//         <div className="p-6 bg-white shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Department Applications</h2>
//             <input 
//                  className='mb-4 p-4 m-2 rounded-lg border border-gray-300' 
//                 type="text" 
//                 placeholder="Search by department" 
//                 value={query} 
//                  onChange={e => setQuery(e.target.value)}
//            />
//             <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                     <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Email</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scholarship Name</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department Approval</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {applications.map(app => (
//                         <tr key={app.id}>
//                             <td className="px-6 py-4 whitespace-nowrap">{app.studentName}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{app.studentEmail}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{app.scholarshipName}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">${app.scholarshipAmount}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{app.status}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{new Date(app.submissionDate).toLocaleDateString()}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">{app.departmentApproval ? 'Approved' : 'Pending'}</td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2" onClick={() => handleProvideFeedback(app)}>Provide Feedback</button>
//                                 <ApproveRejectApplication applicationId={app.id} />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {selectedApplication && (
//                 <ProvideFeedbackForm application={selectedApplication} onClose={handleCloseFeedback} />
//             )}
//         </div>
//     );
// };

// export default DepartmentApplications;

