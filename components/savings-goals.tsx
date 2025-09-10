"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Target, Trophy, Calendar, DollarSign, TrendingUp, Camera, Share2, Edit } from "lucide-react"
import { useState } from "react"
import { useSavings } from "@/hooks/use-savings"
import { useCurrency } from "@/hooks/use-currency"

interface SavingsGoal {
  id: string
  name: string
  description: string
  targetAmount: number
  currentAmount: number
  currency: "USD" | "MXN"
  deadline: string
  category: "emergency" | "vacation" | "purchase" | "investment" | "other"
  imageUrl?: string
  priority: "high" | "medium" | "low"
  status: "active" | "completed" | "paused"
  milestones: Milestone[]
  contributions: Contribution[]
}

interface Milestone {
  id: string
  percentage: number
  amount: number
  achieved: boolean
  achievedDate?: string
  reward: string
}

interface Contribution {
  id: string
  amount: number
  currency: "USD" | "MXN"
  date: string
  source: "manual" | "challenge" | "automatic"
  description: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedDate: string
  category: "milestone" | "streak" | "challenge" | "special"
}

export function SavingsGoals() {
  const { savingsGoals, getTotalSavingsSummary, getSavingsProgress } = useSavings()
  const { formatCurrency } = useCurrency()
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null)
  const [activeTab, setActiveTab] = useState("goals")

  const summary = getTotalSavingsSummary()

  // Transform our savings data to match the component interface
  const transformedGoals: SavingsGoal[] = savingsGoals.map(goal => ({
    id: goal.id,
    name: goal.name,
    description: goal.description || `Save ${formatCurrency(goal.targetAmount, 'USD')} for ${goal.name}`,
    targetAmount: goal.targetAmount,
    currentAmount: goal.currentAmount,
    currency: goal.currency,
    deadline: goal.targetDate.toISOString().split('T')[0],
    category: goal.category as any,
    imageUrl: goal.imageUrl,
    priority: goal.priority,
    status: goal.status,
    milestones: [
      {
        id: `${goal.id}-25`,
        percentage: 25,
        amount: goal.targetAmount * 0.25,
        achieved: goal.currentAmount >= goal.targetAmount * 0.25,
        achievedDate: goal.currentAmount >= goal.targetAmount * 0.25 ? new Date().toISOString().split('T')[0] : undefined,
        reward: "First Quarter Badge",
      },
      {
        id: `${goal.id}-50`,
        percentage: 50,
        amount: goal.targetAmount * 0.5,
        achieved: goal.currentAmount >= goal.targetAmount * 0.5,
        achievedDate: goal.currentAmount >= goal.targetAmount * 0.5 ? new Date().toISOString().split('T')[0] : undefined,
        reward: "Halfway Hero Badge",
      },
      {
        id: `${goal.id}-75`,
        percentage: 75,
        amount: goal.targetAmount * 0.75,
        achieved: goal.currentAmount >= goal.targetAmount * 0.75,
        achievedDate: goal.currentAmount >= goal.targetAmount * 0.75 ? new Date().toISOString().split('T')[0] : undefined,
        reward: "Three Quarter Champion",
      },
      {
        id: `${goal.id}-100`,
        percentage: 100,
        amount: goal.targetAmount,
        achieved: goal.currentAmount >= goal.targetAmount,
        achievedDate: goal.currentAmount >= goal.targetAmount ? new Date().toISOString().split('T')[0] : undefined,
        reward: "Goal Master",
      },
    ],
    contributions: [] // We'll add this later when we have contribution tracking
  }))

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Saver",
      description: "Created your first savings goal",
      icon: "🎯",
      unlockedDate: "2025-01-01",
      category: "milestone",
    },
    {
      id: "2",
      title: "Quarter Master",
      description: "Reached 25% of any goal",
      icon: "🏆",
      unlockedDate: "2025-01-15",
      category: "milestone",
    },
    {
      id: "3",
      title: "Halfway Hero",
      description: "Reached 50% of any goal",
      icon: "⭐",
      unlockedDate: "2025-02-01",
      category: "milestone",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{summary.totalGoals}</div>
            <p className="text-xs text-muted-foreground">
              {summary.completedGoals} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Target</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{formatCurrency(summary.totalTargetAmount, 'USD')}</div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{formatCurrency(summary.totalCurrentAmount, 'USD')}</div>
            <p className="text-xs text-muted-foreground">
              {summary.totalProgress.toFixed(1)}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">Unlocked badges</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="goals">Savings Goals</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Savings Goals</h2>
            <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Savings Goal</DialogTitle>
                  <DialogDescription>
                    Set up a new savings goal to track your progress.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" placeholder="Goal name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" className="col-span-3" placeholder="Goal description" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="targetAmount" className="text-right">
                      Target
                    </Label>
                    <Input id="targetAmount" type="number" className="col-span-3" placeholder="0.00" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency Fund</SelectItem>
                        <SelectItem value="vacation">Vacation</SelectItem>
                        <SelectItem value="purchase">Purchase</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deadline" className="text-right">
                      Deadline
                    </Label>
                    <Input id="deadline" type="date" className="col-span-3" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddGoalOpen(false)}>
                    Create Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformedGoals.map((goal) => {
              const progress = getSavingsProgress(goal.id)
              const percentage = (goal.currentAmount / goal.targetAmount) * 100

              return (
                <Card key={goal.id} className="overflow-hidden">
                  {goal.imageUrl && (
                    <div className="h-32 bg-muted relative">
                      <img
                        src={goal.imageUrl}
                        alt={goal.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={goal.priority === 'high' ? 'destructive' : 'secondary'}>
                          {goal.priority}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{goal.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedGoal(goal)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(goal.currentAmount, goal.currency)}</span>
                        <span>{formatCurrency(goal.targetAmount, goal.currency)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Remaining</span>
                        <span className="font-medium">
                          {formatCurrency(goal.targetAmount - goal.currentAmount, goal.currency)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Deadline</span>
                        <span className="font-medium">
                          {new Date(goal.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Days Left</span>
                        <span className="font-medium">{progress.daysRemaining}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        Add Money
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Unlocked: {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <h2 className="text-2xl font-bold">Savings Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Weekly Savings Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Save $50 this week to earn the Weekly Warrior badge!
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>0 / $50</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <Button className="w-full mt-4" size="sm">
                  Join Challenge
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Monthly Milestone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Reach 50% of any goal this month for a special reward!
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Goals at 50%</span>
                    <span>0 / 1</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <Button className="w-full mt-4" size="sm">
                  Track Progress
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}