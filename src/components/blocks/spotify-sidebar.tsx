"use client"

import { Home, Search, Library, Plus, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const PLAYLISTS = [
  {
    name: "Paaau",
    image: "https://api.altan.ai/platform/media/91a43c68-06d5-4b61-8713-1384ff4e509b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
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

const SONGS = [
  {
    title: "Mr. Morale & The Big Steppers",
    artist: "Kendrick Lamar",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "CALL ME IF YOU GET LOST",
    artist: "Tyler, The Creator",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "Islands",
    artist: "фрози",
    image: "https://api.altan.ai/platform/media/838c6502-ab0a-49b7-8d25-3c317cb8bdd6?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "Un Verano Sin Ti",
    artist: "Bad Bunny",
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  }
]

interface SpotifySidebarProps {
  isCompressed: boolean;
  onToggleCompress: (compressed: boolean) => void;
}

export function SpotifySidebar({ isCompressed, onToggleCompress }: SpotifySidebarProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [playlists, setPlaylists] = useState(PLAYLISTS)
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    image: null as File | null
  })
  
  const searchRef = useRef<HTMLDivElement>(null)

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredSongs = SONGS.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreatePlaylist = () => {
    if (newPlaylist.name && newPlaylist.image) {
      const imageUrl = URL.createObjectURL(newPlaylist.image)
      setPlaylists([...playlists, {
        name: newPlaylist.name,
        image: imageUrl
      }])
      setIsCreateOpen(false)
      setNewPlaylist({ name: "", image: null })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPlaylist({ ...newPlaylist, image: e.target.files[0] })
    }
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="bg-zinc-900 rounded-lg p-4">
        <div className="flex flex-col gap-4">
          <a 
            href="/"
            className="flex items-center gap-4 text-sm font-medium text-zinc-400 hover:text-white transition"
          >
            <Home size={24} />
            {!isCompressed && "Home"}
          </a>
          <div className="relative" ref={searchRef}>
            <div className="flex items-center gap-4 text-sm font-medium text-zinc-400 hover:text-white transition">
              <Search size={24} />
              {!isCompressed && (
                <input
                  type="text"
                  placeholder="What do you want to listen to?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearchResults(true)}
                  className="bg-transparent border-none outline-none text-white placeholder-zinc-400 w-full"
                />
              )}
            </div>
            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && !isCompressed && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 rounded-lg shadow-xl z-50">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-white mb-4">Recent searches</h3>
                  {filteredSongs.map((song, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition cursor-pointer"
                    >
                      <img 
                        src={song.image} 
                        alt={song.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{song.title}</p>
                        <p className="text-xs text-zinc-400">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg p-2 flex-1">
        <div className="flex items-center gap-2 p-2">
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition">
            <Library size={24} />
            {!isCompressed && "Your Library"}
          </button>
          {!isCompressed && (
            <>
              <button 
                onClick={() => setIsCreateOpen(true)}
                className="ml-auto p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition"
              >
                <Plus size={20} />
              </button>
              <button 
                onClick={() => onToggleCompress(true)}
                className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition"
              >
                <PanelLeftClose size={20} />
              </button>
            </>
          )}
          {isCompressed && (
            <button 
              onClick={() => onToggleCompress(false)}
              className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition ml-auto"
            >
              <PanelLeftOpen size={20} />
            </button>
          )}
        </div>

        <div className="mt-4 space-y-2">
          {playlists.map((playlist, i) => (
            <a
              key={i}
              href="/playlist/paaau"
              className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition cursor-pointer"
            >
              <img 
                src={playlist.image} 
                alt={playlist.name}
                className="w-12 h-12 rounded object-cover"
              />
              {!isCompressed && (
                <div>
                  <p className="text-sm font-medium">{playlist.name}</p>
                  <p className="text-xs text-zinc-400">Playlist • Dapao</p>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Create Playlist Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Playlist</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Playlist Name</Label>
              <Input
                id="name"
                value={newPlaylist.name}
                onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                placeholder="My Awesome Playlist"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Cover Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreatePlaylist}>Create Playlist</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}