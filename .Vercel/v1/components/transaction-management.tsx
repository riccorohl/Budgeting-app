"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Building,
} from "lucide-react"
import { useState } from "react"

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  account: string
  amount: number
  currency: "USD" | "MXN"
  type: "income" | "expense" | "transfer"
  status: "cleared" | "pending" | "reconciled"
  notes?: string
}

export function TransactionManagement() {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterAccount, setFilterAccount] = useState("all")

  const transactions: Transaction[] = [
    {
      id: "1",
      date: "2025-09-10",
      description: "Salary Deposit",
      category: "Hourly Work",
      account: "US Checking",
      amount: 1200.0,
      currency: "USD",
      type: "income",
      status: "cleared",
      notes: "Monthly salary payment",
    },
    {
      id: "2",
      date: "2025-09-09",
      description: "Grocery Store - Soriana",
      category: "Groceries",
      account: "MX Checking",
      amount: -850.0,
      currency: "MXN",
      type: "expense",
      status: "cleared",
      notes: "Weekly grocery shopping",
    },
    {
      id: "3",
      date: "2025-09-08",
      description: "Netflix Subscription",
      category: "Memberships",
      account: "US Checking",
      amount: -15.99,
      currency: "USD",
      type: "expense",
      status: "cleared",
    },
    {
      id: "4",
      date: "2025-09-07",
      description: "Rent Payment",
      category: "Rent",
      account: "MX Checking",
      amount: -4500.0,
      currency: "MXN",
      type: "expense",
      status: "cleared",
      notes: "Monthly rent payment",
    },
    {
      id: "5",
      date: "2025-09-06",
      description: "Freelance Project",
      category: "Other Income",
      account: "US Checking",
      amount: 250.0,
      currency: "USD",
      type: "income",
      status: "pending",
      notes: "Web development project",
    },
    {
      id: "6",
      date: "2025-09-05",
      description: "Coffee Shop",
      category: "Shopping and Leisure",
      account: "MX Checking",
      amount: -120.0,
      currency: "MXN",
      type: "expense",
      status: "cleared",
    },
    {
      id: "7",
      date: "2025-09-04",
      description: "Electric Bill - CFE",
      category: "Power",
      account: "MX Checking",
      amount: -1800.0,
      currency: "MXN",
      type: "expense",
      status: "cleared",
      notes: "Monthly electricity bill",
    },
    {
      id: "8",
      date: "2025-09-03",
      description: "Amazon Purchase",
      category: "Projects",
      account: "US Checking",
      amount: -89.99,
      currency: "USD",
      type: "expense",
      status: "cleared",
    },
  ]

  const categories = [
    "Hourly Work",
    "Other Income",
    "Rent",
    "Groceries",
    "Power",
    "Business Expenses",
    "Health and Self-Care",
    "Shopping and Leisure",
    "Projects",
    "Memberships",
    "Personal Savings",
  ]

  const accounts = ["US Checking", "MX Checking", "Savings Account", "Credit Card"]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory
    const matchesAccount = filterAccount === "all" || transaction.account === filterAccount
    return matchesSearch && matchesCategory && matchesAccount
  })

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + (t.currency === "USD" ? t.amount : t.amount / 18.45), 0)

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.currency === "USD" ? t.amount : t.amount / 18.45), 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "cleared":
        return (
          <Badge variant="secondary" className="bg-green-500/10 text-green-500">
            Cleared
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
            Pending
          </Badge>
        )
      case "reconciled":
        return (
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">
            Reconciled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAmountDisplay = (transaction: Transaction) => {
    const isIncome = transaction.type === "income"
    const amount = Math.abs(transaction.amount)
    const color = isIncome ? "text-green-500" : "text-red-500"
    const sign = isIncome ? "+" : "-"
    const currencySymbol = transaction.currency === "USD" ? "$" : "MX$"

    return (
      <div className="text-right">
        <div className={`font-mono font-medium ${color}`}>
          {sign}
          {currencySymbol}
          {amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
        {transaction.currency === "MXN" && (
          <div className="text-xs text-muted-foreground">≈ ${(amount / 18.45).toFixed(2)} USD</div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
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
              <TrendingDown className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm text-muted-foreground">Total Expenses</div>
                <div className="text-xl font-bold text-red-500">${totalExpenses.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Net Flow</div>
                <div
                  className={`text-xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  ${(totalIncome - totalExpenses).toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">Transactions</div>
                <div className="text-xl font-bold">{transactions.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transactions</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Transaction</DialogTitle>
                    <DialogDescription>Enter the details for your new transaction.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transaction-date">Date</Label>
                        <Input
                          id="transaction-date"
                          type="date"
                          defaultValue={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="transaction-amount">Amount</Label>
                        <Input id="transaction-amount" type="number" step="0.01" placeholder="0.00" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="transaction-description">Description</Label>
                      <Input id="transaction-description" placeholder="e.g., Grocery Store" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transaction-category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="transaction-account">Account</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map((account) => (
                              <SelectItem key={account} value={account}>
                                {account}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transaction-currency">Currency</Label>
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
                      <div>
                        <Label htmlFor="transaction-type">Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                            <SelectItem value="transfer">Transfer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="transaction-notes">Notes (Optional)</Label>
                      <Textarea id="transaction-notes" placeholder="Additional notes..." />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsAddTransactionOpen(false)}>Add Transaction</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterAccount} onValueChange={setFilterAccount}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {accounts.map((account) => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        {transaction.notes && <div className="text-xs text-muted-foreground">{transaction.notes}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.category}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{transaction.account}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>{getAmountDisplay(transaction)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedTransaction(transaction)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No transactions found matching your criteria.</div>
          )}
        </CardContent>
      </Card>

      {/* Bank Import Section */}
      <Card>
        <CardHeader>
          <CardTitle>Bank Account Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">US Bank Accounts</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Chase Checking</div>
                      <div className="text-sm text-muted-foreground">Connected</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Sync Now
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">US Bank Savings</div>
                      <div className="text-sm text-muted-foreground">Connected</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Sync Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Mexican Bank Accounts</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div>
                      <div className="font-medium">Banorte Checking</div>
                      <div className="text-sm text-muted-foreground">Manual Entry Only</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Not Available
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">
                  Mexican bank integration coming soon. For now, please add transactions manually.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
