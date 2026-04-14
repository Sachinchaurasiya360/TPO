# Product Requirements Document (PRD)

## Vishwaniketan TPO - Training & Placement Office Portal

**Version:** 1.0
**Date:** 2026-04-12
**Status:** Draft
**Product Type:** Production Web Application (used by real students & faculty)

---

## 1. Product Overview

### 1.1 Vision

A comprehensive, mobile-responsive web portal for Vishwaniketan iMEET's Training & Placement Office that connects students, faculty, alumni, and administrators. The platform manages the entire placement lifecycle - from student profile building and verification, to job postings and applications, to alumni engagement and mentorship.

### 1.2 Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Frontend     | React 19 + TypeScript + Vite + Tailwind CSS     |
| Backend      | Express.js 5 + TypeScript + Prisma ORM          |
| Database     | PostgreSQL                                       |
| File Storage | Cloudinary (max 2MB per file)                   |
| Email        | Resend (replacing current Nodemailer)            |
| Auth         | JWT (HTTP-only cookies)                          |
| Deployment   | Vercel (frontend), TBD (backend)                |

### 1.3 Departments

CSE, COMPUTER, ELECTRICAL, MECHANICAL, EXTC, CIVIL

---

## 2. User Roles & Permissions

### 2.1 Roles

| Role        | Description                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------- |
| **STUDENT** | Current enrolled student. Can manage profile, apply to jobs, view events, submit assignments.    |
| **ALUMNI**  | Graduated student (converted by Admin). Can update career info, post mentorship/referrals.       |
| **FACULTY** | Created by Admin. Can verify student data, create aptitude tests/homework. Scoped to own dept.   |
| **FACULTY (HOD)** | Faculty with `isHOD: true` flag. Additional power: manage other faculty in their department. |
| **ADMIN**   | Full access. Manages all departments, posts jobs, manages events, creates faculty/HOD accounts.  |

### 2.2 Permission Matrix

| Action                              | Student | Alumni | Faculty | Faculty (HOD) | Admin |
| ----------------------------------- | :-----: | :----: | :-----: | :-----------: | :---: |
| View/edit own profile               |   Yes   |  Yes   |   Yes   |      Yes      |  Yes  |
| Submit profile changes for verify   |   Yes   |   -    |    -    |       -       |   -   |
| Verify student data                 |    -    |   -    |  Own dept  |   Own dept  |  All  |
| View student list                   |    -    |   -    |  Own dept  |   Own dept  |  All  |
| Manage faculty in department        |    -    |   -    |    -    |      Yes      |  All  |
| Post jobs/placement drives          |    -    |   -    |    -    |       -       |  Yes  |
| Apply to jobs                       |   Yes   |   -    |    -    |       -       |   -   |
| Manage events                       |    -    |   -    |    -    |       -       |  Yes  |
| View events                         |   Yes   |  Yes   |   Yes   |      Yes      |  Yes  |
| Post mentorship/referrals           |    -    |  Yes   |    -    |       -       |   -   |
| View alumni posts                   |   Yes   |  Yes   |   Yes   |      Yes      |  Yes  |
| Create faculty/HOD accounts         |    -    |   -    |    -    |       -       |  Yes  |
| Mark student as graduated (alumni)  |    -    |   -    |    -    |       -       |  Yes  |
| Create aptitude tests/homework      |    -    |   -    |   Yes   |      Yes      |  Yes  |
| Submit aptitude tests/homework      |   Yes   |   -    |    -    |       -       |   -   |
| Export data (CSV/Excel/PDF)         |    -    |   -    |  Own dept  |   Own dept  |  All  |
| View notifications                  |   Yes   |  Yes   |   Yes   |      Yes      |  Yes  |
| View analytics dashboard            |    -    |   -    |  Own dept  |   Own dept  |  All  |

---

## 3. Feature Specifications

Features are organized into **4 priority phases**:

- **P0 (Critical):** Must have for launch
- **P1 (High):** Important, needed shortly after launch
- **P2 (Medium):** Valuable, can follow in later release
- **P3 (Low):** Nice to have, last scope

---

### Phase P0 - Core Platform (Critical)

---

#### F01: Authentication & Account Management

