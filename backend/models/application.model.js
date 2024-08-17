const mongoose = require('mongoose')
const applicationSchema = new mongoose.Schema({
   studentid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Student'
   },
   scholarshipid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Scholarship'
   },
   studentform:{
name:{
type:String
},
email:{
type:String
},
category:{
type:String
},
gender:{
type:String
},
   },
   status:{
      type:String,
      default:'pending'
   },
   submissionDate:{
      type:Date,
      default:Date.now
   },
   documents: [
    {
      public_id: String,
      url: String
    }
  ],
   hodfeedback:{
      type:String
   },
   principalfeedback:{
      type:String
   },
   departmentapproval:{
      type:Boolean,
      default:false
   },
   finalapproval:{
      type:Boolean,
      default:false
   },
   disbursementStatus: String
   // 'pending', 'processed', 'completed'


   
})

module.exports = mongoose.model('Application', applicationSchema)