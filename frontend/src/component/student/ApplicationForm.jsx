import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ApplicationForm = () => {
    const navigate = useNavigate()
    const {application} = useSelector((state)=>state.user)
    const [scholarshipId, setScholarshipId] = useState('');
    const[loading,isLoading] = useState(false);
    // const [hodFeedback, setHodFeedback] = useState('');
    // const [principalFeedback, setPrincipalFeedback] = useState('');
    const [documents, setDocuments] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [studentForm, setStudentForm] = useState({
        name: '',
        email: '',
        category: '',
        gender: ''
    });
const {id} = useParams();
    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentForm({
            ...studentForm,
            [name]: value
        });
    };
    
    const handleUploadDocuments = async () => {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('documents', selectedFiles[i]);
        }
        try {
            const response = await axios.post('http://localhost:6001/api/v1/application/uploaddocument', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            setDocuments(response.data.documents);
        } catch (error) {
            console.error('Error uploading documents', error);
            toast.error(error.response.data.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        isLoading(true);
        try {
            
            await handleUploadDocuments();
            const applicationData = {
                scholarshipid: id,
                // hodfeedback: hodFeedback,
                // principalfeedback: principalFeedback,
                documents,
                ...studentForm
            };
            const response = await axios.post('http://localhost:6001/api/v1/application/createapplication', applicationData,{
                withCredentials: true
            });
    toast.success(response.data.message);
            isLoading(false);
            navigate('/checkstatus')
            useEffect(()=>{
                application.scholarshipid
            },[response])
        } catch (error) {
            console.error('Error creating application', error);
            toast.error(error.response.data.message);
            isLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scholarship">
                    Scholarship
                </label>
                <input
                    type="text"
                    id="scholarship"
                    value={scholarshipId}
                    onChange={(e) => setScholarshipId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            {/* <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hodFeedback">
                    HOD Feedback
                </label>
                <textarea
                    id="hodFeedback"
                    value={hodFeedback}
                    onChange={(e) => setHodFeedback(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="principalFeedback">
                    Principal Feedback
                </label>
                <textarea
                    id="principalFeedback"
                    value={principalFeedback}
                    onChange={(e) => setPrincipalFeedback(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div> */}
 <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={studentForm.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={studentForm.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={studentForm.category}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={studentForm.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documents">
                    Upload Documents
                </label>
                <input
                    type="file"
                    id="documents"
                    multiple
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {loading ? 'loading...' : 'Submit'}  
                </button>
            </div>
            <Toaster/>
        </form>
    );
};

export default ApplicationForm;
