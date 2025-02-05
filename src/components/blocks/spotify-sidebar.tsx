import { Home, Search, Library, Plus, Heart } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SpotifySidebar() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="bg-card rounded-lg p-6">
        <nav className="space-y-4">
          <a className="flex items-center gap-4 text-sm font-medium text-muted-foreground hover:text-primary transition">
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
                <p className="text-xs text-muted-foreground">Playlist • 123 songs</p>
              </div>
            </button>
            {Array.from({length: 10}).map((_, i) => (
              <button key={i} className="flex items-center gap-4 w-full text-left text-sm font-medium text-muted-foreground hover:text-primary transition">
                <div className="w-12 h-12 bg-neutral-800 rounded-lg" />
                <div>
                  <p className="font-semibold">Playlist {i + 1}</p>
                  <p className="text-xs text-muted-foreground">Playlist • User</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}