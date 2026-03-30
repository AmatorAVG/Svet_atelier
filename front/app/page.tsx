"use client"

import { useState } from "react"
import { UrlInput } from "@/components/url-input"
import { SummaryResult } from "@/components/summary-result"
import { HydrationWrapper } from "@/components/hydration-wrapper"
import { Play } from "lucide-react"

interface SummaryResponse {
  title?: string
  summary?: string
  error?: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SummaryResponse | null>(null)

  const handleSubmit = async (url: string) => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        setResult({ error: data.error || "Произошла ошибка при обработке видео" })
      } else {
        setResult(data)
      }
    } catch (error) {
      console.error("[v0] Error submitting URL:", error)
      setResult({ error: "Не удалось связаться с сервером. Попробуйте позже." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HydrationWrapper>
      <main className="min-h-screen flex flex-col items-center justify-start px-4 py-12 md:py-20">
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          <header className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-md">
              <Play className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              YouTube Summary
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg text-pretty">
              Получите краткое изложение любого YouTube видео за секунды
            </p>
          </header>

          <UrlInput onSubmit={handleSubmit} isLoading={isLoading} />

          {result && (
            <SummaryResult
              title={result.title}
              summary={result.summary}
              error={result.error}
            />
          )}

          <footer className="mt-auto pt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Бесплатный сервис для экономии вашего времени
            </p>
          </footer>
        </div>
      </main>
    </HydrationWrapper>
  )
}
