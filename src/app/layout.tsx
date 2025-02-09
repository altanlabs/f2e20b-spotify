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
      <div className="w-full h-[100vh] flex flex-col bg-black">
        <div className="flex flex-1 min-h-0"> {/* min-h-0 prevents flex children from expanding */}
          {/* Sidebar */}
          <div className={`transition-all duration-300 ${isSidebarCompressed ? 'w-24' : 'w-[280px]'} p-2`}>
            <SpotifySidebar 
              isCompressed={isSidebarCompressed} 
              onToggleCompress={setIsSidebarCompressed}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 p-2 pl-0 min-w-0"> {/* min-w-0 prevents flex children from expanding */}
            <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800/50 to-black flex flex-col">
              <AppHeader />
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* Player bar */}
        <div className="flex-shrink-0 h-24 bg-black">
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