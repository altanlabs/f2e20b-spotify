import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useEffect, useRef, useState } from "react"

interface NowPlayingBarProps {
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
  autoplay?: boolean;
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

export function NowPlayingBar({ currentSongIndex, setCurrentSongIndex, autoplay = false }: NowPlayingBarProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', () => {
      if (isRepeat) {
        audio.currentTime = 0
        audio.play()
      } else {
        handleNext()
      }
    })

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [isRepeat])

  // Effect to handle autoplay when song changes
  useEffect(() => {
    if (audioRef.current) {
      if (autoplay) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      } else {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [currentSongIndex, autoplay])

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

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % SONGS.length
    setCurrentSongIndex(nextIndex)
    setCurrentTime(0)
  }

  const handlePrevious = () => {
    const prevIndex = currentSongIndex === 0 ? SONGS.length - 1 : currentSongIndex - 1
    setCurrentSongIndex(prevIndex)
    setCurrentTime(0)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const currentSong = SONGS[currentSongIndex]
  const progress = (currentTime / duration) * 100 || 0

  return (
    <>
      {/* Mobile Player */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
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

      {/* Desktop Player */}
      <div className="hidden md:block h-24 bg-zinc-900 border-t border-zinc-800 px-4">
        <audio 
          ref={audioRef}
          src={currentSong.url}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-4 w-[30%]">
            <img 
              src={currentSong.image}
              alt={currentSong.title}
              className="w-14 h-14 rounded object-cover"
            />
            <div>
              <p className="text-sm font-medium">{currentSong.title}</p>
              <p className="text-xs text-zinc-400">{currentSong.artist}</p>
            </div>
            <button className="text-zinc-400 hover:text-white transition">
              <Heart size={16} />
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-2 w-[40%]">
            <div className="flex items-center gap-6">
              <button 
                className={`text-zinc-400 hover:text-white transition ${isShuffle ? 'text-[#1ed760]' : ''}`}
                onClick={() => setIsShuffle(!isShuffle)}
              >
                <Shuffle size={20} />
              </button>
              <button 
                className="text-zinc-400 hover:text-white transition"
                onClick={handlePrevious}
              >
                <SkipBack size={20} />
              </button>
              <button 
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition"
              >
                {isPlaying ? (
                  <Pause size={20} className="text-black" />
                ) : (
                  <Play size={20} className="text-black" />
                )}
              </button>
              <button 
                className="text-zinc-400 hover:text-white transition"
                onClick={handleNext}
              >
                <SkipForward size={20} />
              </button>
              <button 
                className={`text-zinc-400 hover:text-white transition ${isRepeat ? 'text-[#1ed760]' : ''}`}
                onClick={() => setIsRepeat(!isRepeat)}
              >
                <Repeat size={20} />
              </button>
            </div>
            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-zinc-400">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="w-full"
                onValueChange={handleTimeChange}
              />
              <span className="text-xs text-zinc-400">{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-[30%] justify-end">
            <Volume2 size={20} className="text-zinc-400" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24"
              onValueChange={(value) => setVolume(value[0])}
            />
          </div>
        </div>
      </div>
    </>
  )
}