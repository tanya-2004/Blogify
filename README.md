# Blogify 📝 — Scalable Blogging Platform with Dynamic Theming

Blogify is a full-stack, modular blogging platform built for performance, maintainability, and design-system scalability. It supports dynamic theming, responsive layouts, and robust content management — architected with modern frontend and backend principles.

---

## 🚀 Features

- ✨ Dynamic theme switching (light, dark, minimal, warm)
- 🎨 Design token architecture (colors, spacing, typography, shadows)
- 🧠 Context-based global state management (React Context + Hooks)
- 🛡️ Error boundaries for resilient UI
- 📦 Modular component system with reusable UI primitives
- 🧵 SCSS-driven layout precision and pixel-perfect alignment
- 🧑‍💻 Authenticated dashboard with protected routes
- 🗂️ Post creation, editing, and comment moderation
- 🔍 Semantic accessibility and ARIA support
- 🧭 Responsive design across breakpoints

---

## 🧱 Tech Stack

| Layer         | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React, React Router, SCSS, Tailwind |
| State        | React Context, useReducer           |
| Backend      | Node.js, Express, MongoDB           |
| Auth         | JWT, bcrypt                         |
| Styling      | Design tokens, CSS variables        |
| Deployment   | Vercel / Netlify / Render           |

---

## 🧩 System Design Overview

### Architecture

- **Monorepo structure** with clear separation of concerns
- **Frontend**: Component-driven, theme-aware, context-managed
- **Backend**: RESTful API with modular routes and middleware
- **Database**: MongoDB with Mongoose schemas for posts, users, comments

### Scalability Principles

- Stateless frontend with persistent theme settings via `localStorage`
- Token-based theming for future-proof design evolution
- Error boundaries and fallback logic for robust UX
- Lazy loading and route-based code splitting for performance

---

## 🧠 CS Fundamentals Applied

### Operating Systems

- Asynchronous event loop (Node.js)
- Non-blocking I/O for API responsiveness

### Networking

- RESTful API design
- JWT-based stateless authentication
- CORS and secure headers

### Databases

- MongoDB schema design
- Indexing for fast post/comment retrieval
- Data validation and sanitization

### Algorithms & Data Structures

- Efficient state updates using immutability
- Debounced input handling
- Optimized rendering via memoization

---

## 🧪 Software Engineering Practices

- ✅ Unit and integration testing (Jest, React Testing Library)
- 📐 Linting and formatting (ESLint, Prettier)
- 🔄 CI/CD pipeline ready
- 📚 Documentation-first development
- 🧩 Component isolation and storybook-ready structure

---

## 🎨 Design System

- **Theme tokens**: `bg`, `text`, `accent`, `fontSize`, `spacing`, `shadows`
- **Variants**: `light`, `dark`, `minimal`, `warm`
- **Typography**: Semantic variants (`hero`, `title`, `body`, `caption`)
- **Accessibility**: ARIA roles, keyboard navigation, focus states

---

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/tanya-2004/Blogify.git
cd blogify

# Install dependencies
npm install

# Start the frontend
npm run start

# Start the backend 
cd backend
npm install
npm run dev