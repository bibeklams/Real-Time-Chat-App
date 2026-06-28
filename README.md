# 💬 Real-Time Chat Application

A full-stack real-time chat application built with the MERN stack and Socket.IO. Users can register, log in securely, chat in real time, and view online user status.

## 🚀 Live Demo

**Frontend (Vercel):**

https://real-time-chat-app-puce-mu.vercel.app

**Backend (Render):**

https://real-time-chat-app-7al6.onrender.com

---

# ✨ Features

### 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Refresh Token Authentication
* Secure HTTP-Only Cookies
* Protected Routes
* Logout

---

### 💬 Chat Features

* Real-time Messaging using Socket.IO
* One-to-One Chat
* Instant Message Delivery
* Online/Offline User Status
* Conversation History
* Message Timestamp

---

### 👤 User Features

* User List
* Select User to Chat
* Profile Image Support
* Online User Indicator

---

### ⚡ Real-Time Communication

* Socket.IO Integration
* User Join Events
* Live Message Updates
* Online User Broadcasting

---

# 🛠 Tech Stack

## Frontend

* React
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS
* Socket.IO Client

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT
* Cookie Parser
* CORS
* bcrypt

---

# 📁 Project Structure

```
chat-app/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── services/
│   └── socket/
│
└── backend/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/
    ├── config/
    └── utils/
```

---

# 🔄 Application Flow

1. User registers or logs in.
2. JWT authentication verifies the user.
3. Frontend establishes a Socket.IO connection.
4. User joins using their unique user ID.
5. Backend stores connected users.
6. Messages are saved in MongoDB.
7. Receiver instantly receives new messages via Socket.IO.
8. Online users are updated in real time.

---

# 📦 Installation


## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# ⚙ Environment Variables

## Backend

Create a `.env` file.

```env
PORT=

MONGO_URI=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

ACCESS_TOKEN_EXPIRES=

REFRESH_TOKEN_EXPIRES=

CLIENT_URL=
```

---

# Screenshots

You can add screenshots here later.

Example:

* Login Page
* Register Page
* Chat Page
* Real-Time Messaging

---

# Future Improvements

* Seen Status
* Typing Indicator
* Emoji Support
* Image Sharing
* File Sharing
* Group Chat
* Voice Messages
* Video Calling
* Push Notifications
* Message Reactions

---

# Learning Outcomes

This project helped me learn:

* REST API Development
* JWT Authentication
* Refresh Token Flow
* Redux Toolkit
* Socket.IO
* Real-Time Communication
* MongoDB & Mongoose
* React Hooks
* Protected Routes
* Secure Authentication with Cookies
* Deployment using Vercel and Render

---

# Author

**Bibek Tamang**

GitHub: https://github.com/bibeklams

---

⭐ If you found this project useful, consider giving it a star.
