# Authentication Form

A simple web application with user authentication and utility features.

## Features

- **Authentication Form** - User login and registration
- **All Users** - View list of all registered users
- **Calculator** - Basic calculation tool (Using DOM manipulation)

## Installation

```bash
# Clone the repository
git clone https://github.com/ariful97768/authentication-form.git

# Navigate to project directory
cd authentication-form

# Install dependencies
npm install
```

## Usage

```bash
# Start the development server
npm start
```

## Routes

- `/authentication-form` - Login/Register page
- `/all-users` - Users table page
- `/calculator` - Calculator page

## Technologies Used

- Next.js
- TypeScript
- Firebase Authentication
- MongoDB (data storage)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_apiKey=your_firebase_api_key
NEXT_PUBLIC_authDomain=your_firebase_auth_domain
NEXT_PUBLIC_projectId=your_firebase_project_id
NEXT_PUBLIC_storageBucket=your_firebase_storage_bucket
NEXT_PUBLIC_messagingSenderId=your_firebase_messaging_sender_id
NEXT_PUBLIC_appId=your_firebase_app_id

# MongoDB Configuration
NEXT_PUBLIC_db_user=your_mongodb_username
NEXT_PUBLIC_db_pass=your_mongodb_password
```

**Note:** Never commit your `.env.local` file to version control. Add it to `.gitignore`.
