import { z } from 'zod'

// Transaction validation schemas
export const transactionSchema = z.object({
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  currency: z.enum(['USD', 'MXN'] as const),
  description: z.string().min(1, 'Description is required').max(255),
  category: z.string().min(1, 'Category is required'),
  type: z.enum(['income', 'expense', 'transfer'] as const),
  accountId: z.string().min(1, 'Account is required'),
  date: z.date(),
  tags: z.array(z.string()).optional().default([])
})

export const addTransactionSchema = z.object({
  amount: z.number().min(0.01),
  currency: z.enum(['USD', 'MXN']),
  description: z.string().min(1).max(255),
  category: z.string().min(1),
  type: z.enum(['income', 'expense']),
  accountId: z.string().min(1),
  tags: z.array(z.string()).default([])
})

// Budget validation schemas
export const budgetCategorySchema = z.object({
  category: z.string().min(1, 'Category is required'),
  allocated: z.number().min(0, 'Allocated amount cannot be negative'),
  spent: z.number().min(0).default(0)
})

export const monthlyBudgetSchema = z.object({
  year: z.number().int().min(2020).max(2030),
  month: z.number().int().min(1).max(12),
  categoryLimits: z.array(budgetCategorySchema).min(1, 'At least one category is required'),
  totalIncome: z.number().min(0).default(0),
  totalExpenses: z.number().min(0).default(0),
  netSavings: z.number().optional().default(0)
})

// Savings goal validation schemas
export const savingsGoalSchema = z.object({
  name: z.string().min(1, 'Goal name is required').max(100),
  description: z.string().max(500).optional(),
  targetAmount: z.number().min(1, 'Target amount must be greater than 0'),
  currentAmount: z.number().min(0).default(0),
  targetDate: z.date().min(new Date(), 'Target date must be in the future'),
  category: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium')
})

export const savingsContributionSchema = z.object({
  savingsGoalId: z.string().min(1, 'Goal ID is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  originalCurrency: z.enum(['USD', 'MXN']).optional().default('USD'),
  description: z.string().max(255).optional()
})

// Account validation schemas
export const accountSchema = z.object({
  name: z.string().min(1, 'Account name is required').max(100),
  institution: z.string().min(1, 'Institution is required'),
  accountType: z.enum(['checking', 'savings', 'credit', 'investment'] as const),
  balance: z.number(),
  currency: z.enum(['USD', 'MXN']),
  isActive: z.boolean().default(true),
  category: z.string().optional(),
  accountNumber: z.string().optional()
})

export const accountConnectionSchema = z.object({
  name: z.string().min(1, 'Connection name is required'),
  institution: z.string().min(1, 'Institution is required'),
  plaidItemId: z.string().optional()
})

// Form validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Currency conversion validation
export const currencyConversionSchema = z.object({
  amount: z.number().min(0.01),
  fromCurrency: z.enum(['USD', 'MXN']),
  toCurrency: z.enum(['USD', 'MXN'])
})

// Date range validation
export const dateRangeSchema = z.object({
  startDate: z.date(),
  endDate: z.date()
}).refine((data) => data.endDate >= data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"]
})

// Settings validation
export const settingsSchema = z.object({
  defaultCurrency: z.enum(['USD', 'MXN']).default('USD'),
  monthlyBudgetLimit: z.number().min(0).optional(),
  emailNotifications: z.boolean().default(true),
  darkMode: z.boolean().default(true),
  language: z.string().default('en'),
  timezone: z.string().optional()
})

// Export types derived from schemas
export type TransactionForm = z.infer<typeof transactionSchema>
export type AddTransactionForm = z.infer<typeof addTransactionSchema>
export type BudgetCategoryForm = z.infer<typeof budgetCategorySchema>
export type MonthlyBudgetForm = z.infer<typeof monthlyBudgetSchema>
export type SavingsGoalForm = z.infer<typeof savingsGoalSchema>
export type SavingsContributionForm = z.infer<typeof savingsContributionSchema>
export type AccountForm = z.infer<typeof accountSchema>
export type AccountConnectionForm = z.infer<typeof accountConnectionSchema>
export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type CurrencyConversionForm = z.infer<typeof currencyConversionSchema>
export type DateRangeForm = z.infer<typeof dateRangeSchema>
export type SettingsForm = z.infer<typeof settingsSchema>