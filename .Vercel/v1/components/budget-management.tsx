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
import { TrendingUp, TrendingDown, Plus, Edit, DollarSign, AlertTriangle, CheckCircle } from "lucide-react"
import { useState } from "react"

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
  const [selectedCategory, setSelectedCategory] = useState<BudgetCategory | null>(null)
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)

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
      activity: 0.07,
      available: 10.0,
      currency: "USD",
      type: "income",
    },
  ]

  const needsCategories: BudgetCategory[] = [
    {
      id: "rent",
      name: "Rent",
      budgeted: 244.0,
      activity: 0.0,
      available: 241.53,
      currency: "USD",
      type: "needs",
    },
    {
      id: "groceries",
      name: "Groceries",
      budgeted: 217.0,
      activity: 0.0,
      available: 214.7,
      currency: "USD",
      type: "needs",
    },
    {
      id: "power",
      name: "Power",
      budgeted: 108.0,
      activity: 0.0,
      available: 107.35,
      currency: "USD",
      type: "needs",
    },
    {
      id: "business-expenses",
      name: "Business Expenses",
      budgeted: 20.0,
      activity: 0.0,
      available: 20.0,
      currency: "USD",
      type: "needs",
    },
    {
      id: "health-care",
      name: "Health and Self-Care",
      budgeted: 30.0,
      activity: 0.0,
      available: 30.0,
      currency: "USD",
      type: "needs",
    },
    {
      id: "ze-kitty",
      name: "Ze Kitty",
      budgeted: 30.0,
      activity: 0.0,
      available: 30.0,
      currency: "USD",
      type: "needs",
    },
  ]

  const wantsCategories: BudgetCategory[] = [
    {
      id: "shopping-leisure",
      name: "Shopping and Leisure",
      budgeted: 100.0,
      activity: 113.11,
      available: -13.11,
      currency: "USD",
      type: "wants",
    },
    {
      id: "projects",
      name: "Projects",
      budgeted: 110.0,
      activity: 27.97,
      available: 82.03,
      currency: "USD",
      type: "wants",
    },
    {
      id: "memberships",
      name: "Memberships",
      budgeted: 100.0,
      activity: 48.25,
      available: 51.75,
      currency: "USD",
      type: "wants",
    },
  ]

  const savingsCategories: BudgetCategory[] = [
    {
      id: "personal-savings",
      name: "Personal Savings",
      budgeted: 50.0,
      activity: 0.0,
      available: 50.0,
      currency: "USD",
      type: "savings",
    },
  ]

  const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.activity, 0)
  const totalBudgeted = [...needsCategories, ...wantsCategories, ...savingsCategories].reduce(
    (sum, cat) => sum + cat.budgeted,
    0,
  )
  const leftToBudget = totalIncome - totalBudgeted

  const CategoryRow = ({ category }: { category: BudgetCategory }) => {
    const isOverBudget = category.available < 0
    const isIncome = category.type === "income"
    const progressValue = isIncome
      ? Math.min((category.activity / category.budgeted) * 100, 120)
      : category.budgeted > 0
        ? Math.min((category.activity / category.budgeted) * 100, 120)
        : 0

    return (
      <div className="grid grid-cols-12 gap-4 items-center py-3 hover:bg-muted/50 rounded-lg px-3 -mx-3">
        <div className="col-span-4 flex items-center gap-2">
          <span className="font-medium text-sm">{category.name}</span>
          {category.currency === "MXN" && (
            <Badge variant="outline" className="text-xs">
              MXN
            </Badge>
          )}
        </div>

        <div className="col-span-2 text-right">
          <div className="font-mono text-sm">
            {isIncome ? (
              <span className="text-green-500">${category.budgeted.toFixed(2)}</span>
            ) : (
              <span>${category.budgeted.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="col-span-2 text-right">
          <div className="font-mono text-sm">
            {isIncome ? (
              <span className="text-green-500">${category.activity.toFixed(2)}</span>
            ) : category.activity > 0 ? (
              <span className="text-blue-500">${category.activity.toFixed(2)}</span>
            ) : (
              <span className="text-muted-foreground">$0.00</span>
            )}
          </div>
        </div>

        <div className="col-span-2 text-right">
          <div className="font-mono text-sm">
            {isIncome ? (
              <span className="text-green-500">${category.available.toFixed(2)}</span>
            ) : isOverBudget ? (
              <span className="text-red-500">-${Math.abs(category.available).toFixed(2)}</span>
            ) : (
              <span className="text-green-500">${category.available.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="col-span-2 flex justify-end gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(category)}>
                <Edit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit {category.name}</DialogTitle>
                <DialogDescription>Adjust the budget amount for this category.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget-amount">Budget Amount</Label>
                  <Input id="budget-amount" type="number" defaultValue={category.budgeted} placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue={category.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="MXN">MXN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }

  const SectionHeader = ({
    title,
    icon,
    total,
    subtitle,
    color = "default",
  }: {
    title: string
    icon: React.ReactNode
    total: number
    subtitle?: string
    color?: "green" | "red" | "blue" | "default"
  }) => {
    const colorClasses = {
      green: "text-green-500",
      red: "text-red-500",
      blue: "text-blue-500",
      default: "text-foreground",
    }

    return (
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        <div className="text-right">
          <div className={`font-bold text-xl font-mono ${colorClasses[color]}`}>${total.toFixed(2)}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm text-muted-foreground">Total Income</div>
                <div className="text-xl font-bold text-green-500">${totalIncome.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Total Budgeted</div>
                <div className="text-xl font-bold text-blue-500">${totalBudgeted.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {leftToBudget > 0 ? (
                <AlertTriangle className="h-5 w-5 text-primary" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <div>
                <div className="text-sm text-muted-foreground">Left to Budget</div>
                <div className={`text-xl font-bold ${leftToBudget > 0 ? "text-primary" : "text-green-500"}`}>
                  ${leftToBudget.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">Exchange Rate</div>
                <div className="text-lg font-bold">18.45</div>
                <div className="text-xs text-green-500">USD/MXN</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Budget Categories</CardTitle>
            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>Create a new budget category to track your expenses.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input id="category-name" placeholder="e.g., Entertainment" />
                  </div>
                  <div>
                    <Label htmlFor="category-type">Category Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="needs">Needs</SelectItem>
                        <SelectItem value="wants">Wants</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="initial-budget">Initial Budget</Label>
                    <Input id="initial-budget" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="category-currency">Currency</Label>
                    <Select defaultValue="USD">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="MXN">MXN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddCategoryOpen(false)}>Add Category</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Column Headers */}
          <div className="grid grid-cols-12 gap-4 items-center py-2 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-4">Category</div>
            <div className="col-span-2 text-right">Budgeted</div>
            <div className="col-span-2 text-right">Activity</div>
            <div className="col-span-2 text-right">Available</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Income Section */}
          <div className="space-y-2">
            <SectionHeader
              title="INFLOW"
              icon={<TrendingUp className="h-5 w-5 text-green-500" />}
              total={totalIncome}
              color="green"
            />
            {incomeCategories.map((category) => (
              <CategoryRow key={category.id} category={category} />
            ))}

            <div className="grid grid-cols-12 gap-4 items-center py-2 border-t border-border font-bold">
              <div className="col-span-4">TOTALS</div>
              <div className="col-span-2 text-right font-mono">
                ${incomeCategories.reduce((sum, cat) => sum + cat.budgeted, 0).toFixed(2)}
              </div>
              <div className="col-span-2 text-right font-mono text-green-500">${totalIncome.toFixed(2)}</div>
              <div className="col-span-2 text-right font-mono text-green-500">${totalIncome.toFixed(2)}</div>
              <div className="col-span-2"></div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Outflow Section */}
          <div className="space-y-2">
            <SectionHeader
              title="OUTFLOW"
              icon={<TrendingDown className="h-5 w-5 text-red-500" />}
              total={totalBudgeted}
              color="red"
            />

            {/* Needs */}
            <div className="ml-4">
              <div className="flex items-center gap-2 py-2">
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <span className="text-sm font-medium">▼ Needs</span>
                </Button>
                <div className="ml-auto font-mono text-sm">
                  ${needsCategories.reduce((sum, cat) => sum + cat.budgeted, 0).toFixed(2)}
                </div>
              </div>
              {needsCategories.map((category) => (
                <div key={category.id} className="ml-4">
                  <CategoryRow category={category} />
                </div>
              ))}
            </div>

            {/* Wants */}
            <div className="ml-4">
              <div className="flex items-center gap-2 py-2">
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <span className="text-sm font-medium">▼ Wants</span>
                </Button>
                <div className="ml-auto font-mono text-sm">
                  ${wantsCategories.reduce((sum, cat) => sum + cat.budgeted, 0).toFixed(2)}
                </div>
              </div>
              {wantsCategories.map((category) => (
                <div key={category.id} className="ml-4">
                  <CategoryRow category={category} />
                </div>
              ))}
            </div>

            {/* Savings */}
            <div className="ml-4">
              <div className="flex items-center gap-2 py-2">
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <span className="text-sm font-medium">▼ Savings</span>
                </Button>
                <div className="ml-auto font-mono text-sm">
                  ${savingsCategories.reduce((sum, cat) => sum + cat.budgeted, 0).toFixed(2)}
                </div>
              </div>
              {savingsCategories.map((category) => (
                <div key={category.id} className="ml-4">
                  <CategoryRow category={category} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Budget Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button className="bg-primary text-primary-foreground">Assign All Available</Button>
            <Button variant="outline">Copy Last Month</Button>
            <Button variant="outline">Reset All Categories</Button>
            <Button variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
              Auto-Budget
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
