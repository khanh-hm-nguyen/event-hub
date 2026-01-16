# 🚀 EventHub
EventHub is a premier, high-performance platform built for the global developer community. It serves as a centralized "Hub" for discovering, attending, and managing tech events—from local meetups to global hackathons.

## ✨ Features
### 🌐 Public Experience
* Dynamic Event Discovery: Browse featured events with a clean, high-contrast UI.

* LightRays Aesthetic: A bespoke, dark glassmorphic design with neon green (#5dfeca) accents.

* Community Focused: Dedicated spaces to understand the vision and connect with other builders.

* Responsive Design: Fully optimized for mobile, tablet, and desktop viewing.

### 🔐 Security & Auth
* JWT Authentication: Secure session management using HTTP-only cookies.

* Role-Based Access Control (RBAC): Middleware-protected routes ensuring only admins can access management tools.

* Zustand State Management: Persistent client-side state with hydration guards to prevent SSR mismatches.

### 🛠 Admin Portal
* Event Management: Full CRUD capabilities for managing event listings.

* Booking Oversight: Track community engagement and attendance.

* Command Center UI: A specialized dark-mode dashboard designed for high-efficiency management.

## 🏗 Tech Stack
* Framework: Next.js 16 (App Router)
* Media Management: Cloudinary (Image hosting, optimization, and transformations)
* Styling: Tailwind CSS
* Database: MongoDB with Mongoose
* State Management: Zustand
* Authentication: JSON Web Tokens (JWT) & Jose
* Icons: Material UI Icons

## 🚦 Getting Started
### Prerequisites
* Node.js 18+

* MongoDB Atlas account or local instance

Installation
1. Clone the repository:

```Bash
git clone https://github.com/your-username/eventhub.git
cd eventhub
```

2. Install dependencies:

```Bash

npm install
```

3. Environment Variables: Create a .env.local file in the root directory and add the following:

```MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_ultra_secure_secret_key
NODE_ENV=development
```

4. Run the development server:

```Bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.


## 🛡 API & Server Actions
* The project utilizes a hybrid approach for maximum performance:

* Server Actions: Used for data fetching and administrative mutations (getEventById, getAllEvents).

* API Routes: Used for authentication lifecycle (/api/auth/login, /api/auth/logout).

* Middleware: Centralized security layer for route protection.

### 📂 Project Structure
```
Plaintext

src/
├── actions/      # Secure Server Actions
├── app/          # Next.js App Router (Public & Admin)
├── components/   # Reusable UI & Layout components
├── lib/          # Database connection & shared utilities
├── models/       # Mongoose Schemas
├── store/        # Zustand State Management
└── middleware.ts # Route Protection Logic
```