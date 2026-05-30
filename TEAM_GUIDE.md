# Team Guide – Blogify

Welcome to the Blogify project! This guide explains how to work together effectively using Git, what’s already built, and what needs to be done next.

## 📁 Repository Structure
Blogify/
```
├── backend/ # Node.js + Express server
├── frontend/ # React app
├── .gitignore
├── README.md
├── STRUCTURE.md
└── TEAM_GUIDE.md
```


## 🚀 Getting Started (First Time)

```bash
git clone https://github.com/tanya-2004/Blogify.git
cd Blogify
cd backend && npm install
cd ../frontend && npm install
```

Create environment files:
`backend/.env`
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

`frontend/.env.development`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Run locally:

- Backend: cd backend && npm run dev
- Frontend: cd frontend && npm start


✅ Features Already Complete (100%)

- Authentication (signup, login, logout, protected routes)
- Post CRUD (create, read, update, delete, like)
- Comments (create, approve/reject, delete, like, reply)
- Dashboard with user posts and stats
- Public homepage with post listing
- User settings (profile, privacy, notifications, appearance, publishing)
- Theme customization (light/dark/minimal/warm, accent colour, font size)
- Admin comment moderation page (/comments)
- Analytics page (/stats)


🟡 What Needs Minor Work (Next Sprint)

| Task | Description | Estimated Hours |
|---|---|---|
| Unlike post | Allow users to remove their like | |
| Image upload | Replace URL input with file upload (Cloudinary) | |
| Pagination UI | Add "Load More" or page buttons to posts list | |
| Search / filter | Search posts by title/tags | |
| Email notifications | Send email for comment replies, weekly digest | |
| Public user profile | View user’s profile at /user/:username | |


❌ Missing Features (Future Sprints)

- Admin panel (manage users, site settings)
- Draft posts
- User roles (admin, editor, author)
- Social sharing buttons
- SEO (meta tags, sitemap)
- RSS feed
- Spam detection for comments


🧠 Git Workflow (Branching Strategy)

- main – always deployable. Never commit directly.
- feature/xxx – for new features or bug fixes.
- hotfix/xxx – for urgent production fixes.

Daily Routine
```bash
# 1. Get latest main
git checkout main
git pull origin main

# 2. Create a branch for your task
git checkout -b feature/your-task-name    # e.g., feature/image-upload

# 3. Work, commit often
git add .
git commit -m "describe your change"

# 4. Push to GitHub
git push origin feature/your-task-name

# 5. Open a Pull Request (PR) on GitHub
- Request at least one teammate to review
- After approval, merge (do not merge your own PR)
```

Keeping Your Branch Updated
If main changes while you are working:
```bash
git checkout main
git pull origin main
git checkout feature/your-task-name
git merge main   # fix conflicts if any
git push origin feature/your-task-name
```

Pull Request Template
Create .github/pull_request_template.md with:
```markdown
## Description
- What does this PR do?

## Type of change
- [ ] Bug fix
- [ ] New feature

## Checklist
- [ ] Tested locally
- [ ] Updated documentation if needed
```

Code Review Rules
- Every PR needs at least one review from another teammate.
- No direct commits to main.
- Use GitHub Issues to assign tasks.

Useful Git Commands

| Action | Command |
|---|---|
| See current branch | `git branch` |
| Switch branch | `git checkout branch-name` |
| Create + switch | `git checkout -b new-branch` |
| See changes | `git status` |
| Add all changes | `git add .` |
| Commit | `git commit -m "message"` |
| Pull latest main | `git pull origin main` |
| Push your branch | `git push origin branch-name` |
| Discard local changes | `git checkout -- .` |

🧪 Testing Before Commit

- Backend: cd backend && npm run dev – check for startup errors.
- Frontend: cd frontend && npm start – check for compilation errors.
- Always test the feature you changed (login, create post, comment, etc.).

📞 Getting Help

- Read README.md and STRUCTURE.md first.
- Check existing code for patterns (e.g., how API calls are made in PostDetail.js).
- Ask the team lead or search the chat history.
