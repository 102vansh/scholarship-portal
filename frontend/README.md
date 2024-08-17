# Scholarship Management System - Frontend

## Introduction

The Scholarship Management System is an advanced online platform created to streamline and manage the process of handling scholarships within an educational institution. This system is designed to make it easy for students, Heads of Departments (HODs), the Principal, and the Finance Head to interact with scholarship processes efficiently and effectively. The system uses modern web technologies to ensure that all users have a smooth and intuitive experience.

## Purpose and Audience

This document aims to provide a clear and detailed explanation of the frontend component of the Scholarship Management System. It is meant for both technical and non-technical readers who want to understand how the system works, the technologies used to build it, and how different users can interact with the system.

## Key Technologies Used

The frontend of the Scholarship Management System is built using several key technologies:

1. **React.js**: A popular JavaScript library used to create interactive and dynamic user interfaces. React helps in building the different parts of the website that users interact with, such as forms and buttons.

2. **Redux Toolkit**: A tool used for managing the state of the application. It keeps track of important information (like user data and scholarship applications) so that all parts of the application can stay updated and consistent.

3. **Redux Persist**: A library that helps in saving the application’s state to the browser’s local storage. This means that even if a user closes their browser or refreshes the page, their data (like being logged in) remains the same.

4. **Axios**: A tool used to send and receive information from the server. For example, when a user submits a scholarship application, Axios helps in sending this information to the server and receiving a response.

5. **React Router**: A library that allows users to navigate between different pages of the application without having to reload the page. This makes the experience smoother and faster.

6. **Tailwind CSS**: A styling framework that provides pre-designed classes to quickly style the website. Instead of writing custom CSS, Tailwind’s classes are used to apply styles directly to HTML elements.

7. **React Hot Toast**: A notification library that shows small popup messages to users. These notifications can inform users about the success or failure of their actions, such as a successfully submitted application.

## Project Structure

The project is organized into several folders, each serving a specific purpose. Here’s a breakdown:

```plaintext
src/
├── components/
│   ├── Student/
│   ├── HOD/
│   ├── Principal/
│   └── FinanceHead/
├── redux/
│   ├── Slices.js
│   └── store.js
├── App.js
├── index.js
└── styles/
    └── tailwind.css
```

### Components

The `components/` folder contains different sections of the application for each user role:

- **Student Components**:
  - **Apply for Scholarship**: A feature that lets students view available scholarships and submit their applications.
  - **Track Application Status**: Allows students to check the status of their submitted applications in real-time.
  - **Update Profile**: Enables students to update their personal information.

- **HOD Components**:
  - **Review Applications**: Allows HODs to view and assess scholarship applications from students in their department.
  - **Approve/Reject Applications**: HODs can approve or reject applications and provide feedback.

- **Principal Components**:
  - **Final Approval**: The Principal can review applications recommended by HODs and make final decisions.
  - **Scholarship Management**: The Principal can create and manage scholarships and set policies.

- **Finance Head Components**:
  - **Allocate Funds**: The Finance Head can assign funds to approved scholarships.
  - **Generate Reports**: Allows for creating reports on financial aspects of scholarships.

### Redux Setup

Redux helps manage the application’s state, ensuring that data remains consistent and up-to-date across different parts of the application.

#### Slices.js

The `Slices.js` file manages the application’s state related to users and scholarship applications. It includes:
- **Initial State**: Holds data about the user and their applications.
- **Reducers**: Functions that update the state based on actions like logging in or fetching applications.

#### store.js

The `store.js` file sets up the Redux store and integrates `redux-persist` to keep the state saved even after closing the browser. It ensures that the user’s session persists across different visits.

### Tailwind CSS

Tailwind CSS is used for styling the application. Instead of writing custom CSS, you use pre-defined utility classes to apply styles. For example, to style a button, you use classes like `bg-blue-500` for the background color and `text-white` for the text color.

### Axios

Axios is used to handle requests between the frontend and backend. It simplifies the process of sending and receiving data, such as submitting a scholarship application or fetching a list of applications.

### React Hot Toast

React Hot Toast provides feedback to users through small popup messages. These notifications can alert users about successful actions or errors, enhancing the overall user experience.

## Features Overview

### For Students

1. **Apply for Scholarships**: Students can view and apply for scholarships by filling out an application form, which collects necessary details and documents.

2. **Track Application Status**: Students can see the real-time status of their applications, including whether they have been received, reviewed, or approved.

3. **Update Profile**: Students can update their personal details to ensure their information is current and accurate.

### For Heads of Department (HODs)

1. **Review Applications**: HODs can review applications submitted by students in their department, including all relevant details provided.

2. **Approve/Reject Applications**: HODs can decide whether to approve or reject applications and provide feedback for each decision.

### For the Principal

1. **Final Approval**: The Principal reviews the applications that have been approved by HODs and makes the final decision.

2. **Scholarship Management**: The Principal manages scholarships by creating new ones, modifying existing ones, and setting policies.

### For the Finance Head

1. **Allocate Funds**: The Finance Head assigns funds to approved scholarships and ensures that the financial resources are properly distributed.

2. **Generate Reports**: Generates detailed reports on how scholarship funds are used, helping to track and manage financial allocations.

## Installation and Setup

To set up the Scholarship Management System, follow these steps:

1. **Clone the Repository**: Download the project from GitHub using the command:
   ```bash
   git https://github.com/102vansh/scholarship-portal.git
   cd frontend
   ```

2. **Install Dependencies**: Install all required packages using npm:
   ```bash
   npm install
   ```

3. **Start the Development Server**: Launch the development server to view and interact with the application:
   ```bash
   npm start
   ```

4. **Access the Application**: Open a web browser and go to `http://localhost:3000` to use the application.

## Conclusion

The frontend of the Scholarship Management System is designed to be user-friendly and efficient. By using modern web technologies such as React, Redux, and Tailwind CSS, the system provides a seamless experience for all users, including students, HODs, the Principal, and the Finance Head. With features that cater to each role and ongoing improvements planned, the system aims to make managing scholarships as smooth and effective as possible.