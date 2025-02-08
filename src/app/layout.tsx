"use client"

import { useState } from "react"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCompressed, setIsSidebarCompressed] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {children}
    </div>
  )
}