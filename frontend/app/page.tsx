import { Navigation } from "@/components/navigation"
import { SearchSection } from "@/components/search-section"
import { MetricCards } from "@/components/metric-cards"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SearchSection />
      <MetricCards />
      <Dashboard />
    </div>
  )
}
