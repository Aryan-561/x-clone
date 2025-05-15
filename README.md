# 🐦 X Clone – Full-Stack Twitter Clone (MERN)

A complete full-stack Twitter (X) clone built using the MERN stack, offering a modern and responsive UI with powerful social features. Users can post, like, reply, follow, bookmark, and authenticate securely with JWT and Google OAuth. With media uploads, email verification, and protected APIs, it's built for both performance and scalability.
---

## 🚀 Features

* 📝 CRUD operations for **Posts & Comments**
* ❤️ Like/unlike **Posts & Comments**
* 📌 Bookmark/unbookmark **Posts & Comments**
* 💬 **Replies** to comments
* 👥 Follow/Unfollow users
* 👤 User profile view (followers, following)
* 🔍 User search by username/name
* 📧 Email verification using **Nodemailer**
* 🔐 Authentication via **JWT + Refresh Tokens**
* 🔁 Google OAuth 2.0 Login
* ☁️ Media uploads to **Cloudinary**
* 🛡️ Protected routes with middleware
* 📊 Logging with **Winston** and **Morgan**

---

## 🛠️ Tech Stack

### 🔷 Frontend (`x-frontend`)

* React 19
* Redux Toolkit
* React Hook Form
* TailwindCSS
* React Router v7
* Axios
* React Icons
* Google OAuth (`@react-oauth/google`)

### 🔶 Backend (`backend`)

* Node.js + Express.js
* MongoDB + Mongoose
* JWT for Auth + Refresh
* Multer for uploads
* Cloudinary for media storage
* Nodemailer for email verification
* Winston + Morgan for logging

---

## 📂 Folder Structure (Simplified)

```
x-clone/
├── frontend/         # React + Redux + Tailwind
├── backend/          # Express, Controllers, Routes, DB, Auth
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── ...
```

---

## 📡 API Routes

### 🔐 User Routes – `/api/v1/users`

| Method | Endpoint                  | Description                              |
| ------ | ------------------------- | ---------------------------------------- |
| POST   | `/create`                 | Register user with profile & cover image |
| GET    | `/`                       | Get current user info                    |
| POST   | `/login`                  | Login user                               |
| GET    | `/logout`                 | Logout user                              |
| POST   | `/re-refreshtoken`        | Refresh JWT tokens                       |
| POST   | `/update-account-details` | Update user details                      |
| PATCH  | `/update-coverimage`      | Update cover image                       |
| PATCH  | `/update-profileimage`    | Update profile image                     |
| DELETE | `/deleteuser`             | Delete user account                      |
| GET    | `/search/:queries`        | Search users                             |
| GET    | `/username/:queries`      | Get user by username                     |
| GET    | `/randomuser`             | Get random users                         |
| GET    | `/verify-email`           | Email verification                       |
| POST   | `/resend-verification`    | Resend verification email                |
| POST   | `/google-login`           | Google login                             |

### 📨 Subscription Routes – `/api/v1/subscriptions`

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/toggle/:followingId` | Follow/Unfollow user |
| GET    | `/:userId/follower`    | Get user followers   |
| GET    | `/:userId/following`   | Get user followings  |

### 📝 Post Routes – `/api/v1/posts`

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| GET    | `/`               | Get all posts              |
| GET    | `/user/:username` | Get posts by user          |
| GET    | `/following`      | Posts from following users |
| POST   | `/create`         | Create post (with media)   |
| PATCH  | `/update/:postId` | Update post                |
| GET    | `/:postId`        | Get post by ID             |
| DELETE | `/delete/:postId` | Delete post                |

### 💬 Comment Routes – `/api/v1/comments`

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | `/create/:postId`     | Comment on post      |
| PUT    | `/:commentId`         | Edit comment         |
| DELETE | `/:commentId`         | Delete comment       |
| GET    | `/:commentId`         | Get comment by ID    |
| POST   | `/reply/:commentId`   | Reply to comment     |
| GET    | `/replies/:commentId` | Get replies          |
| GET    | `/post/:postId`       | Get comments on post |
| GET    | `/c/:username`        | Get user's comments  |

### ❤️ Like Routes – `/api/v1/likes`

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| POST   | `/toggle/post/:postId`       | Like/unlike post    |
| POST   | `/toggle/comment/:commentId` | Like/unlike comment |
| GET    | `/posts`                     | Get liked posts     |
| GET    | `/comments`                  | Get liked comments  |

### 📌 Bookmark Routes – `/api/v1/bookmarks`

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/t/post/:postId`       | Bookmark/unbookmark post    |
| POST   | `/t/comment/:commentId` | Bookmark/unbookmark comment |
| GET    | `/posts`                | Get bookmarked posts        |
| GET    | `/comments`             | Get bookmarked comments     |

---

## 🔐 Environment Variables

### Backend `.env`

```env
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN=access_token_secret
REFRESH_TOKEN=refresh_token_secret
PORT=4444
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
NODEMAIL_AUTH=your_email
NODEMAIL_PASS=your_email_app_password
GOOGLE_CLIENT_ID=your_google_client_id
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 📦 Installation & Setup

### 1. Clone the Repository

* git clone https://github.com/HimanshuTamoli24/x-clone.git
* cd x-clone


### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🧠 Future features (soon)

* 🔔 Real-time notifications (Socket.IO)
* 💬 Direct messaging and group messaging
* 🔍 Advanced search & filtering
* 🛠️ Admin dashboard

---

## 🚀 Deployment

* Backend hosted on Railway
* Frontend deployed on Vercel


---

## 🙌 Authors

### Aryan

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Aryan-blue?style=flat\&logo=linkedin)](https://www.linkedin.com/in/aryan-ab64822ba/)
[![GitHub](https://img.shields.io/badge/GitHub-Aryan--561-black?style=flat\&logo=github)](https://github.com/Aryan-561)

### Himanshu Tamoli

[![LinkedIn](https://img.shields.io/badge/LinkedIn-HimanshuTamoli24-blue?style=flat\&logo=linkedin)](https://www.linkedin.com/in/himanshutamoli24)
[![GitHub](https://img.shields.io/badge/GitHub-HimanshuTamoli24-black?style=flat\&logo=github)](https://github.com/HimanshuTamoli24)
