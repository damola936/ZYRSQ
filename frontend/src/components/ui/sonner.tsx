"use client"

import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-5 text-accent" />,
        info: <Info className="size-5 text-primary" />,
        warning: <AlertTriangle className="size-5 text-yellow-500" />,
        error: <AlertCircle className="size-5 text-destructive" />,
        loading: <Loader2 className="size-5 animate-spin text-primary" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/5 group-[.toaster]:backdrop-blur-xl group-[.toaster]:border-white/10 group-[.toaster]:text-white group-[.toaster]:rounded-2xl group-[.toaster]:shadow-2xl group-[.toaster]:p-4 group-[.toaster]:font-sans",
          title: "group-[.toast]:font-bold group-[.toast]:text-base",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:font-medium",
          actionButton:
            "group-[.toast]:bg-linear-to-br group-[.toast]:from-primary group-[.toast]:to-accent group-[.toast]:text-white group-[.toast]:font-bold group-[.toast]:rounded-xl",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white group-[.toast]:rounded-xl",
          success: "group-[.toast]:border-accent/30 group-[.toast]:bg-accent/5",
          error: "group-[.toast]:border-destructive/30 group-[.toast]:bg-destructive/5",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
