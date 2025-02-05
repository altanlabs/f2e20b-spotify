import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { Play, Home, Search, Library } from "lucide-react"
import { useState } from "react"

const CATEGORIES = ["Tot", "Música", "Pòdcasts"]

const YOUR_LIBRARY = [
  {
    title: "Cançons que m'agraden",
    type: "Playlist",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "Bad Bunny",
    type: "Artist",
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    songIndex: 1
  },
  {
    title: "The Kid LAROI",
    type: "Artist",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
  },
  {
    title: "F*CK LOVE 3+: OVER YOU",
    type: "Album",
    image: "https://api.altan.ai/platform/media/838c6502-ab0a-49b7-8d25-3c317cb8bdd6?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
  },
  {
    title: "Feid",
    type: "Artist",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
  },
  {
    title: "Frank Sinatra",
    type: "Artist",
    image: "https://api.altan.ai/platform/media/12179ebc-da1b-43f2-bacd-5c7c26dac31d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
  },
  {
    title: "country",
    type: "Playlist",
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
  },
  {
    title: "DeBÍ TiRAR MáS FOToS",
    type: "Playlist",
    image: "https://api.altan.ai/platform/media/838c6502-ab0a-49b7-8d25-3c317cb8bdd6?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
  }
]

export default function IndexPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("Tot")

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Mobile View */}
      <div className="md:hidden flex-1 flex flex-col">
        {/* Top Header */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-full bg-zinc-800" />
            <div className="text-2xl font-bold">Bona tarda</div>
            <div className="w-8" /> {/* Spacer for alignment */}
          </div>
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
        <div className="flex-1 overflow-auto px-4 pb-32">
          <div className="grid grid-cols-2 gap-2 mb-6">
            {YOUR_LIBRARY.slice(0, 6).map((item, i) => (
              <button
                key={i}
                onClick={() => item.songIndex !== undefined && setCurrentSongIndex(item.songIndex)}
                className="bg-zinc-800/80 rounded-lg overflow-hidden flex items-center"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-12 h-12 object-cover" 
                />
                <span className="px-3 py-2 text-sm font-bold truncate">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Featured Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Escollits per a tu</h3>
            <div className="aspect-video w-full bg-zinc-800 rounded-lg overflow-hidden relative">
              <img 
                src="https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
                alt="Featured"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="text-lg font-bold">¿Puede DeepSeek cambiarlo todo?</h4>
                <p className="text-sm text-zinc-300">Previsualitza l'episodi</p>
              </div>
            </div>
          </div>

          {/* Recently Played */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Torna a escoltar</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {YOUR_LIBRARY.map((item, i) => (
                <div key={i} className="flex-shrink-0 w-40">
                  <div className="relative mb-2">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-40 h-40 object-cover rounded-lg" 
                    />
                  </div>
                  <h4 className="font-bold text-sm truncate">{item.title}</h4>
                  <p className="text-sm text-zinc-400 truncate">{item.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-black">
          <NowPlayingBar currentSongIndex={currentSongIndex} setCurrentSongIndex={setCurrentSongIndex} />
          <div className="h-16 flex items-center justify-around px-6 border-t border-zinc-800">
            <button className="flex flex-col items-center gap-1">
              <Home size={24} className="text-white" />
              <span className="text-xs text-white">Inici</span>
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