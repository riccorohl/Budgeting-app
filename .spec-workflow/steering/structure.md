# Project Structure

## Directory Organization

```
budgeting-app/
├── public/                    # Static assets
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/                       # Source code
│   ├── components/            # Reusable UI components
│   │   ├── atoms/            # Basic building blocks
│   │   ├── molecules/        # Simple component combinations
│   │   ├── organisms/        # Complex UI sections
│   │   └── templates/        # Page layouts
│   ├── pages/                # Page components
│   │   ├── Dashboard/
│   │   ├── Budget/
│   │   ├── Transactions/
│   │   ├── SavingsGoals/
│   │   └── Calendar/
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API and external service integrations
│   │   ├── api/
│   │   ├── exchangeRate/
│   │   └── bankIntegration/
│   ├── stores/               # Zustand state stores
│   │   ├── userStore.ts
│   │   ├── budgetStore.ts
│   │   ├── transactionStore.ts
│   │   └── settingsStore.ts
│   ├── utils/                # Utility functions
│   │   ├── currency/
│   │   ├── date/
│   │   ├── validation/
│   │   └── formatting/
│   ├── types/                # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── budget.ts
│   │   ├── transaction.ts
│   │   └── user.ts
│   ├── constants/            # Application constants
│   │   ├── currencies.ts
│   │   ├── categories.ts
│   │   └── config.ts
│   ├── styles/               # Global styles and themes
│   │   ├── theme.ts
│   │   ├── globals.css
│   │   └── components/
│   └── App.tsx               # Main application component
├── tests/                    # Test files
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
├── docs/                     # Documentation
│   ├── api/
│   ├── components/
│   └── deployment/
├── scripts/                  # Build and utility scripts
│   ├── build.js
│   ├── deploy.js
│   └── generate-types.js
├── .env.example             # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Naming Conventions

### Files
- **Components/Modules**: `PascalCase` (e.g., `BudgetCard.tsx`, `TransactionList.tsx`)
- **Services/Handlers**: `camelCase` with descriptive suffix (e.g., `exchangeRateService.ts`, `bankApiHandler.ts`)
- **Utilities/Helpers**: `camelCase` with descriptive suffix (e.g., `currencyUtils.ts`, `dateHelpers.ts`)
- **Tests**: `[filename].test.ts` or `[filename].test.tsx`
- **Types**: `[name].types.ts` (e.g., `budget.types.ts`, `transaction.types.ts`)

### Code
- **Classes/Types**: `PascalCase` (e.g., `Budget`, `Transaction`, `SavingsGoal`)
- **Functions/Methods**: `camelCase` (e.g., `calculateTotal`, `formatCurrency`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_CURRENCY`, `API_ENDPOINTS`)
- **Variables**: `camelCase` (e.g., `userBudget`, `transactionAmount`)
- **Props/Interfaces**: `PascalCase` with descriptive suffix (e.g., `BudgetCardProps`, `TransactionFormData`)

## Import Patterns

### Import Order
1. React and React-related imports
2. Third-party libraries (Material-UI, Chart.js, etc.)
3. Internal services and utilities
4. Types and interfaces
5. Relative imports (components, pages)
6. Style imports (CSS modules, styled-components)

### Module/Package Organization
```typescript
// Example import structure
import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

import { useBudgetStore } from '@/stores/budgetStore';
import { formatCurrency } from '@/utils/currency/formatting';
import { Budget } from '@/types/budget';
import { BudgetCardProps } from './BudgetCard.types';
import './BudgetCard.css';
```

## Code Structure Patterns

### Module/Class Organization
```typescript
// 1. Imports and dependencies
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Types and interfaces
interface ComponentProps {
  // prop definitions
}

// 3. Constants
const DEFAULT_VALUES = {
  // constant values
};

// 4. Main component implementation
export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // component logic
  return (
    // JSX
  );
};

// 5. Helper functions (if needed)
const helperFunction = () => {
  // helper logic
};

// 6. Default export
export default ComponentName;
```

### Function/Method Organization
```typescript
// 1. Input validation
const processTransaction = (transaction: Transaction) => {
  if (!transaction || !transaction.amount) {
    throw new Error('Invalid transaction data');
  }

  // 2. Core logic
  const convertedAmount = convertCurrency(
    transaction.amount,
    transaction.currency,
    'USD'
  );

  // 3. Error handling
  if (convertedAmount < 0) {
    throw new Error('Invalid conversion result');
  }

  // 4. Clear return
  return {
    ...transaction,
    amountUSD: convertedAmount,
    originalAmount: transaction.amount,
    originalCurrency: transaction.currency
  };
};
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
- **Responsive design**: Mobile-first approach with breakpoint management

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
};
```