"use client"

import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { Play, Menu } from "lucide-react"
import { useState } from "react"

const FEATURED_PLAYLISTS = [
  {
    title: "Hip Hop Mix",
    image: "https://api.altan.ai/platform/media/9a845218-c2c0-4e61-9eb1-69182ea79ac4?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  },
  {
    title: "Rap Caviar",
    image: "https://api.altan.ai/platform/media/6b89961b-d220-4f8e-9d83-bc01c72c0b7a?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  },
  {
    title: "Today's Top Hits",
    image: "https://api.altan.ai/platform/media/ba0412ad-2c05-4015-b683-00344232f641?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  },
  {
    title: "All Out 2010s",
    image: "https://api.altan.ai/platform/media/64d29f69-66f2-4eb6-83aa-3068b8adf34a?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  },
  {
    title: "Rock Classics",
    image: "https://api.altan.ai/platform/media/3f70543d-dead-4e26-a5b1-65c036d40217?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  },
  {
    title: "Chill Hits",
    image: "https://api.altan.ai/platform/media/9a845218-c2c0-4e61-9eb1-69182ea79ac4?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  }
]

const RECENT_ALBUMS = [
  {
    title: "CALL ME IF YOU GET LOST",
    artist: "Tyler, The Creator",
    image: "https://api.altan.ai/platform/media/9a845218-c2c0-4e61-9eb1-69182ea79ac4?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7",
    songIndex: 2
  },
  {
    title: "Mr. Morale & the Big Steppers",
    artist: "Kendrick Lamar",
    image: "https://api.altan.ai/platform/media/6b89961b-d220-4f8e-9d83-bc01c72c0b7a?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7",
    songIndex: 3
  },
  {
    title: "Islands",
    artist: "фрози",
    image: "https://api.altan.ai/platform/media/838c6502-ab0a-49b7-8d25-3c317cb8bdd6?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 4
  },
  {
    title: "Un Verano Sin Ti",
    artist: "Bad Bunny",
    image: "https://api.altan.ai/platform/media/64d29f69-66f2-4eb6-83aa-3068b8adf34a?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7",
    songIndex: 1
  },
  {
    title: "GBP (feat. 21 Savage)",
    artist: "Central Cee",
    image: "https://api.altan.ai/platform/media/26e6bc60-837f-4ac9-8983-4620298519a3?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 5
  },
  {
    title: "1973",
    artist: "James Blunt",
    image: "https://api.altan.ai/platform/media/35c27b69-662d-478c-8464-6ea1a3cef440?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 6
  },
  {
    title: "DTMF",
    artist: "Bad Bunny",
    image: "https://api.altan.ai/platform/media/f0f9d0d7-c7ed-4c3c-bfda-6aa0deb26ad1?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 7
  },
  {
    title: "i like the way you kiss me",
    artist: "Artemas",
    image: "https://api.altan.ai/platform/media/a067a1b2-b23c-4997-aaa9-a2efe6c0ff4b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 8
  }
]

export default function IndexPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [shouldPlay, setShouldPlay] = useState(false)

  const handleSongSelect = (songIndex: number) => {
    setCurrentSongIndex(songIndex)
    setShouldPlay(true)
  }

  const MainContent = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Good Evening</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {FEATURED_PLAYLISTS.map((playlist, i) => (
          <div 
            key={i} 
            className="bg-zinc-800/30 hover:bg-zinc-800/50 rounded-md flex items-center overflow-hidden transition group cursor-pointer"
          >
            <img 
              src={playlist.image} 
              alt={playlist.title}
              className="w-16 md:w-20 h-16 md:h-20 object-cover"
            />
            <span className="font-medium px-4 text-sm md:text-base line-clamp-1">{playlist.title}</span>
            <button className="ml-auto mr-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1ed760] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl hover:scale-105">
              <Play size={20} className="text-black" fill="black" />
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Recently Played</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {RECENT_ALBUMS.map((album, i) => (
          <div 
            key={i} 
            className="bg-zinc-800/30 hover:bg-zinc-800/50 rounded-md p-4 transition group cursor-pointer"
            onClick={() => album.songIndex !== undefined && handleSongSelect(album.songIndex)}
          >
            <div className="relative mb-4">
              <img 
                src={album.image} 
                alt={album.title}
                className="w-full aspect-square object-cover rounded-lg shadow-lg"
              />
              <button className="absolute bottom-2 right-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1ed760] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl hover:scale-105">
                <Play size={20} className="text-black" fill="black" />
              </button>
            </div>
            <p className="font-semibold truncate text-sm md:text-base">{album.title}</p>
            <p className="text-xs md:text-sm text-zinc-400 truncate">{album.artist}</p>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="hidden md:flex flex-1 overflow-hidden p-2 gap-2">
        <aside className="w-64 shrink-0">
          <SpotifySidebar />
        </aside>
        <main className="flex-1 bg-gradient-to-b from-zinc-800/50 to-black rounded-lg p-6 overflow-auto">
          <MainContent />
        </main>
      </div>
      <NowPlayingBar 
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        shouldPlay={shouldPlay}
        setShouldPlay={setShouldPlay}
      />
    </div>
  )
}