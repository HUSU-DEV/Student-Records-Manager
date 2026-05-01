# Student Records Manager

A React and Supabase app for managing student-style records with authentication and basic CRUD workflows.

## Current Features

- Email/password login through Supabase Auth
- Reads records from a Supabase `mypojo` table
- Create, update, and delete records
- Stores Supabase credentials in local environment variables

## Tech Stack

- React
- Supabase
- Create React App

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your Supabase details:

```bash
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_STUDENT_ID=your_student_id
```

3. Start the app:

```bash
npm start
```

The app will run at `http://localhost:3000`.
