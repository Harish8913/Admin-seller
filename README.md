# Node.js Backend API

A simple Node.js backend application built using **Express.js** and **MongoDB Atlas**.

---

# Prerequisites

Before setting up the project, make sure you have the following installed:

- Node.js (v18 or later recommended)
- npm (comes with Node.js)

Verify the installation:

```bash
node -v
npm -v
```

---

# Project Setup

Follow these steps to run the backend locally.

## 1. Clone the Repository

```bash
git clone https://github.com/Harish8913/Admin-seller.git
```

Navigate to the project directory:

```bash
cd Admin-seller/backend
```

---

## 2. Install Dependencies

Install all required packages:

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000

DB_CONNECTION=your_mongodb_atlas_connection_string

JWT_SECRET=your_jwt_secret
```

Replace the values with your own configuration.

---

## 5. Start the Server

Run the application:

```bash
npm start
```

If the project uses **nodemon** for development:

```bash
npm run dev
```

The server will start on:

```
http://localhost:5000
```

(or the port specified in the `.env` file)

---

# Available Scripts

| Command | Description |
|----------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Start the server |
| `npm run dev` | Start the server using Nodemon (development) |

> If `npm run dev` is not configured, use `npm start`.

---

# Build & Deployment

No build step is required for this project.

To run the application:

```bash
npm start
```

or

```bash
npm run dev
```

---

# Troubleshooting

### Dependencies are not installing

Delete the existing dependencies and reinstall:

```bash
rm -rf node_modules
rm package-lock.json

npm install
```

---

### Port Already in Use

Either stop the process using the current port or change the `PORT` value in your `.env` file.

Example:

```env
PORT=5001
```

---

# Development Notes

- Keep environment variables in the `.env` file.
- Do not commit the `.env` file to version control.
- Follow the existing folder structure when adding new routes, controllers, or models.
- Test API endpoints before pushing changes.

---

# Quick Start

```bash
# Clone the repository
git clone https://github.com/Harish8913/Admin-seller.git

# Navigate to the project
cd Admin-seller/backend

# Install dependencies
npm install

# Create a .env file and configure it

# Start the development server
npm run dev

# Or start the production server
npm start
```

Your backend server is now ready to accept API requests.
