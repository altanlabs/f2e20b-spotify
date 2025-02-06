"use client"

import { Home, Search, Library, Plus, ArrowRight } from "lucide-react"

const PLAYLISTS = [
  {
    name: "Paaau",
    image: "https://api.altan.ai/platform/media/91a43c68-06d5-4b61-8713-1384ff4e509b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    name: "Rap Mix",
    image: "https://api.altan.ai/platform/media/6b89961b-d220-4f8e-9d83-bc01c72c0b7a?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  },
  {
    name: "Hip Hop Classics",
    image: "https://api.altan.ai/platform/media/9a845218-c2c0-4e61-9eb1-69182ea79ac4?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  }
]

export function SpotifySidebar() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="bg-zinc-900 rounded-lg p-4">
        <div className="flex flex-col gap-4">
          <a 
            href="/"
            className="flex items-center gap-4 text-sm font-medium text-zinc-400 hover:text-white transition"
          >
            <Home size={24} />
            Home
          </a>
          <a 
            href="/search"
            className="flex items-center gap-4 text-sm font-medium text-zinc-400 hover:text-white transition"
          >
            <Search size={24} />
            Search
          </a>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg p-2 flex-1">
        <div className="flex items-center gap-2 p-2">
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition">
            <Library size={24} />
            Your Library
          </button>
          <button className="ml-auto p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition">
            <Plus size={20} />
          </button>
          <button className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition">
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {PLAYLISTS.map((playlist, i) => (
            <a
              key={i}
              href="/playlist"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition cursor-pointer"
            >
              <img 
                src={playlist.image} 
                alt={playlist.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <p className="text-sm font-medium">{playlist.name}</p>
                <p className="text-xs text-zinc-400">Playlist • Dapao</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}