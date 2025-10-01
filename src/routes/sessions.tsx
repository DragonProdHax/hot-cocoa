import { createSignal, onMount, For, Show } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { Clock, Trash2, Play, RefreshCw } from 'lucide-solid'

interface Session {
  sessionId: string
  embedUrl: string
  createdAt: number
  expiresAt: number
  timeRemaining: number
  status: string
}

export default function Sessions() {
  const [sessions, setSessions] = createSignal<Session[]>([])
  const [loading, setLoading] = createSignal(true)
  const [error, setError] = createSignal<string | null>(null)
  const navigate = useNavigate()

  async function fetchSessions() {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/api/sessions')
      const data = await response.json()

      if (data.success) {
        setSessions(data.sessions)
        setError(null)
      } else {
        setError(data.error || 'Failed to fetch sessions')
      }
    } catch (err) {
      console.error('Error fetching sessions:', err)
      setError('Failed to connect to Hyperbeam server')
    } finally {
      setLoading(false)
    }
  }

  async function deleteSession(sessionId: string) {
    try {
      const response = await fetch(`http://localhost:3001/api/session/${sessionId}`, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (data.success) {
        // Remove from list
        setSessions(sessions().filter(s => s.sessionId !== sessionId))
      }
    } catch (err) {
      console.error('Error deleting session:', err)
    }
  }

  function resumeSession(session: Session) {
    // Navigate to a resume page with the session ID
    navigate(`/resume/${session.sessionId}`)
  }

  function formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString()
  }

  onMount(() => {
    fetchSessions()
    // Refresh every 5 seconds
    const interval = setInterval(fetchSessions, 5000)
    return () => clearInterval(interval)
  })

  return (
    <div class="min-h-screen p-8">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-4xl font-bold mb-2">Active Sessions</h1>
            <p class="text-base-content/70">Manage your Hyperbeam browser sessions</p>
          </div>
          <button
            class="btn btn-primary"
            onClick={fetchSessions}
            disabled={loading()}
          >
            <RefreshCw class={`w-4 h-4 ${loading() ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {error() && (
          <div class="alert alert-error mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error()}</span>
          </div>
        )}

        <Show
          when={!loading() && sessions().length > 0}
          fallback={
            <div class="text-center py-12">
              {loading() ? (
                <div class="flex flex-col items-center gap-4">
                  <span class="loading loading-spinner loading-lg"></span>
                  <p class="text-base-content/70">Loading sessions...</p>
                </div>
              ) : (
                <div class="flex flex-col items-center gap-4">
                  <p class="text-xl text-base-content/70">No active sessions</p>
                  <button
                    class="btn btn-primary"
                    onClick={() => navigate('/youtube')}
                  >
                    Create New Session
                  </button>
                </div>
              )}
            </div>
          }
        >
          <div class="grid gap-4">
            <For each={sessions()}>
              {(session) => (
                <div class="card bg-base-200 shadow-xl">
                  <div class="card-body">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h2 class="card-title mb-2">
                          Session {session.sessionId.substring(0, 8)}...
                          <div class="badge badge-success">Active</div>
                        </h2>
                        <div class="space-y-2 text-sm">
                          <div class="flex items-center gap-2 text-base-content/70">
                            <Clock class="w-4 h-4" />
                            <span>Created: {formatDate(session.createdAt)}</span>
                          </div>
                          <div class="flex items-center gap-2 text-base-content/70">
                            <Clock class="w-4 h-4" />
                            <span>Expires: {formatDate(session.expiresAt)}</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <div class="badge badge-primary">
                              Time Remaining: {formatTime(session.timeRemaining)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button
                          class="btn btn-primary btn-sm"
                          onClick={() => resumeSession(session)}
                          title="Resume Session"
                        >
                          <Play class="w-4 h-4" />
                          Resume
                        </button>
                        <button
                          class="btn btn-error btn-sm"
                          onClick={() => deleteSession(session.sessionId)}
                          title="Delete Session"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>

        <div class="mt-8 text-center text-sm text-base-content/50">
          Sessions automatically refresh every 5 seconds
        </div>
      </div>
    </div>
  )
}
