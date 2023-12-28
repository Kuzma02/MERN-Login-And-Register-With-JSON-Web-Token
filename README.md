# MERN Login And Register With JSON Web Token - Authentication System

![login register mern 1](https://github.com/Kuzma02/MERN-Login-And-Register-With-JSON-Web-Token/assets/138793624/057541be-e8ab-4489-996d-117290a85c5a)

![login register mern 2](https://github.com/Kuzma02/MERN-Login-And-Register-With-JSON-Web-Token/assets/138793624/364c6008-e211-4796-a745-5829f158e441)

![login register mern 3](https://github.com/Kuzma02/MERN-Login-And-Register-With-JSON-Web-Token/assets/138793624/403f9988-3970-4b38-9de5-4469ff163164)

# Description
This project is a comprehensive MERN stack (MongoDB, Express, React, Node.js) application that provides robust user authentication. It supports user registration and login functionality, using JSON Web Tokens (JWT) for secure authentication. 
The application is designed with a focus on security and user experience, ensuring a seamless process for user authentication.

# Features
- User Registration: Allows new users to create an account.
- User Login: Enables users to log in with their credentials.
- JWT Authentication: Secures user sessions using JSON Web Tokens.
- Responsive Design: Ensures a great user experience across various devices.

# Technologies Used
Frontend:
- React.js: For building the user interface.
- Toastify: To display notifications and alerts.
- React Router DOM: For managing navigation in the application.
Backend:
- Node.js: As the runtime environment.
- Express: Web application framework for Node.js.
- MongoDB: Database to store user credentials and session data.

# Installation
1. Clone the repository:

```
git clone https://github.com/Kuzma02/MERN-Login-And-Register-With-JSON-Web-Token.git
```

2. Install dependencies:
Navigate to the project directory:
```
cd folder-name
```

3. Install backend dependencies:
```
npm install
```

4. Install frontend dependencies:

```
cd client
npm install
```

5. Configure MongoDB and JWT:
Ensure MongoDB is installed and running.
Create a .env file in the root directory with the following contents:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

6. Run the application:
Start the backend server:
```
node app.js
```

7. In a new terminal, start the frontend:
```
cd client
npm run dev
```

# Usage
After starting the application, visit http://localhost:5173 in your browser. Users can now register for a new account or log in using existing credentials.
