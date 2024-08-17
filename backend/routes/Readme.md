Scholarship Management System - API Routes
Overview
This document describes the available API routes for the Scholarship Management System. The routes are organized based on their functionality and are protected by authentication and role-based authorization.

Routes
Application Routes
Create Application

POST /createapplication
Description: Create a new scholarship application.
Roles: Student
Authorization: Requires authentication.
Get Application Status

GET /getapplicationstatus/:id
Description: Fetch the status of a scholarship application by ID.
Roles: HOD, Student
Authorization: Requires authentication.
List Department Applications

GET /listdepartmentapplication
Description: List all applications for the department.
Roles: HOD
Authorization: Requires authentication.
Review Application

PUT /reviewappliaction/:id
Description: Review and update the status of an application.
Roles: HOD
Authorization: Requires authentication.
Upload Document

POST /uploaddocument
Description: Upload documents related to an application.
Roles: Student
Authorization: Requires authentication.
HOD Feedback

POST /feedbackhod/:id
Description: Provide feedback on an application.
Roles: HOD
Authorization: Requires authentication.
Approve Application (HOD)

POST /approve/:id
Description: Approve an application by HOD.
Roles: HOD
Authorization: Requires authentication.
Reject Application (HOD)

POST /reject/:id
Description: Reject an application by HOD.
Roles: HOD
Authorization: Requires authentication.
Principal Review Applications

GET /getreview
Description: Fetch applications for review by the Principal.
Roles: Principal
Authorization: Requires authentication.
Approve Application (Principal)

POST /principalapprove/:id
Description: Approve an application by the Principal.
Roles: Principal
Authorization: Requires authentication.
Reject Application (Principal)

POST /reject/:id
Description: Reject an application by the Principal.
Roles: Principal
Authorization: Requires authentication.
Status of Scholarship

GET /status/:id
Description: Fetch the status of a scholarship.
Roles: Student
Authorization: Requires authentication.
Scholarship Routes
Create Scholarship

POST /createscholarship
Description: Create a new scholarship.
Roles: Finance
Authorization: Requires authentication.
Get All Applications

GET /getapplication
Description: Get a list of all scholarship applications.
Roles: Principal
Authorization: Requires authentication.
Approve All Applications

GET /approvalapplication
Description: Get all approved applications.
Roles: Finance
Authorization: Requires authentication.
Report Routes
Generate Reports

GET /reports
Description: Generate scholarship reports.
Roles: Principal
Authorization: Requires authentication.
Generate Financial Report

GET /financereport
Description: Generate financial reports for scholarship funds.
Roles: Finance
Authorization: Requires authentication.
Notification Routes
Send Notification
POST /notifications
Description: Send notifications related to scholarships.
Roles: Principal
Authorization: Requires authentication.
Financial Management Routes
Track Disbursement
GET /funddis
Description: Track the disbursement of scholarship funds.
Roles: Finance
Authorization: Requires authentication.
Middleware
isAuthenticates: Ensures that the user is authenticated.
authorizerole: Ensures that the user has the appropriate role for the requested action.


User Authentication and Profile Management - API Routes
Overview
This document describes the available API routes for user authentication and profile management in the Scholarship Management System. These routes handle user registration, login, logout, and fetching user profile information. All routes are protected by authentication middleware.

Routes
Authentication Routes
Register

POST /register
Description: Register a new user.
Roles: Open to all users.
Authorization: No authentication required.
Login

POST /login
Description: Authenticate and log in a user.
Roles: Open to all users.
Authorization: No authentication required.
Logout

GET /logout
Description: Log out the current user.
Roles: All authenticated users
Authorization: Requires authentication.
Profile Routes
Get My Profile
GET /getmyprofile
Description: Fetch the profile information of the currently authenticated user.
Roles: All authenticated users
Authorization: Requires authentication.
Middleware
isAuthenticates: Ensures that the user is authenticated before accessing protected routes.
Controller Functions
register: Handles user registration.
login: Handles user login and authentication.
logout: Handles user logout.
getmyprofile: Fetches the profile information of the currently authenticated user.
Setup and Configuration
Install Dependencies: Ensure you have the necessary dependencies installed using npm install.
Start Server: Start the server with npm start or a similar command specified in your package.json