import { useNavigate } from '@solidjs/router'

export default function YouTube() {
  const navigate = useNavigate()

  function launchYouTube() {
    navigate(`/navigate/${btoa('https://youtube.com')}`)
  }

  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-white mb-8">YouTube</h1>
        <button 
          class="btn btn-primary btn-lg"
          onClick={launchYouTube}
        >
          Launch YouTube in Hyperbeam
        </button>
        <p class="text-sm text-white/50 mt-4">Opens in a shared browser session</p>
      </div>
    </div>
  )
}
