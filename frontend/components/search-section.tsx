"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const TRENDING_TOPICS = ["AI Regulation", "Election 2024", "Climate Policy", "Tech Antitrust", "Inflation Rates"]
const RECENT_SEARCHES = ["COVID-19 Variants", "Ukraine Conflict", "Fed Rate Changes"]

export function SearchSection() {
  return (
    <div className="border-b border-border bg-background px-6 py-8 max-w-7xl mx-auto">
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search topic (e.g AI Regulation)"
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button className="px-6">Compare</Button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">TRENDING TOPICS</p>
          <div className="flex flex-wrap gap-2">
            {TRENDING_TOPICS.map((topic) => (
              <button
                key={topic}
                className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">RECENT SEARCHES</p>
          <div className="flex flex-wrap gap-2">
            {RECENT_SEARCHES.map((search) => (
              <button
                key={search}
                className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
