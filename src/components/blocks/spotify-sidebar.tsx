"use client"

import { Home, Search, Library, Plus, ArrowRight } from "lucide-react"

const PLAYLISTS = [
  {
    name: "Paaau",
    image: "/dog-headphones.jpg"
  },
  {
    name: "Rap Mix",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    name: "Hip Hop Classics",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
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
            Inicio
          </a>
          <a 
            href="/search"
            className="flex items-center gap-4 text-sm font-medium text-zinc-400 hover:text-white transition"
          >
            <Search size={24} />
            Buscar
          </a>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg p-2 flex-1">
        <div className="flex items-center gap-2 p-2">
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition">
            <Library size={24} />
            Tu biblioteca
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
                <p className="text-xs text-zinc-400">Lista • Dapao</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}