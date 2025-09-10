'use client'

import { useState, useEffect, useCallback } from 'react'
import { BudgetProgress, MonthlyBudget, BudgetCategory, BudgetCategoryLimits } from '@/types/budget'
import { Transaction } from '@/types/transaction'

// Mock data - in real app this would come from API/db
const initialBudgetLimits: BudgetCategoryLimits[] = [
  { category: 'Housing', allocated: 1200, spent: 0, spentBy: 0 },
  { category: 'Food', allocated: 800, spent: 0, spentBy: 0 },
  { category: 'Transportation', allocated: 400, spent: 0, spentBy: 0 },
  { category: 'Entertainment', allocated: 300, spent: 0, spentBy: 0 },
  { category: 'Healthcare', allocated: 200, spent: 0, spentBy: 0 },
  { category: 'Utilities', allocated: 250, spent: 0, spentBy: 0 },
]

export function useBudget() {
  const [currentBudget, setCurrentBudget] = useState<MonthlyBudget | null>(null)
  const [budgetProgress, setBudgetProgress] = useState<BudgetProgress[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize with current month
  useEffect(() => {
    const now = new Date()
    const initialBudget: MonthlyBudget = {
      id: `budget-${now.getFullYear()}-${now.getMonth() + 1}`,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      totalIncome: 5000, // Mock income
      totalExpenses: 0,
      categoryLimits: initialBudgetLimits,
      netSavings: 0,
      startDate: new Date(now.getFullYear(), now.getMonth(), 1),
      endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0)
    }
    setCurrentBudget(initialBudget)
  }, [])

  // Calculate budget progress when budget or transactions change
  useEffect(() => {
    if (currentBudget) {
      // This will be calculated by the component when needed
      // We'll keep the budgetProgress state for backward compatibility
    }
  }, [currentBudget])

  // Calculate budget progress based on transactions
  const calculateBudgetProgress = useCallback((transactions: Transaction[]) => {
    if (!currentBudget) return []

    const progress: BudgetProgress[] = currentBudget.categoryLimits.map(catLimit => {
      const categoryTransactions = transactions.filter(t =>
        t.category === catLimit.category && t.type === 'expense'
      )

      const totalSpent = categoryTransactions.reduce((sum, t) => sum + (t.convertedAmount || t.amount), 0)

      return {
        category: catLimit.category,
        allocated: catLimit.allocated,
        spent: totalSpent,
        remaining: catLimit.allocated - totalSpent,
        percentage: Math.min((totalSpent / catLimit.allocated) * 100, 100),
        status: totalSpent > catLimit.allocated ? 'exceeded' :
                totalSpent > catLimit.allocated * 0.85 ? 'warning' : 'on-track',
        transactions: categoryTransactions
      }
    })

    return progress
  }, [currentBudget])

  const updateBudgetCategory = async (category: BudgetCategory, newAllocated: number) => {
    if (!currentBudget) return

    setIsLoading(true)
    try {
      const updatedLimits = currentBudget.categoryLimits.map(limit =>
        limit.category === category ? { ...limit, allocated: newAllocated } : limit
      )

      setCurrentBudget({
        ...currentBudget,
        categoryLimits: updatedLimits
      })

      // Recalculate progress
      calculateBudgetProgress([])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update budget')
    } finally {
      setIsLoading(false)
    }
  }

  const getBudgetSummary = () => {
    if (!currentBudget || budgetProgress.length === 0) {
      return {
        totalAllocated: 0,
        totalSpent: 0,
        totalRemaining: 0,
        categoriesOnTrack: 0,
        categoriesWarning: 0,
        categoriesExceeded: 0
      }
    }

    const summary = budgetProgress.reduce(
      (acc, cat) => ({
        totalAllocated: acc.totalAllocated + cat.allocated,
        totalSpent: acc.totalSpent + cat.spent,
        totalRemaining: acc.totalRemaining + cat.remaining,
        categoriesOnTrack: acc.categoriesOnTrack + (cat.status === 'on-track' ? 1 : 0),
        categoriesWarning: acc.categoriesWarning + (cat.status === 'warning' ? 1 : 0),
        categoriesExceeded: acc.categoriesExceeded + (cat.status === 'exceeded' ? 1 : 0)
      }),
      {
        totalAllocated: 0,
        totalSpent: 0,
        totalRemaining: 0,
        categoriesOnTrack: 0,
        categoriesWarning: 0,
        categoriesExceeded: 0
      }
    )

    return summary
  }

  return {
    currentBudget,
    budgetProgress,
    calculateBudgetProgress,
    updateBudgetCategory,
    getBudgetSummary,
    isLoading,
    error
  }
}