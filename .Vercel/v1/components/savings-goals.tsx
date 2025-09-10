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
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null)
  const [activeTab, setActiveTab] = useState("goals")

  const savingsGoals: SavingsGoal[] = [
    {
      id: "1",
      name: "Emergency Fund",
      description: "Build a 6-month emergency fund for financial security",
      targetAmount: 5000,
      currentAmount: 2450,
      currency: "USD",
      deadline: "2025-12-31",
      category: "emergency",
      imageUrl: "/emergency-fund-safety-net.jpg",
      priority: "high",
      status: "active",
      milestones: [
        {
          id: "1",
          percentage: 25,
          amount: 1250,
          achieved: true,
          achievedDate: "2025-07-15",
          reward: "First Quarter Badge",
        },
        { id: "2", percentage: 50, amount: 2500, achieved: false, reward: "Halfway Hero Badge" },
        { id: "3", percentage: 75, amount: 3750, achieved: false, reward: "Three Quarter Champion" },
        { id: "4", percentage: 100, amount: 5000, achieved: false, reward: "Emergency Fund Master" },
      ],
      contributions: [
        {
          id: "1",
          amount: 500,
          currency: "USD",
          date: "2025-09-01",
          source: "manual",
          description: "Monthly contribution",
        },
        {
          id: "2",
          amount: 200,
          currency: "USD",
          date: "2025-08-15",
          source: "challenge",
          description: "Coffee challenge savings",
        },
      ],
    },
    {
      id: "2",
      name: "Dream Vacation to Japan",
      description: "Two-week trip to Japan including flights, hotels, and experiences",
      targetAmount: 4500,
      currentAmount: 1200,
      currency: "USD",
      deadline: "2026-03-15",
      category: "vacation",
      imageUrl: "/japan-travel-cherry-blossoms-tokyo.jpg",
      priority: "medium",
      status: "active",
      milestones: [
        {
          id: "1",
          percentage: 25,
          amount: 1125,
          achieved: true,
          achievedDate: "2025-08-20",
          reward: "Travel Dreamer Badge",
        },
        { id: "2", percentage: 50, amount: 2250, achieved: false, reward: "Halfway to Japan Badge" },
        { id: "3", percentage: 75, amount: 3375, achieved: false, reward: "Almost There Badge" },
        { id: "4", percentage: 100, amount: 4500, achieved: false, reward: "Japan Adventure Master" },
      ],
      contributions: [
        {
          id: "1",
          amount: 300,
          currency: "USD",
          date: "2025-09-01",
          source: "manual",
          description: "Monthly vacation fund",
        },
        {
          id: "2",
          amount: 150,
          currency: "USD",
          date: "2025-08-25",
          source: "challenge",
          description: "Dining out challenge",
        },
      ],
    },
    {
      id: "3",
      name: "New MacBook Pro",
      description: "Latest MacBook Pro for work and creative projects",
      targetAmount: 2500,
      currentAmount: 1800,
      currency: "USD",
      deadline: "2025-11-30",
      category: "purchase",
      imageUrl: "/macbook-pro-laptop-technology.jpg",
      priority: "high",
      status: "active",
      milestones: [
        {
          id: "1",
          percentage: 25,
          amount: 625,
          achieved: true,
          achievedDate: "2025-06-10",
          reward: "Tech Saver Badge",
        },
        {
          id: "2",
          percentage: 50,
          amount: 1250,
          achieved: true,
          achievedDate: "2025-07-25",
          reward: "Halfway to Tech Badge",
        },
        { id: "3", percentage: 75, amount: 1875, achieved: false, reward: "Almost Ready Badge" },
        { id: "4", percentage: 100, amount: 2500, achieved: false, reward: "Tech Master Badge" },
      ],
      contributions: [
        {
          id: "1",
          amount: 400,
          currency: "USD",
          date: "2025-09-01",
          source: "manual",
          description: "Freelance project earnings",
        },
        {
          id: "2",
          amount: 100,
          currency: "USD",
          date: "2025-08-20",
          source: "automatic",
          description: "Round-up savings",
        },
      ],
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Goal Created",
      description: "Created your first savings goal",
      icon: "🎯",
      unlockedDate: "2025-06-01",
      category: "milestone",
    },
    {
      id: "2",
      title: "Quarter Master",
      description: "Reached 25% on any savings goal",
      icon: "🏆",
      unlockedDate: "2025-06-10",
      category: "milestone",
    },
    {
      id: "3",
      title: "Consistency Champion",
      description: "Made contributions for 7 days straight",
      icon: "⚡",
      unlockedDate: "2025-07-15",
      category: "streak",
    },
    {
      id: "4",
      title: "Challenge Conqueror",
      description: "Completed your first spending challenge",
      icon: "💪",
      unlockedDate: "2025-08-15",
      category: "challenge",
    },
  ]

  const challenges = [
    {
      id: "1",
      title: "Coffee Shop Challenge",
      description: "Skip coffee shop visits for a week and save the money",
      potentialSavings: 35,
      duration: "7 days",
      difficulty: "Easy",
      status: "active",
    },
    {
      id: "2",
      title: "Dining Out Freeze",
      description: "Cook at home instead of dining out for 2 weeks",
      potentialSavings: 150,
      duration: "14 days",
      difficulty: "Medium",
      status: "available",
    },
    {
      id: "3",
      title: "Subscription Audit",
      description: "Cancel unused subscriptions and redirect savings",
      potentialSavings: 50,
      duration: "1 day",
      difficulty: "Easy",
      status: "available",
    },
  ]

  const getProgressPercentage = (goal: SavingsGoal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
  }

  const getDaysRemaining = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const GoalCard = ({ goal }: { goal: SavingsGoal }) => {
    const progress = getProgressPercentage(goal)
    const daysRemaining = getDaysRemaining(goal.deadline)
    const nextMilestone = goal.milestones.find((m) => !m.achieved)

    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img src={goal.imageUrl || "/placeholder.svg"} alt={goal.name} className="w-full h-48 object-cover" />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className={getPriorityColor(goal.priority)}>
              {goal.priority.toUpperCase()}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="bg-black/50 text-white">
              {goal.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">{goal.name}</h3>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{progress.toFixed(1)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="font-bold text-green-500">${goal.currentAmount.toLocaleString()}</span>
                <span className="text-muted-foreground">of ${goal.targetAmount.toLocaleString()}</span>
              </div>
            </div>

            {nextMilestone && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Next Milestone</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ${(nextMilestone.amount - goal.currentAmount).toLocaleString()} to unlock "{nextMilestone.reward}"
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{daysRemaining > 0 ? `${daysRemaining} days left` : "Deadline passed"}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm text-muted-foreground">Active Goals</div>
                <div className="text-xl font-bold">{savingsGoals.filter((g) => g.status === "active").length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm text-muted-foreground">Total Saved</div>
                <div className="text-xl font-bold text-green-500">
                  ${savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm text-muted-foreground">Target Amount</div>
                <div className="text-xl font-bold">
                  ${savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-sm text-muted-foreground">Achievements</div>
                <div className="text-xl font-bold">{achievements.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">Savings Goals</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Savings Goals</h2>
            <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Savings Goal</DialogTitle>
                  <DialogDescription>Set up a new goal to start saving towards your dreams.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input id="goal-name" placeholder="e.g., Dream Vacation" />
                  </div>

                  <div>
                    <Label htmlFor="goal-description">Description</Label>
                    <Textarea id="goal-description" placeholder="Describe your goal..." />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="target-amount">Target Amount</Label>
                      <Input id="target-amount" type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label htmlFor="goal-currency">Currency</Label>
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal-deadline">Target Date</Label>
                      <Input id="goal-deadline" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="goal-priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="goal-category">Category</Label>
                    <Select>
                      <SelectTrigger>
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

                  <div>
                    <Label htmlFor="goal-image">Goal Image</Label>
                    <div className="flex gap-2">
                      <Input id="goal-image" placeholder="Upload or paste image URL" />
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddGoalOpen(false)}>Create Goal</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {savingsGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Savings Challenges</h2>
            <p className="text-muted-foreground mb-6">
              Take on challenges to boost your savings and build better spending habits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge variant={challenge.status === "active" ? "default" : "outline"}>{challenge.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Potential Savings</span>
                      <span className="font-bold text-green-500">${challenge.potentialSavings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Duration</span>
                      <span className="text-sm">{challenge.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Difficulty</span>
                      <Badge variant="outline" className="text-xs">
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant={challenge.status === "active" ? "outline" : "default"}
                    disabled={challenge.status === "active"}
                  >
                    {challenge.status === "active" ? "In Progress" : "Start Challenge"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
            <p className="text-muted-foreground mb-6">Celebrate your savings milestones and accomplishments.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-bold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {new Date(achievement.unlockedDate).toLocaleDateString()}
                  </Badge>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Savings Insights</h2>
            <p className="text-muted-foreground mb-6">
              Track your progress and discover patterns in your saving habits.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Savings Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-500 mb-2">22.5%</div>
                <p className="text-sm text-muted-foreground">Above your target of 20%</p>
                <Progress value={22.5} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Completion Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">MacBook Pro</span>
                    <span className="text-sm font-medium">2 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Emergency Fund</span>
                    <span className="text-sm font-medium">8 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Japan Vacation</span>
                    <span className="text-sm font-medium">12 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🔥</div>
                  <div>
                    <div className="text-2xl font-bold">15 days</div>
                    <p className="text-sm text-muted-foreground">Current streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Challenge Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500 mb-2">$385</div>
                <p className="text-sm text-muted-foreground">Saved through challenges this month</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Coffee Challenge</span>
                    <span className="text-green-500">$105</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Dining Out Freeze</span>
                    <span className="text-green-500">$280</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
