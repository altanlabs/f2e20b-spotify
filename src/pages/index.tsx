import { SpotifySidebar } from "@/components/blocks/spotify-sidebar"
import { NowPlayingBar } from "@/components/blocks/now-playing-bar"

export default function IndexPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-neutral-900">
          <SpotifySidebar />
        </aside>
        <main className="flex-1 bg-neutral-800 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Good Evening</h1>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-neutral-700 rounded-lg p-4">
                <div className="w-full h-32 bg-neutral-600 rounded-lg mb-2" />
                <p className="text-sm font-medium">Playlist {i + 1}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <NowPlayingBar />
    </div>
  )
}