# Media Capture and Storage Web Application

## 🚀 Overview
The **Media Capture and Storage Web Application** is a full-stack MERN (MongoDB, Express, React, Node.js) project that allows users to upload, manage, and view media files (images and videos). It provides secure storage using **AWS S3** and includes authentication features with **JWT-based authentication**.

## 🌟 Features
- **User Authentication** (Sign-up, Login, JWT authentication)
- **Media Upload** (Images & Videos from local storage)
- **Secure Storage** (AWS S3 / Local Multer storage)
- **Media Management** (Gallery view, Filtering, Deletion)
- **Responsive UI** (Built with React & Tailwind CSS)

## 🛠️ Tech Stack
### Frontend
- React (with React Router & Redux Toolkit)
- Tailwind CSS (for styling)
- Axios (for API calls)
- React Toastify (for notifications)

### Backend
- Node.js & Express
- MongoDB (with Mongoose ORM)
- AWS S3 (for media storage)
- Multer (for handling file uploads)
- JSON Web Token (JWT) (for authentication)
- bcrypt.js (for password hashing)

---

## 📂 Project Structure

### Backend (`/backend`)
```
📦backend
 ┣ 📂config         # Configuration files (DB, AWS S3)
 ┣ 📂controller     # Business logic (user & media controllers)
 ┣ 📂middleware     # Middlewares (auth, file upload handling)
 ┣ 📂models         # Mongoose schemas (User, Media)
 ┣ 📂routes         # API Routes (User & Media)
 ┣ 📂uploads        # Local file uploads (if not using S3)
 ┣ 📜index.js       # Entry point
 ┣ 📜.env           # Environment variables
 ┗ 📜package.json   # Dependencies & scripts
```

### Frontend (`/client`)
```
📦client
 ┣ 📂public         # Static files
 ┣ 📂src           
 ┃ ┣ 📂components  # UI components (Auth, Navbar, Media)
 ┃ ┣ 📂store       # Redux store & slices
 ┃ ┣ 📜App.js      # Main app component
 ┃ ┣ 📜index.js    # React entry point
 ┣ 📜tailwind.config.js # Tailwind CSS config
 ┣ 📜package.json  # Dependencies & scripts
```

---

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/media-capture-storage.git
cd media-capture-storage
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install   # Install backend dependencies
```

- **Set up `.env` file** inside `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your_s3_bucket_name
```
- Start the backend server:
```sh
npm start  # Runs on http://localhost:5000
```

### 3️⃣ Frontend Setup
```sh
cd ../client
npm install   # Install frontend dependencies
```
- **Set up `.env` file** inside `client/`:
```env
REACT_APP_API_URL=http://localhost:5000
```
- Start the frontend server:
```sh
npm start  # Runs on http://localhost:3000
```

---

## 🚀 API Endpoints

### **User Authentication** (`/api/user`)
| Method | Endpoint       | Description          |
|--------|--------------|----------------------|
| POST   | `/signup`    | Register a new user  |
| POST   | `/login`     | Login & get JWT token |

### **Media Management** (`/api/media`)
| Method | Endpoint      | Description           |
|--------|--------------|-----------------------|
| POST   | `/upload`    | Upload image/video    |
| GET    | `/gallery`   | Fetch all media files |
| DELETE | `/delete/:id`| Delete a media file   |

---

## 🔥 Deployment
### **Backend (Render)**
2. Deployed using Render.

### **Frontend (Netlify)**
2. Deployed using Netlify.

For questions or collaborations, reach out at **amitkumaryadav.work@example.com**.

