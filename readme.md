# Vishwaniketan TPO

Role-based Training & Placement Office portal for Vishwaniketan iMEET — Students, Alumni, Faculty, HODs, and Admins, with a faculty verification workflow for all student data.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Backend | Express.js 5, TypeScript, Prisma 6, PostgreSQL, Zod 4, JWT (HTTP-only cookies), Resend, Cloudinary, Pino |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7, Axios, Sonner |

## Features

| # | Module | Status |
|---|--------|--------|
| F01 | Auth — signup, JWT login, forgot/reset password | ? |
| F02 | Student profile — verification-gated fields, avatar, resume | ? |
| F03 | Marks — SSC/HSC/Sem 1-8 CGPA, marksheets, auto `avgCgpa` | ? |
| F04 | Internships — CRUD, certificate upload, faculty verification | ? |
| F05 | Achievements — CRUD, certificate upload, faculty verification | ? |
| F06 | Admin Dashboard — approvals, students, faculty, jobs, events | ? |
| F07 | Faculty Dashboard — verification queue, dept students, HOD mgmt | ? |
| F08 | Jobs & Applications | ?? |
| F09 | Events | ?? |
| F10 | Notifications | ?? |
| F11 | Alumni mentorship / referrals | ?? |

## Local Setup

**Prerequisites:** Node.js 20+, PostgreSQL 14+, [Cloudinary](https://cloudinary.com) and [Resend](https://resend.com) accounts.

```bash
git clone https://github.com/sachinchaurasiya360/tpo
cd TPO
cd backend && npm install
cd ../frontend && npm install
```

**`backend/.env`**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/tpo_db"
PORT=3000
FRONTEND_URL="http://localhost:5173"
JWT_SECRET="replace-with-a-long-random-string"
RESEND_API_KEY="re_xxx"
RESEND_FROM_EMAIL="TPO <noreply@yourdomain.com>"
CLOUDINARY_CLOUD_NAME="xxx"
CLOUDINARY_API_KEY="xxx"
CLOUDINARY_API_SECRET="xxx"
```

**`frontend/.env`**

```env
VITE_API_URL="http://localhost:3000"
```

```bash
cd backend && npx prisma migrate dev
# Seed first admin via Prisma Studio (bcrypt-hash the password)
npx prisma studio
```

## Running

```bash
cd backend && npm run dev    # port 3000
cd frontend && npm run dev   # port 5173
```

## Roles

| Role | Landing | Key capabilities |
|------|---------|-----------------|
| **Student** | `/student` | Edit profile/marks/internships/achievements ? faculty verification |
| **Faculty** | `/faculty` | Approve/reject student data in their department |
| **HOD** | `/faculty` | All faculty capabilities + manage dept faculty |
| **Admin** | `/admin` | Approve registrations, manage students/faculty, post jobs/events |
| **Alumni** | `/alumni` | Edit alumni profile |

## Verification Model

- **Field-level diff** (profile, marks) — changes held in `VerificationRequest` until faculty approves; existing values stay live.
- **Row-level flag** (internships, achievements) — new rows start `isVerified=false`; faculty flips to approve.

## API

All routes under `/api/v1`, auth via HTTP-only `token` cookie.

| Prefix | Guards |
|--------|--------|
| `/auth/*` | public |
| `/student/*` | `isAuthenticated` + `isStudent` |
| `/faculty/*` | `isAuthenticated` + `isFaculty` |
| `/admin/*` | `isAuthenticated` + `isAdmin` |
| `/alumni/*` | `isAuthenticated` + `isAlumni` |

## File Uploads

Cloudinary via multer, **2 MB max** (client + server enforced).

| Type | Accepted |
|------|----------|
| Profile picture | JPG, PNG, WebP, SVG |
| Resume | PDF |
| Certificate / Marksheet | PDF or image |

---

Built for the Training & Placement Cell of Vishwaniketan iMEET.
