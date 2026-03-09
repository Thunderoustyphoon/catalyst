
# 🚀 Education-to-Employment Platform

> A comprehensive full-stack platform transforming education into employment by connecting students with real-world projects, skill development, and career opportunities.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react)](https://react.dev/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 📖 Overview

The Education-to-Employment Platform is a modern, full-stack web application designed to bridge the gap between learning and career opportunities. It provides:

- **For Students**: Learn practical skills through adaptive courses, diagnostic assessments, and real-world projects
- **For Clients**: Post projects, discover talent, and build scalable teams
- **Integrated Marketplace**: Connect students with paid opportunities
- **Smart Matching**: AI-powered recommendations based on skills and interests
- **Secure Transactions**: Escrow system for safe project payments

## ✨ Features

### For Students
- 🎓 Adaptive diagnostic testing and personalized learning paths
- 📚 Comprehensive course catalog with hands-on projects
- 💼 Professional portfolio building tools
- 🎯 Talent discovery and job marketplace
- 📊 AI-powered learning assistant and progress tracking
- 💰 Earn through project work and freelancing

### For Clients
- 📋 Post projects and find qualified talent
- 💸 Secure payment processing with escrow
- 📈 Project management dashboard
- 🔍 Smart candidate filtering and matching
- 📞 Direct communication with freelancers

### Core Platform
- 🔐 Secure authentication & authorization
- 🏦 Payment processing & escrow system
- 📧 Real-time notifications
- 🎨 Responsive design (mobile, tablet, desktop)
- 🌙 Dark/Light theme support
- ♿ Accessibility-first UI components

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library (shadcn/ui based)
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Icons**: Lucide React

### Backend
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Serverless Functions**: Supabase Edge Functions (Deno)
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage

### Infrastructure
- **Hosting**: Vercel (Frontend) / Supabase (Backend)
- **Version Control**: Git
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Base UI components (button, card, etc.)
│   ├── layouts/         # Layout wrappers (auth, public, student, etc.)
│   ├── pages/           # Page components
│   ├── figma/           # Figma-integrated components
│   └── [feature].tsx    # Feature-specific components
├── hooks/               # Custom React hooks
│   ├── use-auth.tsx
│   └── use-theme.tsx
├── utils/               # Utility functions
│   ├── auth.ts
│   ├── supabase-auth.ts
│   └── roadmap-generator.ts
├── styles/              # Global styles
│   └── globals.css
├── supabase/            # Supabase configuration
│   └── functions/
│       └── server/      # Edge function implementations
├── guidelines/          # Design guidelines and documentation
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── routes.tsx           # Route configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: Latest version
- **Supabase Account**: For backend services

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/education-to-employment-platform.git
   cd education-to-employment-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_PROJECT_ID=your-project-id
   ```

### Running Locally

**Development Server** (with hot reload)
```bash
npm run dev
```
Access the app at `http://localhost:5173`

**Build for Production**
```bash
npm run build
```

**Preview Production Build**
```bash
npm run preview
```

**Lint Code**
```bash
npm run lint
```

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend (Supabase Edge Functions)

1. Update function code in `src/supabase/functions/server/index.tsx`
2. Deploy via Supabase dashboard:
   - Navigate to Functions → make-server-0bb1b3e6
   - Click Deploy
   - Or use Supabase CLI: `supabase functions deploy`

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_PROJECT_ID=your-project-id

# Optional: Analytics, tracking, etc.
VITE_APP_ENV=development
```

## 📡 API Documentation

### Edge Functions Endpoints

**POST** `/make-server-0bb1b3e6/auth/signup`
- Create new user account
- Body: `{ email, password, name, userType, phone?, organization? }`
- Returns: `{ success, user, error? }`

**POST** `/make-server-0bb1b3e6/auth/update-profile`
- Update user profile (requires auth)
- Headers: `Authorization: Bearer {token}`
- Body: `{ name?, phone?, organization?, profile? }`
- Returns: `{ success, user, error? }`

**GET** `/make-server-0bb1b3e6/auth/me`
- Get current authenticated user
- Headers: `Authorization: Bearer {token}`
- Returns: `{ success, user, error? }`

**GET** `/make-server-0bb1b3e6/notifications`
- Fetch user notifications (requires auth)
- Headers: `Authorization: Bearer {token}`
- Returns: `{ success, notifications, error? }`

**POST** `/make-server-0bb1b3e6/notifications/mark-read`
- Mark notification as read (requires auth)
- Headers: `Authorization: Bearer {token}`
- Body: `{ notificationId }`
- Returns: `{ success, error? }`

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure:
- Code follows the project's style guide
- All tests pass
- New features include documentation
- Commits have clear, descriptive messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Anuj** - Lead Developer

## 📧 Support

For support, email: Anujgupta2op@gmail.com

## 🙏 Acknowledgments

- Supabase for backend infrastructure
- React team for the exceptional framework
- All contributors and testers
  
