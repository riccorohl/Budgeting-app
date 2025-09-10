import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  CreditCard,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">$1,267.49</div>
            <p className="text-xs text-muted-foreground">Expected: $1,210.00</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                +$57.49
              </Badge>
              <span className="text-xs text-green-500">4.7% over</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            <PiggyBank className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">$1,003.58</div>
            <p className="text-xs text-muted-foreground">Allocated budget</p>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="text-xs">
                83% of income
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
            <div className="text-2xl font-bold text-primary">$263.91</div>
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
            <div className="text-2xl font-bold text-green-500">$1,078.16</div>
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
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Hourly Work</span>
                <div className="text-right">
                  <div className="font-bold text-green-500">$1,257.49</div>
                  <div className="text-xs text-muted-foreground">Expected: $1,200.00</div>
                </div>
              </div>
              <Progress value={104.8} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Other Income</span>
                <div className="text-right">
                  <div className="font-bold text-green-500">$10.00</div>
                  <div className="text-xs text-muted-foreground">Expected: $10.00</div>
                </div>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between font-bold">
                <span>Total Income</span>
                <span className="text-green-500">$1,267.49</span>
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
                    <div className="font-bold">$643.58</div>
                    <div className="text-xs text-muted-foreground">Budgeted: $643.58</div>
                  </div>
                </div>
                <Progress value={100} className="h-2" />
                <div className="text-xs text-green-500 mt-1">$0.00 remaining</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Wants</span>
                  <div className="text-right">
                    <div className="font-bold text-red-500">$120.67</div>
                    <div className="text-xs text-muted-foreground">Budgeted: $310.00</div>
                  </div>
                </div>
                <Progress value={38.9} className="h-2" />
                <div className="text-xs text-green-500 mt-1">$189.33 remaining</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Savings</span>
                  <div className="text-right">
                    <div className="font-bold text-blue-500">$50.00</div>
                    <div className="text-xs text-muted-foreground">Budgeted: $50.00</div>
                  </div>
                </div>
                <Progress value={100} className="h-2" />
                <div className="text-xs text-green-500 mt-1">Goal met</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
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
                  <div className="font-bold text-green-500">$2,495.29</div>
                  <div className="text-xs text-muted-foreground">USD</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">MX Checking</div>
                  <div className="text-xs text-muted-foreground">Banorte</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">$543.21</div>
                  <div className="text-xs text-muted-foreground">≈ MX$10,025.00</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Savings Account</div>
                  <div className="text-xs text-muted-foreground">US Bank</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-500">$1,250.00</div>
                  <div className="text-xs text-muted-foreground">USD</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between font-bold">
                <span>Net Worth</span>
                <span className="text-green-500">$4,288.50</span>
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
            {[
              { name: "Rent", budgeted: 4500, spent: 4500, currency: "MXN", available: 241.53 },
              { name: "Groceries", budgeted: 4000, spent: 4000, currency: "MXN", available: 214.7 },
              { name: "Power", budgeted: 2000, spent: 2000, currency: "MXN", available: 107.35 },
              { name: "Business Expenses", budgeted: 20, spent: 20, currency: "USD", available: 20.0 },
              { name: "Health and Self-Care", budgeted: 30, spent: 30, currency: "USD", available: 30.0 },
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <div className="text-right">
                    <div className="font-bold">
                      {category.currency === "USD" ? "$" : "MX$"}
                      {category.spent.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-500">${category.available.toFixed(2)} available</div>
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
            {[
              { name: "Shopping and Leisure", budgeted: 100, spent: 113.11, available: -13.11, overbudget: true },
              { name: "Projects", budgeted: 110, spent: 27.97, available: 82.03, overbudget: false },
              { name: "Memberships", budgeted: 100, spent: 48.25, available: 51.75, overbudget: false },
              { name: "Personal Savings", budgeted: 50, spent: 50, available: 0, overbudget: false },
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category.name}</span>
                  <div className="text-right">
                    <div className={`font-bold ${category.overbudget ? "text-red-500" : ""}`}>
                      ${category.spent.toFixed(2)}
                    </div>
                    <div className={`text-xs ${category.overbudget ? "text-red-500" : "text-green-500"}`}>
                      {category.overbudget ? "-" : ""}${Math.abs(category.available).toFixed(2)}
                      {category.overbudget ? " over budget" : " available"}
                    </div>
                  </div>
                </div>
                <Progress value={Math.min((category.spent / category.budgeted) * 100, 100)} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              Active Savings Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Emergency Fund</span>
                  <div className="text-right">
                    <div className="font-bold text-purple-500">$2,450</div>
                    <div className="text-xs text-muted-foreground">Goal: $5,000</div>
                  </div>
                </div>
                <Progress value={49} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">49% complete • $2,550 remaining</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Vacation Fund</span>
                  <div className="text-right">
                    <div className="font-bold text-purple-500">$750</div>
                    <div className="text-xs text-muted-foreground">Goal: $2,000</div>
                  </div>
                </div>
                <Progress value={37.5} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">38% complete • $1,250 remaining</div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">New Laptop</span>
                  <div className="text-right">
                    <div className="font-bold text-purple-500">$1,200</div>
                    <div className="text-xs text-muted-foreground">Goal: $1,500</div>
                  </div>
                </div>
                <Progress value={80} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">80% complete • $300 remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div>
                    <div className="font-medium text-sm">Grocery Store</div>
                    <div className="text-xs text-muted-foreground">Food & Dining</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-500">-MX$850.00</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div>
                    <div className="font-medium text-sm">Netflix Subscription</div>
                    <div className="text-xs text-muted-foreground">Entertainment</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-500">-$15.99</div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <div className="font-medium text-sm">Salary Deposit</div>
                    <div className="text-xs text-muted-foreground">Income</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-500">+$1,200.00</div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div>
                    <div className="font-medium text-sm">Gas Station</div>
                    <div className="text-xs text-muted-foreground">Transportation</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-500">-MX$650.00</div>
                  <div className="text-xs text-muted-foreground">4 days ago</div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Transactions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