**Current State:** Signup/Login with JWT + email verification partially implemented.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F01.1   | Student self-registration with email, studentId, department, academic year  | Exists       |
| F01.2   | Admin creates Faculty and HOD accounts (no self-registration for staff)     | New          |
| F01.3   | JWT-based login with HTTP-only cookie storage                               | Exists       |
| F01.4   | Role-based route protection (frontend guards + backend middleware)          | Partial      |
| F01.5   | Password reset via email (Resend)                                           | New          |
| F01.6   | Admin approval flow for new student registrations                           | Exists (API) |
| F01.7   | Replace Nodemailer with Resend for all email functionality                  | New          |
| F01.8   | Welcome email on signup, approval/rejection email notifications             | New          |

**Acceptance Criteria:**
- Students can register and receive a verification email via Resend
- Admin can create Faculty accounts with department assignment and optional `isHOD` flag
- Protected routes redirect unauthenticated users to login
- Each role lands on their respective dashboard after login
- Password reset sends a time-limited token link via Resend

---

#### F02: Student Profile & Verification Flow

**Current State:** Dashboard shows hardcoded name. Profile form exists but no API integration.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F02.1   | Dashboard displays real logged-in student data (name, dept, year, etc.)     | New          |
| F02.2   | Profile fields: full name, legal name, contact, email, parent contact, skills, social profile | Partial |
| F02.3   | Profile picture upload to Cloudinary (max 2MB, image only)                  | New          |
| F02.4   | Resume file upload to Cloudinary (max 2MB, PDF only)                        | New          |
| F02.5   | Profile completion percentage calculated from filled fields                 | New          |
| F02.6   | **Verification flow:** When student edits any verified field, change goes to "pending verification" state | New |
| F02.7   | Student sees current approved data + pending changes indicator              | New          |
| F02.8   | Faculty (same dept) sees list of pending verifications and can approve/reject with remarks | New |
| F02.9   | Student gets in-app notification on approval/rejection                      | New          |
| F02.10  | Student gets email (Resend) on rejection with faculty remarks              | New          |

**Verification Flow:**
```
Student edits profile
    -> Data saved as "PENDING" (old data remains visible)
    -> Faculty of same department gets notification
    -> Faculty reviews and approves/rejects
        -> Approved: New data replaces old, student notified
        -> Rejected: Pending data discarded, student notified with reason
```

**Acceptance Criteria:**
- Student dashboard shows real name, profile picture, and all profile data
- Editing a field creates a pending change request (does not overwrite immediately)
- Faculty can see a queue of pending verifications for their department
- Profile completion % updates dynamically based on filled fields

---

#### F03: Marks Management

**Current State:** Form UI exists. Backend API exists for CGPA update.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F03.1   | SSC and HSC percentage entry                                                | Partial      |
| F03.2   | Semester 1-8 CGPA entry                                                     | Partial      |
| F03.3   | Average CGPA auto-calculated from semester marks                            | New          |
| F03.4   | Marks changes follow same verification flow as profile (F02.6)             | New          |
| F03.5   | Marksheet upload to Cloudinary (per semester, max 2MB)                      | New          |
| F03.6   | Faculty can verify marks against uploaded marksheets                        | New          |

**Acceptance Criteria:**
- Student enters marks and uploads supporting documents
- Changes go through faculty verification before becoming official
- Average CGPA auto-computes and displays on profile

---

#### F04: Internship Management (CRUD)

**Current State:** Form UI exists. Backend API exists for single update.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F04.1   | Student can add multiple internships                                        | New          |
| F04.2   | List view of all internships with status indicators                         | New          |
| F04.3   | Create: Company name, role, description, duration, start/end dates          | Partial      |
| F04.4   | Certificate upload to Cloudinary (max 2MB)                                  | New          |
| F04.5   | Edit existing internship details                                            | New          |
| F04.6   | Delete an internship                                                        | New          |
| F04.7   | Internship follows verification flow (faculty verifies)                     | Partial      |
| F04.8   | HR contact info fields (name, email, phone) for verification               | New          |

**Acceptance Criteria:**
- Student can add, view, edit, delete internships
- Each internship shows verification status (Pending/Verified/Rejected)
- Certificate file uploads to Cloudinary successfully
- Faculty can verify internship entries

---

#### F05: Achievement Management (CRUD)

**Current State:** Form UI with partial logic exists.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F05.1   | Student can add multiple achievements                                       | New          |
| F05.2   | List view of all achievements                                               | New          |
| F05.3   | Create: Title, description, date, category (academic/sports/cultural/tech)  | Partial      |
| F05.4   | Certificate/proof upload to Cloudinary (max 2MB)                            | New          |
| F05.5   | Edit existing achievement                                                   | New          |
| F05.6   | Delete an achievement                                                       | New          |
| F05.7   | Achievement follows verification flow                                       | New          |

