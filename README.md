# Million Properties Frontend

A modern, scalable real estate platform built with Next.js 15, React 19, and TypeScript. This project follows senior-level frontend development practices with a robust architecture, comprehensive testing, and production-ready configurations.

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + Husky
- **Analytics**: Vercel Analytics + Speed Insights

### Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/            # Reusable components
│   ├── ui/               # Design System components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utilities and configurations
│   ├── api/              # API client and queries
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── validations/      # Zod schemas
│   └── constants/        # App constants
├── providers/            # React context providers
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd million-properties-frontend
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### E2E Tests

```bash
# Run Playwright tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

## 🔧 Development

### Code Quality

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

### Git Hooks

This project uses Husky for git hooks:

- **pre-commit**: Runs linting and formatting
- **commit-msg**: Validates commit messages

## 📦 Build & Deploy

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables

See `env.example` for required environment variables.

## 🎨 Design System

The project includes a comprehensive design system with:

- Consistent component API
- TypeScript support
- Accessibility features
- Dark/Light theme support
- Responsive design

## 🔒 Security

- Environment variable validation with Zod
- Secure API client with interceptors
- Error boundaries for graceful error handling
- TypeScript strict mode enabled

## 📈 Performance

- Next.js 15 optimizations
- Image optimization
- Bundle analysis
- Vercel Speed Insights integration
- React Query for efficient data fetching

## 🤝 Contributing

1. Follow the conventional commit format
2. Write tests for new features
3. Ensure all checks pass before committing
4. Update documentation as needed

## 📄 License

This project is private and proprietary.
