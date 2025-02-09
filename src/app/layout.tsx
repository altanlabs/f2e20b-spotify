"use client"

import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { AppHeader } from "@/components/blocks/app-header"
import { useState, createContext, useContext } from "react"

type PlayerContextType = {
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
  shouldPlay: boolean;
  setShouldPlay: (play: boolean) => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCompressed, setIsSidebarCompressed] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [shouldPlay, setShouldPlay] = useState(false)

  return (
    <PlayerContext.Provider value={{ currentSongIndex, setCurrentSongIndex, shouldPlay, setShouldPlay }}>
      <div className="fixed inset-0 bottom-[48px] flex flex-col bg-black"> {/* Added bottom offset for taskbar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className={`h-full transition-all duration-300 ${isSidebarCompressed ? 'w-24' : 'w-[280px]'} p-2`}>
            <SpotifySidebar 
              isCompressed={isSidebarCompressed} 
              onToggleCompress={setIsSidebarCompressed}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 p-2 pl-0">
            <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800/50 to-black flex flex-col">
              <AppHeader />
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Player bar */}
        <div className="h-24 bg-black">
          <NowPlayingBar 
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            shouldPlay={shouldPlay}
            setShouldPlay={setShouldPlay}
          />
        </div>
      </div>
    </PlayerContext.Provider>
  )
}