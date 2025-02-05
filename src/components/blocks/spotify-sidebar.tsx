import { Home, Search, Library, Plus, Heart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const PLAYLISTS = [
  {
    title: "Daily Mix 1",
    type: "Mix",
    image: "https://i.scdn.co/image/ab67616d00001e02c5716278abba6a103ad13aa7"
  },
  {
    title: "Discover Weekly",
    type: "Playlist",
    image: "https://i.scdn.co/image/ab67706f00000002fe0099a8dcd3054706ffc92f"
  },
  {
    title: "Release Radar",
    type: "Playlist",
    image: "https://i.scdn.co/image/ab67706f000000025ba1f6358427486bc90acf58"
  },
  {
    title: "Hip Hop Controller",
    type: "Playlist",
    image: "https://i.scdn.co/image/ab67706c0000da84f2a067e03b55c8bd84f1b8a1"
  },
  {
    title: "RapCaviar",
    type: "Playlist",
    image: "https://i.scdn.co/image/ab67706c0000da84ae39b4e29fa5f5c2476e8fef"
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