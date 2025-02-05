import { Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react"
import { Slider } from "@/components/ui/slider"

export function NowPlayingBar() {
  return (
    <div className="h-24 bg-card border-t px-4">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-4 w-[30%]">
          <div className="w-14 h-14 bg-neutral-800 rounded" />
          <div>
            <p className="text-sm font-medium">Song Title</p>
            <p className="text-xs text-muted-foreground">Artist</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2 w-[40%]">
          <div className="flex items-center gap-6">
            <button className="text-muted-foreground hover:text-primary transition">
              <Shuffle size={20} />
            </button>
            <button className="text-muted-foreground hover:text-primary transition">
              <SkipBack size={20} />
            </button>
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:scale-105 transition">
              <Play size={20} fill="black" />
            </button>
            <button className="text-muted-foreground hover:text-primary transition">
              <SkipForward size={20} />
            </button>
            <button className="text-muted-foreground hover:text-primary transition">
              <Repeat size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground">0:00</span>
            <Slider
              defaultValue={[0]}
              max={100}
              step={1}
              className="w-full"
            />
            <span className="text-xs text-muted-foreground">3:45</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-[30%] justify-end">
          <Volume2 size={20} className="text-muted-foreground" />
          <Slider
            defaultValue={[100]}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}