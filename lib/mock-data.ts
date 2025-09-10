import { Transaction } from '@/types/transaction'
import { Account } from '@/types/account'
import { SavingsGoal } from '@/types/savings'
import { MonthlyBudget, BudgetCategoryLimits } from '@/types/budget'

// Mock currency exchange rate (USD to MXN)
export const MOCK_EXCHANGE_RATE = 18.25

// Mock accounts
export const mockAccounts: Account[] = [
  {
    id: 'checking-usd',
    name: 'Chase Checking USD',
    institution: 'Chase Bank',
    accountType: 'checking',
    balance: 2500.00,
    currency: 'USD',
    isActive: true,
    category: 'US Accounts',
    lastUpdated: new Date('2025-01-15T10:00:00Z')
  },
  {
    id: 'checking-mxn',
    name: 'Banamex Everyday MXN',
    institution: 'Grupo Financiero Banamex',
    accountType: 'checking',
    balance: 8500.00,
    currency: 'MXN',
    isActive: true,
    category: 'Mexican Accounts',
    lastUpdated: new Date('2025-01-15T09:30:00Z')
  },
  {
    id: 'savings-usd',
    name: 'Chase High-Yield Savings',
    institution: 'Chase Bank',
    accountType: 'savings',
    balance: 12500.00,
    currency: 'USD',
    isActive: true,
    category: 'US Accounts',
    lastUpdated: new Date('2025-01-15T10:15:00Z')
  },
  {
    id: 'credit-usd',
    name: 'Capital One Platinum',
    institution: 'Capital One',
    accountType: 'credit',
    balance: -1250.00,
    availableBalance: 2750.00,
    currency: 'USD',
    isActive: true,
    category: 'Credit Cards',
    lastUpdated: new Date('2025-01-15T10:30:00Z')
  }
]

// Mock transactions for January 2025
export const mockTransactions: Transaction[] = [
  // Salary income
  {
    id: 'trans-001',
    amount: 4000.00,
    currency: 'USD',
    description: 'Monthly Salary - Tech Company Inc.',
    category: 'Income',
    date: new Date('2025-01-01T09:00:00Z'),
    type: 'income',
    accountId: 'checking-usd',
    tags: ['salary', 'work', 'monthly'],
    convertedAmount: 4000.00
  },
  // Mexican freelance income
  {
    id: 'trans-002',
    amount: 15000.00,
    currency: 'MXN',
    description: 'Freelance Development Project',
    category: 'Income',
    date: new Date('2025-01-05T14:30:00Z'),
    type: 'income',
    accountId: 'checking-mxn',
    tags: ['freelance', 'development'],
    convertedAmount: 15000.00 / MOCK_EXCHANGE_RATE, // ~$822.37 USD
    exchangeRate: MOCK_EXCHANGE_RATE
  },
  // Housing expense (MXN)
  {
    id: 'trans-003',
    amount: 7500.00,
    currency: 'MXN',
    description: 'Monthly Rent - Condo Rivera',
    category: 'Housing',
    date: new Date('2025-01-02T10:00:00Z'),
    type: 'expense',
    accountId: 'checking-mxn',
    tags: ['rent', 'housing', 'monthly'],
    convertedAmount: 7500.00 / MOCK_EXCHANGE_RATE, // ~$411.19 USD
    exchangeRate: MOCK_EXCHANGE_RATE
  },
  // Food expense (MXN)
  {
    id: 'trans-004',
    amount: 1850.00,
    currency: 'MXN',
    description: 'Grocery Shopping - Superama',
    category: 'Food',
    date: new Date('2025-01-03T16:00:00Z'),
    type: 'expense',
    accountId: 'checking-mxn',
    tags: ['groceries', 'food', 'weekly']
  },
  // Transportation (USD)
  {
    id: 'trans-005',
    amount: 120.00,
    currency: 'USD',
    description: 'Uber Ride - CDMX Airport',
    category: 'Transportation',
    date: new Date('2025-01-04T18:30:00Z'),
    type: 'expense',
    accountId: 'checking-usd',
    tags: ['uber', 'transportation', 'travel']
  },
  // Entertainment (USD)
  {
    id: 'trans-006',
    amount: 85.50,
    currency: 'USD',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    date: new Date('2025-01-05T12:00:00Z'),
    type: 'expense',
    accountId: 'checking-usd',
    tags: ['subscription', 'streaming', 'monthly']
  },
  // Utilities (MXN)
  {
    id: 'trans-007',
    amount: 2800.00,
    currency: 'MXN',
    description: 'Electricity Bill - CFE',
    category: 'Utilities',
    date: new Date('2025-01-07T11:00:00Z'),
    type: 'expense',
    accountId: 'checking-mxn',
    tags: ['electricity', 'utilities', 'monthly']
  },
  // Health expense (MXN)
  {
    id: 'trans-008',
    amount: 450.00,
    currency: 'MXN',
    description: 'Doctor Consultation',
    category: 'Healthcare',
    date: new Date('2025-01-08T15:45:00Z'),
    type: 'expense',
    accountId: 'checking-mxn',
    tags: ['doctor', 'healthcare', 'medical']
  },
  // Transfer between accounts
  {
    id: 'trans-009',
    amount: 5000.00,
    currency: 'USD',
    description: 'Transfer to MXN Account',
    category: 'Transfer',
    date: new Date('2025-01-10T14:00:00Z'),
    type: 'transfer',
    accountId: 'checking-usd',
    tags: ['transfer', 'exchange', 'transactionId:trans-010']
  },
  // Reciprocal transfer
  {
    id: 'trans-010',
    amount: 91250.00,
    currency: 'MXN',
    description: 'Transfer from USD Account',
    category: 'Transfer',
    date: new Date('2025-01-10T14:00:00Z'),
    type: 'transfer',
    accountId: 'checking-mxn',
    tags: ['transfer', 'exchange', 'transactionId:trans-009']
  }
]

