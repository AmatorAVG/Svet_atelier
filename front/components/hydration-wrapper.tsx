"use client"

import { useEffect, useState } from "react"

interface HydrationWrapperProps {
  children: React.ReactNode
}

export function HydrationWrapper({ children }: HydrationWrapperProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // During SSR and initial hydration, render a placeholder
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start px-4 py-12 md:py-20">
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          <div className="animate-pulse">
            <div className="w-16 h-16 rounded-2xl bg-muted mb-4" />
            <div className="h-10 w-64 bg-muted rounded mb-4" />
            <div className="h-6 w-96 bg-muted rounded" />
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}