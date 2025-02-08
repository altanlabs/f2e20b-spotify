import { Search, Bell, ChevronLeft, ChevronRight, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface AppHeaderProps {
  showBackForward?: boolean;
}

export function AppHeader({ showBackForward = true }: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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

  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-900/90 sticky top-0 z-50 backdrop-blur-sm">
      {showBackForward && (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => navigate(1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <div className="relative flex-1" ref={searchRef}>
        <div className="max-w-[400px] relative">
          <Search 
            size={20} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchResults(true)}
            className="w-full h-12 pl-10 pr-4 bg-zinc-800 rounded-full text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        {/* Search Results Dropdown */}
        {showSearchResults && searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 max-w-[400px] bg-zinc-800 rounded-lg shadow-xl">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-white mb-4">Recent searches</h3>
              {/* Add search results here */}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800">
          <Bell size={20} className="text-white" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black">
          <User size={20} className="text-white" />
        </button>
      </div>
    </div>
  )
}