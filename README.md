# Authentication App

This is a Node.js-based authentication app that provides essential features such as user registration, login, logout, password reset, Email verification, and Authentication checking.

## Features

-   **Sign Up:** Users can create a new account.
-   **Login:** Authenticate users and provide secure access.
-   **Logout:** Safely terminate user sessions.
-   **Forgot Password:** Users can request a password reset email.
-   **Verify Account:** Users receive a verification email upon signup to activate their account.
-   **Reset Password:** Users can securely reset their password using a unique link.
-   **Authentication Check:** Middleware to verify user authentication for protected routes.

## Tech Stack

-   **Backend:** Node.js (Express.js)
-   **Email Service:** [Mailtrap](https://mailtrap.io/) 
-   **Database:** MongoDB 
-   **Authentication:** JSON Web Tokens (JWT)

## Installation

1.  Clone the repository:

    bash


    `git clone https://github.com/ahmedhesein1/Authintication-App.git`

3.  Install dependencies:

    
    `npm install`

4.  Create a `.env` file in the root directory and configure the following:

    env

    Copy code

    `PORT = 3000
DB = mongodb://localhost:27017/Authintication-App
JWT_SECRET = MY-ultara-secret-password-password
MAILTRAP_TOKEN = feb5c5ecd248f9ef62ea059a74db80b6
MAILTRAP_ENDPOINT = https://send.api.mailtrap.io/
CLIENT_URL = http://localhost:5173`

5.  Run the application:


    `npm start`

6.  Access the app at http://localhost:3000.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and get a JWT |
| POST | `/api/auth/logout` | Logout and invalidate session |
| POST | `/api/auth/forgot-password` | Request password reset email |
| POST | `/api/auth/reset-password` | Reset password with token |
| GET | `/api/auth/verify-email` | Verify email with token |
| GET | `/api/auth/check-auth` | Check if the user is authenticated |


## Contribution

Feel free to submit pull requests or raise issues to improve the app.
Feel free to Add Your Frontend

## License

This project is licensed under the MIT License.
