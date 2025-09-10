# Project Structure

## Directory Organization

```
budgeting-app/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Route groups for authentication
│   ├── budget/                   # Budget management page
│   ├── calendar/                 # Calendar integration page
│   ├── dashboard/                # Main dashboard page
│   ├── savings/                  # Savings goals page
│   ├── transactions/             # Transaction management page
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── layout.tsx                # Root layout with navigation
│   └── page.tsx                  # Homepage (dashboard)
├── components/                    # Reusable React components
│   ├── ui/                      # shadcn/ui base components
│   │   ├── accordion.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── [other-ui-components]
│   ├── budget-management.tsx    # Budget allocation and tracking
│   ├── calendar-view.tsx        # Financial calendar component
│   ├── dashboard.tsx            # Main financial dashboard
│   ├── header.tsx               # Top navigation header
│   ├── savings-goals.tsx        # Gamified savings interface
│   ├── sidebar.tsx              # Main navigation sidebar
│   ├── theme-provider.tsx       # Theme context provider
│   └── transaction-management.tsx # Transaction CRUD interface
├── lib/                          # Utility functions and configurations
│   ├── utils.ts                 # General utility functions
│   ├── validations.ts           # Zod schema validations
│   ├── currency.ts              # Currency conversion utilities
│   ├── date.ts                  # Date formatting utilities
│   └── api.ts                   # API client configuration
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   ├── use-toast.ts             # Toast notification hook
│   ├── use-currency.ts          # Currency conversion hook
│   ├── use-budget.ts            # Budget management hook
│   └── use-transactions.ts      # Transaction management hook
├── services/                     # API and external service integrations
│   ├── api/                     # Internal API routes
│   │   ├── auth/
│   │   ├── budget/
│   │   ├── transactions/
│   │   └── savings/
│   ├── exchange-rate/           # Exchange rate API service
│   │   ├── exchange-rate-service.ts
│   │   └── types.ts
│   └── bank-integration/        # Bank API integrations
│       ├── plaid-service.ts
│       └── types.ts
├── stores/                       # State management (Zustand stores)
│   ├── auth-store.ts            # Authentication state
│   ├── budget-store.ts          # Budget data state
│   ├── transaction-store.ts     # Transaction data state
│   ├── savings-store.ts         # Savings goals state
│   └── settings-store.ts        # User settings state
├── types/                        # TypeScript type definitions
│   ├── api.ts                   # API response types
│   ├── budget.ts                # Budget-related types
│   ├── transaction.ts           # Transaction types
│   ├── savings.ts               # Savings goal types
│   ├── user.ts                  # User and auth types
│   └── currency.ts              # Currency conversion types
├── constants/                    # Application constants
│   ├── currencies.ts            # Currency codes and symbols
│   ├── categories.ts            # Budget categories
│   ├── config.ts                # App configuration
│   └── exchange-rates.ts        # Exchange rate constants
├── public/                       # Static assets
│   ├── images/                  # Image assets
│   │   ├── savings-goals/       # Savings goal images
│   │   └── icons/               # App icons
│   ├── favicon.ico
│   └── manifest.json
├── tests/                        # Test files
│   ├── components/              # Component tests
│   ├── pages/                   # Page tests
│   ├── services/                # Service tests
│   ├── utils/                   # Utility tests
│   └── __mocks__/               # Test mocks
├── docs/                         # Documentation
│   ├── api/                     # API documentation
│   ├── components/              # Component documentation
│   └── deployment/              # Deployment guides
├── scripts/                      # Build and utility scripts
│   ├── build.js                 # Custom build scripts
│   ├── deploy.js                # Deployment scripts
│   └── generate-types.js        # Type generation scripts
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment variables
├── .gitignore
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## Naming Conventions

### Files
- **Components/Pages**: `PascalCase` (e.g., `BudgetManagement.tsx`, `Dashboard.tsx`)
- **Services/Utilities**: `camelCase` with descriptive suffix (e.g., `exchangeRateService.ts`, `currencyUtils.ts`)
- **Hooks**: `use-` prefix with kebab-case (e.g., `use-currency.ts`, `use-budget.ts`)
- **Types**: `camelCase` with `.types.ts` suffix (e.g., `budget.types.ts`, `transaction.types.ts`)
- **Tests**: `[filename].test.ts` or `[filename].test.tsx`
- **Configuration**: `kebab-case` (e.g., `next.config.mjs`, `tailwind.config.ts`)

### Code
- **Components/Types**: `PascalCase` (e.g., `BudgetCard`, `Transaction`, `SavingsGoal`)
- **Functions/Methods**: `camelCase` (e.g., `calculateTotal`, `formatCurrency`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_CURRENCY`, `API_ENDPOINTS`)
- **Variables**: `camelCase` (e.g., `userBudget`, `transactionAmount`)
- **Props/Interfaces**: `PascalCase` with descriptive suffix (e.g., `BudgetCardProps`, `TransactionFormData`)

## Import Patterns

