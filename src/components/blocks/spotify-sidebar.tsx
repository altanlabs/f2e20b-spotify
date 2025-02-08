"use client"

import { Home, Library, Plus, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { useState } from "react"
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

interface SpotifySidebarProps {
  isCompressed: boolean;
  onToggleCompress: (compressed: boolean) => void;
}

export function SpotifySidebar({ isCompressed, onToggleCompress }: SpotifySidebarProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [playlists, setPlaylists] = useState(PLAYLISTS)
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    image: null as File | null
  })

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