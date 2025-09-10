import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CalendarView } from "@/components/calendar-view"

export default function CalendarPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <CalendarView />
        </main>
      </div>
    </div>
  )
}
