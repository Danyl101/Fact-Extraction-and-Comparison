"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Lightbulb, AlertTriangle, TrendingUp } from "lucide-react"

const METRICS = [
  {
    title: "Articles",
    value: "4",
    icon: FileText,
    color: "text-primary",
  },
  {
    title: "Common Facts",
    description: "High consensus",
    value: "12",
    icon: Lightbulb,
    color: "text-green-600",
  },
  {
    title: "Unique Facts",
    description: "Exclusive reporting",
    value: "5",
    icon: Lightbulb,
    color: "text-blue-600",
  },
  {
    title: "Contradictions",
    description: "Conflicting reports",
    value: "3",
    icon: AlertTriangle,
    color: "text-red-600",
  },
  {
    title: "Reliability",
    description: "Medium confidence",
    value: "84%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function MetricCards() {
  return (
    <div className="bg-background px-6 py-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {METRICS.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    {metric.description && (
                      <CardDescription className="text-xs mt-1">{metric.description}</CardDescription>
                    )}
                  </div>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
