"use client"

import {useState,useEffect} from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { set } from "date-fns"

const TRENDING_TOPICS = ["AI Regulation", "Election 2024", "Climate Policy", "Tech Antitrust", "Inflation Rates"]

export function SearchSection(){
  const [query,setQuery]=useState("");
  const [results,setResults]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);
  const [recentSearches,setRecentSearches]=useState<any[]>([]);
  
  const runSearch = async () => {
    const trimmed = query.trim()
    if (!trimmed) return

    setRecentSearches((prev) => {
      const withoutDupes = prev.filter((q) => q !== trimmed)
      return [trimmed, ...withoutDupes].slice(0, 5)
    })

    setLoading(true)
    const res = await fetch(`/api/search?query=${encodeURIComponent(trimmed)}`)
    const data = await res.json()
    setResults(data)
    setLoading(false)
  }

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timeout = setTimeout(runSearch, 2000)
    return () => clearTimeout(timeout)
  }, [query])

   return (
    <div className="border-b border-border bg-background px-6 py-8 max-w-7xl mx-auto">
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch()}
            placeholder="Search topic (e.g AI Regulation)"
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
          />
        </div>
        <Button onClick={runSearch}>Compare</Button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            TRENDING TOPICS
          </p>
          <div className="flex flex-wrap gap-2">
            {TRENDING_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setQuery(topic)}
                className="px-3 py-1.5 rounded-full bg-secondary text-sm"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">
            RECENT SEARCHES
          </p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => setQuery(search)}
                className="px-3 py-1.5 rounded-full bg-muted text-sm"
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