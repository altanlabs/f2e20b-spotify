import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"
import { Play } from "lucide-react"

const FEATURED_PLAYLISTS = [
  {
    title: "Hip Hop Mix",
    image: "https://i.scdn.co/image/ab67706f00000002ca5a7517156021292e5663a6"
  },
  {
    title: "Rap Caviar",
    image: "https://i.scdn.co/image/ab67706c0000da84bfb6d68ea62c811b9ba9dd64"
  },
  {
    title: "Today's Top Hits",
    image: "https://i.scdn.co/image/ab67706f000000025e25b1d241f1d60e74f06550"
  },
  {
    title: "All Out 2010s",
    image: "https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1"
  },
  {
    title: "Rock Classics",
    image: "https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e"
  },
  {
    title: "Chill Hits",
    image: "https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe"
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
    image: "https://i.scdn.co/image/ab67616d00001e02cd996ddf03ad77b0380549da"
  },
  {
    title: "Renaissance",
    artist: "Beyoncé",
    image: "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72"
  },
  {
    title: "Un Verano Sin Ti",
    artist: "Bad Bunny",
    image: "https://i.scdn.co/image/ab67616d00001e0249d694203245f241a1bcaa72"
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