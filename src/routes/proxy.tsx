import { useNavigate } from '@solidjs/router'
import { createSignal, onMount } from 'solid-js'
import { Search, Plus, Zap } from 'lucide-solid'
import SplitText from '../components/SplitText'
import { groqSuggestions } from '../lib/groq-suggestions'

interface Shortcut {
  name: string
  url: string
  icon: string
  bgColor: string
}

export default function Proxy() {
  const [url, setUrl] = createSignal('')
  const [shortcuts, setShortcuts] = createSignal<Shortcut[]>([])
  const [showAddModal, setShowAddModal] = createSignal(false)
  const [newShortcutName, setNewShortcutName] = createSignal('')
  const [newShortcutUrl, setNewShortcutUrl] = createSignal('')
  const [newShortcutIcon, setNewShortcutIcon] = createSignal('')
  const [searchEngine, setSearchEngine] = createSignal('google')
  const [editingShortcut, setEditingShortcut] = createSignal<number | null>(null)
  const [editName, setEditName] = createSignal('')
  const [suggestions, setSuggestions] = createSignal<string[]>([])
  const [showSuggestions, setShowSuggestions] = createSignal(false)
  const [selectedSuggestion, setSelectedSuggestion] = createSignal(-1)
  const [isLoadingSuggestions, setIsLoadingSuggestions] = createSignal(false)
  
  // Maintenance mode variables
  const [maintenance] = createSignal(false)
  const [clickCount, setClickCount] = createSignal(0)
  const [showPasswordField, setShowPasswordField] = createSignal(false)
  const [password, setPassword] = createSignal('')
  const [isAdmin, setIsAdmin] = createSignal(false)
  
  const navigate = useNavigate()
  
  let suggestionTimeout: NodeJS.Timeout

  const defaultShortcuts: Shortcut[] = [
    { 
      name: 'Google', 
      url: 'https://google.com', 
      icon: 'https://www.google.com/favicon.ico',
      bgColor: 'bg-transparent'
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com', 
      icon: 'https://www.facebook.com/favicon.ico',
      bgColor: 'bg-transparent'
    },
    { 
      name: 'Quora', 
      url: 'https://quora.com', 
      icon: 'https://www.quora.com/favicon.ico',
      bgColor: 'bg-transparent'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com', 
      icon: 'https://github.com/favicon.ico',
      bgColor: 'bg-transparent'
    }
  ]

  // Load browsing history for suggestions
  function loadBrowsingHistory(): string[] {
    const history = localStorage.getItem('browsing-history')
    return history ? JSON.parse(history) : []
  }

  // Save URL to browsing history
  function saveToBrowsingHistory(url: string) {
    const history = loadBrowsingHistory()
    const cleanUrl = url.toLowerCase().trim()
    
    // Remove if already exists to avoid duplicates
    const filtered = history.filter(item => item !== cleanUrl)
    
    // Add to beginning and limit to 50 items
    const updated = [cleanUrl, ...filtered].slice(0, 50)
    localStorage.setItem('browsing-history', JSON.stringify(updated))
  }

  // Generate AI-powered suggestions based on input
  async function generateSuggestions(input: string) {
    if (!input.trim()) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    // Clear previous timeout
    if (suggestionTimeout) {
      clearTimeout(suggestionTimeout)
    }

    // Debounce API calls
    suggestionTimeout = setTimeout(async () => {
      setIsLoadingSuggestions(true)
      
      try {
        // Get local suggestions first for instant feedback
        const history = loadBrowsingHistory()
        const currentShortcuts = shortcuts()
        const query = input.toLowerCase()
        
        const localSuggestions: string[] = []
        
        // Add matching shortcuts
        currentShortcuts.forEach((shortcut: Shortcut) => {
          if (shortcut.name.toLowerCase().includes(query) || shortcut.url.toLowerCase().includes(query)) {
            localSuggestions.push(shortcut.url)
          }
        })
        
        // Add matching history
        history.forEach(url => {
          if (url.includes(query) && !localSuggestions.includes(url)) {
            localSuggestions.push(url)
          }
        })

        // Get AI suggestions
        const aiSuggestions = await groqSuggestions.generateSuggestions(input)
        
        // Combine local and AI suggestions, prioritizing local ones
        const combinedSuggestions = [
          ...localSuggestions.slice(0, 3), // First 3 from local
          ...aiSuggestions.filter(url => !localSuggestions.includes(url)) // AI suggestions not in local
        ].slice(0, 8)

        setSuggestions(combinedSuggestions)
        setShowSuggestions(combinedSuggestions.length > 0)
        setSelectedSuggestion(-1)
      } catch (error) {
        console.error('Error generating suggestions:', error)
        // Fallback to empty suggestions on error
        setSuggestions([])
        setShowSuggestions(false)
      } finally {
        setIsLoadingSuggestions(false)
      }
    }, 300) // 300ms debounce
  }

  onMount(() => {
    const saved = localStorage.getItem('proxy-shortcuts')
    if (saved) {
      setShortcuts(JSON.parse(saved))
    } else {
      setShortcuts(defaultShortcuts)
    }
    
    const savedEngine = localStorage.getItem('search-engine')
    if (savedEngine) {
      setSearchEngine(savedEngine)
    }

    // Check if user is admin
    const adminStatus = localStorage.getItem('is-admin')
    if (adminStatus === 'true') {
      setIsAdmin(true)
    }
  })

  function handleSubmit(e: Event) {
    e.preventDefault()
    if (!url()) return
    
    const input = url().trim()
    
    // Check if it's a URL (contains . and doesn't have spaces, or starts with http)
    const isUrl = input.startsWith('http') || (input.includes('.') && !input.includes(' '))
    
    if (isUrl) {
      // Navigate to URL
      const finalUrl = input.startsWith('http') ? input : `https://${input}`
      saveToBrowsingHistory(finalUrl)
      navigate(`/route/${btoa(finalUrl)}`)
    } else {
      // Perform search
      const searchUrl = searchEngine() === 'google' 
        ? `https://www.google.com/search?q=${encodeURIComponent(input)}`
        : `https://duckduckgo.com/?q=${encodeURIComponent(input)}`
      
      saveToBrowsingHistory(searchUrl)
      navigate(`/route/${btoa(searchUrl)}`)
    }
    
    setShowSuggestions(false)
  }

  function handleSuggestionClick(suggestion: string) {
    const finalUrl = suggestion.startsWith('http') ? suggestion : `https://${suggestion}`
    setUrl(finalUrl)
    saveToBrowsingHistory(finalUrl)
    navigate(`/route/${btoa(finalUrl)}`)
    setShowSuggestions(false)
  }

  function handleInputChange(value: string) {
    setUrl(value)
    generateSuggestions(value)
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!showSuggestions()) return
    
    const suggestionCount = suggestions().length
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedSuggestion(prev => prev < suggestionCount - 1 ? prev + 1 : 0)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedSuggestion(prev => prev > 0 ? prev - 1 : suggestionCount - 1)
    } else if (e.key === 'Enter' && selectedSuggestion() >= 0) {
      e.preventDefault()
      const selected = suggestions()[selectedSuggestion()]
      handleSuggestionClick(selected)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedSuggestion(-1)
    }
  }

  function handleShortcut(url: string) {
    navigate(`/route/${btoa(url)}`)
  }

  function saveShortcuts(newShortcuts: Shortcut[]) {
    localStorage.setItem('proxy-shortcuts', JSON.stringify(newShortcuts))
    setShortcuts(newShortcuts)
  }

  function addNewShortcut() {
    if (!newShortcutName() || !newShortcutUrl()) return
    
    const finalUrl = newShortcutUrl().startsWith('http') ? newShortcutUrl() : `https://${newShortcutUrl()}`
    const iconUrl = newShortcutIcon() || `${new URL(finalUrl).origin}/favicon.ico`
    
    const newShortcut: Shortcut = {
      name: newShortcutName(),
      url: finalUrl,
      icon: iconUrl,
      bgColor: 'bg-transparent'
    }
    
    const updated = [...shortcuts(), newShortcut]
    saveShortcuts(updated)
    setNewShortcutName('')
    setNewShortcutUrl('')
    setNewShortcutIcon('')
    setShowAddModal(false)
  }

  function deleteShortcut(index: number) {
    const updated = shortcuts().filter((_, i) => i !== index)
    saveShortcuts(updated)
  }

  function updateShortcutName(index: number, newName: string) {
    const updated = shortcuts().map((shortcut, i) => 
      i === index ? { ...shortcut, name: newName } : shortcut
    )
    saveShortcuts(updated)
    setEditingShortcut(null)
    setEditName('')
  }

  function toggleSearchEngine() {
    const newEngine = searchEngine() === 'google' ? 'duckduckgo' : 'google'
    setSearchEngine(newEngine)
    localStorage.setItem('search-engine', newEngine)
  }

  function handleThisClick() {
    const newCount = clickCount() + 1
    setClickCount(newCount)
    
    if (newCount >= 5) {
      setShowPasswordField(true)
    }
  }

  function handlePasswordSubmit(e: Event) {
    e.preventDefault()
    if (password() === '1234') {
      setIsAdmin(true)
      localStorage.setItem('is-admin', 'true')
      setShowPasswordField(false)
    } else {
      setPassword('')
      setClickCount(0)
      setShowPasswordField(false)
    }
  }

  // Check if maintenance mode should be shown
  const shouldShowMaintenance = () => maintenance() && !isAdmin()

  return (
    <div class="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Maintenance Screen */}
      {shouldShowMaintenance() && (
        <div class="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-black/50 backdrop-blur-sm">
          <div class="text-center max-w-2xl">
            {/* Construction Animation */}
            <div class="mb-8 relative">
              <div class="text-8xl mb-4 animate-bounce">🚧</div>
              <div class="flex justify-center gap-4 mb-4">
                <div class="text-4xl animate-pulse" style="animation-delay: 0s">👷‍♂️</div>
                <div class="text-4xl animate-pulse" style="animation-delay: 0.5s">🔨</div>
                <div class="text-4xl animate-pulse" style="animation-delay: 1s">👷‍♀️</div>
              </div>
              <div class="text-6xl animate-bounce" style="animation-delay: 0.3s">🚧</div>
            </div>

            {/* Maintenance Message */}
            <h1 class="text-4xl font-bold text-white mb-6">
              <span 
                onClick={handleThisClick}
                class="cursor-pointer hover:text-yellow-400 transition-colors"
              >
                This
              </span> site is currently undergoing maintenance
            </h1>
            <p class="text-xl text-slate-300 mb-8">
              Please come back later
            </p>

            {/* Password Field */}
            {showPasswordField() && (
              <div class="bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border border-slate-700">
                <form onSubmit={handlePasswordSubmit}>
                  <input
                    type="password"
                    placeholder="Enter admin password"
                    class="w-full bg-slate-700 border border-slate-600 rounded px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-slate-500 mb-4"
                    value={password()}
                    onInput={(e) => setPassword(e.currentTarget.value)}
                    autofocus
                  />
                  <button
                    type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded transition-colors"
                  >
                    Access Site
                  </button>
                </form>
              </div>
            )}

            {/* Click counter hint */}
            {clickCount() > 0 && clickCount() < 5 && (
              <p class="text-sm text-slate-500 mt-4">
                {5 - clickCount()} more clicks needed...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Normal Site Content */}
      {!shouldShowMaintenance() && (
        <>

      {/* Main Content Area */}
      <div class="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo */}
        <div class="mb-12">
          <div class="flex items-center gap-2 text-white">
            <Zap class="w-8 h-8 text-yellow-400" fill="currentColor" />
            <SplitText 
              text="Proxy"
              class="text-3xl font-bold"
              delay={50}
              duration={0.8}
              ease="back.out(1.7)"
              splitType="chars"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              tag="span"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div class="w-full max-w-2xl mb-12 relative">
          <form onSubmit={handleSubmit}>
            <div class="relative">
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                <button 
                  type="button"
                  onClick={toggleSearchEngine}
                  class="hover:scale-110 transition-transform"
                >
                  <img 
                    src={searchEngine() === 'google' ? 'https://www.google.com/favicon.ico' : 'https://duckduckgo.com/favicon.ico'} 
                    alt={searchEngine() === 'google' ? 'Google' : 'DuckDuckGo'} 
                    class="w-5 h-5"
                  />
                </button>
              </div>
              <input
                type="text"
                class="w-full bg-slate-800 border border-slate-700 rounded-full py-4 pl-14 pr-16 text-white placeholder-slate-400 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                placeholder={`Search ${searchEngine() === 'google' ? 'Google' : 'DuckDuckGo'} or type URL`}
                value={url()}
                onInput={e => handleInputChange(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => generateSuggestions(url())}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />
              <button 
                type="submit"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <Search class="h-5 w-5" />
              </button>
            </div>
          </form>
          
          {/* Suggestions Dropdown */}
          {(showSuggestions() || isLoadingSuggestions()) && (
            <div class="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {isLoadingSuggestions() && suggestions().length === 0 && (
                <div class="px-4 py-3 text-slate-400 text-sm flex items-center gap-3">
                  <div class="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating suggestions...</span>
                </div>
              )}
              {suggestions().map((suggestion, index) => (
                <button
                  class={`w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0 ${
                    selectedSuggestion() === index ? 'bg-slate-700' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedSuggestion(index)}
                >
                  <div class="flex items-center gap-3">
                    <Search class="w-4 h-4 text-slate-400" />
                    <span class="text-white text-sm truncate">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Access Icons */}
        <div class="flex items-center gap-8">
        {shortcuts().map((shortcut: Shortcut, index: number) => (
          <div class="flex flex-col items-center gap-2 relative group">
            <div class="relative">
              <button
                class={`w-16 h-16 ${shortcut.bgColor} rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg border border-slate-600`}
                onClick={() => handleShortcut(shortcut.url)}
              >
                <img 
                  src={shortcut.icon} 
                  alt={shortcut.name}
                  class="w-8 h-8"
                  onError={(e) => {
                    // Fallback to text if icon fails to load
                    e.currentTarget.style.display = 'none'
                    const parent = e.currentTarget.parentElement
                    if (parent) {
                      parent.innerHTML = `<span class="text-white font-bold text-lg">${shortcut.name[0]}</span>`
                    }
                  }}
                />
              </button>
              
              {/* Edit/Delete buttons on hover */}
              <div class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-700"
                  onClick={() => {
                    setEditingShortcut(index)
                    setEditName(shortcut.name)
                  }}
                >
                  ✎
                </button>
                <button
                  class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-700"
                  onClick={() => deleteShortcut(index)}
                >
                  ×
                </button>
              </div>
            </div>
            
            {editingShortcut() === index ? (
              <input
                type="text"
                value={editName()}
                onInput={(e) => setEditName(e.currentTarget.value)}
                onBlur={() => updateShortcutName(index, editName())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateShortcutName(index, editName())
                  }
                  if (e.key === 'Escape') {
                    setEditingShortcut(null)
                    setEditName('')
                  }
                }}
                class="text-slate-400 text-sm font-medium bg-slate-700 border border-slate-600 rounded px-2 py-1 text-center w-20"
                autofocus
              />
            ) : (
              <span class="text-slate-400 text-sm font-medium">{shortcut.name}</span>
            )}
          </div>
        ))}
        
        {/* Add New Button */}
        <div class="flex flex-col items-center gap-2">
          <button 
            class="w-16 h-16 bg-transparent rounded-full flex items-center justify-center hover:scale-110 transition-transform border-2 border-dashed border-slate-600"
            onClick={() => setShowAddModal(true)}
          >
            <Plus class="h-8 w-8 text-slate-400" />
          </button>
          <span class="text-slate-400 text-sm font-medium">New</span>
        </div>
      </div>
      </div>

      {/* Add Shortcut Modal */}
      {showAddModal() && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-slate-800 rounded-lg p-6 w-96">
            <h3 class="text-xl font-bold text-white mb-4">Add New Shortcut</h3>
            <div class="space-y-4">
              <input
                type="text"
                placeholder="Name (e.g. YouTube)"
                class="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
                value={newShortcutName()}
                onInput={(e) => setNewShortcutName(e.currentTarget.value)}
              />
              <input
                type="text"
                placeholder="URL (e.g. youtube.com)"
                class="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
                value={newShortcutUrl()}
                onInput={(e) => setNewShortcutUrl(e.currentTarget.value)}
              />
              <input
                type="text"
                placeholder="Icon URL (optional - will use favicon if empty)"
                class="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-400"
                value={newShortcutIcon()}
                onInput={(e) => setNewShortcutIcon(e.currentTarget.value)}
              />
              <div class="flex gap-2">
                <button
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                  onClick={addNewShortcut}
                >
                  Add
                </button>
                <button
                  class="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded transition-colors"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  )
} 