**Acceptance Criteria:**
- Full CRUD operations on achievements
- Each achievement shows verification status
- Supporting documents upload correctly

---

#### F06: Admin Dashboard

**Current State:** Empty placeholder page. Backend APIs exist for some operations.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F06.1   | Overview cards: Total students, pending approvals, active drives, placed students | New     |
| F06.2   | Student list with rich filters (see F13)                                    | New          |
| F06.3   | Approve/reject new student registrations                                    | API exists   |
| F06.4   | View individual student full profile (read-only)                            | API exists   |
| F06.5   | Create Faculty accounts with department + optional isHOD flag               | New          |
| F06.6   | Manage faculty list (view, deactivate, reassign HOD)                        | Partial      |
| F06.7   | Mark students as graduated / convert to alumni (sends invite email)         | New          |
| F06.8   | Department-wise analytics and placement statistics                          | New          |
| F06.9   | Sidebar navigation for all admin sections                                   | New          |

**Acceptance Criteria:**
- Admin has a fully functional dashboard with all management capabilities
- All student data across all departments is accessible
- Faculty account creation works with department scoping
- Graduate-to-alumni conversion triggers an email invite via Resend

---

#### F07: Faculty Dashboard

**Current State:** Does not exist.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F07.1   | Overview: Pending verifications count, department student count, upcoming events | New     |
| F07.2   | Verification queue: List of all pending student changes in their dept       | New          |
| F07.3   | Student list for their department only (with filters)                       | New          |
| F07.4   | View individual student profile (read-only)                                 | New          |
| F07.5   | HOD-specific: View and manage faculty members in their department           | New          |
| F07.6   | Department-level analytics (own department only)                            | New          |

**Acceptance Criteria:**
- Faculty can only see data from their own department
- Verification queue shows all pending changes with approve/reject actions
- HOD can see faculty list; regular faculty cannot

---

### Phase P1 - Placement & Jobs (High Priority)

---

#### F08: Job Posting & Applications

**Current State:** Not implemented. Landing page mentions it as a feature.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F08.1   | Admin creates job posting with details (see below)                          | New          |
| F08.2   | Job posting fields:                                                         | New          |
|         | - Company name, logo (Cloudinary upload, max 2MB)                           |              |
|         | - Job title / role                                                          |              |
|         | - Job description (rich text)                                               |              |
|         | - Package (CTC / stipend)                                                   |              |
|         | - Location (on-site / remote / hybrid)                                      |              |
|         | - Job type (Full-time / Internship / PPO)                                   |              |
|         | - Eligible departments (multi-select)                                       |              |
|         | - Minimum CGPA requirement                                                  |              |
|         | - Eligible academic year(s)                                                 |              |
|         | - Application deadline                                                      |              |
|         | - Selection rounds info (e.g., Aptitude -> Technical -> HR)                 |              |
|         | - Number of openings                                                        |              |
|         | - Bond / service agreement details (if any)                                 |              |
|         | - Additional eligibility notes                                              |              |
| F08.3   | Job listing page visible to students (filtered by eligibility)              | New          |
| F08.4   | Student can apply with one click (profile + resume auto-attached)           | New          |
| F08.5   | Application status visible to student: "Applied"                            | New          |
| F08.6   | Admin can view all applicants per job with filters                          | New          |
| F08.7   | Admin can update application status (Applied/Shortlisted/Interview/Selected/Rejected) | New |
| F08.8   | Student sees status updates on their dashboard                              | New          |
| F08.9   | In-app + email notification when new eligible job is posted                 | New          |
| F08.10  | Jobs appear on student dashboard under "Active Drives"                      | New          |
| F08.11  | Admin can close/archive a job posting                                       | New          |
| F08.12  | Eligibility auto-check: Student can only apply if they meet all criteria    | New          |

**Acceptance Criteria:**
- Admin can create, edit, close job postings with all specified fields
- Students see only jobs they are eligible for
- One-click apply attaches student profile and resume
- Student dashboard shows "Applied" status for applied jobs
- Notifications sent when new relevant job is posted

---

#### F09: Events Management

