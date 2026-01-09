"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { FactPanel } from "./fact-panel"

export function Dashboard() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(50)

  return (
    <div className="flex gap-6 px-6 py-6 max-w-7xl mx-auto min-h-[600px]">
      <Sidebar confidenceThreshold={confidenceThreshold} setConfidenceThreshold={setConfidenceThreshold} />
      <FactPanel confidenceThreshold={confidenceThreshold} />
    </div>
  )
}
