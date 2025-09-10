export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';

export interface Account {
  id: string;
  name: string;
  institution: string;
  accountNumber?: string; // Masked for security
  accountType: AccountType;
  balance: number; // In account currency
  availableBalance?: number; // For credit/investment accounts
  currency: 'USD' | 'MXN';
  isActive: boolean;
  lastUpdated: Date;
  plaidAccountId?: string; // For synced accounts
  category: string; // User-defined grouping
}

export interface AccountConnection {
  id: string;
  name: string;
  institution: string;
  accounts: Account[];
  connectionStatus: 'connected' | 'disconnected' | 'error';
  lastSynced?: Date;
  errorMessage?: string;
  plaidItemId: string;
}

export interface AccountSummary {
  totalBalance: number; // USD equivalent
  accounts: Account[];
  currencyBreakdown: {
    USD: number;
    MXN: number;
  };
  accountTypeBreakdown: Record<AccountType, number>;
}

export interface AccountMovement {
  accountId: string;
  amount: number;
  currency: 'USD' | 'MXN';
  date: Date;
  type: 'deposit' | 'withdrawal' | 'transfer';
  description: string;
  transactionId?: string;
}