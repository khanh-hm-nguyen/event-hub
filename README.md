# 🚀 EventHub
EventHub is a premier, high-performance platform built for the global developer community. It serves as a centralized "Hub" for discovering, attending, and managing tech events—from local meetups to global hackathons.

## ✨ Features
### 🌐 Public Experience
* Next.js 16 Streaming: Utilizes Suspense boundaries and streaming SSR for instant page loads and a smooth user experience.

* Admin Dashboard: Comprehensive CRUD operations for managing events and bookings with real-time UI updates.

* Cloudinary Integration: Seamless image uploads and optimizations for event banners via server-side streaming.

* Optimized Caching: Advanced data fetching using the "use cache" directive and on-demand revalidation (revalidateTag).

* Secure Authentication: Role-based access control (Admin/User) powered by JWT and secure HTTP-only cookies.

* Premium UI: Responsive, modern design using Tailwind CSS, Framer Motion, and Material UI icons.

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
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

4. Run the development server:

```Bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.


## 🛡 API & Server Actions
### The project utilizes a hybrid approach for maximum performance and security:

* Server Actions: Used for data fetching, administrative mutations, and on-demand cache revalidation (e.g., getAllEvents, getEventById).

* API Routes: Handles the authentication lifecycle and multipart/form-data for image streaming (e.g., /api/auth/login, /api/events).

* Service Proxy: Centralized business logic layer that enforces authorization before database access.

📂 Project Structure
```
src/
├── actions/      # Secure Server Actions & On-demand Revalidation
├── app/          # Next.js App Router (Public, Admin, & API Routes)
├── components/   # Reusable UI, Layouts, and Form components
├── hooks/        # Custom React hooks (useResource, useStore)
├── lib/          # Shared configurations (MongoDB, Cloudinary)
├── models/       # Mongoose Schemas & Database Interfaces
├── services/     # Business logic & Core Database operations
├── store/        # Zustand Global State (User & Session)
├── types/        # Global TypeScript definitions & Interface overrides
├── utils/        # Auth helpers (Token parsing) & Error handling
└── proxy.ts      # Centralized Authorization & Service Proxy
```