**Current State:** Hardcoded events on landing page. Schema exists but minimal.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F09.1   | Admin creates events with: title, description, date/time, location, type   | New          |
| F09.2   | Event types: Placement Drive, Workshop, Seminar, Mock Interview, Webinar, Other | New     |
| F09.3   | Events displayed on landing page (upcoming only, sorted by date)           | Partial      |
| F09.4   | Events displayed on all dashboards                                          | New          |
| F09.5   | Admin can edit/cancel events                                                | New          |
| F09.6   | No RSVP/registration for events (view only)                                | Confirmed    |
| F09.7   | Past events auto-archive                                                    | New          |

**Acceptance Criteria:**
- Admin can create and manage events
- Events display dynamically on landing page and dashboards
- Events are sorted by date, past events are hidden from main view

---

#### F10: Notification System

**Current State:** Commented-out Notification model in schema. No implementation.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F10.1   | In-app notification bell icon with unread count badge                       | New          |
| F10.2   | Notification dropdown/panel listing all notifications                      | New          |
| F10.3   | Mark as read (individual + mark all as read)                                | New          |
| F10.4   | Notification types:                                                         | New          |
|         | - New job posted (eligible students)                                        |              |
|         | - Profile/marks/internship verified or rejected                             |              |
|         | - Application status updated                                                |              |
|         | - New event created                                                         |              |
|         | - Account approved/rejected                                                 |              |
|         | - Alumni post (for students)                                                |              |
|         | - Pending verifications (for faculty)                                       |              |
|         | - New student registration (for admin)                                      |              |
| F10.5   | **Email via Resend** for critical notifications:                            | New          |
|         | - Account approval/rejection                                                |              |
|         | - New job posting (matching eligibility)                                    |              |
|         | - Profile verification rejection (with remarks)                             |              |
|         | - Alumni invitation                                                         |              |
| F10.6   | Notification preferences (optional): Allow users to toggle email notifs     | New          |

**Acceptance Criteria:**
- All users see a notification bell with unread count
- Critical actions trigger both in-app and email notifications
- Notifications are clickable and navigate to relevant page

---

### Phase P2 - Alumni & Data Management (Medium Priority)

---

#### F11: Alumni Module

**Current State:** Form UI exists. Schema exists. No integration.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F11.1   | Admin marks student as graduated -> system sends alumni invitation email    | New          |
| F11.2   | Alumni accepts invite and account role changes from STUDENT to ALUMNI       | New          |
| F11.3   | Alumni dashboard with own profile and career history                        | New          |
| F11.4   | Alumni can add/edit: Current org, package, past organizations, role history | Partial      |
| F11.5   | Alumni can indicate "Higher Studies" path with college, branch, location    | Schema exists|
| F11.6   | **Alumni Feed:** Alumni can post mentorship offers, job referrals, career advice, general updates | New |
| F11.7   | Feed is visible to all logged-in users (students, faculty, admin)          | New          |
| F11.8   | No comments or reactions on posts (view only for non-alumni)               | Confirmed    |
| F11.9   | Alumni directory: Searchable list of alumni (by company, year, department) | New          |
| F11.10  | Alumni can delete their own posts                                           | New          |

**Post Fields:**
- Post type: Mentorship / Referral / Career Advice / General
- Title
- Body text
- Company name (optional, for referrals)
- Role (optional, for referrals)
- Contact info / how to apply (optional)
- Created at

**Acceptance Criteria:**
- Admin can convert graduated students to alumni
- Alumni receive invitation email and can activate their alumni account
- Alumni can post to the feed and manage their career history
- Students can browse alumni posts and the alumni directory

---

#### F12: Cloudinary File Upload System

**Current State:** Resume is just a URL text field. No file upload.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F12.1   | Centralized file upload service using Cloudinary SDK                        | New          |
| F12.2   | Max file size: 2MB (enforced on frontend + backend)                        | New          |
| F12.3   | Allowed file types per context:                                             | New          |
|         | - Profile picture: JPG, PNG, WebP                                           |              |
|         | - Resume: PDF only                                                          |              |
|         | - Certificates: PDF, JPG, PNG                                               |              |
|         | - Company logo: JPG, PNG, WebP, SVG                                         |              |
|         | - Marksheets: PDF, JPG, PNG                                                 |              |
| F12.4   | Upload progress indicator on frontend                                       | New          |
| F12.5   | File replacement (uploading new file deletes old one from Cloudinary)      | New          |
| F12.6   | Secure URL storage in database                                              | New          |