// Mock budget categories with limits
export const mockBudgetLimits: BudgetCategoryLimits[] = [
  { category: 'Housing', allocated: 1200.00, spent: 411.19, spentBy: 1 },
  { category: 'Food', allocated: 800.00, spent: 300.00, spentBy: 3 },
  { category: 'Transportation', allocated: 400.00, spent: 120.00, spentBy: 2 },
  { category: 'Entertainment', allocated: 300.00, spent: 85.50, spentBy: 1 },
  { category: 'Healthcare', allocated: 200.00, spent: 24.66, spentBy: 1 },
  { category: 'Utilities', allocated: 250.00, spent: 153.42, spentBy: 1 },
  { category: 'Savings', allocated: 1000.00, spent: 0.00, spentBy: 0 },
  { category: 'Debt Payment', allocated: 400.00, spent: 0.00, spentBy: 0 },
  { category: 'Personal', allocated: 500.00, spent: 0.00, spentBy: 0 },
  { category: 'Other', allocated: 200.00, spent: 0.00, spentBy: 0 },
]

// Mock monthly budget for January 2025
export const mockMonthlyBudget: MonthlyBudget = {
  id: 'budget-2025-01',
  year: 2025,
  month: 1,
  totalIncome: 4822.37, // Converted to USD total
  totalExpenses: 0, // Will be calculated
  categoryLimits: mockBudgetLimits,
  netSavings: 0, // Will be calculated
  startDate: new Date('2025-01-01T00:00:00Z'),
  endDate: new Date('2025-01-31T23:59:59Z')
}

// Mock savings goals
export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: 'emergency-fund',
    name: 'Emergency Fund',
    description: '6 months of living expenses for financial security',
    targetAmount: 30000.00, // USD
    currentAmount: 8500.00,
    targetDate: new Date('2025-12-31T23:59:59Z'),
    createdDate: new Date('2024-06-01T00:00:00Z'),
    category: 'Emergency',
    priority: 'high'
  },
  {
    id: 'japan-vacation',
    name: 'Tokyo Vacation - Cherry Blossoms',
    description: 'Dream trip to Japan in spring 2025',
    targetAmount: 5000.00, // USD
    currentAmount: 1200.00,
    targetDate: new Date('2025-03-20T12:00:00Z'),
    createdDate: new Date('2024-08-15T00:00:00Z'),
    category: 'Travel',
    priority: 'medium',
    imageUrl: '/japan-travel-cherry-blossoms-tokyo.jpg'
  },
  {
    id: 'new-laptop',
    name: 'MacBook Pro for Work',
    description: 'High-performance laptop for development work',
    targetAmount: 2500.00, // USD
    currentAmount: 750.00,
    targetDate: new Date('2025-06-01T12:00:00Z'),
    createdDate: new Date('2024-10-01T00:00:00Z'),
    category: 'Equipment',
    priority: 'medium',
    imageUrl: '/macbook-pro-laptop-technology.jpg'
  },
  {
    id: 'monthly-contribution',
    name: 'Monthly Contribution Goal',
    description: 'Consistent monthly savings habit',
    targetAmount: 2400.00, // Annual goal
    currentAmount: 650.00,
    targetDate: new Date('2025-12-31T23:59:59Z'),
    createdDate: new Date('2024-01-01T00:00:00Z'),
    category: 'Monthly',
    priority: 'medium'
  }
]

// Utility functions for mock data
export const getTransactionsByCategory = (category: string): Transaction[] => {
  return mockTransactions.filter(t => t.category === category)
}

export const getTransactionsByDateRange = (startDate: Date, endDate: Date): Transaction[] => {
  return mockTransactions.filter(t => {
    const transactionDate = t.date
    return transactionDate >= startDate && transactionDate <= endDate
  })
}

export const getTransactionSummary = () => {
  const usdTransactions = mockTransactions.filter(t => !t.convertedAmount)
  const convertedTransactions = mockTransactions.filter(t => t.convertedAmount)

  const totalIncome = usdTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0) +
    convertedTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + (t.convertedAmount || 0), 0)

  const totalExpenses = usdTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0) +
    convertedTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + (t.convertedAmount || 0), 0)

  return {
    totalIncome,
    totalExpenses,
    netAmount: totalIncome - totalExpenses,
    transactionCount: mockTransactions.length
  }
}