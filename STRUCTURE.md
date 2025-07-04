# Project Structure - Professional Blog Platform

## � Overview
A modern, professional blog platform with a clean public landing page and a feature-rich authenticated dashboard area. The structure supports a professional workflow similar to modern blog platforms like Medium or Hashnode.

## �📁 Frontend Structure

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable components
│   │   ├── auth/            # Authentication components
│   │   │   ├── ProtectedRoute.js  # Route protection with redirect
│   │   │   └── index.js
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.js    # Authenticated navigation header
│   │   │   ├── Sidebar.js   # Dashboard navigation sidebar
│   │   │   ├── Layout.js    # Smart layout wrapper
│   │   │   └── index.js
│   │   ├── modals/          # Modal components
│   │   │   ├── NewPostModal.js
│   │   │   └── index.js
│   │   ├── ui/              # UI components
│   │   │   ├── BlogCard.js  # Blog post card
│   │   │   ├── LoadingSpinner.js
│   │   │   └── index.js
│   │   └── index.js         # Main component exports
│   ├── pages/               # Page components
│   │   ├── auth/            # Authentication pages
│   │   │   ├── Login.js     # (/signin route)
│   │   │   └── Signup.js    # (/signup route)
│   │   ├── dashboard/       # Dashboard pages (all protected)
│   │   │   ├── Comments.js  # (/comments)
│   │   │   ├── Dashboard.js # (/dashboard)
│   │   │   ├── Settings.js  # (/settings)
│   │   │   ├── Stats.js     # (/stats)
│   │   │   └── Theme.js     # (/theme)
│   │   ├── posts/           # Post-related pages
│   │   │   ├── CreatePost.js # (/create - protected)
│   │   │   ├── EditPost.js   # (/edit/:id - protected)
│   │   │   └── PostDetail.js # (/post/:id - public)
│   │   └── PublicHome.js    # Clean landing page (/)
│   ├── utils/               # Utility functions
│   │   ├── auth.js          # Authentication utilities
│   │   └── axios.js         # API configuration
│   ├── App.js               # Main app component with routing
│   ├── index.js             # App entry point
│   └── index.css            # Global styles
├── package.json
└── tailwind.config.js
```

## 🔐 Authentication Flow

### Public Access (No Sidebar)
- **`/`** - Clean landing page with simple header
- **`/signin`** - Login page
- **`/signup`** - Registration page  
- **`/post/:id`** - Public post viewing

### Protected Access (Full Layout)
- **`/dashboard`** - Main dashboard with sidebar
- **`/create`** - Create new posts
- **`/edit/:id`** - Edit existing posts
- **`/stats`** - Analytics and statistics
- **`/comments`** - Manage comments
- **`/settings`** - User settings
- **`/theme`** - Theme customization

### Smart Layout System
- **Layout.js** conditionally renders sidebar/header based on:
  - Route (public vs protected)
  - Authentication status
- **ProtectedRoute.js** redirects to `/signin` if not authenticated
- **Header.js** shows different content for authenticated users
- **Logout** clears token and redirects to home page

## 📁 Backend Structure

```
backend/
├── controllers/             # Route controllers
│   ├── authController.js   # Authentication logic
│   └── postController.js   # Post CRUD operations
├── middleware/              # Custom middleware
│   └── authMiddleware.js   # JWT authentication
├── models/                  # Database models
│   ├── Post.js             # Post schema
│   └── User.js             # User schema
├── routes/                  # API routes
│   ├── auth.js             # Authentication routes
│   └── posts.js            # Post routes
├── server.js               # Express server setup
└── package.json
```

## 🎯 Key Features

### Frontend
- **Modern React Architecture**: Organized component structure with clear separation of concerns
- **Premium UI/UX**: Professional design with Tailwind CSS, gradients, and animations
- **Responsive Design**: Mobile-first approach with collapsible navigation
- **Authentication Flow**: Login/signup with protected routes
- **Blog Management**: Full CRUD operations for blog posts

### Backend
- **RESTful API**: Clean API endpoints for authentication and post management
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Integration**: Mongoose ODM for database operations
- **Middleware**: Custom authentication and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ransh-blog-website
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In backend/.env
   MONGODB_URI=mongodb://localhost:27017/blog
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start

   # Terminal 2 - Frontend  
   cd frontend
   npm start
   ```

## 📝 Component Usage

### Layout Components
```javascript
import { Header, Sidebar } from '../components/layout';

// Standard page layout
<div className="min-h-screen bg-gray-50">
  <Header />
  <div className="flex pt-20">
    <Sidebar />
    <main className="flex-1 p-8 md:ml-0">
      {/* Page content */}
    </main>
  </div>
</div>
```

### UI Components
```javascript
import { BlogCard, LoadingSpinner } from '../components/ui';

// Blog card usage
<BlogCard post={postData} />

// Loading spinner
<LoadingSpinner size="large" message="Loading posts..." />
```

## 🎨 Design System

- **Colors**: Blue/Purple gradients for primary actions
- **Typography**: Modern font hierarchy with proper spacing
- **Components**: Consistent rounded corners, shadows, and hover effects
- **Responsive**: Mobile-first design with proper breakpoints
