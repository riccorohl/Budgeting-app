"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, AlertCircle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react"
import { useState, useMemo } from "react"
import { useTransactions } from "@/hooks/use-transactions"
import { useCurrency } from "@/hooks/use-currency"

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
  const { transactions } = useTransactions()
  const { formatCurrency } = useCurrency()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  // Transform transactions into calendar events
  const events: CalendarEvent[] = useMemo(() => {
    return transactions.map(transaction => ({
      id: transaction.id,
      title: transaction.description,
      amount: transaction.amount,
      currency: transaction.currency,
      type: transaction.type === 'income' ? 'income' : 'expense',
      category: transaction.category,
      date: transaction.date,
      status: transaction.date < new Date() ? 'completed' : 'upcoming',
    }))
  }, [transactions])

  // Add some recurring events for demonstration
  const recurringEvents: CalendarEvent[] = [
    {
      id: "rent-1",
      title: "Rent Payment",
      amount: 4500,
      currency: "MXN",
      type: "recurring",
      category: "Housing",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      status: "upcoming",
      recurring: { frequency: "monthly", nextDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1) },
    },
    {
      id: "salary-1",
      title: "Salary Deposit",
      amount: 1200,
      currency: "USD",
      type: "income",
      category: "Work",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      status: "upcoming",
    },
    {
      id: "netflix-1",
      title: "Netflix Subscription",
      amount: 15.99,
      currency: "USD",
      type: "recurring",
      category: "Entertainment",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      status: "upcoming",
      recurring: { frequency: "monthly", nextDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 20) },
    },
  ]

  const allEvents = [...events, ...recurringEvents]

  // Get events for the current month
  const currentMonthEvents = allEvents.filter(event => 
    event.date.getMonth() === currentDate.getMonth() && 
    event.date.getFullYear() === currentDate.getFullYear()
  )

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return allEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    )
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const currentDay = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay))
      currentDay.setDate(currentDay.getDate() + 1)
    }
    
    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'due': return 'bg-yellow-500'
      case 'overdue': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'income': return <TrendingUp className="h-3 w-3 text-green-500" />
      case 'expense': return <TrendingDown className="h-3 w-3 text-red-500" />
      case 'recurring': return <Clock className="h-3 w-3 text-blue-500" />
      default: return <Calendar className="h-3 w-3 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Financial Calendar</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Financial Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" className="col-span-3" placeholder="Event title" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Amount</Label>
                <Input id="amount" type="number" className="col-span-3" placeholder="0.00" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="recurring">Recurring</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddEventOpen(false)}>
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day)
                  const isCurrentMonthDay = isCurrentMonth(day)
                  const isTodayDay = isToday(day)
                  
                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border rounded-lg cursor-pointer hover:bg-muted/50 ${
                        !isCurrentMonthDay ? 'text-muted-foreground bg-muted/20' : ''
                      } ${isTodayDay ? 'bg-primary/10 border-primary' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate ${getStatusColor(event.status)} text-white`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentMonthEvents
                .filter(event => event.status === 'upcoming')
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(event.type)}
                      <div>
                        <div className="font-medium text-sm">{event.title}</div>
                        <div className="text-xs text-muted-foreground">{event.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">
                        {formatCurrency(event.amount, event.currency)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {event.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recurring Payments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recurringEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {event.recurring?.frequency} • {event.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">
                      {formatCurrency(event.amount, event.currency)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Next: {event.recurring?.nextDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>
              Events for {selectedDate.toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(event.type)}
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {formatCurrency(event.amount, event.currency)}
                      </div>
                      <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No events scheduled for this date.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}