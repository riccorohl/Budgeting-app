import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SavingsGoals } from "@/components/savings-goals"

export default function SavingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <SavingsGoals />
        </main>
      </div>
    </div>
  )
}
