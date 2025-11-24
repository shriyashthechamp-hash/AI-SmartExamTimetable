# ApplyMate MVP Walkthrough

## Accomplished
- **Frontend**: Built with Astro, featuring a premium "Dark Mode" design system.
    - **Landing Page**: Hero section, features, and "Get Started" CTA.
    - **Dashboard**: Sidebar layout with user profile and navigation.
    - **Job Search**: Real-time fetching of jobs from the backend.
- **Backend**: Node.js + Express server with Prisma ORM.
    - **API**: `/api/jobs` endpoint serving mock job data.
    - **Database**: SQLite database initialized with User and Job models.

## Verification
### 1. Landing Page
Open `http://localhost:4321/` to see the landing page.
![Landing Page](/Users/shriyasdeshmukh/Desktop/applymate/frontend/public/landing-preview.png)
*(Note: You'll need to open the browser to see the actual UI)*

### 2. Dashboard & Job Matching
Navigate to `http://localhost:4321/dashboard/jobs`.
The page fetches data from `http://localhost:3001/api/jobs`.

**Backend Response Verification:**
```json
[
  {
    "id": 1,
    "title": "Frontend Developer",
    "company": "TechCorp",
    "matchScore": 95,
    "location": "Remote",
    "type": "Full-time"
  },
  ...
]
```

## Next Steps
- Implement actual Job Scraper.
- Add User Authentication (Login/Signup).
- Build the Resume Generator with AI.
