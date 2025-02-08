"use client"

import { Play, Pause, Clock, Heart } from "lucide-react"
import { useState } from "react"
import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { motion } from "framer-motion"

const PLAYLIST_SONGS = [
  {
    id: 0,
    title: "LIKE HIM",
    artist: "Tyler, The Creator",
    album: "CHROMAKOPIA",
    duration: "4:38",
    image: "https://api.altan.ai/platform/media/12179ebc-da1b-43f2-bacd-5c7c26dac31d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    addedAt: "1 day ago",
    hasVideo: false
  },
  {
    id: 1,
    title: "Me Porto Bonito",
    artist: "Bad Bunny",
    album: "Un Verano Sin Ti",
    duration: "3:52",
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    addedAt: "1 day ago",
    hasVideo: true
  },
  {
    id: 2,
    title: "SWEET / I THOUGHT YOU WANTED TO DANCE",
    artist: "Tyler, The Creator",
    album: "GNX",
    duration: "2:58",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    addedAt: "2 days ago",
    hasVideo: false
  },
  {
    id: 3,
    title: "N95",
    artist: "Kendrick Lamar",
    album: "miau",
    duration: "3:06",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    addedAt: "2 days ago",
    hasVideo: true
  },
  {
    id: 4,
    title: "Islands",
    artist: "фрози",
    album: "CRUZ",
    duration: "3:04",
    image: "https://api.altan.ai/platform/media/838c6502-ab0a-49b7-8d25-3c317cb8bdd6?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    addedAt: "2 days ago",
    hasVideo: true
  },
  {
    id: 5,
    title: "GBP (feat. 21 Savage)",
    artist: "Central Cee",
    album: "GBP",
    duration: "2:35",
    image: "https://api.altan.ai/platform/media/26e6bc60-837f-4ac9-8983-4620298519a3?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    addedAt: "2 weeks ago",
    hasVideo: false,
    url: "https://api.altan.ai/platform/media/f3a4619e-dc7a-41b5-abad-a892048180f1?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  }
]

export default function PlaylistPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [shouldPlay, setShouldPlay] = useState(false)
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const [likedSongs, setLikedSongs] = useState<number[]>([])
  const [isSidebarCompressed, setIsSidebarCompressed] = useState(false)

  const handleSongSelect = (index: number) => {
    setCurrentSongIndex(index)
    setShouldPlay(true)
  }

  const toggleLike = (songId: number, event: React.MouseEvent) => {
    event.stopPropagation()
    if (likedSongs.includes(songId)) {
      setLikedSongs(likedSongs.filter(id => id !== songId))
    } else {
      setLikedSongs([...likedSongs, songId])
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex flex-1 overflow-hidden p-2 gap-2">
        <aside className="w-64 shrink-0">
          <SpotifySidebar 
            isCompressed={isSidebarCompressed}
            onToggleCompress={setIsSidebarCompressed}
          />
        </aside>
        <main className="flex-1 rounded-lg overflow-auto">
          {/* Playlist Header */}
          <div className="flex items-end gap-6 bg-gradient-to-b from-zinc-700/50 to-zinc-900/50 p-6">
            <img 
              src="https://api.altan.ai/platform/media/91a43c68-06d5-4b61-8713-1384ff4e509b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
              alt="Playlist cover"
              className="w-52 h-52 shadow-lg"
            />
            <div>
              <p className="text-sm font-medium mb-2">Public Playlist</p>
              <h1 className="text-8xl font-bold mb-6">Paaau</h1>
              <div className="flex items-center gap-2">
                <img 
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium">Dapao</span>
                <span className="text-sm text-zinc-300">• 8 saves • 1741 songs, 102h 16min</span>
              </div>
            </div>
          </div>

          {/* Songs List */}
          <div className="p-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-sm text-zinc-400 border-b border-zinc-800">
                  <th className="w-12 text-center pb-2">#</th>
                  <th className="text-left pb-2">Title</th>
                  <th className="text-left pb-2">Album</th>
                  <th className="text-left pb-2">Date added</th>
                  <th className="w-12 pb-2"><Clock size={16} /></th>
                  <th className="w-12 pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {PLAYLIST_SONGS.map((song, index) => (
                  <tr 
                    key={song.id}
                    className="group hover:bg-white/10 cursor-pointer"
                    onClick={() => handleSongSelect(song.id)}
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <td className="py-2 text-center">
                      {isHovered === index ? (
                        <Play size={16} className="mx-auto" />
                      ) : (
                        <span className="text-zinc-400">{index + 1}</span>
                      )}
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <img 
                          src={song.image} 
                          alt={song.title}
                          className="w-10 h-10"
                        />
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-zinc-400">{song.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-zinc-400">{song.album}</td>
                    <td className="text-zinc-400">{song.addedAt}</td>
                    <td className="text-zinc-400">{song.duration}</td>
                    <td>
                      <motion.button
                        onClick={(e) => toggleLike(song.id, e)}
                        whileTap={{ scale: 0.8 }}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity ${likedSongs.includes(song.id) ? 'text-[#1ed760]' : 'text-zinc-400 hover:text-white'}`}
                      >
                        <motion.div
                          animate={likedSongs.includes(song.id) ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 15, -15, 0],
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <Heart
                            size={16}
                            fill={likedSongs.includes(song.id) ? "#1ed760" : "none"}
                          />
                        </motion.div>
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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