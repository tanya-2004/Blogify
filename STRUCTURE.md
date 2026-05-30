# Project Structure – Blogify (Refactored)

This document reflects the **current** file organisation after the full refactoring (May 2026).

## Backend (`/backend`)
```
backend/
├── controllers/
│ ├── authController.js # signup, login, getCurrentUser, updateSettings
│ ├── postController.js # CRUD, like, getMyPosts, getAllPosts (with pagination)
│ └── commentController.js # create, approve, reject, delete, like, reply
├── middleware/
│ ├── authMiddleware.js # auth (sets req.userId), optionalAuth
│ ├── sanitizeBody.js # trims strings (kept, but will be replaced later)
│ └── validate.js # handles express-validator errors
├── models/
│ ├── User.js # pre‑save hash, comparePassword method
│ ├── Post.js # title, content, imageUrl, tags, category, author, likes, views, commentsCount
│ └── Comment.js # author (string), content, post, status, likes, replies (subdocs)
├── routes/
│ ├── auth.js # /signup, /login, /me, /settings (with validation)
│ ├── posts.js # GET (public), POST/PUT/DELETE (protected), /mine, /:id/like
│ └── comments.js # GET (public), POST/PUT/DELETE (protected with admin checks)
├── .env
├── package.json
└── server.js # security middleware, rate limiting, global error handler, graceful shutdown
```

## Frontend (`/frontend`)
```
frontend/
├── public/ # static assets
├── src/
│ ├── components/
│ │ ├── auth/
│ │ │ ├── ProtectedRoute.js # redirects to /signin if not authenticated
│ │ │ └── index.js
│ │ ├── layout/
│ │ │ ├── Header.js # shows user menu, logout, new post button
│ │ │ ├── Sidebar.js # navigation links, collapsible
│ │ │ ├── Layout.js # conditionally shows sidebar/header based on route & auth
│ │ │ └── index.js
│ │ ├── modals/
│ │ │ ├── NewPostModal.js # creates a post (uses API directly)
│ │ │ ├── EditPostModal.js # edits a post (fetches via GET /posts/:id)
│ │ │ ├── editPostModalStyles.js # style helpers
│ │ │ └── index.js
│ │ ├── ui/ # reusable primitives
│ │ │ ├── BlogCard.js # displays post card with actions
│ │ │ ├── Button.js
│ │ │ ├── Card.js
│ │ │ ├── Input.js
│ │ │ ├── LoadingSpinner.js
│ │ │ ├── Typography.js
│ │ │ └── index.js
│ │ ├── CommentCard.js # displays a single comment with replies, likes, moderation actions
│ │ ├── CommentFilter.js # filter buttons (all/pending/approved/spam)
│ │ ├── CommentForm.js # creates a comment (authenticated, uses API directly)
│ │ ├── CommentList.js # maps over comments, uses CommentCard
│ │ ├── CommentReplies.js # nested replies display
│ │ ├── CommentStats.js # stats cards (total, approved, pending, spam)
│ │ ├── ModerationActions.js # approve/reject/delete/reply buttons for admin
│ │ ├── ErrorBoundary.js # catches render errors
│ │ └── index.js # exports all components
│ ├── contexts/
│ │ ├── UserContext.js # loads user from /auth/me, stores token in localStorage
│ │ ├── ThemeContext.js # theme, accent colour, font size – persisted in localStorage
│ │ └── SidebarContext.js # sidebar collapse / mobile open state
│ ├── hooks/
│ │ ├── usePostStats.js # fetches /posts/mine, aggregates stats
│ │ └── useComments.js # fetches /comments with filter, provides moderation handlers
│ ├── pages/
│ │ ├── auth/
│ │ │ ├── Login.js # uses /auth/login, expects { token, user }
│ │ │ └── Signup.js # registers then auto‑login
│ │ ├── dashboard/
│ │ │ ├── Dashboard.js # shows user’s posts, stats, delete/edit modals
│ │ │ ├── Comments.js # admin comment moderation page (uses useComments)
│ │ │ ├── Settings.js # user settings (profile, privacy, notifications, appearance, publishing)
│ │ │ ├── Stats.js # analytics and charts
│ │ │ ├── Theme.js # theme picker (updates ThemeContext)
│ │ │ └── settingsTabs/ # tab components for Settings page
│ │ │ ├── ProfileTab.js
│ │ │ ├── PrivacyTab.js
│ │ │ ├── NotificationsTab.js
│ │ │ ├── AppearanceTab.js
│ │ │ ├── PublishingTab.js
│ │ │ └── index.js
│ │ ├── posts/
│ │ │ ├── CreatePost.js # standalone create post page (or use modal)
│ │ │ ├── EditPost.js # standalone edit page (GET /posts/:id, PUT)
│ │ │ └── PostDetail.js # view post, like, comment form, comment list
│ │ └── PublicHome.js # landing page, fetches all posts (GET /posts)
│ ├── services/
│ │ └── commentsAPI.js # functions for getAllComments, approve, reject, delete, like, reply
| ├── styles/
│ | ├── design-system.css   # global design tokens, component styles, animations
│ | └── theme.js            # JavaScript theme object (colors, spacing, typography, etc.) 
│ ├── utils/
│ │ ├── auth.js # setToken, getToken, removeToken, isAuthenticated, getUserFromToken
│ │ ├── axios.js # interceptors: attach token, handle 401
│ │ ├── postStats.js # getPostStats, formatPostStats, postStatsSummary
│ │ ├── toast.js # showSuccess, showError, showLoading (react-hot-toast)
│ │ └── statusColors.js # helper for comment status badges
│ ├── App.js # routes: public + protected
│ ├── index.js
│ └── index.css # Tailwind imports + custom keyframes
├── .env.development # REACT_APP_API_URL for local backend
├── .env.production # REACT_APP_API_URL for deployed backend (Render)
├── package.json
└── tailwind.config.js
```

## Important Notes for the Team

- All API responses from the backend use the `{ success, message, data }` pattern (except `/posts` which returns `{ success, posts }` and `/posts/:id` returns `{ success, post }`).  
- **Error handling** in the frontend always looks at `err.response?.data?.message`.  
- **Authentication** middleware attaches `req.userId` (not the full user object).  
- The comment system uses `author` as a **string** (the logged‑in user’s username) – this is technical debt that can be migrated later to a proper `ObjectId` reference.  
- `syncCommentCount.js` in backend utils is **deprecated** and can be deleted.  
- The `.vscode/tasks.json` provides a one‑click “Start Frontend Development Server” task – useful but not essential.

## Deployment URLs

- **Production frontend**: [https://blogify-teal.vercel.app/](https://blogify-teal.vercel.app/)  
- **Production backend**: [https://blogify-uk2x.onrender.com/api](https://blogify-uk2x.onrender.com/api)  

For local development, ensure the frontend `.env.development` uses `http://localhost:5000/api` and the backend `.env` uses your local MongoDB URI.