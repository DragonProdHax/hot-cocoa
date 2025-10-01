import { createSignal } from 'solid-js'
import store from 'store2'

export interface Tab {
  id: string
  url: string
  title: string
  favicon?: string
}

const [tabs, setTabs] = createSignal<Tab[]>([])
const [activeTabId, setActiveTabId] = createSignal<string | null>(null)

// Load tabs from storage on init
const savedTabs = store.get('tabs') as Tab[] | null
if (savedTabs && savedTabs.length > 0) {
  setTabs(savedTabs)
  const savedActiveId = store.get('activeTabId') as string | null
  if (savedActiveId) {
    setActiveTabId(savedActiveId)
  } else {
    setActiveTabId(savedTabs[0].id)
  }
}

function saveTabs() {
  store.set('tabs', tabs())
  store.set('activeTabId', activeTabId())
}

export function addTab(url: string, title: string = 'New Tab', favicon?: string) {
  // Check if tab with this URL already exists
  const existingTab = tabs().find(t => t.url === url)
  if (existingTab) {
    setActiveTabId(existingTab.id)
    saveTabs()
    return existingTab.id
  }
  
  const newTab: Tab = {
    id: crypto.randomUUID(),
    url,
    title,
    favicon
  }
  
  setTabs([...tabs(), newTab])
  setActiveTabId(newTab.id)
  saveTabs()
  
  return newTab.id
}

export function removeTab(tabId: string) {
  const currentTabs = tabs()
  const tabIndex = currentTabs.findIndex(t => t.id === tabId)
  
  if (tabIndex === -1) return
  
  const newTabs = currentTabs.filter(t => t.id !== tabId)
  setTabs(newTabs)
  
  // If we're removing the active tab, switch to another
  if (activeTabId() === tabId) {
    if (newTabs.length > 0) {
      // Switch to the tab to the left, or the first tab if we removed the first one
      const newActiveIndex = Math.max(0, tabIndex - 1)
      setActiveTabId(newTabs[newActiveIndex].id)
    } else {
      setActiveTabId(null)
    }
  }
  
  saveTabs()
}

export function switchTab(tabId: string) {
  if (tabs().some(t => t.id === tabId)) {
    setActiveTabId(tabId)
    saveTabs()
  }
}

export function updateTab(tabId: string, updates: Partial<Omit<Tab, 'id'>>) {
  setTabs(tabs().map(tab => 
    tab.id === tabId ? { ...tab, ...updates } : tab
  ))
  saveTabs()
}

export function getActiveTab(): Tab | null {
  const id = activeTabId()
  if (!id) return null
  return tabs().find(t => t.id === id) || null
}

export { tabs, activeTabId }