**Acceptance Criteria:**
- All file upload fields use Cloudinary instead of URL text inputs
- Files over 2MB are rejected with clear error message
- Upload shows progress and success/failure feedback

---

#### F13: Rich Filter & Search System

**Current State:** No filters implemented on frontend.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F13.1   | Student list filters (for Faculty/Admin):                                   | New          |
|         | - Department (multi-select)                                                 |              |
|         | - Academic year                                                             |              |
|         | - CGPA range (min-max slider)                                               |              |
|         | - Placement status (Placed / Not placed / Applied)                          |              |
|         | - Verification status (Verified / Pending / Unverified)                     |              |
|         | - Skills (tag-based search)                                                 |              |
|         | - Search by name or student ID                                              |              |
| F13.2   | Job listing filters (for Students):                                         | New          |
|         | - Job type (Full-time / Internship / PPO)                                   |              |
|         | - Department eligibility                                                    |              |
|         | - Package range                                                             |              |
|         | - Location type (On-site / Remote / Hybrid)                                 |              |
|         | - Status (Open / Closed)                                                    |              |
| F13.3   | Alumni directory filters:                                                   | New          |
|         | - Graduation year                                                           |              |
|         | - Department                                                                |              |
|         | - Current company                                                           |              |
|         | - Higher studies vs. working                                                |              |
| F13.4   | All filter states preserved in URL query params (shareable/bookmarkable)   | New          |
| F13.5   | Pagination on all list views (20 items per page default)                   | New          |
| F13.6   | Sort options on all list views (name, date, CGPA, etc.)                    | New          |

**Acceptance Criteria:**
- Filters are combinable and produce correct results
- URL reflects filter state (back button / sharing works)
- Pagination works correctly with active filters

---

#### F14: Export Functionality

**Current State:** Not implemented.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F14.1   | Export student list as CSV or Excel (.xlsx)                                 | New          |
| F14.2   | Export includes all visible columns based on current filters                | New          |
| F14.3   | Export placement report as PDF (department-wise, year-wise)                 | New          |
| F14.4   | Export individual student profile as PDF                                    | New          |
| F14.5   | Export job applicant list per drive as CSV/Excel                            | New          |
| F14.6   | Faculty can only export their department data                              | New          |
| F14.7   | Admin can export across all departments                                    | New          |
| F14.8   | Export respects current filter/search state                                 | New          |

**Acceptance Criteria:**
- Export buttons visible on list views for Faculty and Admin
- Exported files contain correct, filtered data
- PDF reports are well-formatted with college branding

---

### Phase P3 - Aptitude & Homework (Low Priority / Last Scope)

---

#### F15: Aptitude Test & Homework Module

**Current State:** Schema exists for tests and questions. No UI.

**Requirements:**

| ID      | Requirement                                                                 | Status       |
| ------- | --------------------------------------------------------------------------- | ------------ |
| F15.1   | Faculty creates test/homework with: title, description, rules, time limit, total marks | Schema exists |
| F15.2   | Categories: APTITUDE, TECHNICAL, CODING, PERSONALITY                       | Schema exists |
| F15.3   | Question types: MCQ (4 options, single correct answer), marks per question | Schema exists |
| F15.4   | Faculty can set: allowed attempts, minimum passing marks, tab-switch limit | Schema exists |
| F15.5   | Test status: DRAFT -> PUBLISHED (only published tests visible to students) | Schema exists |
| F15.6   | Student takes test: Timer, question navigation, auto-submit on timeout     | New          |
| F15.7   | Tab-switch detection: Warns student, records count                         | New          |
| F15.8   | Student submits test -> Faculty reviews and assigns final marks            | New          |
| F15.9   | Faculty signs/verifies the submission                                       | New          |
| F15.10  | Student can view their results and marks after faculty verification        | New          |
| F15.11  | Faculty dashboard: List of tests, submissions per test, grading interface  | New          |
| F15.12  | Homework variant: Same as test but without timer and tab-switch detection  | New          |

**Acceptance Criteria:**
- Faculty can create, edit, publish, and archive tests
- Students can take published tests with timer and anti-cheat measures
- Faculty can review submissions and assign verified marks
- Results visible to students after verification

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Requirement                                      | Target         |
| ------------------------------------------------ | -------------- |
| Page load time (first contentful paint)          | < 2 seconds    |
| API response time (95th percentile)              | < 500ms        |
| File upload time (2MB)                            | < 5 seconds    |
| Concurrent users supported                       | 500+           |

