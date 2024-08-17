Here's a comprehensive README file for your Scholarship Management System backend:

---

# Scholarship Management System - Backend

## Overview

The Scholarship Management System backend provides APIs for managing scholarship applications, user authentication, profile management, and financial reports. This system uses Node.js with Express, Cloudinary for file uploads, and MongoDB for data storage.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Routes](#api-routes)
  - [User Authentication and Profile Management](#user-authentication-and-profile-management)
  - [Scholarship Management](#scholarship-management)
  - [Application Management](#application-management)
  - [Reporting and Notifications](#reporting-and-notifications)
  - [Financial Management](#financial-management)
- [Middleware](#middleware)
- [Setup and Running the Server](#setup-and-running-the-server)

## Installation

1. **Clone the Repository**
   ```bash
   git clone git remote add origin https://github.com/102vansh/scholarship-portal.git
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables**
   - Create a `.env` file in the `config` directory with the following content:
     ```
     PORT=YOUR_PORT
     CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
     CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
     CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
     ```

2. **Database Connection**
   - Ensure MongoDB is set up and connected. Update the `./db/conn` file as needed to configure your MongoDB connection.

## API Routes

### User Authentication and Profile Management

- **Register**
  - `POST /api/v1/user/register`
  - **Description:** Register a new user.
  - **Roles:** Open to all users.
  - **Authorization:** No authentication required.

- **Login**
  - `POST /api/v1/user/login`
  - **Description:** Authenticate and log in a user.
  - **Roles:** Open to all users.
  - **Authorization:** No authentication required.

- **Logout**
  - `GET /api/v1/user/logout`
  - **Description:** Log out the current user.
  - **Roles:** All authenticated users.
  - **Authorization:** Requires authentication.

- **Get My Profile**
  - `GET /api/v1/user/getmyprofile`
  - **Description:** Fetch the profile information of the currently authenticated user.
  - **Roles:** All authenticated users.
  - **Authorization:** Requires authentication.

### Scholarship Management

- **Create Scholarship**
  - `POST /api/v1/scholarship/createscholarship`
  - **Description:** Create a new scholarship.
  - **Roles:** Finance.
  - **Authorization:** Requires authentication.

- **Get All Applications**
  - `GET /api/v1/scholarship/getapplication`
  - **Description:** Get a list of all scholarship applications.
  - **Roles:** Principal.
  - **Authorization:** Requires authentication.

- **Approve All Applications**
  - `GET /api/v1/scholarship/approvalapplication`
  - **Description:** Get all approved applications.
  - **Roles:** Finance.
  - **Authorization:** Requires authentication.

### Application Management

- **Create Application**
  - `POST /api/v1/application/createapplication`
  - **Description:** Create a new scholarship application.
  - **Roles:** Student.
  - **Authorization:** Requires authentication.

- **Get Application Status**
  - `GET /api/v1/application/getapplicationstatus/:id`
  - **Description:** Fetch the status of a scholarship application by ID.
  - **Roles:** HOD, Student.
  - **Authorization:** Requires authentication.

- **List Department Applications**
  - `GET /api/v1/application/listdepartmentapplication`
  - **Description:** List all applications for the department.
  - **Roles:** HOD.
  - **Authorization:** Requires authentication.

- **Review Application**
  - `PUT /api/v1/application/reviewappliaction/:id`
  - **Description:** Review and update the status of an application.
  - **Roles:** HOD.
  - **Authorization:** Requires authentication.

- **Upload Document**
  - `POST /api/v1/application/uploaddocument`
  - **Description:** Upload documents related to an application.
  - **Roles:** Student.
  - **Authorization:** Requires authentication.

- **HOD Feedback**
  - `POST /api/v1/application/feedbackhod/:id`
  - **Description:** Provide feedback on an application.
  - **Roles:** HOD.
  - **Authorization:** Requires authentication.

- **Approve Application (HOD)**
  - `POST /api/v1/application/approve/:id`
  - **Description:** Approve an application by HOD.
  - **Roles:** HOD.
  - **Authorization:** Requires authentication.

- **Reject Application (HOD)**
  - `POST /api/v1/application/reject/:id`
  - **Description:** Reject an application by HOD.
  - **Roles:** HOD.
  - **Authorization:** Requires authentication.

- **Principal Review Applications**
  - `GET /api/v1/application/getreview`
  - **Description:** Fetch applications for review by the Principal.
  - **Roles:** Principal.
  - **Authorization:** Requires authentication.

- **Approve Application (Principal)**
  - `POST /api/v1/application/principalapprove/:id`
  - **Description:** Approve an application by the Principal.
  - **Roles:** Principal.
  - **Authorization:** Requires authentication.

- **Reject Application (Principal)**
  - `POST /api/v1/application/reject/:id`
  - **Description:** Reject an application by the Principal.
  - **Roles:** Principal.
  - **Authorization:** Requires authentication.

- **Status of Scholarship**
  - `GET /api/v1/application/status/:id`
  - **Description:** Fetch the status of a scholarship.
  - **Roles:** Student.
  - **Authorization:** Requires authentication.

### Reporting and Notifications

- **Generate Reports**
  - `GET /api/v1/reports`
  - **Description:** Generate scholarship reports.
  - **Roles:** Principal.
  - **Authorization:** Requires authentication.

- **Generate Financial Report**
  - `GET /api/v1/financereport`
  - **Description:** Generate financial reports for scholarship funds.
  - **Roles:** Finance.
  - **Authorization:** Requires authentication.

- **Send Notification**
  - `POST /api/v1/notifications`
  - **Description:** Send notifications related to scholarships.
  - **Roles:** Principal.
  - **Authorization:** Requires authentication.

### Financial Management

- **Track Disbursement**
  - `GET /api/v1/funddis`
  - **Description:** Track the disbursement of scholarship funds.
  - **Roles:** Finance.
  - **Authorization:** Requires authentication.

## Middleware

- **isAuthenticates:** Ensures that the user is authenticated before accessing protected routes.
- **authorizerole:** Ensures that the user has the appropriate role for the requested action.
- **errormiddleware:** Handles and formats errors occurring during API requests.

## Setup and Running the Server

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Visit the Server**
   - Open your browser and navigate to `http://localhost:6001` 

## Notes

- Ensure that MongoDB is running and properly configured.
- Make sure to replace placeholder values in the `.env` file with actual configuration details for Cloudinary and your application.

For further details or issues, please refer to the project's documentation or contact the project maintainers.

---
