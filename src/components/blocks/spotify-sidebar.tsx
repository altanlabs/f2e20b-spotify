import { Home, Search, Library, Plus, Heart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const PLAYLISTS = [
  {
    title: "Daily Mix 1",
    type: "Mix",
    image: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb180a06a4a587e3e0f6ef1a45/1/en/default"
  },
  {
    title: "Discover Weekly",
    type: "Playlist",
    image: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v2/discover-weekly/aAbca4VNfzWuUCQ_FGiEFA==/bmVuZW5lbmVuZW5lbmVuZQ=="
  },
  {
    title: "Release Radar",
    type: "Playlist",
    image: "https://newjams-images.scdn.co/image/ab676477000033ad/dt/v2/release-radar/ab6761610000e5ebf2855a202c6abd1c38265dcc/en"
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