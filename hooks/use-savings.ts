'use client'

import { useState, useCallback } from 'react'
import { SavingsGoal, SavingsContribution, SavingsProgress } from '@/types/savings'

// Mock initial savings goals
const initialGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    description: '6 months of expenses saved',
    targetAmount: 12000,
    currentAmount: 4500,
    targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    createdDate: new Date(),
    category: 'Emergency',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Vacation to Japan',
    description: 'Tokyo cherry blossoms trip',
    targetAmount: 3000,
    currentAmount: 800,
    targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months
    createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    category: 'Travel',
    priority: 'medium'
  }
]

export function useSavings() {
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(initialGoals)
  const [contributions, setContributions] = useState<SavingsContribution[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addSavingsGoal = useCallback(async (goal: Omit<SavingsGoal, 'id' | 'createdDate'>) => {
    setIsLoading(true)
    try {
      const newGoal: SavingsGoal = {
        ...goal,
        id: Math.random().toString(36).substr(2, 9),
        createdDate: new Date()
      }

      setSavingsGoals(prev => [...prev, newGoal])
      return newGoal
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add savings goal')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateSavingsGoal = useCallback(async (id: string, updates: Partial<SavingsGoal>) => {
    setIsLoading(true)
    try {
      setSavingsGoals(prev => prev.map(goal =>
        goal.id === id ? { ...goal, ...updates } : goal
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update savings goal')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addContribution = useCallback(async (contribution: Omit<SavingsContribution, 'id'>) => {
    setIsLoading(true)
    try {
      const newContribution: SavingsContribution = {
        ...contribution,
        id: Math.random().toString(36).substr(2, 9)
      }

      setContributions(prev => [...prev, newContribution])

      // Update the savings goal's current amount
      setSavingsGoals(prev => prev.map(goal =>
        goal.id === contribution.savingsGoalId
          ? { ...goal, currentAmount: goal.currentAmount + contribution.amount }
          : goal
      ))

      return newContribution
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add contribution')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getSavingsProgress = useCallback((goalId: string): SavingsProgress => {
    const goal = savingsGoals.find(g => g.id === goalId)
    if (!goal) throw new Error('Savings goal not found')

    const goalContributions = contributions.filter(c => c.savingsGoalId === goalId)
    const totalContributions = goalContributions.reduce((sum, c) => sum + c.amount, 0)
    const remainingAmount = goal.targetAmount - goal.currentAmount
    const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)

    const targetDate = goal.targetDate.getTime()
    const today = Date.now()
    const daysRemaining = Math.max(Math.ceil((targetDate - today) / (24 * 60 * 60 * 1000)), 0)

    const averageDailyContribution = daysRemaining > 0 ? remainingAmount / daysRemaining : 0
    const projectedCompletion = new Date(today + (remainingAmount / averageDailyContribution) * 24 * 60 * 60 * 1000)

    return {
      savingsGoal: goal,
      contributions: goalContributions,
      totalContributions,
      remainingAmount,
      percentage,
      daysRemaining,
      projectedCompletion: isFinite(projectedCompletion.getTime()) ? projectedCompletion : undefined,
      achievements: [] // Would be populated in real app
    }
  }, [savingsGoals, contributions])

  const getTotalSavingsSummary = useCallback(() => {
    return savingsGoals.reduce(
      (acc, goal) => ({
        totalGoals: acc.totalGoals + 1,
        totalTargetAmount: acc.totalTargetAmount + goal.targetAmount,
        totalCurrentAmount: acc.totalCurrentAmount + goal.currentAmount,
        totalProgress: acc.totalProgress + (goal.currentAmount / goal.targetAmount),
        completedGoals: acc.completedGoals + (goal.currentAmount >= goal.targetAmount ? 1 : 0)
      }),
      {
        totalGoals: 0,
        totalTargetAmount: 0,
        totalCurrentAmount: 0,
        totalProgress: 0,
        completedGoals: 0
      }
    )
  }, [savingsGoals])

  return {
    savingsGoals,
    contributions,
    addSavingsGoal,
    updateSavingsGoal,
    addContribution,
    getSavingsProgress,
    getTotalSavingsSummary,
    isLoading,
    error
  }
}