import { useNavigate } from '@solidjs/router'
import { Search } from 'lucide-solid'
import { createSignal, createEffect } from 'solid-js'

export default function Home() {
  const [query, setQuery] = createSignal('')
  const [clicks, setClicks] = createSignal(0)
  const [showPassword, setShowPassword] = createSignal(false)
  const [showProxy, setShowProxy] = createSignal(false)
  const [password, setPassword] = createSignal('')
  const [currentMessageIndex, setCurrentMessageIndex] = createSignal(0)
  const messages = [
    "Check out Crazygames",
    "Customize in Settings",
    "Play Minecraft Now",
    "Browse Securely",
    "Privacy matters",
    "icic dna enyaw",
  ]
  const navigate = useNavigate()

  createEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((currentMessageIndex() + 1) % messages.length)
    }, 2000)
    return () => clearInterval(timer)
  })

  function processInput() {
    if (!query()) return
    navigate(`/route/${btoa(query())}`)
  }

  function handleClick() {
    setClicks(clicks() + 1)
    if (clicks() === 8) {
      setShowPassword(true)
    }
  }

  function checkPassword() {
    if (password() === 'pizza') {
      setShowProxy(true)
      setShowPassword(false)
    }
  }

  return (
    <div onClick={handleClick}>
      {!showPassword() && !showProxy() && (
        <div class="absolute left-1/2 top-1/2 flex w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
          <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-12 w-12">
              <title>Mocha icon</title>
              <path
                fill="currentColor"
                d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32V416c0 53 43 96 96 96H288c53 0 96-43 96-96h16c61.9 0 112-50.1 112-112s-50.1-112-112-112H352 32zm352 64h16c26.5 0 48 21.5 48 48s-21.5 48-48 48H384V256zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"
              />
            </svg>
            <h1 class="text-5xl font-semibold">Hot Chocolate</h1>
          </div>
          <h2 class="text-2xl mt-4">IS YUMMY</h2>
          <div class="flex flex-col items-center gap-2 mt-4 text-lg opacity-70">
            <p>{messages[currentMessageIndex()]}</p>
          </div>
        </div>
      )}
      {showPassword() && (
        <div class="absolute left-1/2 top-1/2 flex w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
          <input
            type="password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            class="input w-64 bg-base-300"
          />
          <button class="btn" onClick={checkPassword}>Submit</button>
        </div>
      )}
      {showProxy() && (
        <div class="absolute left-1/2 top-1/2 flex w-screen -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
          <div class="join w-1/3">
            <input
              onKeyPress={(e) => {
                if (e.key !== 'Enter') return
                processInput()
              }}
              value={query()}
              onInput={(e) => setQuery(e.target.value)}
              placeholder="Enter a search query or URL"
              type="text"
              class="input join-item w-full bg-base-300"
            />
            <button class="btn btn-square join-item bg-base-300 border-none" type="button" onClick={processInput}>
              <Search class="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}