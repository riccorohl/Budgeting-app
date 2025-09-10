"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Plus, Edit, DollarSign, AlertTriangle, CheckCircle } from "lucide-react"
import { useState, useMemo } from "react"
import { useBudget } from "@/hooks/use-budget"
import { useTransactions } from "@/hooks/use-transactions"
import { useCurrency } from "@/hooks/use-currency"

interface BudgetCategory {
  id: string
  name: string
  budgeted: number
  activity: number
  available: number
  currency: "USD" | "MXN"
  type: "income" | "needs" | "wants" | "savings"
}

export function BudgetManagement() {
  const { getBudgetSummary, calculateBudgetProgress } = useBudget()
  const { transactions } = useTransactions()
  const { formatCurrency } = useCurrency()
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)

  // Memoize calculations to prevent infinite re-renders
  const progress = useMemo(() => {
    return calculateBudgetProgress(transactions)
  }, [calculateBudgetProgress, transactions])

  const summary = useMemo(() => {
    return getBudgetSummary()
  }, [getBudgetSummary])

  // Transform our data to match Vercel V0 interface
  const incomeCategories: BudgetCategory[] = [
    {
      id: "hourly-work",
      name: "Hourly Work",
      budgeted: 1200.0,
      activity: 1257.49,
      available: 1257.49,
      currency: "USD",
      type: "income",
    },
    {
      id: "other-income",
      name: "Other Income",
      budgeted: 10.0,
      activity: 10.0,
      available: 10.0,
      currency: "USD",
      type: "income",
    },
  ]

  const needsCategories: BudgetCategory[] = progress
    .filter(p => ['Housing', 'Food', 'Utilities', 'Healthcare'].includes(p.category))
    .map(p => ({
      id: p.category.toLowerCase().replace(/\s+/g, '-'),
      name: p.category,
      budgeted: p.allocated,
      activity: p.spent,
      available: p.remaining,
      currency: "USD" as const,
      type: "needs" as const,
    }))

  const wantsCategories: BudgetCategory[] = progress
    .filter(p => ['Entertainment', 'Transportation'].includes(p.category))
    .map(p => ({
      id: p.category.toLowerCase().replace(/\s+/g, '-'),
      name: p.category,
      budgeted: p.allocated,
      activity: p.spent,
      available: p.remaining,
      currency: "USD" as const,
      type: "wants" as const,
    }))

  const savingsCategories: BudgetCategory[] = [
    {
      id: "emergency-fund",
      name: "Emergency Fund",
      budgeted: 500.0,
      activity: 50.0,
      available: 450.0,
      currency: "USD",
      type: "savings",
    },
  ]

  const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.activity, 0)
  const totalBudgeted = [...needsCategories, ...wantsCategories, ...savingsCategories].reduce((sum, cat) => sum + cat.budgeted, 0)
  const leftToBudget = totalIncome - totalBudgeted
  const netAvailable = totalIncome - [...needsCategories, ...wantsCategories, ...savingsCategories].reduce((sum, cat) => sum + cat.activity, 0)

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome, 'USD')}</div>
            <p className="text-xs text-muted-foreground">Expected: {formatCurrency(1210, 'USD')}</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                +{formatCurrency(totalIncome - 1210, 'USD')}
              </Badge>
              <span className="text-xs text-green-500">4.7% over</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{formatCurrency(totalBudgeted, 'USD')}</div>
            <p className="text-xs text-muted-foreground">Allocated budget</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="text-xs">
                {Math.round((totalBudgeted / totalIncome) * 100)}% of income
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Left to Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatCurrency(leftToBudget, 'USD')}</div>
            <p className="text-xs text-muted-foreground">Available to assign</p>
            <div className="flex items-center gap-1 mt-1">
              <AlertTriangle className="h-3 w-3 text-primary" />
              <span className="text-xs text-primary">Needs assignment</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Total Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{formatCurrency(netAvailable, 'USD')}</div>
            <p className="text-xs text-muted-foreground">After all expenses</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-500">
                Healthy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Section */}
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Income
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {incomeCategories.map((category) => (
                <div key={category.id} className="space-y-2">
          <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="text-right">
                      <div className="font-bold text-green-500">{formatCurrency(category.activity, category.currency)}</div>
                      <div className="text-xs text-muted-foreground">Expected: {formatCurrency(category.budgeted, category.currency)}</div>
                    </div>
                  </div>
                  <Progress value={(category.activity / category.budgeted) * 100} className="h-2" />
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between font-bold">
                <span>Total Income</span>
                <span className="text-green-500">{formatCurrency(totalIncome, 'USD')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
                  <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Needs</span>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(needsCategories.reduce((sum, cat) => sum + cat.activity, 0), 'USD')}</div>
                    <div className="text-xs text-muted-foreground">Budgeted: {formatCurrency(needsCategories.reduce((sum, cat) => sum + cat.budgeted, 0), 'USD')}</div>
                  </div>
                </div>
                <Progress value={(needsCategories.reduce((sum, cat) => sum + cat.activity, 0) / needsCategories.reduce((sum, cat) => sum + cat.budgeted, 0)) * 100} className="h-2" />
                <div className="text-xs text-green-500 mt-1">{formatCurrency(needsCategories.reduce((sum, cat) => sum + cat.available, 0), 'USD')} remaining</div>
              </div>

                  <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Wants</span>
                  <div className="text-right">
                    <div className="font-bold text-red-500">{formatCurrency(wantsCategories.reduce((sum, cat) => sum + cat.activity, 0), 'USD')}</div>
                    <div className="text-xs text-muted-foreground">Budgeted: {formatCurrency(wantsCategories.reduce((sum, cat) => sum + cat.budgeted, 0), 'USD')}</div>
                  </div>
                </div>
                <Progress value={(wantsCategories.reduce((sum, cat) => sum + cat.activity, 0) / wantsCategories.reduce((sum, cat) => sum + cat.budgeted, 0)) * 100} className="h-2" />
                <div className="text-xs text-green-500 mt-1">{formatCurrency(wantsCategories.reduce((sum, cat) => sum + cat.available, 0), 'USD')} remaining</div>
              </div>

                  <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Savings</span>
                  <div className="text-right">
                    <div className="font-bold text-blue-500">{formatCurrency(savingsCategories.reduce((sum, cat) => sum + cat.activity, 0), 'USD')}</div>
                    <div className="text-xs text-muted-foreground">Budgeted: {formatCurrency(savingsCategories.reduce((sum, cat) => sum + cat.budgeted, 0), 'USD')}</div>
                  </div>
                </div>
                <Progress value={(savingsCategories.reduce((sum, cat) => sum + cat.activity, 0) / savingsCategories.reduce((sum, cat) => sum + cat.budgeted, 0)) * 100} className="h-2" />
                <div className="text-xs text-green-500 mt-1">Goal met</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-500" />
              Accounts Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">US Checking</div>
                  <div className="text-xs text-muted-foreground">Chase Bank</div>
          </div>
                <div className="text-right">
                  <div className="font-bold text-green-500">{formatCurrency(2495.29, 'USD')}</div>
                  <div className="text-xs text-muted-foreground">USD</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">MX Checking</div>
                  <div className="text-xs text-muted-foreground">Banorte</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatCurrency(543.21, 'USD')}</div>
                  <div className="text-xs text-muted-foreground">≈ MX$10,025.00</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Savings Account</div>
                  <div className="text-xs text-muted-foreground">US Bank</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-500">{formatCurrency(1250.00, 'USD')}</div>
                  <div className="text-xs text-muted-foreground">USD</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between font-bold">
                <span>Net Worth</span>
                <span className="text-green-500">{formatCurrency(4288.50, 'USD')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Needs Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {needsCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <div className="text-right">
                    <div className="font-bold">
                      {formatCurrency(category.activity, category.currency)}
                    </div>
                    <div className="text-xs text-green-500">{formatCurrency(category.available, 'USD')} available</div>
                  </div>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

      <Card>
        <CardHeader>
            <CardTitle>Wants & Savings</CardTitle>
        </CardHeader>
          <CardContent className="space-y-4">
            {[...wantsCategories, ...savingsCategories].map((category) => (
              <div key={category.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <div className="text-right">
                    <div className="font-bold">
                      {formatCurrency(category.activity, category.currency)}
                    </div>
                    <div className="text-xs text-green-500">
                      {formatCurrency(category.available, 'USD')} available
                    </div>
                  </div>
                </div>
                <Progress value={(category.activity / category.budgeted) * 100} className="h-2" />
          </div>
            ))}
        </CardContent>
      </Card>
      </div>
    </div>
  )
}