### 4.2 Security

| Requirement                                      | Details                           |
| ------------------------------------------------ | --------------------------------- |
| Authentication                                   | JWT in HTTP-only cookies          |
| Password storage                                 | bcrypt hashed                     |
| API protection                                   | Role-based middleware on all routes |
| File upload validation                           | Server-side type + size check     |
| Input validation                                 | Zod schemas on all endpoints      |
| CORS                                             | Whitelist frontend domain only    |
| XSS prevention                                   | React's built-in escaping + CSP   |
| SQL injection prevention                         | Prisma ORM parameterized queries  |

### 4.3 Mobile Responsiveness

- All pages must be fully responsive (mobile-first approach)
- Breakpoints: Mobile (< 640px), Tablet (640-1024px), Desktop (> 1024px)
- Touch-friendly interactions (minimum tap target 44x44px)
- Sidebar collapses to hamburger menu on mobile
- Tables become card layouts on mobile

### 4.4 Accessibility

- Semantic HTML throughout
- Keyboard navigable
- Proper ARIA labels on interactive elements
- Sufficient color contrast (WCAG AA)

---

## 5. Database Schema Changes Required

### 5.1 Updated Roles Enum

```
enum Role {
  STUDENT
  ALUMNI
  FACULTY
  ADMIN
}
```

Remove: AMBASSADOR, SUPERADMIN, HOD, PROFESSOR

### 5.2 Updated/New Models Needed

```
Faculty model (update existing Admin model):
  + department: Department
  + isHOD: Boolean (default false)

VerificationRequest (NEW):
  - id, userId, fieldName, oldValue, newValue
  - status: PENDING | APPROVED | REJECTED
  - reviewedBy (facultyId), remarks, createdAt, reviewedAt

Job (NEW):
  - id, companyName, companyLogo, jobTitle, description
  - package, location, locationType, jobType
  - eligibleDepartments[], minCgpa, eligibleYears[]
  - deadline, rounds[], openings, bondDetails
  - additionalNotes, status (OPEN/CLOSED), createdAt

JobApplication (NEW):
  - id, jobId, studentId, status (APPLIED/SHORTLISTED/INTERVIEW/SELECTED/REJECTED)
  - appliedAt, updatedAt

Event (update existing upcomingEvents):
  - id, title, description, date, time, location
  - type (PLACEMENT_DRIVE/WORKSHOP/SEMINAR/MOCK_INTERVIEW/WEBINAR/OTHER)
  - status (UPCOMING/ONGOING/COMPLETED/CANCELLED)
  - createdBy, createdAt

Notification (NEW - uncomment and expand):
  - id, userId, title, message, type
  - isRead, link (navigation target), createdAt

AlumniPost (NEW):
  - id, alumniId, postType (MENTORSHIP/REFERRAL/CAREER_ADVICE/GENERAL)
  - title, body, companyName?, role?, contactInfo?
  - createdAt, updatedAt

Marks model (update):
  + marksheetUrls: String[] (Cloudinary URLs per semester)
```

---

## 6. API Endpoints Required

### Auth (`/api/v1/auth`)
| Method | Endpoint               | Description                     | Roles    |
| ------ | ---------------------- | ------------------------------- | -------- |
| POST   | /signup                | Student registration            | Public   |
| POST   | /signin                | Login (all roles)               | Public   |
| POST   | /forgot-password       | Send reset link via Resend      | Public   |
| POST   | /reset-password        | Reset password with token       | Public   |
| POST   | /logout                | Clear session cookie            | All      |

### Student (`/api/v1/student`)
| Method | Endpoint               | Description                     | Roles    |
| ------ | ---------------------- | ------------------------------- | -------- |
| GET    | /profile               | Get own profile                 | Student  |
| PATCH  | /profile               | Update profile (creates verif.) | Student  |
| PATCH  | /marks                 | Update marks (creates verif.)   | Student  |
| POST   | /internship            | Add internship                  | Student  |
| PATCH  | /internship/:id        | Edit internship                 | Student  |
| DELETE | /internship/:id        | Delete internship               | Student  |
| GET    | /internships           | List own internships            | Student  |
| POST   | /achievement           | Add achievement                 | Student  |
| PATCH  | /achievement/:id       | Edit achievement                | Student  |
| DELETE | /achievement/:id       | Delete achievement              | Student  |
| GET    | /achievements          | List own achievements           | Student  |
| POST   | /upload                | Upload file to Cloudinary       | Student  |
| GET    | /jobs                  | List eligible jobs              | Student  |
| POST   | /jobs/:id/apply        | Apply to a job                  | Student  |
| GET    | /applications          | List own applications           | Student  |
| GET    | /notifications         | List notifications              | Student  |
| PATCH  | /notifications/:id/read| Mark notification as read       | Student  |
| PATCH  | /notifications/read-all| Mark all as read                | Student  |

