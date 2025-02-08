import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { useState } from "react"
import { Outlet } from "react-router-dom"

export default function App() {
  const [isSidebarCompressed, setIsSidebarCompressed] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar with compressed state control */}
        <div className={`shrink-0 p-2 transition-all duration-300 ${isSidebarCompressed ? 'w-24' : 'w-[280px]'}`}>
          <SpotifySidebar 
            isCompressed={isSidebarCompressed} 
            onToggleCompress={setIsSidebarCompressed}
          />
        </div>

        {/* Main content area that adapts to sidebar state */}
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          isSidebarCompressed ? 'pl-0' : 'pl-2'
        } pr-2 pt-2`}>
          <div className="bg-gradient-to-b from-zinc-800/50 to-black rounded-lg h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Now playing bar */}
      <div className="h-24 mt-2">
        <NowPlayingBar />
      </div>
    </div>
  )
}