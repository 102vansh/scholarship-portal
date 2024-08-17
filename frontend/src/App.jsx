import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './component/Auth/Register'
import Login from './component/Auth/Login'
import ScholarshipList from './component/student/Home'
import ApplicationForm from './component/student/ApplicationForm'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Getapplication from './component/Hod/Getapplication'
import ReviewApplications from './component/Principal/Reviewapplication'
import Navbar from './component/Navbar'
import ProfilePage from './component/Auth/Profile'
import SetScholarshipCriteria from './component/Principal/SetScholarshipcri'
import GenerateReports from './component/Principal/Generatereport'
import SendNotification from './component/Principal/Notification'
import AllocateFunds from './component/finance/Approval'
import CheckApplicationStatus from './component/student/ApplicationStatus'
import CreateScholarship from './component/finance/Createscholarship'

const App = () => {
  const {user} = useSelector((state) => state.user)
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        {
          user?.role === "student"?<Route path='/' element={<ScholarshipList />} />: null
        }
        {
          user?.role === "hod"? <Route path='/' element={<Getapplication />}/> : null
        }
        {
          user?.role === "principal" ?<Route path='/' element={<ReviewApplications/>}/> : null
       
        }
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/application/:id' element={<ApplicationForm/>}></Route>
        <Route path='/criteria' element={<SetScholarshipCriteria />}></Route>
        <Route path='/generatereport' element={<GenerateReports />}></Route>
        {
          user.role === "principal"? <Route path='/notification' element={<SendNotification />}/> : null
        }
        {
          user.role === 'finance'?<Route path='/' element={<AllocateFunds />}/> : null
        }
        {
          user.role === 'student' ? <Route path = '/checkstatus' element={<CheckApplicationStatus/>}/> : null
        }
        {
          user.role === 'finance'?<Route path='/createscholarship' element={<CreateScholarship />}/> : null
        }
        
      </Routes>
      <Toaster/>
      </BrowserRouter>
    </div>
  )
}

export default App