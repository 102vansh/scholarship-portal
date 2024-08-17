const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['student', 'hod','principal','finance'],
        default: 'student'
    },
    department:{
        type:String,
         //For HODS
    },

});
studentSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
studentSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
studentSchema.methods.getJwtToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });
}

module.exports = mongoose.model('Student', studentSchema)