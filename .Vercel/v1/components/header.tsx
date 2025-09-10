import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, ChevronLeft, ChevronRight, Plus } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold text-card-foreground">Sep 2025</h2>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Budget View
            </Badge>
            <Badge variant="outline">Settings View</Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            Quick Add
          </Button>
          <Button variant="outline" size="sm">
            Feature Guide
          </Button>
          <Button variant="outline" size="sm">
            Budget Settings
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
