import { Home, Search, Library, Plus, Heart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const PLAYLISTS = [
  {
    title: "Daily Mix 1",
    type: "Mix",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "Discover Weekly",
    type: "Playlist",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "Release Radar",
    type: "Playlist",
    image: "https://api.altan.ai/platform/media/e2ecc41a-b516-4b9a-852e-92749c9a0ed9?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "Hip Hop Controller",
    type: "Playlist",
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "RapCaviar",
    type: "Playlist",
    image: "https://api.altan.ai/platform/media/12179ebc-da1b-43f2-bacd-5c7c26dac31d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  }
]

export function SpotifySidebar() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="bg-card rounded-lg p-6">
        <nav className="space-y-4">
          <a className="flex items-center gap-4 text-sm font-medium text-primary hover:text-primary/80 transition">
            <Home size={24} />
            Home
          </a>
          <a className="flex items-center gap-4 text-sm font-medium text-muted-foreground hover:text-primary transition">
            <Search size={24} />
            Search
          </a>
        </nav>
      </div>
      
      <div className="bg-card rounded-lg flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition">
            <Library size={24} />
            Your Library
          </button>
          <button className="text-muted-foreground hover:text-primary transition">
            <Plus size={20} />
          </button>
        </div>
        
        <ScrollArea className="h-[calc(100%-60px)]">
          <div className="space-y-4">
            <button className="flex items-center gap-4 w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold">Liked Songs</p>
                <p className="text-xs text-muted-foreground">Playlist • 234 songs</p>
              </div>
            </button>
            
            {PLAYLISTS.map((playlist, i) => (
              <button key={i} className="flex items-center gap-4 w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition">
                <img 
                  src={playlist.image} 
                  alt={playlist.title}
                  className="w-12 h-12 rounded-lg object-cover" 
                />
                <div>
                  <p className="font-semibold">{playlist.title}</p>
                  <p className="text-xs text-muted-foreground">{playlist.type} • Spotify</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}