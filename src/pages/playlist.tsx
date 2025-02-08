import { Play, Shuffle, Clock, MoreHorizontal, Search, ArrowUpDown, ChevronDown } from "lucide-react"
import { useState, useCallback } from "react"
import { usePlayer } from "@/App"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const PLAYLIST_SONGS = [
  {
    id: 1,
    title: "Like Him (feat. Lola Young)",
    artist: "Tyler, The Creator, Lola Young",
    album: "CHROMAKOPIA",
    duration: "4:38",
    addedAt: "2 days ago",
    addedTimestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
    isVideo: true,
    songIndex: 0,
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 2,
    title: "All The Stars (with SZA)",
    artist: "Kendrick Lamar, SZA",
    album: "Black Panther The Album Music From And Inspired By",
    duration: "3:52",
    addedAt: "2 days ago",
    addedTimestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
    isVideo: true,
    songIndex: 1,
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 3,
    title: "luther (with sza)",
    artist: "Kendrick Lamar, SZA",
    album: "GNX",
    duration: "2:58",
    addedAt: "2 days ago",
    addedTimestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
    songIndex: 2,
    image: "https://api.altan.ai/platform/media/838c6502-ab0a-49b7-8d25-3c317cb8bdd6?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 4,
    title: "miau",
    artist: "Young Cister",
    album: "miau",
    duration: "3:06",
    addedAt: "3 days ago",
    addedTimestamp: Date.now() - (3 * 24 * 60 * 60 * 1000),
    isVideo: true,
    songIndex: 3,
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 5,
    title: "CRUZ",
    artist: "Trueno, Feid",
    album: "CRUZ",
    duration: "3:04",
    addedAt: "3 days ago",
    addedTimestamp: Date.now() - (3 * 24 * 60 * 60 * 1000),
    isVideo: true,
    songIndex: 4,
    image: "https://api.altan.ai/platform/media/26e6bc60-837f-4ac9-8983-4620298519a3?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 6,
    title: "Young Hearts Run Free",
    artist: "Candi Staton",
    album: "Young Hearts Run Free (US Internet Release)",
    duration: "4:08",
    addedAt: "6 days ago",
    addedTimestamp: Date.now() - (6 * 24 * 60 * 60 * 1000),
    isVideo: true,
    songIndex: 5,
    image: "https://api.altan.ai/platform/media/35c27b69-662d-478c-8464-6ea1a3cef440?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 7,
    title: "SEGUNDO INTENTO",
    artist: "Aitana",
    album: "SEGUNDO INTENTO",
    duration: "3:11",
    addedAt: "1 week ago",
    addedTimestamp: Date.now() - (7 * 24 * 60 * 60 * 1000),
    isVideo: true,
    songIndex: 6,
    image: "https://api.altan.ai/platform/media/f0f9d0d7-c7ed-4c3c-bfda-6aa0deb26ad1?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 8,
    title: "Islands (kompa pasión)",
    artist: "фрози, Tomo",
    album: "Islands (kompa pasión)",
    duration: "2:06",
    addedAt: "2 weeks ago",
    addedTimestamp: Date.now() - (14 * 24 * 60 * 60 * 1000),
    songIndex: 7,
    image: "https://api.altan.ai/platform/media/a067a1b2-b23c-4997-aaa9-a2efe6c0ff4b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 9,
    title: "GBP (feat. 21 Savage)",
    artist: "Central Cee, 21 Savage",
    album: "GBP (feat. 21 Savage)",
    duration: "2:35",
    addedAt: "2 weeks ago",
    addedTimestamp: Date.now() - (14 * 24 * 60 * 60 * 1000),
    songIndex: 8,
    image: "https://api.altan.ai/platform/media/91a43c68-06d5-4b61-8713-1384ff4e509b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    id: 10,
    title: "Timeless (feat. Playboi Carti)",
    artist: "The Weeknd, Playboi Carti",
    album: "Timeless",
    duration: "4:16",
    addedAt: "2 weeks ago",
    addedTimestamp: Date.now() - (14 * 24 * 60 * 60 * 1000),
    isVideo: true,
    songIndex: 9,
    image: "https://api.altan.ai/platform/media/9a845218-c2c0-4e61-9eb1-69182ea79ac4?account_id=8cd115a4-5f19-42ef-bc62-172f6bff28e7"
  }
]

type SortOption = 'date-added' | 'title' | 'artist' | 'album' | 'duration';

