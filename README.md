# Budgeting App - Personal Finance Manager

A comprehensive desktop-first budgeting application designed for managing finances across USD and Mexican Peso accounts. Built with Next.js, TypeScript, and Tailwind CSS, featuring real-time currency conversion and dual-currency financial tracking.

## 🌟 Key Features

- **Dual Currency Support**: Seamlessly manage USD and MXN accounts with real-time conversion
- **Comprehensive Budgeting**: Track expenses across multiple categories with visual progress indicators
- **Savings Goals**: Gamified savings experience with visual achievements and milestones
- **Transaction Management**: Full CRUD operations for income and expenses
- **Responsive Design**: Desktop-optimized with mobile fallback support
- **Dark Theme**: Professional dark theme with custom color system (Orange/Red/Green)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (for development and build tools)
- pnpm package manager (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd budgeting-app
   ```

2. **Install dependencies**
   ```bash
   # Using npm (current setup)
   npm install

   # Or using pnpm (recommended for our tech stack)
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
budgeting-app/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with dark theme
│   ├── page.tsx                 # Dashboard homepage
│   ├── globals.css              # Tailwind CSS with design tokens
├── components/                   # Reusable React components
│   ├── ui/                      # shadcn/ui component library
│   └── [page-specific]/         # Page-specific components
├── lib/                         # Utility functions and configurations
│   ├── utils.ts                 # General utilities (cn function)
│   ├── validations.ts           # Zod validation schemas
│   └── mock-data.ts             # Mock data for development
├── hooks/                       # Custom React hooks
│   ├── use-currency.ts          # Currency conversion hook
│   ├── use-budget.ts            # Budget management hook
│   ├── use-transactions.ts      # Transaction management hook
│   └── use-savings.ts           # Savings goals hook
├── types/                       # TypeScript type definitions
│   ├── transaction.ts           # Transaction-related types
│   ├── budget.ts                # Budget-related types
│   ├── savings.ts               # Savings goal types
│   └── account.ts               # Account-related types
├── public/                      # Static assets
├── docs/                        # Documentation
└── [config files]               # Next.js, TypeScript, Tailwind config
```

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Library**: shadcn/ui + Radix UI primitives
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization

### Key Packages
- `@hookform/resolvers` - Form validation integration
- `zod` - TypeScript-first schema validation
- `date-fns` - Modern date manipulation
- `next-themes` - Theme management
- `clas-variance-authority` - Component variant management

## 🎨 Design System

### Color Palette (Dark Theme)
- **Primary**: Orange (`oklch(0.72 0.15 85)`) - Action buttons, links
- **Success**: Green (`oklch(0.7 0.2 340)`) - Positive indicators, gains
- **Destructive**: Red (`oklch(0.65 0.2 25)`) - Errors, expenses
- **Background**: Deep navy (`oklch(0.15 0.005 240)`)
- **Cards**: Slightly lighter navy (`oklch(0.18 0.005 240)`)

### Typography
- **Sans Serif**: Geist Sans font family
- **Mono**: Geist Mono for code elements
- **Scaling**: Consistent spacing and sizing scales

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Exchange Rate API (optional - fallback to mock data)
EXCHANGE_RATE_API_KEY=your_api_key

# Plaid API (US bank integration)
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret

# Database connection (future)
DATABASE_URL=your_database_url
```

## 💰 Currency Conversion

The app supports dual-currency operations with automatic USD-to-MXN conversion:

- **Primary Currency**: USD (all calculations and totals)
- **Secondary Currency**: MXN (with real-time conversion)
- **Exchange Rate**: Automatically updated from Exchange Rate API
- **Fallback Rate**: 18.0 MXN per USD (for development)

## 📊 Data Flow

### User Actions → Hooks → State Updates

1. **Transaction Entry**: User adds income/expense → `useTransactions` hook → Updates transaction state
2. **Budget Tracking**: Transactions processed → `useBudget` hook → Calculates category spending
3. **Currency Conversion**: Amount input → `useCurrency` hook → Converts to USD equivalent
4. **Savings Goals**: Contributions added → `useSavings` hook → Updates goal progress

## 🔒 Security & Data Handling

- **Client-side Storage**: Data persists in browser for demo purposes
- **No Sensitive Data**: Bank details masked, no real API connections
- **Form Validation**: Zod schemas provide comprehensive input validation
- **Type Safety**: Full TypeScript coverage prevents runtime errors

## 📱 Responsive Design

- **Desktop-First**: Optimized for screens 1024px and wider
- **Tablet Support**: Responsive grid/layouts for medium screens
- **Mobile Fallback**: Basic functionality on small screens (phones)
- **Breakpoint System**: Tailwind CSS responsive utilities used throughout

## 🚀 Build & Deployment

### Development
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint for code quality
```

### Production
The application is configured for Vercel deployment with:
- Automatic static generation for optimal performance
- Edge function support for dynamic routing
- CDN distribution for global accessibility

## 🔄 Development Workflow

1. **Planning**: Review specifications in `.spec-workflow/specs/vercel-ui-integration/`
2. **Implementation**: Use established patterns and TypeScript interfaces
3. **Testing**: Verify functionality with mock data and validation
4. **Integration**: Ensure compatibility with existing components
5. **Documentation**: Update this README and component documentation

## 🧪 Testing Strategy

- **Unit Tests**: Jest + React Testing Library for individual components
- **Integration Tests**: Component interaction and data flow validation
- **Form Testing**: Zod schema validation and React Hook Form integration
- **Mock Data**: Comprehensive fixtures for realistic testing scenarios

## 📋 Current Status

✅ **Completed Features:**
- Next.js project structure with Vercel V0 integration
- TypeScript configuration with path aliases
- Tailwind CSS dark theme with custom design tokens
- Comprehensive data models and interfaces
- Custom hooks for data management
- Form validation with Zod schemas
- Mock data and test fixtures
- Development environment setup confirmed

🔄 **In Progress:**
- Component library adaptation
- Navigation and layout structure
- Additional App Router pages

⏳ **Planned:**
- Bank account integration (Plaid)
- Real-time exchange rate API integration
- Advanced data visualization
- Export/import functionality
- User authentication and profiles

## 🤝 Contributing

1. Follow the established TypeScript and component patterns
2. Use the provided validating schemas for form handling
3. Maintain dark theme consistency
4. Test with mock data before implementing real API calls
5. Update documentation for any new features

## 📄 License

This project is part of a budgeting application development workflow. All specifications and requirements are located in the `.spec-workflow` directory.

---

**Ready to start budgeting smarter!** 💰📈

Visit [http://localhost:3000](http://localhost:3000) to explore the application.