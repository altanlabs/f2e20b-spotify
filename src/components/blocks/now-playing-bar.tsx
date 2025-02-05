import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useEffect, useRef, useState } from "react"

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
  }
]

export function NowPlayingBar() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const [isShuffle, setIsShuffle] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)

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

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
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
    if (isPlaying && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const handlePrevious = () => {
    const prevIndex = currentSongIndex === 0 ? SONGS.length - 1 : currentSongIndex - 1
    setCurrentSongIndex(prevIndex)
    setCurrentTime(0)
    if (isPlaying && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const currentSong = SONGS[currentSongIndex]

  return (
    <div className="h-24 bg-card border-t px-4">
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
            <p className="text-xs text-muted-foreground">{currentSong.artist}</p>
          </div>
          <button className="text-muted-foreground hover:text-primary transition">
            <Heart size={16} />
          </button>
        </div>
        
        <div className="flex flex-col items-center gap-2 w-[40%]">
          <div className="flex items-center gap-6">
            <button 
              className={`text-muted-foreground hover:text-primary transition ${isShuffle ? 'text-primary' : ''}`}
              onClick={() => setIsShuffle(!isShuffle)}
            >
              <Shuffle size={20} />
            </button>
            <button 
              className="text-muted-foreground hover:text-primary transition"
              onClick={handlePrevious}
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition"
            >
              {isPlaying ? (
                <Pause size={20} fill="black" />
              ) : (
                <Play size={20} fill="black" />
              )}
            </button>
            <button 
              className="text-muted-foreground hover:text-primary transition"
              onClick={handleNext}
            >
              <SkipForward size={20} />
            </button>
            <button 
              className={`text-muted-foreground hover:text-primary transition ${isRepeat ? 'text-primary' : ''}`}
              onClick={() => setIsRepeat(!isRepeat)}
            >
              <Repeat size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              className="w-full"
              onValueChange={handleTimeChange}
            />
            <span className="text-xs text-muted-foreground">{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-[30%] justify-end">
          <Volume2 size={20} className="text-muted-foreground" />
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
  )
}