
# Authentication App

A Node.js-based authentication system with user registration, login, logout, password reset, email verification, and protected routes.

## Features

- **Sign Up**: Create a new account with email and password.
- **Login**: Securely authenticate users and issue a JSON Web Token (JWT).
- **Logout**: Terminate user sessions by invalidating tokens.
- **Forgot Password**: Request a password reset link via email.
- **Verify Account**: Activate accounts through email verification links.
- **Reset Password**: Securely update passwords using a unique token.
- **Authentication Check**: Middleware to protect routes by verifying JWTs.

## Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Email Service**: [Mailtrap](https://mailtrap.io/) for testing emails
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/)

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Git](https://git-scm.com/)
- A [Mailtrap](https://mailtrap.io/) account for email testing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmedhesein1/Authintication-App.git
   cd Authintication-App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following:

   ```env
   PORT=3000
   DB=mongodb://localhost:27017/Authintication-App
   JWT_SECRET=<your-secret-key>
   MAILTRAP_TOKEN=<your-mailtrap-token>
   MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/
   CLIENT_URL=http://localhost:5173
   ```

   Replace `<your-secret-key>` and `<your-mailtrap-token>` with secure values. **Never commit these to version control.**

4. Ensure MongoDB is running locally or update the `DB` URL for a cloud instance.

5. Start the application:

   ```bash
   npm start
   ```

6. Access the app at [http://localhost:3000](http://localhost:3000).

## API Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/api/auth/signup`           | Register a new user                  |
| POST   | `/api/auth/login`            | Login and receive a JWT             |
| POST   | `/api/auth/logout`           | Invalidate user session             |
| POST   | `/api/auth/forgot-password`  | Request a password reset email      |
| POST   | `/api/auth/reset-password`   | Reset password using a token        |
| GET    | `/api/auth/verify-email`     | Verify email with a token           |
| GET    | `/api/auth/check-auth`       | Check if user is authenticated      |

### Example Request (Signup)

```bash
curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "secure123"}'
```

### Example Response

```json
{
  "message": "User created successfully. Please verify your email."
}
```

## License

This project is licensed under the [MIT License](LICENSE).
