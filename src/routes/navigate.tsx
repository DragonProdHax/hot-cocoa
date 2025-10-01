import { useParams } from '@solidjs/router'
import { createSignal, onMount, onCleanup } from 'solid-js'
import { Loader2, Maximize, Minimize } from 'lucide-solid'

export default function Navigate() {
  const params = useParams()
  const [embedUrl, setEmbedUrl] = createSignal<string | null>(null)
  const [loading, setLoading] = createSignal(true)
  const [error, setError] = createSignal<string | null>(null)
  const [timeRemaining, setTimeRemaining] = createSignal<number>(0)
  const [isFullscreen, setIsFullscreen] = createSignal(false)
  let sessionId: string | null = null
  let timerInterval: NodeJS.Timeout
  let iframeRef: HTMLIFrameElement | undefined

  onMount(async () => {
    try {
      // Decode the URL from params
      const targetUrl = atob(params.url)
      
      // Create Hyperbeam session
      const response = await fetch('/api/session/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.success) {
        sessionId = data.session.sessionId
        // Navigate to YouTube directly
        const youtubeUrl = 'https://www.youtube.com'
        setEmbedUrl(`${data.session.embedUrl}#${youtubeUrl}`)
        setTimeRemaining(data.session.timeRemaining)
        setLoading(false)

        // Update time remaining every second
        timerInterval = setInterval(() => {
          setTimeRemaining(prev => {
            const newTime = prev - 1000
            if (newTime <= 0) {
              clearInterval(timerInterval)
              return 0
            }
            return newTime
          })
        }, 1000)
      } else {
        // Handle rate limiting specifically
        if (response.status === 429) {
          setError(data.message || 'Rate limit exceeded. Please wait before creating another session.')
        } else {
          setError(data.error || 'Failed to create session')
        }
        setLoading(false)
      }
    } catch (err) {
      console.error('Error creating Hyperbeam session:', err)
      setError('Failed to connect to Hyperbeam server')
      setLoading(false)
    }
  })

  onCleanup(() => {
    if (timerInterval) {
      clearInterval(timerInterval)
    }
    // Don't delete session on cleanup - let it expire naturally or be manually deleted
    // Sessions will auto-delete after their 20-minute duration
  })

  function formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  function toggleFullscreen() {
    if (!iframeRef) return

    if (!document.fullscreenElement) {
      iframeRef.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch((err: any) => {
        console.error('Error entering fullscreen:', err)
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }

  onMount(() => {
    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    
    onCleanup(() => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    })
  })

  return (
    <div class="h-screen w-screen flex flex-col bg-base-100">
      {loading() && (
        <div class="flex-1 flex items-center justify-center">
          <div class="flex flex-col items-center gap-4">
            <Loader2 class="w-12 h-12 animate-spin text-primary" />
            <p class="text-lg">Creating Hyperbeam session...</p>
          </div>
        </div>
      )}

      {error() && (
        <div class="flex-1 flex items-center justify-center">
          <div class="alert alert-error max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error()}</span>
          </div>
        </div>
      )}

      {embedUrl() && !loading() && (
        <>
          {/* Timer Bar */}
          <div class="bg-base-200 px-4 py-2 flex items-center justify-between border-b border-base-300">
            <div class="flex items-center gap-2">
              <div class="badge badge-primary">Hyperbeam Session</div>
              <span class="text-sm opacity-70">Time remaining: {formatTime(timeRemaining())}</span>
            </div>
            <div class="flex items-center gap-4">
              <button
                class="btn btn-sm btn-ghost"
                onClick={toggleFullscreen}
                title={isFullscreen() ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen() ? <Minimize class="w-4 h-4" /> : <Maximize class="w-4 h-4" />}
              </button>
              <div class="text-xs opacity-50">Auto-close in {formatTime(timeRemaining())}</div>
            </div>
          </div>

          {/* Hyperbeam Iframe */}
          <iframe
            ref={iframeRef}
            src={embedUrl()!}
            class="flex-1 w-full border-0"
            allow="camera; microphone; display-capture; autoplay; clipboard-read; clipboard-write"
            title="Hyperbeam Browser"
          />
        </>
      )}
    </div>
  )
}
