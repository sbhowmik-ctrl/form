# Project Documentation: Form Demo

## Overview
This is a Next.js application built with the App Router, using Prisma for database management with PostgreSQL, Tailwind CSS for styling, and TypeScript. The application features a form for registering persons and sending confirmation emails.

## Project Structure

```
form-demo/
├── next-env.d.ts          # Next.js TypeScript declarations
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration for Tailwind
├── tailwind.config.mjs    # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── README.md              # Basic setup instructions
├── prisma/
│   ├── schema.prisma      # Database schema definition
│   └── migrations/        # Database migration files
└── src/
    ├── app/
    │   ├── globals.css    # Global styles
    │   ├── layout.tsx     # Root layout component
    │   ├── page.tsx       # Main page with registration form
    │   └── api/
    │       └── person/
    │           ├── route.ts              # API routes for person CRUD
    │           └── send_mail/
    │               └── route.ts          # API route for sending emails
    ├── controllers/
    │   └── personController.ts  # Business logic for person operations
    └── lib/
        └── prisma.ts      # Prisma client configuration
```

## Technologies Used
- **Next.js 13.4.10**: React framework with App Router
- **React 18.2.0**: UI library
- **TypeScript 5.0.0**: Type-safe JavaScript
- **Prisma 5.22.0**: ORM for database management
- **PostgreSQL**: Database provider
- **Tailwind CSS 4.2.1**: Utility-first CSS framework
- **Nodemailer 8.0.1**: Email sending library

## Database Schema
The application uses a single `Person` model with the following fields:
- `id`: Auto-incrementing primary key (Int)
- `name`: Person's name (String, required)
- `email`: Email address (String, required)
- `bloodGrp`: Blood group (String, required)
- `phone`: Phone number (String, optional)
- `idNumber`: ID number (String, optional, mapped to `id_number`)
- `department`: Department (String, optional)
- `age`: Age (Int, optional)
- `createdAt`: Creation timestamp (DateTime, default now)

## API Endpoints
- `POST /api/person`: Creates a new person record
  - Required fields: name, email, bloodGrp
  - Optional fields: phone, idNumber, department, age
- `GET /api/person`: Retrieves all person records, ordered by creation date descending
- `POST /api/person/send_mail`: Sends a confirmation email
  - Requires: to, subject, text in request body
  - Uses SMTP configuration from environment variables

## Processes

### Setup
1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables in `.env`:
   - `DATABASE_URL`: PostgreSQL connection string (e.g., `postgresql://username:password@localhost:5432/persondb`)
   - SMTP settings for email: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` (or `SMTP_PASSWORD`)

3. Initialize and migrate the database:
   ```
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### Development
- Start the development server:
  ```
  npm run dev
  ```
  The application will be available at `http://localhost:3000`

- Run database migrations during development:
  ```
  npm run prisma:migrate
  ```

- Generate Prisma client after schema changes:
  ```
  npm run prisma:generate
  ```

### Building and Deployment
- Build the application:
  ```
  npm run build
  ```

- Start the production server:
  ```
  npm start
  ```

### Database Management
- View and manage the database using Beekeeper Studio or similar tools
- Connect to PostgreSQL at localhost:5432 with the credentials from `DATABASE_URL`

### Email Configuration
- Configure SMTP settings in environment variables for email functionality
- The send_mail endpoint uses these settings to send confirmation emails after registration</content>
<parameter name="filePath">c:\Users\STEORA SYSTEMS\form-demo\PROJECT_DOCUMENTATION.md