### Faculty (`/api/v1/faculty`)
| Method | Endpoint               | Description                     | Roles        |
| ------ | ---------------------- | ------------------------------- | ------------ |
| GET    | /dashboard             | Dashboard overview stats        | Faculty      |
| GET    | /verifications         | Pending verification queue      | Faculty      |
| PATCH  | /verifications/:id     | Approve/reject verification     | Faculty      |
| GET    | /students              | List dept students (filtered)   | Faculty      |
| GET    | /students/:id          | View student profile            | Faculty      |
| GET    | /faculty-members       | List dept faculty (HOD only)    | Faculty(HOD) |
| GET    | /export/students       | Export dept student data         | Faculty      |

### Admin (`/api/v1/admin`)
| Method | Endpoint               | Description                     | Roles  |
| ------ | ---------------------- | ------------------------------- | ------ |
| GET    | /dashboard             | Dashboard overview stats        | Admin  |
| GET    | /students              | List all students (filtered)    | Admin  |
| GET    | /students/:id          | View any student profile        | Admin  |
| PATCH  | /students/:id/approve  | Approve student registration    | Admin  |
| PATCH  | /students/:id/graduate | Convert student to alumni       | Admin  |
| POST   | /faculty               | Create faculty/HOD account      | Admin  |
| GET    | /faculty               | List all faculty                | Admin  |
| PATCH  | /faculty/:id           | Update faculty (toggle HOD)     | Admin  |
| DELETE | /faculty/:id           | Deactivate faculty              | Admin  |
| POST   | /jobs                  | Create job posting              | Admin  |
| PATCH  | /jobs/:id              | Edit job posting                | Admin  |
| DELETE | /jobs/:id              | Close/archive job               | Admin  |
| GET    | /jobs/:id/applicants   | List applicants with filters    | Admin  |
| PATCH  | /applications/:id      | Update application status       | Admin  |
| POST   | /events                | Create event                    | Admin  |
| PATCH  | /events/:id            | Edit event                      | Admin  |
| DELETE | /events/:id            | Cancel event                    | Admin  |
| GET    | /export/students       | Export all student data          | Admin  |
| GET    | /export/placements     | Export placement report          | Admin  |
| GET    | /export/applicants/:id | Export applicants for a job      | Admin  |

### Alumni (`/api/v1/alumni`)
| Method | Endpoint               | Description                     | Roles  |
| ------ | ---------------------- | ------------------------------- | ------ |
| POST   | /accept-invite         | Accept alumni invitation        | Alumni |
| GET    | /profile               | Get own alumni profile          | Alumni |
| PATCH  | /profile               | Update career info              | Alumni |
| POST   | /posts                 | Create a post                   | Alumni |
| GET    | /posts                 | List all alumni posts           | All    |
| DELETE | /posts/:id             | Delete own post                 | Alumni |
| GET    | /directory             | Alumni directory (filtered)     | All    |

### Events (`/api/v1/events`)
| Method | Endpoint               | Description                     | Roles  |
| ------ | ---------------------- | ------------------------------- | ------ |
| GET    | /                      | List upcoming events            | All    |
| GET    | /public                | Landing page events             | Public |

---

## 7. Frontend Pages & Routes

