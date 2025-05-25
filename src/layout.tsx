import { type ParentProps, onCleanup, onMount } from 'solid-js'
import { Toaster } from 'solid-toast'
import Navbar from './components/navbar'

import { handleAboutBlank } from './lib/aboutblank'
import { handleTabCloak } from './lib/cloak'
import { handlePanicKey } from './lib/panic'
import { handleTheme } from './lib/theme'
import { setupProxy } from './lib/proxy'
import { setBookmarks } from './lib/bookmarks'
import type { Bookmark } from './lib/types'
import store from 'store2'

export default function Layout(props: ParentProps) {
  onMount(async () => {
    handleTabCloak()
    handleTheme()
    handleAboutBlank()
    setBookmarks(store('bookmarks') as Bookmark[])
    await setupProxy()
    document.addEventListener('keydown', handlePanicKey)
    
    // Add beforeunload event listener
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      e.returnValue = 'Are you sure you want to leave?'
      return e.returnValue
    })
  })

  onCleanup(() => {
    document.removeEventListener('keydown', handlePanicKey)
    // Clean up beforeunload event listener
    window.removeEventListener('beforeunload', (e) => {
      e.preventDefault()
      e.returnValue = 'Are you sure you want to leave?'
      return e.returnValue
    })
  })

  return (
    <div>
      <Navbar />
      <Toaster position="top-center" />
      {props.children}
    </div>
  )
}
