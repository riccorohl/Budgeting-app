export interface SavingsGoal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number; // In USD
  currentAmount: number; // In USD
  targetDate: Date;
  createdDate: Date;
  category: string;
  imageUrl?: string;
  color?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface SavingsContribution {
  id: string;
  savingsGoalId: string;
  amount: number; // In USD (converted)
  originalAmount: number; // Original amount before conversion
  originalCurrency: 'USD' | 'MXN';
  exchangeRate?: number; // Used for conversion if MXN
  date: Date;
  description?: string;
  transactionId?: string; // Link to actual transaction if exists
}

export interface SavingsProgress {
  savingsGoal: SavingsGoal;
  contributions: SavingsContribution[];
  totalContributions: number;
  remainingAmount: number;
  percentage: number; // 0-100
  daysRemaining: number;
  projectedCompletion?: Date;
  achievements: SavingsAchievement[];
}

export interface SavingsAchievement {
  id: string;
  goalId: string;
  type: 'milestone' | 'streak' | 'contribution';
  title: string;
  description: string;
  earnedDate: Date;
  value: number;
  currency?: 'USD' | 'MXN';
}

export interface SavingsChallenge {
  id: string;
  name: string;
  description: string;
  goalId: string;
  challengeType: 'daily' | 'weekly' | 'monthly';
  targetAmount: number;
  currentAmount: number;
  startDate: Date;
  endDate: Date;
  completed: boolean;
}