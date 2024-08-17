# Scholarship Management System

## Overview

This repository contains the backend code for a Scholarship Management System built with Node.js, Express, and MongoDB using Mongoose for schema management. The system includes schemas for Students, Scholarships, and Applications.

## Schemas

### 1. **Student Schema**

Represents a student in the system.

- **Name**: The student's full name (required).
- **Email**: The student's email address (required).
- **Password**: The student's hashed password (required).
- **Role**: The role of the student in the system. It can be `student`, `hod`, `principal`, or `finance` (default: `student`).
- **Department**: The department the student belongs to (optional, for HODs).

**Methods**:
- `comparePassword(password)`: Compares the provided password with the hashed password.
- `getJwtToken()`: Generates a JWT token for authentication.

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'hod', 'principal', 'finance'], default: 'student' },
    department: { type: String },
});

studentSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

studentSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

studentSchema.methods.getJwtToken = async function () {
    return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '15d' });
};

module.exports = mongoose.model('Student', studentSchema);


const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    criteria: { type: String, required: true },
    guidelines: { type: String },
    description: { type: String, required: true },
    deadline: { type: Date, required: true, default: Date.now() + 7 * 24 * 60 * 60 * 1000 },
    amount: { type: Number, required: true },
    fundsAvailable: { type: Number, required: true },
    fundallocated: { type: Number, required: true },
    date: { type: Date },
});

module.exports = mongoose.model("Scholarship", scholarshipSchema);
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    studentid: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    scholarshipid: { type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship' },
    studentform: {
        name: { type: String },
        email: { type: String },
        category: { type: String },
        gender: { type: String },
    },
    status: { type: String, default: 'pending' },
    submissionDate: { type: Date, default: Date.now },
    documents: [
        { public_id: String, url: String }
    ],
    hodfeedback: { type: String },
    principalfeedback: { type: String },
    departmentapproval: { type: Boolean, default: false },
    finalapproval: { type: Boolean, default: false },
    disbursementStatus: { type: String }
});

module.exports = mongoose.model('Application', applicationSchema);
