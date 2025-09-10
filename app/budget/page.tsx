import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { BudgetManagement } from "@/components/budget-management"

export default function BudgetPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <BudgetManagement />
        </main>
      </div>
    </div>
  )
}