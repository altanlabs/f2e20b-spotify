"use client"

import { Play } from "lucide-react"
import { useState } from "react"
import { usePlayer } from "@/App"

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
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 2
  },
  {
    title: "Mr. Morale & the Big Steppers",
    artist: "Kendrick Lamar",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
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
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 1
  }
]

export default function HomePage() {
  const { setCurrentSongIndex, setShouldPlay } = usePlayer()

  const handleSongSelect = (songIndex: number) => {
    setCurrentSongIndex(songIndex)
    setShouldPlay(true)
  }

  return (
    <div className="p-6">
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
    </div>
  )
}