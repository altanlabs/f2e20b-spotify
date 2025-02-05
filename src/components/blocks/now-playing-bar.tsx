import { Play, Pause } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface NowPlayingBarProps {
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
}

const SONGS = [
  {
    title: "LIKE HIM",
    artist: "Tyler, The Creator",
    image: "https://api.altan.ai/platform/media/12179ebc-da1b-43f2-bacd-5c7c26dac31d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    url: "https://api.altan.ai/platform/media/06fa91af-bc9e-4b01-9471-a8e0606ebc5e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "Me Porto Bonito",
    artist: "Bad Bunny",
    image: "https://api.altan.ai/platform/media/c676d466-ee2a-47f7-8894-96974602fd2d?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    url: "https://api.altan.ai/platform/media/d2f6b6cc-99bf-48ca-9d86-b890f654f6e5?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "SWEET / I THOUGHT YOU WANTED TO DANCE",
    artist: "Tyler, The Creator",
    image: "https://api.altan.ai/platform/media/9bdf3745-52a4-4209-b658-ff976d70a60e?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    url: "https://api.altan.ai/platform/media/91e4e836-737e-443e-af7b-d17e0da5c1a2?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "N95",
    artist: "Kendrick Lamar",
    image: "https://api.altan.ai/platform/media/c98f714f-1ea8-4ee3-b8ee-2ce1feb827cd?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    url: "https://api.altan.ai/platform/media/cf0646e0-bf34-4a29-850c-eaedf89dca12?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  },
  {
    title: "Islands",
    artist: "фрози",
    image: "https://api.altan.ai/platform/media/838c6502-ab0a-49b7-8d25-3c317cb8bdd6?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c",
    url: "https://api.altan.ai/platform/media/04598345-e5ba-452f-9c3f-a705f28f6ca8?account_id=023bdd30-62a4-468e-bc37-64aaec2a040c"
  }
]

export function NowPlayingBar({ currentSongIndex, setCurrentSongIndex }: NowPlayingBarProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', () => {
      setIsPlaying(false)
    })

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }, [currentSongIndex])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
      setIsPlaying(!isPlaying)
    }
  }

  const currentSong = SONGS[currentSongIndex]
  const progress = (currentTime / duration) * 100 || 0

  return (
    <div className="fixed bottom-0 left-0 right-0">
      {/* Progress Bar */}
      <div className="h-1 bg-[#535353]">
        <div 
          className="h-full bg-[#1ed760]" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Player */}
      <div className="bg-[#282828] px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={currentSong.image}
            alt={currentSong.title}
            className="w-10 h-10 rounded-sm object-cover"
          />
          <div>
            <p className="text-sm font-medium text-white">{currentSong.title}</p>
            <p className="text-xs text-[#b3b3b3]">{currentSong.artist}</p>
          </div>
        </div>
        
        <audio 
          ref={audioRef}
          src={currentSong.url}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        <button 
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause size={18} className="text-black" />
          ) : (
            <Play size={18} className="text-black ml-0.5" />
          )}
        </button>
      </div>
    </div>
  )
}