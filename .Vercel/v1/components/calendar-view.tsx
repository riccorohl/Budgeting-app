"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { useState } from "react"

interface CalendarEvent {
  id: string
  title: string
  amount: number
  currency: "USD" | "MXN"
  type: "income" | "expense" | "recurring" | "scheduled"
  category: string
  date: Date
  status: "upcoming" | "due" | "overdue" | "completed"
  recurring?: {
    frequency: "weekly" | "monthly" | "yearly"
    nextDate: Date
  }
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8)) // September 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  // Mock calendar events
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Rent Payment",
      amount: 4500,
      currency: "MXN",
      type: "recurring",
      category: "Housing",
      date: new Date(2025, 8, 1),
      status: "completed",
      recurring: { frequency: "monthly", nextDate: new Date(2025, 9, 1) },
    },
    {
      id: "2",
      title: "Salary Deposit",
      amount: 1200,
      currency: "USD",
      type: "income",
      category: "Work",
      date: new Date(2025, 8, 15),
      status: "completed",
    },
    {
      id: "3",
      title: "Netflix Subscription",
      amount: 15.99,
      currency: "USD",
      type: "recurring",
      category: "Entertainment",
      date: new Date(2025, 8, 20),
      status: "completed",
      recurring: { frequency: "monthly", nextDate: new Date(2025, 9, 20) },
    },
    {
      id: "4",
      title: "Electricity Bill",
      amount: 2000,
      currency: "MXN",
      type: "recurring",
      category: "Utilities",
      date: new Date(2025, 8, 25),
      status: "due",
    },
    {
      id: "5",
      title: "Grocery Budget",
      amount: 4000,
      currency: "MXN",
      type: "scheduled",
      category: "Food",
      date: new Date(2025, 8, 30),
      status: "upcoming",
    },
    // October events
    {
      id: "6",
      title: "Rent Payment",
      amount: 4500,
      currency: "MXN",
      type: "recurring",
      category: "Housing",
      date: new Date(2025, 9, 1),
      status: "upcoming",
      recurring: { frequency: "monthly", nextDate: new Date(2025, 10, 1) },
    },
    {
      id: "7",
      title: "Car Insurance",
      amount: 150,
      currency: "USD",
      type: "scheduled",
      category: "Insurance",
      date: new Date(2025, 9, 5),
      status: "upcoming",
    },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-border/50"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 border border-border/50 p-1 cursor-pointer hover:bg-muted/50 ${
            isToday ? "bg-primary/10 border-primary" : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate ${
                  event.type === "income"
                    ? "bg-green-500/20 text-green-700 dark:text-green-300"
                    : event.status === "overdue"
                      ? "bg-red-500/20 text-red-700 dark:text-red-300"
                      : event.status === "due"
                        ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300"
                        : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                }`}
              >
                {event.currency === "USD" ? "$" : "MX$"}
                {event.amount.toLocaleString()}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "due":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h2>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Description</Label>
                <Input id="title" placeholder="e.g., Rent Payment" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="MXN">MXN (MX$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="food">Food & Dining</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div>
                <Label htmlFor="recurring">Recurring</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="One-time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">One-time</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Optional notes..." />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Schedule Transaction</Button>
                <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Financial Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="p-2 text-center text-sm font-medium text-muted-foreground border border-border/50"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0">{renderCalendarGrid()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events
                .filter((event) => event.status === "upcoming" || event.status === "due")
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    {getStatusIcon(event.status)}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.date.toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold text-sm ${event.type === "income" ? "text-green-500" : "text-red-500"}`}
                      >
                        {event.type === "income" ? "+" : "-"}
                        {event.currency === "USD" ? "$" : "MX$"}
                        {event.amount.toLocaleString()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Monthly Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expected Income</span>
                  <span className="font-bold text-green-500">$1,210.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Scheduled Expenses</span>
                  <span className="font-bold text-red-500">$1,003.58</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium">Net Projected</span>
                  <span className="font-bold text-green-500">$206.42</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm font-medium mb-2">Recurring Payments</div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Rent (Monthly)</span>
                    <span>1st of month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Netflix (Monthly)</span>
                    <span>20th of month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Electricity (Monthly)</span>
                    <span>25th of month</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>
              Events for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getEventsForDate(selectedDate).length === 0 ? (
                <p className="text-muted-foreground">No events scheduled for this date.</p>
              ) : (
                getEventsForDate(selectedDate).map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg border">
                    {getStatusIcon(event.status)}
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.category}</div>
                      {event.recurring && (
                        <Badge variant="outline" className="text-xs mt-1">
                          Recurring {event.recurring.frequency}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${event.type === "income" ? "text-green-500" : "text-red-500"}`}>
                        {event.type === "income" ? "+" : "-"}
                        {event.currency === "USD" ? "$" : "MX$"}
                        {event.amount.toLocaleString()}
                      </div>
                      <Badge
                        variant={
                          event.status === "completed"
                            ? "default"
                            : event.status === "due"
                              ? "secondary"
                              : event.status === "overdue"
                                ? "destructive"
                                : "outline"
                        }
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
