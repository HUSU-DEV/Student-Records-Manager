# Student Records Manager

A frontend-first React app for managing student records. The current version stores records in the browser with `localStorage`, so it can run without backend access. A Supabase or Firebase backend can be added later.

## Current Features

- Student record fields for ID, first name, last name, email, course, year, and status
- Create, edit, and delete student records
- Persistent browser storage with `localStorage`
- Sample records for development and portfolio demos
- Responsive foundation ready for dashboard improvements

## Planned Backend Upgrade

Later versions can add:

- Authentication
- Real database storage
- Protected routes
- User-specific records
- Role-based access for admins and viewers

## Tech Stack

- React
- Create React App
- Browser `localStorage`

## Local Setup

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Run tests:

```bash
npm test -- --watchAll=false
```

The app will run at `http://localhost:3000`.
