const Application = require('../models/application.model')
const User = require('../models/user.models')
const Scholarship = require('../models/scholarshipmodal')
const {ErrorHandler} = require('../middleware/error')
const cloudinary = require('cloudinary')
exports.createapplication = async (req, res, next) => {
    try{
const{hodfeedback,principalfeedback,scholarshipid,studentform} = req.body
const studentid = req.user._id
 console.log('studentid',studentid)
const student  = await User.findById(studentid)
console.log('student',student)
if(!student ){
    return next(new ErrorHandler('student not found',404))
}
const scholarship = await Scholarship.findById(scholarshipid)
if(!scholarship){
    return next(new ErrorHandler('scholarship not found',404))
}
const existingapplication = await Application.findOne({studentid,scholarshipid})
if(existingapplication){
    return next(new ErrorHandler('application already exists',400))
}
const application = await Application.create({
    studentid,
    scholarshipid,
    
    hodfeedback,
    principalfeedback,
    studentform,
    documents:[{
        public_id: 'asd',
        url: 'asd'
    }]
})
res.status(201).json({
    success:true,
    message:'Application created successfully',
    application
})

    }catch(err){
        next(err)
    }
}

exports.getapplicationstatus = async (req, res, next) => {
    try{
        const userrole = req.user.role
    const userid = req.user._id
        const application = await Application.findById(req.params.id).populate('studentid', 'name email').populate('scholarshipid', 'name amount')
        if(!application){
            return next(new ErrorHandler('application not found',404))
        }
        // if (userrole === 'student' && application.studentid._id.toString() !== userid) {
        //     return res.status(403).json({ message: 'You do not have permission to view this application' });
        //   }

      if (userrole === 'hod') {
      const student = await User.findById(application.studentid);
      const hod = await User.findById(userid);
      if (student.department !== hod.department) {
        return res.status(403).json({ message: 'This application is not from your department' });
      }
    }

    if (userrole === 'student') {
        delete application.hodfeedback;
        delete application.principalfeedback;
        delete application.departmentapproval;
        // delete response.finalApproval;
      }
        res.status(200).json({
            success:true,
            message:'Application fetched successfully',
            application
        
        })
    }catch(err){
        next(err)
    }
}

// exports.listDepartmentApplications = async (req, res) => {
//     try {
//       const { department } = req.query;
//       const { role } = req.user;
//       console.log('Department:', department);
//       console.log('User Role:', role);
//       // Ensure only HODs can access this route
//       if (role !== 'hod') {
//         return res.status(403).json({ message: 'Access denied. Only HODs can view department applications.' });
//       }
  
//       // Find all students in the department
//       const studentsInDepartment = await User.find({ department, role: 'student' }).select('_id');
//       const studentIds = studentsInDepartment.map(student => student._id);
  
//       // Find all applications from students in the department
//       const applications = await Application.find({ studentid: { $in: studentIds } })
//         .populate('studentid', 'name email')
//         .populate('scholarshipid', 'name amount')
//         .select('status submissionDate departmentApproval');
  
//       const formattedApplications = applications.map(app => ({
//         id: app._id,
//         studentName: app.studentid.name,
//         studentEmail: app.studentid.email,
//         scholarshipName: app.scholarshipid.name,
//         scholarshipAmount: app.scholarshipid.amount,
//         status: app.status,
//         submissionDate: app.submissionDate,
//         departmentApproval: app.departmentapproval
//       }));
  
//       res.status(200).json(formattedApplications);
  