### Import Order
1. React and React-related imports
2. Next.js imports
3. Third-party libraries (shadcn/ui, Recharts, etc.)
4. Internal services and utilities
5. Types and interfaces
6. Relative imports (components, pages)
7. Style imports (CSS modules, Tailwind classes)

### Module/Package Organization
```typescript
// Example import structure
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { useBudgetStore } from '@/stores/budget-store'
import { formatCurrency } from '@/lib/utils'
import { Budget } from '@/types/budget'
import { BudgetCardProps } from './BudgetCard.types'
import './BudgetCard.css'
```

## Code Structure Patterns

### Module/Class Organization
```typescript
// 1. Imports and dependencies
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. Types and interfaces
interface ComponentProps {
  // prop definitions
}

// 3. Constants
const DEFAULT_VALUES = {
  // constant values
}

// 4. Main component implementation
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // component logic
  return (
    // JSX
  )
}

// 5. Helper functions (if needed)
const helperFunction = () => {
  // helper logic
}

// 6. Default export
export default ComponentName
```

### Function/Method Organization
```typescript
// 1. Input validation
const processTransaction = (transaction: Transaction) => {
  if (!transaction || !transaction.amount) {
    throw new Error('Invalid transaction data')
  }

  // 2. Core logic
  const convertedAmount = convertCurrency(
    transaction.amount,
    transaction.currency,
    'USD'
  )

  // 3. Error handling
  if (convertedAmount < 0) {
    throw new Error('Invalid conversion result')
  }

  // 4. Clear return
  return {
    ...transaction,
    amountUSD: convertedAmount,
    originalAmount: transaction.amount,
    originalCurrency: transaction.currency
  }
}
```

### File Organization Principles
- **One component per file**: Each React component in its own file
- **Related functionality grouped**: Keep related utilities, types, and components together
- **Public API at the top**: Export main components and functions at the top
- **Implementation details hidden**: Use TypeScript private members and internal functions

## Code Organization Principles

1. **Single Responsibility**: Each file should handle one specific concern (UI, data fetching, formatting, etc.)
2. **Modularity**: Create reusable components and utilities that can be shared across the application
3. **Testability**: Structure code to be easily testable with clear inputs and outputs
4. **Consistency**: Follow established patterns throughout the codebase

## Module Boundaries

### Core vs Features
- **Core**: Essential functionality (currency conversion, data storage, authentication)
- **Features**: Specific features (budget tracking, savings goals, calendar integration)

### Public API vs Internal
- **Public**: Components, hooks, and utilities exported from main modules
- **Internal**: Implementation details, private functions, and internal state management

### Service Layer Boundaries
- **API Services**: External API integrations (Exchange Rate API, Plaid)
- **Data Services**: Local data management and caching
- **UI Services**: Component-specific logic and state management

### Dependencies Direction
```
Pages → Components → Hooks → Services → Utils
  ↓        ↓         ↓        ↓        ↓
Types ← Constants ← Stores ← API ← External Services
```

## Code Size Guidelines

- **File size**: Maximum 300 lines per file
- **Function/Method size**: Maximum 50 lines per function
- **Component complexity**: Maximum 200 lines per component
- **Nesting depth**: Maximum 4 levels of nesting
- **Props interface**: Maximum 10 properties per component props interface

## Dashboard/Monitoring Structure

### Component Organization
```
src/
└── components/
    └── dashboard/          # Dashboard-specific components
        ├── widgets/        # Individual dashboard widgets
        │   ├── BudgetSummary/
        │   ├── SpendingChart/
        │   ├── SavingsProgress/
        │   └── UpcomingPayments/
        ├── layout/         # Dashboard layout components
        │   ├── DashboardLayout/
        │   ├── Sidebar/
        │   └── Header/
        └── shared/         # Shared dashboard utilities
            ├── useDashboardData.ts
            └── dashboardUtils.ts
```

### Separation of Concerns
- **Dashboard components**: Isolated from business logic, focused on presentation
- **Data fetching**: Separate hooks for dashboard data management
- **Real-time updates**: Polling and caching strategies for live data
- **Responsive design**: Desktop-first approach with mobile breakpoints

## Documentation Standards

- **Component documentation**: JSDoc comments for all public components
- **API documentation**: OpenAPI/Swagger for external API integrations
- **README files**: Each major module should have a README with usage examples
- **Type definitions**: Comprehensive TypeScript interfaces with documentation
- **Code comments**: Complex business logic should include inline comments explaining the reasoning

### Documentation Examples
```typescript
/**
 * Converts a transaction amount from MXN to USD using the current exchange rate
 * @param amount - The amount to convert
 * @param currency - The source currency (MXN or USD)
 * @param exchangeRate - The current USD/MXN exchange rate
 * @returns The converted amount in USD
 * @throws {Error} When currency is not supported or amount is invalid
 */
export const convertCurrency = (
  amount: number,
  currency: 'USD' | 'MXN',
  exchangeRate: number
): number => {
  // Implementation
}
```