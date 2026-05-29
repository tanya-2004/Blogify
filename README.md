# Blogify – Full‑Stack Blogging Platform

A production‑ready MERN blog platform with authentication, posts, comments, likes, and a modular design system.

## 🚀 Tech Stack

| Layer         | Technology                              |
|---------------|------------------------------------------|
| Frontend      | React 19, React Router 7, Tailwind CSS   |
| State         | React Context (User, Theme, Sidebar)     |
| Backend       | Node.js, Express 5, MongoDB (Mongoose)   |
| Auth          | JWT, bcryptjs                            |
| HTTP Client   | Axios                                    |
| Validation    | express-validator                        |
| Security      | helmet, cors, express-rate-limit         |
| Deployment    | Vercel (frontend), Render (backend), Atlas (DB) |

## 📦 Features (completed)

- ✅ User authentication (signup, login, logout, protected routes)
- ✅ Post CRUD (create, read, update, delete) with likes & views
- ✅ Comment system (create, approve/reject for admins, replies, likes)
- ✅ Dashboard with user’s posts and statistics
- ✅ Public homepage with latest posts
- ✅ Responsive layout with collapsible sidebar
- ✅ Dynamic theming (light/dark/minimal/warm) + accent colour picker
- ✅ Consistent API responses: `{ success, message, data }`
- ✅ Input validation & sanitisation
- ✅ Rate limiting, security headers, error handling

## 🛠️ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas URI)

### Environment Variables

**Backend** (`.env` in `backend/`)
**Frontend** (`.env.production` in `frontend/`)
**Frontend** (`.env.development` in `frontend/`)

### Install & Run

```bash
# Clone repo
git clone https://github.com/tanya-2004/Blogify.git
cd Blogify

# Backend
cd backend
npm install
npm run dev          # runs on http://localhost:5000

# Frontend (new terminal)
cd frontend
npm install
npm start            # runs on http://localhost:3000