//     } catch (error) {
//       console.error('Error in listDepartmentApplications:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
exports.listDepartmentApplications = async (req, res) => {
    try {
        const { department } = req.query;
        const { role } = req.user;

        // Ensure only HODs can access this route
        if (role !== 'hod') {
            return res.status(403).json({ message: 'Access denied. Only HODs can view department applications.' });
        }

        console.log('Department:', department);
        console.log('User Role:', role);

        // Find all students in the department
        const studentsInDepartment = await User.find({ department, role: 'student' }).select('_id');
        console.log('Students in Department:', studentsInDepartment);

        if (studentsInDepartment.length === 0) {
            return res.status(200).json([]); // No students in the department
        }

        const studentIds = studentsInDepartment.map(student => student._id);

        console.log('Student IDs:', studentIds);

        // Find all applications from students in the department
        const applications = await Application.find({ studentid: { $in: studentIds } })
            .populate('studentid', 'name email')
            .populate('scholarshipid', 'name amount')
            .select('status submissionDate departmentApproval');

        console.log('Applications:', applications);

        const formattedApplications = applications.map(app => ({
            id: app._id,
            studentName: app.studentid.name,
            studentEmail: app.studentid.email,
            scholarshipName: app.scholarshipid.name,
            scholarshipAmount: app.scholarshipid.amount,
            status: app.status,
            submissionDate: app.submissionDate,
            departmentApproval: app.departmentapproval
        }));

        res.status(200).json(formattedApplications);

    } catch (error) {
        console.error('Error in listDepartmentApplications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

  exports.reviewApplication = async (req, res) => {
    try {
      const { id } = req.params;
      const { action, feedback } = req.body;
      const { role, department } = req.user;
  
      // Ensure only HODs can access this route
      if (role !== 'hod') {
        return res.status(403).json({ message: 'Access denied. Only HODs can review applications.' });
      }
  
      // Find the application
      const application = await Application.findById(id).populate('studentid');
  
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
  
      // Ensure the application belongs to the HOD's department
      if (application.studentid.department !== department) {
        return res.status(403).json({ message: 'You can only review applications from your department.' });
      }
  
      // Update the application based on the action
      if (action === 'approve') {
        application.status = 'approved_by_hod';
        application.departmentapproval = true;
      } else if (action === 'reject') {
        application.status = 'rejected';
        application.departmentapproval = false;
      } else {
        return res.status(400).json({ message: 'Invalid action. Use "approve" or "reject".' });
      }
  
      // Add HOD feedback
      application.hodfeedback = feedback || '';
  
      // Save the updated application
      await application.save();
  
      res.status(200).json({
        message: `Application ${action}d successfully`,
        applicationId: application._id,
        status: application.status,
        departmentApproval: application.departmentApproval
      });
  
    } catch (error) {
      console.error('Error in reviewApplication:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.createscholarship = async(req, res, next) => {
    try{
const{name,criteria,description,amount,fundsAvailable,fundallocated} = req.body
const {role} = req.user
if(!name || !criteria || !description || !amount){
    return next(new ErrorHandler('please enter all fields',400))
}
if(role!='finance'){
    return next(new ErrorHandler('only principal can create scholarship',400))
}
const scholarship = await Scholarship.create({
    name,
    criteria,
    description,
    amount,
    fundsAvailable,
    fundallocated
})
res.status(201).json({
    success:true,
    message:'scholarship created successfully',
    scholarship
})


  }catch(err){
    next(err)
  }
}

exports.getallapplications = async (req, res, next) => {
    try{
        const {role} = req.user
        if(role!='principal' && role!='hod' && role!='student'){
            return next(new ErrorHandler('only principal can view applications',400))
        }
        const applications = await Application.find().populate('studentid', 'name email').populate('scholarshipid', 'name amount')
        res.status(200).json({
            success:true,
            message:'applications fetched successfully',
            applications
        })
    }catch(err){
        next(err)
    }
}

//finance  retrive all approve applications

exports.allapproveapplications = async (req, res, next) => {
    try{
        const {role} = req.user
        if(role!='finance'){
            return next(new ErrorHandler('only finance can view applications',400))
        }
        const applications = await Application.find({status:'approved_by_hod'}).populate('studentid', 'name email').populate('scholarshipid', 'name amount')
        res.status(200).json({
            success:true,
            message:'applications fetched successfully',
            applications
        })
    }catch(err){
        next(err)
    }
}
exports.allocateFunds = async (req, res) => {
    try {
        const { scholarshipid, amount } = req.body;

        // Find the scholarship
        const scholarship = await Scholarship.findById(scholarshipid);
        if (!scholarship) {
            return res.status(404).json({ success: false, message: 'Scholarship not found.' });
        }

        // Check if the scholarship is approved
        const applications = await Application.find({
            scholarshipid,
            status: 'approved',
            disbursementStatus: { $ne: 'completed' }
        });

        if (applications.length === 0) {
            return res.status(404).json({ success: false, message: 'No approved applications found.' });
        }

        // Distribute funds among approved applications
        const amountPerApplication = amount / applications.length;
        await Promise.all(applications.map(async (app) => {
            app.disbursementStatus = 'processed';
            await app.save();
        }));

        // Optionally, update scholarship funds
        scholarship.fundsAvailable -= amount;
        await scholarship.save();

        res.status(200).json({
            success: true,
            message: 'Funds allocated successfully.'
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.trackDisbursement = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found.' });
        }

        res.status(200).json({
            success: true,
            application
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.upladdocument = async(req,res,next)=>{

try {
    if (!req.files || !req.files.documents) {
        return next(new ErrorHandler('No files uploaded', 400));
    }

    const files = req.files.documents;
    // if (!Array.isArray(files)) {
    //     return next(new ErrorHandler('Documents should be an array', 400));
    // }

    const uploadPromises = files.map(file => {
        return cloudinary.uploader.upload(file.tempFilePath, {
         // Folder in Cloudinary
        });
    });

    const results = await Promise.all(uploadPromises);

    // Map results to the format required for the documents array
    const documents = results.map(result => ({
        public_id: result.public_id,
        url: result.secure_url,
    }));
    await Application.create({
        document:documents
    }
    )

    res.status(200).json({
        success: true,
        message: 'Files uploaded successfully',
        documents,
    });
} catch (error) {
    next(error);
}
}

exports.hodfeedback = async(req,res,next)=>{
    try{
        const{hodfeedback} = req.body
        const application = await Application.findById(req.params.id)
        if(!application){
            return next(new ErrorHandler('application not found',404))
        }
        application.hodfeedback = hodfeedback
        await application.save()
        res.status(200).json({
            success:true,
            message:'hod feedback submitted successfully'
        })

    }catch(error){
return next(error)
    }
}

exports.approveform = async(req,res,next)=>{
    const {role} = req.user
    
    try{
const application = await Application.findById(req.params.id)
if(role!='hod'){
    return next(new ErrorHandler('only hod can approve applications',400))    
}
if(!application){
    return next(new ErrorHandler('application not found',404))
}
if(application.departmentapproval){
    return next(new ErrorHandler('application already approved',400))
}
application.departmentapproval = true
await application.save()
res.status(200).json({
    success:true,
    message:'application approved successfully'
})

    }catch(error){
return next(error)
    }
}
exports.rejectform = async(req,res,next)=>{
    try{
        const {role} = req.user
        if(role!='hod'){
            return next(new ErrorHandler('only hod can reject applications',400))    
        }
        const application = await Application.findById(req.params.id)
        if(!application){
            return next(new ErrorHandler('application not found',404))
        }
        application.departmentapproval = false
        await application.save()
        res.status(200).json({
            success:true,
            message:'application rejected successfully'
        })
    
    }catch(error){
return next(error)
    }
}
exports.getmyapplication = async(req,res,next)=>{
try{
const studentid = req.user._id
const application = await Application.find({studentid})
res.status(200).json({
    success:true,
    application
})
}catch(error){
return nexr(error)
}

}

exports.principalreviewApplications = async (req, res) => {
    try {
        // Fetch applications recommended by HODs and pending Principal approval
        const applications = await Application.find({ departmentapproval: true, finalApproval: { $exists: false } })
            .populate('studentid', 'name email')
            .populate('scholarshipid', 'name amount');

        res.status(200).json(applications);
    } catch (error) {
        console.error('Error in reviewApplications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.approveApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findByIdAndUpdate(id, { finalapproval: true }, { new: true });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
application.status = 'approve'
await application.save()
        res.status(200).json({ success: true, message: 'Application approved successfully', application });
    } catch (error) {
        console.error('Error in approveApplication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reject Application
exports.rejectApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await Application.findByIdAndUpdate(id, { finalapproval: false }, { new: true });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = 'reject'
await application.save()

        res.status(200).json({ success: true, message: 'Application rejected successfully', application });
    } catch (error) {
        console.error('Error in rejectApplication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// src/controllers/scholarshipController.js

// Set or update scholarship criteria and guidelines
// src/controllers/reportController.js

// Generate reports on scholarship applications and awards
exports.generateReports = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Assuming you have a way to aggregate data, e.g., using Mongoose aggregate
        const reports = await Application.aggregate([
            { $match: { submissionDate: { $gte: new Date(startDate), $lte: new Date(endDate) } } },
            { $group: { _id: '$scholarshipid', totalAmount: { $sum: '$scholarshipAmount' }, count: { $sum: 1 } } }
        ])
        .populate('scholarshipid', 'name');

        res.status(200).json(reports);
    } catch (error) {
        console.error('Error in generateReports:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// src/controllers/notificationController.js
// const nodemailer = require('nodemailer');

// // Send notification to students and HODs
// exports.sendNotification = async (req, res) => {
//     try {
//         const { recipientEmails, subject, message } = req.body;

//         // Configure nodemailer
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: '28VJ9@example.com',
//                 pass: '123456'
//             }
//         });

//         // Send email
//         const mailOptions = {
//             from: '28VJ9@example.com',
//             to: recipientEmails,
//             subject: subject,
//             text: message
//         };

//         await transporter.sendMail(mailOptions);

//         res.status(200).json({ success: true, message: 'Notification sent successfully' });
//     } catch (error) {
//         console.error('Error in sendNotification:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.trackDisbursements = async (req, res, next) => {
    try {
        const { scholarshipId, dateRange } = req.query;
        let filter = {};

        if (scholarshipId) {
            filter.scholarshipid = scholarshipId;
        }

        if (dateRange) {
            const [startDate, endDate] = dateRange.split(',');
            filter.submissionDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const disbursements = await Application.find(filter)
            .populate('studentid scholarshipid', 'name email amount')
            .select('status disbursementStatus submissionDate');

        res.status(200).json({
            success: true,
            disbursements,
        });
    } catch (error) {
        next(error);
    }
};

exports.generateFinancialReport = async (req, res, next) => {
    try {
        const { dateRange } = req.query;
        let filter = {};

        if (dateRange) {
            const [startDate, endDate] = dateRange.split(',');
            filter.submissionDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const applications = await Application.find(filter)
            .populate('scholarshipid', 'amount')
            .select('scholarshipid status disbursementStatus');

        const report = {
            totalSpent: 0,
            breakdown: [],
        };

        applications.forEach(app => {
            if (app.disbursementStatus === 'completed') {
                report.totalSpent += app.scholarshipid.amount;
                report.breakdown.push({
                    scholarshipId: app.scholarshipid._id,
                    amount: app.scholarshipid.amount,
                });
            }
        });

        res.status(200).json({
            success: true,
            report,
        });
    } catch (error) {
        next(error);
    }
};

// exports.statusofscholarship = async(req,res,next) =>{
//     try{
//         const studentid  = req.user._id
//         console.log(studentid)
// const data = await Application.findOne(studentid)
// console.log(data)
// if(!data){
//     return next(new ErrorHandler('application not found',401))
// }
// if(req.user.role !=='student'){
//     return next(new ErrorHandler('student are only allow to this role',401))
// }
// let status = data.status
// res.status(201).json({
//     success:true,
//     status
// })
//     }catch(error){
//         return next(error)
//     }
// }

exports.statusofscholarship = async (req, res, next) => {
    try {
        const application = await Application.findOne({ studentid: req.user._id, scholarshipid: req.params.scholarshipid });

    if (!application) {
        return next(new ErrorHandler('Application not found', 404));
    }

    res.status(200).json({
        success: true,
        status: application.status,
    });
}catch(error){
    return next(error)
}
};
