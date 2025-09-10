# Personal Budgeting App

A comprehensive dual-currency personal budgeting application designed for users managing both US and Mexican bank accounts. Built with Next.js and featuring a professional dark theme interface inspired by modern financial management tools.

## 🎯 Project Overview

This budgeting app targets users in Mexico who manage financial accounts in both USD and MXN currencies. It provides comprehensive budget tracking, transaction management, savings goals with gamification, and calendar integration for recurring payments.

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Data**: Mock data (ready for backend integration)

## 📁 Project Structure

\`\`\`
├── app/                          # Next.js App Router pages
│   ├── budget/                   # Budget management page
│   ├── transactions/             # Transaction management page
│   ├── savings/                  # Savings goals page
│   ├── calendar/                 # Calendar integration page
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Dashboard homepage
│   └── globals.css              # Global styles and design tokens
├── components/                   # Reusable React components
│   ├── ui/                      # shadcn/ui base components
│   ├── budget-management.tsx    # Budget allocation and tracking
│   ├── calendar-view.tsx        # Financial calendar component
│   ├── dashboard.tsx            # Main financial dashboard
│   ├── header.tsx               # Top navigation header
│   ├── savings-goals.tsx        # Gamified savings interface
│   ├── sidebar.tsx              # Main navigation sidebar
│   └── transaction-management.tsx # Transaction CRUD interface
├── public/                      # Static assets
│   └── *.jpg                    # Savings goal images
└── README.md                    # This file
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#f97316) - Action buttons and highlights
- **Success**: Green (#22c55e) - Income and positive indicators
- **Danger**: Red (#ef4444) - Expenses and negative indicators
- **Background**: Dark theme (#0a0a0a, #1a1a1a)
- **Text**: Light grays (#f5f5f5, #a3a3a3)

### Typography
- **Headings**: System font stack with font-sans
- **Body**: Consistent line-height (1.5-1.6) for readability
- **Monospace**: For financial amounts and data

### Layout Principles
- **Mobile-first**: Responsive design starting from mobile
- **Flexbox primary**: Used for most layout needs
- **CSS Grid**: Only for complex 2D layouts
- **Consistent spacing**: Tailwind spacing scale (4, 6, 8, 12, 16, 24)

## 🏗 Key Features

### 1. Financial Dashboard
- **Location**: `components/dashboard.tsx`
- **Purpose**: Central overview of financial health
- **Features**: 
  - Budget vs actual spending visualization
  - Account balances across multiple banks
  - Savings goals progress
  - Recent transaction activity
  - Dual currency support (USD/MXN)

### 2. Budget Management
- **Location**: `components/budget-management.tsx`
- **Purpose**: Comprehensive budget allocation and tracking
- **Features**:
  - Income and expense categorization
  - Needs/Wants/Savings organization
  - Real-time budget vs actual comparison
  - Category editing and management
  - Currency conversion display

### 3. Transaction Management
- **Location**: `components/transaction-management.tsx`
- **Purpose**: Complete transaction CRUD operations
- **Features**:
  - Transaction filtering and search
  - Manual transaction entry
  - Bank account integration status
  - Category assignment
  - Dual currency support

### 4. Savings Goals
- **Location**: `components/savings-goals.tsx`
- **Purpose**: Gamified savings experience
- **Features**:
  - Visual goal tracking with images
  - Progress bars and milestone rewards
  - Achievement badges
  - Spending challenges
  - Social sharing capabilities

### 5. Calendar Integration
- **Location**: `components/calendar-view.tsx`
- **Purpose**: Financial event scheduling and tracking
- **Features**:
  - Recurring payment visualization
  - Upcoming bill reminders
  - Transaction scheduling
  - Monthly financial calendar view

## 💰 Currency Handling

The app supports dual-currency operations with USD as the primary currency:

\`\`\`typescript
// Currency conversion (mock rate - replace with real API)
const USD_TO_MXN_RATE = 18.5;

// Example usage in components
const convertCurrency = (amount: number, fromCurrency: string, toCurrency: string) => {
  if (fromCurrency === toCurrency) return amount;
  if (fromCurrency === 'USD' && toCurrency === 'MXN') {
    return amount * USD_TO_MXN_RATE;
  }
  if (fromCurrency === 'MXN' && toCurrency === 'USD') {
    return amount / USD_TO_MXN_RATE;
  }
  return amount;
};
\`\`\`

## 🔧 Development Setup

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Run development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for production**:
   \`\`\`bash
   npm run build
   \`\`\`

## 🔌 Integration Points

### Database Schema (Recommended)
\`\`\`sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Accounts table
CREATE TABLE accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  type VARCHAR(50), -- 'checking', 'savings', 'credit'
  currency VARCHAR(3), -- 'USD', 'MXN'
  balance DECIMAL(12,2),
  bank_name VARCHAR(255)
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  type VARCHAR(50), -- 'income', 'expense'
  parent_category VARCHAR(50), -- 'needs', 'wants', 'savings'
  budget_amount DECIMAL(12,2),
  currency VARCHAR(3)
);

-- Transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  account_id UUID REFERENCES accounts(id),
  category_id UUID REFERENCES categories(id),
  amount DECIMAL(12,2),
  currency VARCHAR(3),
  description TEXT,
  date DATE,
  type VARCHAR(50), -- 'income', 'expense', 'transfer'
  is_recurring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Savings goals table
CREATE TABLE savings_goals (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  target_amount DECIMAL(12,2),
  current_amount DECIMAL(12,2) DEFAULT 0,
  currency VARCHAR(3),
  target_date DATE,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### API Endpoints (Recommended)
\`\`\`typescript
// Example API structure for backend integration
GET    /api/dashboard          // Dashboard data
GET    /api/transactions       // List transactions
POST   /api/transactions       // Create transaction
PUT    /api/transactions/:id   // Update transaction
DELETE /api/transactions/:id   // Delete transaction
GET    /api/categories         // List categories
POST   /api/categories         // Create category
GET    /api/savings-goals      // List savings goals
POST   /api/savings-goals      // Create savings goal
GET    /api/accounts           // List accounts
POST   /api/accounts           // Connect account
\`\`\`

### Environment Variables
\`\`\`env
# Database
DATABASE_URL=your_database_connection_string

# Currency API (for real-time rates)
CURRENCY_API_KEY=your_currency_api_key

# Bank Integration (Plaid, Yodlee, etc.)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox # or development/production

# Authentication (if using)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
\`\`\`

## 🎮 Mock Data Structure

The app currently uses mock data that follows this structure:

\`\`\`typescript
// Example transaction structure
interface Transaction {
  id: string;
  description: string;
  amount: number;
  currency: 'USD' | 'MXN';
  category: string;
  type: 'income' | 'expense';
  date: string;
  account: string;
}

// Example budget category structure
interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  available: number;
  currency: 'USD' | 'MXN';
  type: 'needs' | 'wants' | 'savings';
}
\`\`\`

## 🚀 Deployment

The app is ready for deployment on Vercel or any Next.js-compatible platform:

1. **Vercel** (Recommended):
   \`\`\`bash
   vercel --prod
   \`\`\`

2. **Docker**:
   \`\`\`dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   \`\`\`

## 🔄 Future Enhancements

- Real-time currency conversion API integration
- US bank account connection (Plaid integration)
- Mexican bank account manual import tools
- Advanced reporting and analytics
- Mobile app companion
- Multi-user household budgets
- Bill reminder notifications
- Investment tracking integration

## 📝 Development Notes

- All components are fully typed with TypeScript
- Mock data is clearly separated for easy replacement
- Responsive design tested on mobile and desktop
- Accessibility features included (ARIA labels, keyboard navigation)
- Performance optimized with React best practices
- Ready for internationalization (i18n) if needed

## 🤝 Contributing

When extending this application:

1. Follow the established component structure
2. Maintain TypeScript strict mode compliance
3. Use the existing design system tokens
4. Add proper error handling for API integrations
5. Include loading states for async operations
6. Test responsive design on multiple screen sizes
7. Maintain accessibility standards

---

Built with ❤️ for personal financial management
