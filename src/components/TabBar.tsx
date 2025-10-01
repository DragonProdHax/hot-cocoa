import { For, Show } from 'solid-js'
import { X, Plus } from 'lucide-solid'
import { tabs, activeTabId, switchTab, removeTab, addTab } from '../lib/tabs'
import { useNavigate } from '@solidjs/router'

export default function TabBar() {
  const navigate = useNavigate()

  function handleNewTab() {
    const tabId = addTab('https://google.com', 'New Tab')
    switchTab(tabId)
    navigate('/browser')
  }

  function handleTabClick(tabId: string) {
    switchTab(tabId)
    navigate('/browser')
  }

  function handleCloseTab(e: MouseEvent, tabId: string) {
    e.stopPropagation()
    removeTab(tabId)
    
    // If no tabs left, go home
    if (tabs().length === 0) {
      navigate('/')
    }
  }

  return (
    <Show when={tabs().length > 0}>
      <div class="fixed top-0 left-0 right-0 z-50 bg-base-300 border-b border-base-content/10">
        <div class="flex items-center gap-1 px-2 py-1 overflow-x-auto">
          <For each={tabs()}>
            {(tab) => (
              <div
                class={`group flex items-center gap-2 px-3 py-2 rounded-t-lg cursor-pointer transition-colors min-w-[120px] max-w-[200px] ${
                  activeTabId() === tab.id
                    ? 'bg-base-100 text-base-content'
                    : 'bg-base-200 text-base-content/70 hover:bg-base-100/50'
                }`}
                onClick={() => handleTabClick(tab.id)}
              >
                <Show when={tab.favicon} fallback={
                  <div class="w-4 h-4 rounded-full bg-base-content/20" />
                }>
                  <img src={tab.favicon} alt="" class="w-4 h-4" />
                </Show>
                <span class="flex-1 truncate text-sm">{tab.title}</span>
                <button
                  class="opacity-0 group-hover:opacity-100 hover:bg-base-content/10 rounded p-0.5 transition-opacity"
                  onClick={(e) => handleCloseTab(e, tab.id)}
                  type="button"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            )}
          </For>
          <button
            class="flex items-center justify-center w-8 h-8 rounded hover:bg-base-200 transition-colors"
            onClick={handleNewTab}
            type="button"
            title="New tab"
          >
            <Plus class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Show>
  )
}
