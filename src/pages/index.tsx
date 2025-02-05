import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function IndexPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Mobile View */}
      <div className="md:hidden flex-1 flex flex-col">
        {/* Top Header */}
        <div className="p-6 flex items-center justify-between">
          <Menu size={28} className="text-white" />
          <span className="text-2xl font-bold">Spotify</span>
          <div className="w-7" /> {/* Spacer for alignment */}
        </div>

        {/* Main Content - Empty for splash screen */}
        <div className="flex-1" />

        {/* Player Bar */}
        <NowPlayingBar currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-1 overflow-hidden p-2 gap-2">
        <aside className="w-64 shrink-0">
          <SpotifySidebar />
        </aside>
        <main className="flex-1 bg-gradient-to-b from-zinc-800/50 to-black rounded-lg p-6 overflow-auto">
          {/* Desktop content remains unchanged */}
        </main>
      </div>
    </div>
  )
}