export default function PlaylistPage() {
  const { setCurrentSongIndex, setShouldPlay } = usePlayer()
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShuffleMode, setIsShuffleMode] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('date-added')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Shuffle functionality
  const shuffleArray = useCallback((array: typeof PLAYLIST_SONGS) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])

  // Filter and sort songs
  const processedSongs = (() => {
    let songs = [...PLAYLIST_SONGS]

    // First apply search filter
    if (searchQuery) {
      songs = songs.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Then apply sorting
    songs.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'date-added':
          comparison = b.addedTimestamp - a.addedTimestamp
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'artist':
          comparison = a.artist.localeCompare(b.artist)
          break
        case 'album':
          comparison = a.album.localeCompare(b.album)
          break
        case 'duration':
          comparison = a.duration.localeCompare(b.duration)
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return songs
  })()

  const handlePlaySong = (songIndex: number) => {
    if (setCurrentSongIndex && setShouldPlay) {
      setCurrentSongIndex(songIndex)
      setShouldPlay(true)
      setIsPlaying(true)
    }
  }

  const handlePlayAll = () => {
    if (setCurrentSongIndex && setShouldPlay) {
      if (isShuffleMode) {
        const shuffledSongs = shuffleArray(processedSongs)
        setCurrentSongIndex(shuffledSongs[0].songIndex)
      } else {
        setCurrentSongIndex(processedSongs[0].songIndex)
      }
      setShouldPlay(true)
      setIsPlaying(true)
    }
  }

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortOrder('asc')
    }
  }

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-zinc-700/50 to-transparent">
        <img 
          src="https://api.altan.ai/platform/media/91a43c68-06d5-4b61-8713-1384ff4e509b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
          alt="Playlist cover"
          className="w-52 h-52 shadow-lg"
        />
        <div className="flex flex-col gap-2">
          <span className="text-sm text-zinc-300">Public Playlist</span>
          <h1 className="text-7xl font-bold mb-6">Paaau</h1>
          <div className="flex items-center gap-2">
            <img 
              src="https://api.altan.ai/platform/media/91a43c68-06d5-4b61-8713-1384ff4e509b?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
              alt="User avatar"
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm font-medium">Dapao</span>
            <span className="text-sm text-zinc-300">• 8 saves • {processedSongs.length} songs</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 p-6">
        <button 
          className="w-14 h-14 rounded-full bg-[#1ed760] flex items-center justify-center shadow-xl hover:scale-105 transition"
          onClick={handlePlayAll}
        >
          <Play size={24} className="text-black ml-1" fill="black" />
        </button>
        <button 
          className={`w-14 h-14 rounded-full bg-zinc-800/80 flex items-center justify-center hover:bg-zinc-800 transition ${
            isShuffleMode ? 'text-[#1ed760]' : 'text-zinc-400'
          }`}
          onClick={() => setIsShuffleMode(!isShuffleMode)}
        >
          <Shuffle size={24} />
        </button>
        <button className="w-14 h-14 rounded-full bg-zinc-800/80 flex items-center justify-center hover:bg-zinc-800 transition">
          <MoreHorizontal size={24} className="text-zinc-400" />
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2 bg-zinc-800/80 rounded-full px-3 py-1">
          <Search size={20} className="text-zinc-400" />
          <input 
            type="text"
            placeholder="Search in playlist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-sm text-zinc-400 placeholder:text-zinc-500 focus:outline-none"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-sm text-zinc-400 hover:text-white transition flex items-center gap-1">
              {sortBy === 'date-added' ? 'Date added' : 
               sortBy === 'title' ? 'Title' :
               sortBy === 'artist' ? 'Artist' :
               sortBy === 'album' ? 'Album' : 'Duration'}
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toggleSort('date-added')}>
              Date added {sortBy === 'date-added' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleSort('title')}>
              Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleSort('artist')}>
              Artist {sortBy === 'artist' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleSort('album')}>
              Album {sortBy === 'album' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleSort('duration')}>
              Duration {sortBy === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Songs List */}
      <div className="px-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 text-sm text-zinc-400">
              <th className="w-8 pb-2 text-left">#</th>
              <th className="pb-2 text-left">Title</th>
              <th className="pb-2 text-left">Album</th>
              <th className="pb-2 text-left">Date added</th>
              <th className="w-8 pb-2 text-left">
                <Clock size={16} />
              </th>
            </tr>
          </thead>
          <tbody>
            {processedSongs.map((song, index) => (
              <tr 
                key={song.id}
                className="group hover:bg-white/5 rounded-lg cursor-pointer"
                onClick={() => handlePlaySong(song.songIndex)}
              >
                <td className="py-2 w-8">
                  <span className="text-sm text-zinc-400 group-hover:hidden">
                    {index + 1}
                  </span>
                  <Play 
                    size={16} 
                    className="text-white hidden group-hover:block" 
                  />
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <img 
                      src={song.image}
                      alt={song.title}
                      className="w-10 h-10 rounded"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{song.title}</span>
                      <div className="flex items-center gap-1">
                        {song.isVideo && (
                          <span className="text-[10px] px-1 bg-zinc-800 rounded text-zinc-400 uppercase">
                            Video
                          </span>
                        )}
                        <span className="text-sm text-zinc-400">{song.artist}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-sm text-zinc-400">{song.album}</span>
                </td>
                <td>
                  <span className="text-sm text-zinc-400">{song.addedAt}</span>
                </td>
                <td className="w-8">
                  <span className="text-sm text-zinc-400">{song.duration}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}