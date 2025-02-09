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
      <div className="h-screen flex flex-col bg-black overflow-hidden">
        <div className="flex flex-1 min-h-0"> {/* min-h-0 is crucial for nested flex containers */}
          {/* Sidebar with compressed state control */}
          <div className={`shrink-0 p-2 transition-all duration-300 ${isSidebarCompressed ? 'w-24' : 'w-[280px]'}`}>
            <SpotifySidebar 
              isCompressed={isSidebarCompressed} 
              onToggleCompress={setIsSidebarCompressed}
            />
          </div>

          {/* Main content area that adapts to sidebar state */}
          <div className={`flex-1 min-w-0 transition-all duration-300 ${
            isSidebarCompressed ? 'pl-0' : 'pl-2'
          } pr-2 pt-2`}>
            <div className="flex flex-col h-full bg-gradient-to-b from-zinc-800/50 to-black rounded-lg">
              <AppHeader />
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Now playing bar */}
        <div className="flex-shrink-0 h-24">
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