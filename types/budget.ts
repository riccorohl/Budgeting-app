import { Transaction } from './transaction';

export type BudgetCategory =
  | 'Housing'
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Healthcare'
  | 'Utilities'
  | 'Savings'
  | 'Debt Payment'
  | 'Personal'
  | 'Other';

export interface BudgetCategoryLimits {
  category: BudgetCategory;
  allocated: number; // In USD
  spent: number; // In USD
  spentBy: number; // Number of transactions
}

export interface MonthlyBudget {
  id: string;
  year: number;
  month: number; // 1-12
  totalIncome: number; // In USD
  totalExpenses: number; // In USD
  categoryLimits: BudgetCategoryLimits[];
  netSavings: number; // In USD
  startDate: Date;
  endDate: Date;
}

export interface BudgetProgress {
  category: BudgetCategory;
  allocated: number;
  spent: number;
  remaining: number;
  percentage: number; // 0-100
  status: 'on-track' | 'warning' | 'exceeded';
  transactions: Transaction[];
}

export interface BudgetComparison {
  previousMonth: MonthlyBudget;
  currentMonth: MonthlyBudget;
  changes: {
    totalIncome: number;
    totalExpenses: number;
    netSavings: number;
    categoryChanges: {
      category: BudgetCategory;
      change: number;
    }[];
  };
}