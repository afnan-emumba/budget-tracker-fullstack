# Budget Tracker App

## Overview

The Budget Tracker App is a full-stack application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to manage their budgets by tracking their income and expenses.

## Features

- User Authentication (Sign Up, Log In, Log Out)
- Add, Edit, and Delete Expenses
- View Expense Analysis
- Profile Management

## Technologies Used

- **Frontend**: React, Redux, Ant Design, Formik
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux
- **Validation**: Formik, Yup
- **Styling**: CSS Modules

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/budget-tracker-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd budget-tracker-app
   ```
3. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
4. Create a `.env` file in the `server` directory and add your MongoDB URI and other environment variables:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```
3. Open your browser and navigate to the frontend server URL.

## Folder Structure

```
budget-tracker-app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── theme/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── package.json
│   └── ...
├── .gitignore
├── README.md
└── ...
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
