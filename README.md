# Rally.ATL - Tennis Matchmaking Platform

A modern web application for finding tennis partners and joining sessions in Atlanta.

## 🎾 About

Rally.ATL is a tennis matchmaking platform that connects players in Atlanta. Users can create and join tennis sessions, find partners at their skill level, and build their tennis community.

## ✨ Features

- **Session Management**: Create and join tennis sessions
- **Skill-Based Matching**: Find players at your skill level
- **Real-Time Updates**: Live notifications and messaging
- **Rating System**: Multi-dimensional feedback and Elo ratings
- **Mobile-First Design**: Optimized for all devices

## 🚀 Current Status

### ✅ Milestone 1 Complete: Foundation & Authentication
- [x] Next.js 14 project setup with TypeScript
- [x] Tailwind CSS with custom design system
- [x] Clerk authentication integration
- [x] Supabase database configuration
- [x] Basic layout and navigation
- [x] Landing page with hero section
- [x] Dashboard for authenticated users
- [x] Sessions listing page (placeholder)
- [x] Session creation form (placeholder)

### 🔄 Next: Milestone 2 - Session Management Core
- [ ] Database schema implementation
- [ ] Session creation functionality
- [ ] Session browsing with filters
- [ ] Location picker integration
- [ ] Real session data integration

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rally.atl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Supabase Database
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # User dashboard
│   ├── sessions/          # Session management
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
├── lib/                  # Utilities and configurations
│   ├── supabase/         # Supabase client
│   └── utils.ts          # Utility functions
└── docs/                 # Documentation
    ├── user-flows/       # User experience flows
    ├── technical-specs/  # Technical specifications
    └── strategic-development-plan.md
```

## 🎯 Development Roadmap

### Milestone 1: Foundation & Authentication ✅
- Basic app structure and authentication
- User profile management
- Landing page and navigation

### Milestone 2: Session Management Core 🔄
- Session creation and browsing
- Location and skill level filtering
- Real-time session updates

### Milestone 3: Participation & Communication
- Join request system
- Real-time messaging
- Notification system

### Milestone 4: Rating System & Advanced Features
- Match result recording
- Elo rating calculations
- Advanced analytics

## 🤝 Contributing

This project is currently in active development. The development plan and specifications are documented in the `docs/` folder.

## 📄 License

This project is proprietary and confidential.

---

**Built with ❤️ for the Atlanta tennis community**