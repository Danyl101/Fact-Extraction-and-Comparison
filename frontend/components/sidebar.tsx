"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const NEWS_SOURCES = ["CNN", "BBC", "Reuters", "Associated Press", "The New York Times", "The Guardian", "Fox News"]
const FACT_TYPES = ["Common Facts", "Unique Facts", "Contradicting Facts", "Omitted Facts"]

interface SidebarProps {
  confidenceThreshold: number
  setConfidenceThreshold: (value: number) => void
}

export function Sidebar({ confidenceThreshold, setConfidenceThreshold }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    sources: true,
    types: true,
    confidence: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="w-64 flex-shrink-0">
      <div className="space-y-4">
        {/* News Sources */}
        <div className="bg-card rounded-lg border border-border">
          <button
            onClick={() => toggleSection("sources")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition"
          >
            <span className="font-semibold text-sm">News Sources</span>
            <ChevronDown className={`w-4 h-4 transition ${expandedSections.sources ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.sources && (
            <div className="px-4 py-3 border-t border-border space-y-2">
              {NEWS_SOURCES.map((source) => (
                <label key={source} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-foreground">{source}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Fact Types */}
        <div className="bg-card rounded-lg border border-border">
          <button
            onClick={() => toggleSection("types")}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition"
          >
            <span className="font-semibold text-sm">Fact Types</span>
            <ChevronDown className={`w-4 h-4 transition ${expandedSections.types ? "rotate-180" : ""}`} />
          </button>
          {expandedSections.types && (
            <div className="px-4 py-3 border-t border-border space-y-2">
              {FACT_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-foreground">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="bg-card rounded-lg border border-border px-4 py-3">
          <p className="font-semibold text-sm mb-2">Date Range</p>
          <p className="text-sm text-muted-foreground">Last 7 Days</p>
        </div>

        {/* Confidence Threshold */}
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="font-semibold text-sm mb-4">Confidence Threshold</p>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">0%</span>
              <span className="text-sm font-semibold text-foreground">{confidenceThreshold}%</span>
              <span className="text-sm text-muted-foreground">100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
