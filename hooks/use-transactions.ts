'use client'

import { useState, useCallback } from 'react'
import { Transaction, RecurringTransaction } from '@/types/transaction'

// Mock initial transactions
const initialTransactions: Transaction[] = [
  {
    id: '1',
    amount: 1000,
    currency: 'USD',
    description: 'Salary',
    category: 'Income',
    date: new Date(),
    type: 'income',
    accountId: 'checking-account',
    tags: ['work', 'salary'],
    convertedAmount: 1000
  },
  {
    id: '2',
    amount: 1500,
    currency: 'MXN',
    description: 'Mexico Rent',
    category: 'Housing',
    date: new Date(Date.now() - 86400000), // Yesterday
    type: 'expense',
    accountId: 'mexico-account',
    tags: ['rent', 'housing'],
    convertedAmount: 1500 / 18, // Mock conversion
    exchangeRate: 18
  }
]

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    setIsLoading(true)
    try {
      const newTransaction: Transaction = {
        ...transaction,
        id: Math.random().toString(36).substr(2, 9)
      }

      setTransactions(prev => [newTransaction, ...prev])
      return newTransaction
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add transaction')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateTransaction = useCallback(async (id: string, updates: Partial<Omit<Transaction, 'id'>>) => {
    setIsLoading(true)
    try {
      setTransactions(prev => prev.map(t =>
        t.id === id ? { ...t, ...updates } : t
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update transaction')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteTransaction = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      setTransactions(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete transaction')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getTransactionsByCategory = useCallback((category: string) => {
    return transactions.filter(t => t.category.toLowerCase() === category.toLowerCase())
  }, [transactions])

  const getTransactionsByDateRange = useCallback((startDate: Date, endDate: Date) => {
    return transactions.filter(t => {
      const transactionDate = t.date
      return transactionDate >= startDate && transactionDate <= endDate
    })
  }, [transactions])

  const getTransactionSummary = useCallback(() => {
    const summary = transactions.reduce(
      (acc, transaction) => {
        const amount = transaction.convertedAmount || transaction.amount

        if (transaction.type === 'income') {
          acc.totalIncome += amount
        } else if (transaction.type === 'expense') {
          acc.totalExpenses += amount
          acc.categoryExpenses[transaction.category] =
            (acc.categoryExpenses[transaction.category] || 0) + amount
        }

        // Currency breakdown
        acc.currencyTotals[transaction.currency] =
          (acc.currencyTotals[transaction.currency] || 0) + transaction.amount

        return acc
      },
      {
        totalIncome: 0,
        totalExpenses: 0,
        netAmount: 0,
        categoryExpenses: {} as Record<string, number>,
        currencyTotals: {} as Record<string, number>
      }
    )

    summary.netAmount = summary.totalIncome - summary.totalExpenses
    return summary
  }, [transactions])

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByCategory,
    getTransactionsByDateRange,
    getTransactionSummary,
    isLoading,
    error
  }
}