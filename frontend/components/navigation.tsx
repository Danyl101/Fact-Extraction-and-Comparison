"use client"

import Link from "next/link"
import { FileText, Settings, Info, Home } from "lucide-react"

export function Navigation() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            NFC
          </div>
          <span className="text-lg font-semibold text-foreground">News Fact Comparator</span>
        </div>

        <div className="flex items-center gap-8">
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <FileText className="w-4 h-4" />
            Compare Articles
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <Info className="w-4 h-4" />
            About
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </div>
    </nav>
  )
}
