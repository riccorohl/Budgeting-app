# Vercel V0 UI Generation Instructions

## Project Overview
Create a comprehensive personal budgeting application UI for users managing both US and Mexican bank accounts. The app should be desktop-first with dual currency support (USD/MXN) and modern financial management features.

## Tech Stack Requirements
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Theme**: Dark theme (like existing generated code)

## Key Data Models
Use these TypeScript interfaces:

`	ypescript
interface Transaction {
  id: string
  description: string
  amount: number
  currency: 'USD' | 'MXN'
  category: string
  type: 'income' | 'expense'
  date: string
  account: string
}

interface BudgetCategory {
  id: string
  name: string
  budgeted: number
  spent: number
  available: number
  currency: 'USD' | 'MXN'
  type: 'needs' | 'wants' | 'savings'
}

interface SavingsGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  percentageComplete: number
  deadline: Date
  imageUrl?: string
  currency: 'USD'
}
`

## Required Pages
1. **Dashboard** (pp/page.tsx) - Financial overview with cards and charts
2. **Budget Management** (pp/budget/page.tsx) - Category management with progress bars
3. **Transactions** (pp/transactions/page.tsx) - Transaction list with filtering
4. **Savings Goals** (pp/savings/page.tsx) - Goal tracking with progress visualization
5. **Calendar** (pp/calendar/page.tsx) - Payment scheduling and reminders

## Styling Guidelines
- **Dark theme** with colors: Orange primary, Green success, Red danger
- **Desktop-first** responsive design
- **Card-based** layout for financial data
- **Progress bars** for budget tracking
- **Currency display** showing both USD and original currency
- **shadcn/ui** component consistency

## Component Props Pattern
`	ypescript
interface BudgetCardProps {
  category: BudgetCategory
  onEdit?: (category: BudgetCategory) => void
  onDelete?: (id: string) => void
  showCurrencyToggle?: boolean
}
`

## Mock Data
Generate with realistic financial data:
- 5-10 budget categories with different spending levels
- 15-20 transactions with various amounts and currencies
- 3-5 savings goals with different progress levels
- 2-3 bank accounts (US and Mexican)

## Success Criteria
- TypeScript with proper typing
- Reusable components with props
- Dark theme consistency
- Desktop-first design
- Currency conversion display
- Interactive hover/focus states
- Loading and error states
- shadcn/ui design patterns

Generate production-ready UI that integrates with backend services.
