"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard,
  PiggyBank,
  CreditCard,
  Target,
  Calendar,
  Settings,
  DollarSign,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/", current: pathname === "/" },
    { name: "Budget", icon: PiggyBank, href: "/budget", current: pathname === "/budget" },
    { name: "Transactions", icon: CreditCard, href: "/transactions", current: pathname === "/transactions" },
    { name: "Savings Goals", icon: Target, href: "/savings", current: pathname === "/savings" },
    { name: "Calendar", icon: Calendar, href: "/calendar", current: pathname === "/calendar" },
    { name: "Settings", icon: Settings, href: "/settings", current: pathname === "/settings" },
  ]

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <DollarSign className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-sidebar-foreground">BudgetMX</h1>
        </Link>
      </div>

      <div className="px-4 pb-4">
        <div className="text-xs font-medium text-sidebar-foreground/70 mb-2 uppercase tracking-wide">Quick Actions</div>
        <div className="space-y-2">
          <Button className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start gap-1 text-xs bg-transparent">
              <ArrowDownRight className="h-3 w-3 text-green-500" />
              Income
            </Button>
            <Button variant="outline" size="sm" className="justify-start gap-1 text-xs bg-transparent">
              <ArrowUpRight className="h-3 w-3 text-red-500" />
              Expense
            </Button>
          </div>
        </div>
      </div>

      <Separator className="mx-4" />

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={item.current ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                item.current
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <Card className="p-4 bg-sidebar-accent">
          <div className="text-sm text-sidebar-accent-foreground">
            <div className="font-medium">Exchange Rate</div>
            <div className="text-xs text-muted-foreground mt-1">USD/MXN</div>
            <div className="text-lg font-bold text-primary">18.45</div>
            <div className="text-xs text-green-500">+0.12 (0.65%)</div>
          </div>
        </Card>
      </div>
    </div>
  )
}
