import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { Play } from "lucide-react"

const FEATURED_PLAYLISTS = [
  {
    title: "Hip Hop Mix",
    image: "https://i.scdn.co/image/ab67706f00000002e0b11c208c7b59dacf9d5aab"
  },
  {
    title: "Rap Caviar",
    image: "https://i.scdn.co/image/ab67706c0000da84ae39b4e29fa5f5c2476e8fef"
  },
  {
    title: "Today's Top Hits",
    image: "https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112"
  },
  {
    title: "All Out 2010s",
    image: "https://i.scdn.co/image/ab67706f00000002f95e0d3dd06dfc0a164af156"
  },
  {
    title: "Rock Classics",
    image: "https://i.scdn.co/image/ab67706f000000025cdbe07d5c40327970f2967c"
  },
  {
    title: "Chill Hits",
    image: "https://i.scdn.co/image/ab67706f00000002d771dc645afe9b87978f832e"
  }
]

const RECENT_ALBUMS = [
  {
    title: "CALL ME IF YOU GET LOST",
    artist: "Tyler, The Creator",
    image: "https://i.scdn.co/image/ab67616d00001e02fd997b0cba8c89d34375ebe5"
  },
  {
    title: "Mr. Morale & the Big Steppers",
    artist: "Kendrick Lamar",
    image: "https://i.scdn.co/image/ab67616d00001e02530266e0d331edce0747f01a"
  },
  {
    title: "Renaissance",
    artist: "Beyoncé",
    image: "https://i.scdn.co/image/ab67616d00001e02adf47910b8c8de2ec0739a68"
  },
  {
    title: "Un Verano Sin Ti",
    artist: "Bad Bunny",
    image: "https://i.scdn.co/image/ab67616d00001e0243cc6b03b9fda8e15c57c97c"
  },
]

export default function IndexPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 p-2">
          <SpotifySidebar />
        </aside>
        <main className="flex-1 bg-gradient-to-b from-neutral-800 to-background p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Good Evening</h1>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {FEATURED_PLAYLISTS.map((playlist, i) => (
              <div 
                key={i} 
                className="bg-card/30 rounded-lg flex items-center overflow-hidden hover:bg-card/50 transition group cursor-pointer"
              >
                <img 
                  src={playlist.image} 
                  alt={playlist.title}
                  className="w-20 h-20 object-cover"
                />
                <span className="font-medium px-4">{playlist.title}</span>
                <button className="ml-auto mr-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl">
                  <Play size={24} fill="black" />
                </button>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-4">Recently Played</h2>
          <div className="grid grid-cols-4 gap-6">
            {RECENT_ALBUMS.map((album, i) => (
              <div key={i} className="bg-card rounded-lg p-4 hover:bg-card/80 transition group cursor-pointer">
                <div className="relative mb-4">
                  <img 
                    src={album.image} 
                    alt={album.title}
                    className="w-full aspect-square object-cover rounded-lg shadow-lg"
                  />
                  <button className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl">
                    <Play size={24} fill="black" />
                  </button>
                </div>
                <p className="font-semibold truncate">{album.title}</p>
                <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <NowPlayingBar />
    </div>
  )
}