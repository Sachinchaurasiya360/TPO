# TPO Website

Training and Placement Office Website - A comprehensive portal for students, alumni, and administrators to manage placements and internships.

## Project Structure

```
TPO_Website/
├── backend/              # Express.js + TypeScript backend
│   ├── prisma/           # Prisma ORM for database operations
│   └── src/              # Source code
├── frontend/
│   ├── admin/            # Admin portal (React + TypeScript)
│   └── student/          # Student portal (React + TypeScript)
├── package.json          # Root level dependencies and scripts
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js v16+
- npm v8+
- PostgreSQL database
- Prisma ORM
### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/TPO_Website.git
   cd TPO_Website
   ```

2. Install dependencies:

   ```
   npm run install:all
   ```

3. Set up environment variables:
   Create a `.env` file in the `backend` directory with:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/tpo_db"
   PORT=3000
   JWT_SECRET="your-secret-key"
   ```

4. Run database migrations:
   ```
   cd backend
   npx prisma migrate dev
   ```

## Running the Application

### Development Mode

To run all applications (backend, admin frontend, student frontend) concurrently:

```
npm run dev:all
```

Or run each individually:

- Backend only: `npm run dev`
- Admin frontend only: `npm run dev:admin`
- Student frontend only: `npm run dev:student`

### Production Mode

Build and run for production:

```
npm run build
npm start
```



## Technologies Used

- **Backend**: Express.js, TypeScript, Prisma ORM, PostgreSQL
- **Frontend**: React, TypeScript, Vite
- **Authentication**: JWT cookies 
- **Styling**: Tailwind
- **Storage**: AWS
- **Deployment** Vercel

## License

This project is create for the traing and placement cell of vishwanikean iMEET
