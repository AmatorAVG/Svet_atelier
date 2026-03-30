"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface SummaryResultProps {
  title?: string
  summary?: string
  error?: string
}

export function SummaryResult({ title, summary, error }: SummaryResultProps) {
  if (error) {
    return (
      <Card className="w-full max-w-2xl border-destructive/50 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-destructive text-lg">
            <AlertCircle className="h-5 w-5" />
            Ошибка
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!summary) return null

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <CardTitle className="text-lg font-semibold leading-tight">
            {title || "Краткое изложение"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none text-foreground">
          {summary.split("\n").map((paragraph, index) => (
            paragraph.trim() && (
              <p key={index} className="mb-3 last:mb-0 leading-relaxed">
                {paragraph}
              </p>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
