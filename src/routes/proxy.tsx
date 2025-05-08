import { useNavigate } from '@solidjs/router'
import { createSignal } from 'solid-js'
import { Search, Youtube, Github, Twitter, Instagram, Globe, MessageSquare } from 'lucide-solid'

interface Shortcut {
  name: string
  url: string
  icon: any
}

export default function Proxy() {
  const [url, setUrl] = createSignal('')
  const navigate = useNavigate()

  const shortcuts: Shortcut[] = [
    { name: 'YouTube', url: 'https://youtube.com', icon: Youtube },
    { name: 'GitHub', url: 'https://github.com', icon: Github },
    { name: 'Reddit', url: 'https://reddit.com', icon: Globe },
    { name: 'Discord', url: 'https://discord.com', icon: MessageSquare }
  ]

  function handleSubmit(e: Event) {
    e.preventDefault()
    if (!url()) return
    navigate(`/route/${btoa(url())}`)
  }

  function handleShortcut(url: string) {
    navigate(`/route/${btoa(url)}`)
  }

  return (
    <div class="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-8">
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-4xl font-bold">Proxy Browser</h1>
        <p class="text-lg opacity-70">Enter a URL to browse securely through the proxy.</p>
      </div>
      <form onSubmit={handleSubmit} class="flex flex-col items-center gap-4 w-full max-w-md">
        <div class="join w-full">
          <input
            type="text"
            class="input join-item w-full bg-base-300"
            placeholder="Enter a URL (e.g. https://example.com)"
            value={url()}
            onInput={e => setUrl(e.currentTarget.value)}
          />
          <button class="btn btn-square join-item bg-base-300 border-none" type="submit">
            <Search class="h-5 w-5" />
          </button>
        </div>
      </form>

      <div class="flex flex-col items-center gap-4 w-full max-w-2xl">
        <h2 class="text-2xl font-semibold">Quick Access</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {shortcuts.map((shortcut) => (
            <button
              class="btn btn-ghost flex flex-col items-center gap-2 p-4 h-auto"
              onClick={() => handleShortcut(shortcut.url)}
            >
              <shortcut.icon class="h-8 w-8" />
              <span class="font-medium">{shortcut.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 