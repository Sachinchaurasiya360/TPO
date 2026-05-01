# Vishwaniketan TPO Portal

A Training & Placement Office portal for Vishwaniketan iMEET — role-based access for Students, Alumni, Faculty, HODs, and Admins, with a verification workflow for every piece of student data.

---

## Table of Contents

1. [What's Built](#whats-built)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Local Setup](#local-setup)
5. [Running the App](#running-the-app)
6. [Role Flows](#role-flows)
   - [Student](#student-flow)
   - [Admin](#admin-flow)
   - [Faculty](#faculty-flow)
   - [HOD](#hod-flow)
   - [Alumni](#alumni-flow)
7. [Verification Model](#verification-model)
8. [API Overview](#api-overview)
9. [File Uploads](#file-uploads)
10. [Roadmap](#roadmap)

---

## What's Built

| Module | Feature | Status |
|---|---|---|
| F01 | Authentication — student signup, JWT cookie login, forgot/reset password | ✅ |
| F02 | Student profile with verification-gated fields + avatar / resume upload | ✅ |
| F03 | Marks (SSC/HSC/Sem 1-8 CGPA + per-sem marksheet) with verification + auto `avgCgpa` | ✅ |
| F04 | Internships (CRUD) with certificate upload + verification flag | ✅ |
| F05 | Achievements (CRUD) with certificate upload + verification flag | ✅ |
| F06 | Admin Dashboard — registrations, students, faculty, graduate-to-alumni | ✅ |
| F07 | Faculty Dashboard — unified verification queue, dept students, HOD faculty mgmt | ✅ |
| F08 | Jobs & Applications | 🚧 In progress |
| F09 | Events Management | 🚧 In progress |
| F10 | Notification bell / preferences | 📋 Planned |
| F11+ | Alumni module (mentorship, referrals) | 📋 Planned |

---

## Tech Stack

**Backend**
- Express.js 5 + TypeScript
- Prisma 6 + PostgreSQL
- JWT (HTTP-only cookies) + bcrypt
- Zod 4 for validation
- Resend for transactional email
- Cloudinary for media storage (2MB cap)
- Pino for structured logging

**Frontend**
- React 19 + TypeScript + Vite
- Tailwind CSS 4 + shadcn-style UI primitives
- React Router 7
- Axios (`withCredentials`)
- Sonner for toasts

---

## Project Structure

```
TPO/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma           # Database models
│   │   └── migrations/
│   ├── src/
│   │   ├── controller/             # Route handlers per domain
│   │   ├── lib/                    # prisma client, cloudinary, mail, verification helpers
│   │   ├── middleware/             # auth (isAuthenticated, isAdmin, isFaculty, isHOD), upload
│   │   ├── routes/                 # auth / student / faculty / admin / alumni
│   │   └── index.ts                # Express entry
│   └── utils/
│       ├── types/zodSchema.ts      # Shared validation schemas
│       └── logger/
├── frontend/
│   └── src/
│       ├── components/             # ui/ primitives + shared (Navbar, Sidebar, ProtectedRoute)
│       ├── context/AuthContext.tsx # Session state from /auth/me
│       ├── lib/                    # api.ts + typed API clients per role
│       ├── pages/                  # public / student / faculty / admin / alumni
│       └── App.tsx                 # Route definitions
├── PRD.md                          # Full feature spec
└── readme.md
```

---

## Local Setup

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 14+
- (Free) accounts: [Cloudinary](https://cloudinary.com), [Resend](https://resend.com)

### 1. Clone and install

```bash
git clone https://github.com/sachinchaurasiya360/tpo
cd TPO
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 2. Environment variables

Create `backend/.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tpo_db"

# Server
PORT=3000
FRONTEND_URL="http://localhost:5173"

# Auth
JWT_SECRET="replace-with-a-long-random-string"

# Email (Resend)
RESEND_API_KEY="re_xxx"
RESEND_FROM_EMAIL="TPO Vishwaniketan <noreply@yourdomain.com>"

# Uploads (Cloudinary)
CLOUDINARY_CLOUD_NAME="xxx"
CLOUDINARY_API_KEY="xxx"
CLOUDINARY_API_SECRET="xxx"
```

Create `frontend/.env`:

```env
VITE_API_URL="http://localhost:3000"
```

### 3. Database

```bash
cd backend
npx prisma migrate dev       # applies migrations + generates client
```

### 4. Create the first Admin

There is no self-signup for admins. Seed one manually in `psql` or Prisma Studio:

```bash
cd backend
npx prisma studio            # opens a web UI — add a User with role=ADMIN, isVerified=true, isActive=true
```

Password must be bcrypt-hashed. A quick one-liner:

```bash
node -e "console.log(require('bcrypt').hashSync('YourAdminPass123', 10))"
```

Paste the hash into the `password` field of the admin user.

---

## Running the App

Two terminals:

```bash
# Terminal 1 — backend (port 3000)
cd backend && npm run dev

# Terminal 2 — frontend (port 5173)
cd frontend && npm run dev
```

Open http://localhost:5173.

---

## Role Flows

### Student Flow

```
Signup → Pending → Admin Approves → Active Student → Edit Profile → Pending Verification → Faculty Reviews → Approved/Rejected
```

1. **Sign up** at `/signup` with full name, email, student ID, department, academic year, password.
2. Account is created with `isVerified=false`. Student receives a welcome email. Login is blocked until approved.
3. **Admin approves** → student receives an approval email and can now log in.
4. From `/student` the student can:
   - Fill profile: legal name, contact, parent contact, skills, social links, profile pic, resume.
   - Some fields (name, student ID, department, year) flow through **verification** — changes appear as "Pending" until faculty approves.
   - Enter **marks** (SSC/HSC %, Sem 1-8 CGPA, upload per-sem marksheets). Numeric edits are verification-gated; marksheet URLs update directly.
   - Add **internships** (company, role, dates, HR contact, certificate). Each starts as unverified until faculty approves.
   - Add **achievements** (title, category, date, proof). Same verification model.
5. The **dashboard banner** shows pending verification diffs (`old → new`) with a Cancel button to revert.
6. Student receives an email + in-app notification on approval/rejection (with faculty remarks on rejection).

**2MB cap** on every upload — client shows a warning toast before sending; server returns 413 if bypassed.

---

### Admin Flow

Login at `/login` → lands on `/admin`. Tabs:

**1. Overview**
- Active students / alumni / faculty counts.
- Pending counts: registrations, profile+marks verifications, internship verifications, achievement verifications.
- Department-wise student breakdown.

**2. Approvals**
- List of pending student signups.
- **Approve** → flips `isVerified=true`, sends approval email.
- **Reject** (with optional reason) → flips `isActive=false`, sends rejection email.

**3. Students**
- Paginated directory of all students + alumni.
- Filters: department, year, role (Student/Alumni), min CGPA, active/verified flags, search (name/email/student ID).
- Per row:
  - **Graduate** → flips role to `ALUMNI` + sends invite email with link to `/alumni/profile`.
  - **Activate / Deactivate** account (cannot deactivate another admin).

**4. Faculty**
- Directory sorted by department.
- **Add Faculty** → admin fills name/email/contact/dept/HOD flag. A temp password is auto-generated, the account is created with `isVerified=true`, and the credentials are emailed to the faculty.
- Per row: **Set/Unset HOD**, **Activate/Deactivate**.

Admin protections: cannot change own status; cannot toggle another admin's status.

---

### Faculty Flow

Login at `/login` → lands on `/faculty`. All data is **scoped to the faculty's department**.

**1. Overview**
- Pending profile/marks verifications in dept.
- Pending internships in dept.
- Pending achievements in dept.
- Dept student count, upcoming events count.

**2. Verification Queue**
A unified, chronological list of everything waiting for review. Three kinds:
- **Profile / Marks changes** — rendered as field-level diffs (`old → new`).
- **Unverified internships** — full detail + HR contact + certificate link.
- **Unverified achievements** — full detail + certificate link.

Actions: **Approve** or **Reject with optional remarks**.
- On Approve: diff is applied to the actual user/marks row. For marks, `avgCgpa` is recomputed from completed semesters.
- On Reject: student receives an email (with remarks) and an in-app notification.

**3. Students**
- Dept-scoped student directory with filters (year, min CGPA, search).
- Read-only — faculty cannot directly edit student data; they can only approve/reject changes the student submits.

**4. Department Faculty** *(HOD only — see below)*

---

### HOD Flow

HOD is a flag (`isHOD=true`) on a faculty account, set by admin. An HOD has **everything a Faculty has**, plus one extra tab:

**Department Faculty** (visible only when `user.isHOD === true`):
- List of all faculty in the same department, sorted with HODs first.
- **Set/Unset HOD** — promote or demote another faculty in the department.
- **Activate/Deactivate** any faculty in the department (cannot change own status).

HODs can have multiple people per department (the schema allows it), but typically there's one.

---

### Alumni Flow

Alumni accounts are created by the admin **Graduate** action on a student. The student is flipped to `role=ALUMNI` and receives an invite email.

Currently alumni can:
- Log in and land on `/alumni`.
- Edit their alumni profile at `/alumni/profile` (current org, role, package, graduation year, placedBy).

Mentorship / referral / career-advice posts (F11) are planned but not yet built.

---

## Verification Model

There are **two patterns** for "unverified" data depending on whether the current value is still valid:

### 1. Field-level diff (Profile + Marks)

Used when the student's existing approved values remain the source of truth until a change is approved.

- Student submits edits to verification-gated fields (e.g., `fullName`, `studentId`, `department`, `academicYear`, semester CGPAs).
- A row is upserted in `VerificationRequest` with a JSON `changes` blob: `{ fieldName: { oldValue, newValue } }`.
- Only **one PENDING row per (userId, entityType, entityId)** — repeated edits merge into the same row.
- If the diff becomes empty (student reverted), the pending row is deleted.
- Faculty approval applies the diff to the actual user/marks row; rejection notifies student with remarks.

Verification-gated fields live in `backend/src/lib/verification.ts`. Direct fields (contact, skills, social, avatar URL, resume URL) bypass verification entirely.

### 2. Row-level flag (Internship + Achievement)

Used when the row IS the data — the certificate upload doesn't exist until the student creates it, so there's nothing to compare against.

- The entity row has an `isVerified` boolean.
- Creating or editing a row resets it to `isVerified=false`.
- Faculty flips `isVerified=true` to approve.
- Delete + re-add is fine; no pending row tracking needed.

---

## API Overview

All routes are prefixed with `/api/v1`. Auth is via HTTP-only `token` cookie.

| Prefix | Purpose | Guards |
|---|---|---|
| `/auth/*` | Signup, login, logout, forgot/reset password | public |
| `/student/*` | Profile, marks, internship, achievement, uploads | `isAuthenticated` + `isStudent` |
| `/faculty/*` | Stats, verification queue, review, dept students | `isAuthenticated` + `isFaculty` |
| `/faculty/hod/*` | Dept faculty management | `isAuthenticated` + `isFaculty` + `isHOD` |
| `/admin/*` | Stats, registrations, faculty, students | `isAuthenticated` + `isAdmin` |
| `/alumni/*` | Alumni profile | `isAuthenticated` + `isAlumni` |

Refer to the individual `routes/*.ts` files for the full endpoint list.

---

## File Uploads

All uploads go to Cloudinary via memory-storage multer. Hard cap: **2MB** (enforced server-side; client validates first and shows a toast warning).

| Kind | Folder | Accepted |
|---|---|---|
| Profile picture | `tpo/profile-pics` | JPG, PNG, WebP, SVG |
| Resume | `tpo/resumes` | PDF |
| Certificate (internship / achievement) | `tpo/certificates` | PDF or image |
| Marksheet (per semester) | `tpo/marksheets` | PDF or image |
| Company logo (admin — jobs) | `tpo/company-logos` | JPG, PNG, WebP, SVG |

On replace, the old Cloudinary asset is deleted before the new one is stored.

---

## Roadmap

- **F08** Jobs & Applications — admin posts jobs with eligibility rules; students see only eligible jobs; one-click apply attaches resume; admin tracks applicant pipeline (Applied → Shortlisted → Interview → Selected/Rejected) with email updates.
- **F09** Events — admin CRUD; public landing page pulls upcoming events dynamically.
- **F10** Notification center — in-app bell with unread count, mark-as-read, per-type preferences.
- **F11+** Alumni mentorship posts, referrals, career-advice feed.
- **F13** Aptitude module (later scope).

Full spec: [PRD.md](PRD.md).

---

## License

Built for the Training & Placement Cell of Vishwaniketan iMEET.
#   T P O  
 