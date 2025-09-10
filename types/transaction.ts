export type Currency = 'USD' | 'MXN';

export interface Transaction {
  id: string;
  amount: number;
  currency: Currency;
  description: string;
  category: string;
  date: Date;
  type: 'income' | 'expense' | 'transfer';
  accountId: string;
  tags: string[];
  convertedAmount?: number; // USD equivalent
  exchangeRate?: number; // For MXN to USD conversion
  recurringId?: string; // For recurring transactions
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: Currency;
  type: 'checking' | 'savings' | 'credit' | 'investment';
}

export interface RecurringTransaction {
  id: string;
  templateTransaction: Omit<Transaction, 'id' | 'date'>;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate?: Date;
  nextDueDate: Date;
}