| Route                        | Page                    | Roles           |
| ---------------------------- | ----------------------- | --------------- |
| `/`                          | Landing Page            | Public          |
| `/login`                     | Login                   | Public          |
| `/signup`                    | Student Registration    | Public          |
| `/forgot-password`          | Password Reset Request  | Public          |
| `/reset-password/:token`    | Set New Password        | Public          |
| `/student`                   | Student Dashboard       | Student         |
| `/student/marks`            | Marks Management        | Student         |
| `/student/internships`      | Internship CRUD         | Student         |
| `/student/achievements`     | Achievement CRUD        | Student         |
| `/student/jobs`             | Job Listings            | Student         |
| `/student/applications`     | My Applications         | Student         |
| `/student/alumni-feed`      | Alumni Posts Feed       | Student         |
| `/faculty`                   | Faculty Dashboard       | Faculty         |
| `/faculty/verifications`    | Verification Queue      | Faculty         |
| `/faculty/students`         | Department Students     | Faculty         |
| `/faculty/students/:id`     | Student Profile View    | Faculty         |
| `/faculty/manage` (HOD)     | Manage Faculty          | Faculty (HOD)   |
| `/admin`                     | Admin Dashboard         | Admin           |
| `/admin/students`           | All Students            | Admin           |
| `/admin/students/:id`       | Student Profile View    | Admin           |
| `/admin/faculty`            | Manage Faculty          | Admin           |
| `/admin/jobs`               | Manage Job Postings     | Admin           |
| `/admin/jobs/:id/applicants`| View Applicants         | Admin           |
| `/admin/events`             | Manage Events           | Admin           |
| `/admin/alumni`             | Manage Alumni           | Admin           |
| `/admin/export`             | Export Center           | Admin           |
| `/alumni`                    | Alumni Dashboard        | Alumni          |
| `/alumni/feed`              | Alumni Feed (own posts) | Alumni          |
| `/alumni/directory`         | Alumni Directory        | All (logged in) |

---

## 8. Implementation Priority & Phases

### Phase P0 - Core Platform (Weeks 1-4)

| Week | Focus                                                          |
| ---- | -------------------------------------------------------------- |
| 1    | F01: Auth overhaul (Resend, password reset, role-based guards) |
| 1    | F12: Cloudinary upload service (shared utility)                |
| 2    | F02: Student profile with verification flow                    |
| 2    | F03: Marks management with verification                        |
| 3    | F04: Internship CRUD + verification                            |
| 3    | F05: Achievement CRUD + verification                           |
| 4    | F06: Admin dashboard (full)                                    |
| 4    | F07: Faculty dashboard + verification queue                    |

### Phase P1 - Placement & Jobs (Weeks 5-7)

| Week | Focus                                                          |
| ---- | -------------------------------------------------------------- |
| 5    | F08: Job posting (Admin) + job listing (Student)               |
| 6    | F08: Job applications + status tracking                        |
| 6    | F09: Events management                                         |
| 7    | F10: Notification system (in-app + Resend email)               |

### Phase P2 - Alumni & Data (Weeks 8-10)

| Week | Focus                                                          |
| ---- | -------------------------------------------------------------- |
| 8    | F11: Alumni conversion + dashboard + career tracking           |
| 9    | F11: Alumni feed (posts)                                       |
| 9    | F13: Rich filter & search system (all list views)              |
| 10   | F14: Export functionality (CSV/Excel/PDF)                      |

### Phase P3 - Aptitude (Weeks 11-13)

| Week | Focus                                                          |
| ---- | -------------------------------------------------------------- |
| 11   | F15: Test creation + question management (Faculty)             |
| 12   | F15: Test-taking interface (Student) + timer + anti-cheat      |
| 13   | F15: Submission review + grading + results                     |

---

## 9. Success Metrics

| Metric                              | Target                    |
| ----------------------------------- | ------------------------- |
| Student registration completion     | > 80% of enrolled students|
| Profile completion rate             | > 70% fully verified      |
| Job application rate                | > 60% of eligible students|
| Faculty verification turnaround     | < 48 hours                |
| Alumni conversion acceptance        | > 50% of graduates        |
| System uptime                       | 99.5%                     |
| Page load (mobile)                  | < 3 seconds               |

---

## 10. Out of Scope (v1)

- Company/recruiter portal or login
- Video interview integration
- Chat/messaging between users
- Comments or reactions on alumni posts
- Event RSVP/registration
- SMS notifications
- Multi-language support
- Dark mode (can be added later)
- Real-time collaborative features
- Payment/fee management

---

## 11. Open Questions

1. Should there be a limit on how many jobs a student can apply to simultaneously?
2. Should alumni posts have an expiry date (e.g., referral posts auto-archive after 30 days)?
3. Is there a specific college branding guideline for PDF exports?
4. Should the aptitude test support image-based questions?
5. Do we need audit logging for admin actions?

---

*This PRD is a living document. Update as requirements evolve.*
