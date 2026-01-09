"use client"

import { useState } from "react"
import { Search, Eye, Edit2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const FACTS_DATA = [
  {
    id: 1,
    statement: "Voter registration has increased by 15% compared to 2020",
    type: "Common",
    sources: ["CNN", "Reuters", "Associated Press"],
    confidence: 95,
  },
  {
    id: 2,
    statement: "Economic growth projections for Q2 are revised upward",
    type: "Unique",
    sources: ["The New York Times"],
    confidence: 72,
  },
  {
    id: 3,
    statement: "Healthcare policy implementation dates differ across reports",
    type: "Contradicting",
    sources: ["BBC", "Fox News"],
    confidence: 58,
  },
  {
    id: 4,
    statement: "Technology sector regulations proposed by three agencies",
    type: "Common",
    sources: ["Reuters", "The Guardian"],
    confidence: 88,
  },
]

const TYPE_COLORS = {
  Common: "bg-green-100 text-green-800",
  Unique: "bg-blue-100 text-blue-800",
  Contradicting: "bg-red-100 text-red-800",
  Omitted: "bg-gray-100 text-gray-800",
}

interface FactPanelProps {
  confidenceThreshold: number
}

export function FactPanel({ confidenceThreshold }: FactPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("table")

  const filteredFacts = FACTS_DATA.filter(
    (fact) =>
      fact.confidence >= confidenceThreshold && fact.statement.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1">
      <Card className="bg-card">
        <CardHeader className="border-b border-border">
          <CardTitle>Fact Comparison Analysis</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-border">
            <button
              onClick={() => setActiveTab("table")}
              className={`pb-3 text-sm font-medium border-b-2 transition ${
                activeTab === "table"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Fact Table
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`pb-3 text-sm font-medium border-b-2 transition ${
                activeTab === "timeline"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Timeline View
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search facts…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Fact Table */}
          {activeTab === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Fact Statement</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Sources</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Confidence</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFacts.map((fact) => (
                    <tr key={fact.id} className="border-b border-border hover:bg-secondary/30 transition">
                      <td className="py-4 px-4 text-foreground">{fact.statement}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[fact.type as keyof typeof TYPE_COLORS]}`}
                        >
                          {fact.type}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {fact.sources.map((source) => (
                            <span
                              key={source}
                              className="inline-block px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`font-semibold ${
                            fact.confidence >= 80
                              ? "text-green-600"
                              : fact.confidence >= 60
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {fact.confidence}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-secondary rounded transition" title="View">
                            <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                          <button className="p-1 hover:bg-secondary rounded transition" title="Edit">
                            <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Timeline View */}
          {activeTab === "timeline" && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Timeline view coming soon. Switch to Fact Table to view facts.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
