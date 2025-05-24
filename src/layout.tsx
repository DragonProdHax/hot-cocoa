import { type ParentProps, onCleanup, onMount, Show, createSignal } from 'solid-js'
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
  const [showIframe, setShowIframe] = createSignal(false);

  onMount(async () => {
    if (localStorage.getItem('passed') !== 'true') {
      setShowIframe(true);
      return;
    }
    
    handleTabCloak()
    handleTheme()
    handleAboutBlank()
    setBookmarks(store('bookmarks') as Bookmark[])
    await setupProxy()
    document.addEventListener('keydown', handlePanicKey)
  })

  onCleanup(() => {
    document.removeEventListener('keydown', handlePanicKey)
  })

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Show when={!showIframe()}>
        <div>
          <Navbar />
          <Toaster position="top-center" />
          {props.children}
        </div>
      </Show>
      <Show when={showIframe()}>
        <iframe 
          src="/no.html" 
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            'z-index': 9999
          }}
        />
      </Show>
    </div>
  )
}
