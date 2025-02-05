import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { Play, Home, Search, Library } from "lucide-react"
import { useState } from "react"

const CATEGORIES = ["Tot", "Música", "Pòdcasts"]

const RECENT_ITEMS = [
  {
    title: "Liked Songs",
    type: "Playlist",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 2
  },
  {
    title: "Tyler, The Creator",
    type: "Artist",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 3
  },
  {
    title: "Islands",
    type: "Album",
    image: "https://api.altan.ai/platform/media/838c6502-ab0a-49b7-8d25-3c317cb8bdd6?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 4
  },
  {
    title: "Bad Bunny",
    type: "Artist",
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 1
  },
]

export default function IndexPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("Tot")

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Mobile View */}
      <div className="md:hidden flex-1 flex flex-col">
        {/* Top Header */}
        <div className="p-4 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-zinc-800" />
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                  ${selectedCategory === category 
                    ? "bg-[#1ed760] text-black" 
                    : "bg-zinc-800 text-white"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto px-4 pb-24">
          <div className="grid gap-3">
            {RECENT_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => item.songIndex !== undefined && setCurrentSongIndex(item.songIndex)}
                className="w-full bg-zinc-800/50 rounded-md flex items-center p-2 gap-3"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-12 h-12 rounded object-cover" 
                />
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-zinc-400">{item.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black">
          <NowPlayingBar currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
          <div className="h-16 flex items-center justify-around px-6 border-t border-zinc-800">
            <button className="flex flex-col items-center gap-1">
              <Home size={24} className="text-white" />
              <span className="text-xs">Inici</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Search size={24} className="text-zinc-400" />
              <span className="text-xs text-zinc-400">Cerca</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Library size={24} className="text-zinc-400" />
              <span className="text-xs text-zinc-400">La teva biblioteca</span>
            </button>
          </div>
        </div>
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