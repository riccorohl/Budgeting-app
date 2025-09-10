import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TransactionManagement } from "@/components/transaction-management"

export default function TransactionsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <TransactionManagement />
        </main>
      </div>
    </div>
  )
}