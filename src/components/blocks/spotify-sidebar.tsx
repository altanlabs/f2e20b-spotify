"use client"

import { Home, Library, Plus, PanelLeftClose, PanelLeftOpen, Pencil, Trash2, GripVertical } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const DEFAULT_PLAYLIST_IMAGE = "https://api.altan.ai/platform/media/34538779-fdee-47f4-a828-525285759c47?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"

interface Playlist {
  id: string;
  name: string;
  image: string;
}

const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: "1",
    name: "Paaau",
    image: "https://api.altan.ai/platform/media/91a43c68-06d5-4b61-8713-1384ff4e509b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: "2",
    name: "Rap Mix",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: "3",
    name: "Hip Hop Classics",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  }
]

interface SpotifySidebarProps {
  isCompressed: boolean;
  onToggleCompress: (compressed: boolean) => void;
}

type DialogMode = 'create' | 'edit' | null;

export function SpotifySidebar({ isCompressed, onToggleCompress }: SpotifySidebarProps) {
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [playlists, setPlaylists] = useState<Playlist[]>(INITIAL_PLAYLISTS)
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null)
  const [deletePlaylist, setDeletePlaylist] = useState<Playlist | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null
  })
  const [draggedPlaylist, setDraggedPlaylist] = useState<Playlist | null>(null)

  const handleCreatePlaylist = () => {
    if (formData.name) {
      const imageUrl = formData.image 
        ? URL.createObjectURL(formData.image)
        : DEFAULT_PLAYLIST_IMAGE

      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: formData.name,
        image: imageUrl
      }

      setPlaylists([...playlists, newPlaylist])
      closeDialog()
    }
  }

  const handleEditPlaylist = () => {
    if (editingPlaylist && formData.name) {
      const imageUrl = formData.image 
        ? URL.createObjectURL(formData.image)
        : editingPlaylist.image

      const updatedPlaylists = playlists.map(playlist => 
        playlist.id === editingPlaylist.id 
          ? { ...playlist, name: formData.name, image: imageUrl }
          : playlist
      )

      setPlaylists(updatedPlaylists)
      closeDialog()
    }
  }

  const handleDeleteConfirm = () => {
    if (deletePlaylist) {
      setPlaylists(playlists.filter(playlist => playlist.id !== deletePlaylist.id))
      setDeletePlaylist(null)
    }
  }

  const openCreateDialog = () => {
    setDialogMode('create')
    setFormData({ name: "", image: null })
    setEditingPlaylist(null)
  }

  const openEditDialog = (playlist: Playlist) => {
    setDialogMode('edit')
    setFormData({ name: playlist.name, image: null })
    setEditingPlaylist(playlist)
  }

  const closeDialog = () => {
    setDialogMode(null)
    setFormData({ name: "", image: null })
    setEditingPlaylist(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  const handleDragStart = (playlist: Playlist) => {
    setDraggedPlaylist(playlist)
  }

  const handleDragOver = (e: React.DragEvent, targetPlaylist: Playlist) => {
    e.preventDefault()
    if (!draggedPlaylist || draggedPlaylist.id === targetPlaylist.id) return

    const draggedIndex = playlists.findIndex(p => p.id === draggedPlaylist.id)
    const targetIndex = playlists.findIndex(p => p.id === targetPlaylist.id)
    
    const newPlaylists = [...playlists]
    newPlaylists.splice(draggedIndex, 1)
    newPlaylists.splice(targetIndex, 0, draggedPlaylist)
    
    setPlaylists(newPlaylists)
  }

  const handleDragEnd = () => {
    setDraggedPlaylist(null)
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

      <div className="bg-zinc-900 rounded-lg p-2 flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 p-2">
          <button className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition">
            <Library size={24} />
            {!isCompressed && "Your Library"}
          </button>
          {!isCompressed && (
            <>
              <button 
                onClick={openCreateDialog}
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

        <div className="mt-4 flex-1 overflow-auto">
          <div className="space-y-2">
            {playlists.map((playlist) => (
              <ContextMenu key={playlist.id}>
                <ContextMenuTrigger>
                  <div
                    draggable
                    onDragStart={() => handleDragStart(playlist)}
                    onDragOver={(e) => handleDragOver(e, playlist)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition cursor-pointer ${
                      draggedPlaylist?.id === playlist.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <GripVertical size={16} className="text-zinc-400 cursor-grab active:cursor-grabbing" />
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
                    </div>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48">
                  <ContextMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => openEditDialog(playlist)}
                  >
                    <Pencil size={16} />
                    Edit
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem 
                    className="flex items-center gap-2 text-red-500 cursor-pointer"
                    onClick={() => setDeletePlaylist(playlist)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit Playlist Dialog */}
      <Dialog open={dialogMode !== null} onOpenChange={() => closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'create' ? 'Create New Playlist' : 'Edit Playlist'}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Playlist Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="My Awesome Playlist"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Cover Image (Optional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button 
              onClick={dialogMode === 'create' ? handleCreatePlaylist : handleEditPlaylist}
              disabled={!formData.name}
            >
              {dialogMode === 'create' ? 'Create Playlist' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deletePlaylist !== null} onOpenChange={() => setDeletePlaylist(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Playlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletePlaylist?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}