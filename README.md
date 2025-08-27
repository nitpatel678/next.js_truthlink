# TruthLink

TruthLink is an anonymous crime reporting and tracking platform that lets anyone securely upload evidence, submit a tip to the correct authority, and receive a unique ID to follow progress without revealing their identity.

# Live - https://truthlink.vercel.app/

-----

##  Introduction

This is a state-of-the-art anonymous reporting system built with Next.js 14, designed to provide a secure platform for reporting incidents while maintaining complete anonymity.

-----

## ⚙️ Tech Stack

  * Next.js 14
  * TypeScript
  * Prisma with Neon Database
  * NextAuth.js for Authentication
  * Tailwind CSS
  * React Hook Form
  * GeminiAI
  * BCrypt for Password Encryption

-----

## 🔋 Features

  * Secure and Anonymous Reporting
  * Image Analysis with Gemini AI
  * Unique Report ID for Tracking
  * Role-Based Admin Dashboard
  * Real-time Report Status Updates

-----

## 🤸 Quick Start

**Prerequisites**

Make sure you have the following installed:

  - [Node.js](https://nodejs.org/en)
  - [npm](https://www.npmjs.com/)
  - [Git](https://git-scm.com/)

**Installation**

```bash
# Clone the repository
git clone <your-repo-url>
cd anonymous-reporting-system

# Install dependencies
npm install

# Set up the database
npx prisma generate
npx prisma db push

# Start the development server
npm run dev
```

-----

## 👤 Admin Access

The dashboard is restricted to users with `ADMIN` or `MODERATOR` roles. To create an admin account for development:

1.  Open `app/api/auth/signup/route.ts`.

2.  Temporarily modify the `prisma.user.create` function to hardcode the role to `"ADMIN"`:

    ```typescript
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "ADMIN", // <-- Change this line
      },
    });
    ```

3.  Run the sign-up process on your local development server to create your new admin account.

4.  After successfully creating the account, revert the change in the file. You can now use your new account to log in and access the dashboard.

-----

## 🕸️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_MAPBOX_API_KEY=your-mapbox-key
DATABASE_URL=postgresql:your-database-url
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000/api/auth"
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-access-api-key
```

-----

## 🚀 Deployment

The application can be easily deployed on [Vercel](https://vercel.com):

1.  Push your code to a Git repository
2.  Connect your repository to Vercel
3.  Configure the environment variables
4.  Deploy\!

-----

coded by Nitin
