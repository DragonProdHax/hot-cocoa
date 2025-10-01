import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import store from 'store2'
import type { ThemeData } from '../lib/types'

export default function AbstractEffects() {
  const [isAbstractTheme, setIsAbstractTheme] = createSignal(false)
  const [liquidTrails, setLiquidTrails] = createSignal<HTMLElement[]>([])

  onMount(() => {
    // Check initial theme
    const themeData = store('theme') as ThemeData
    setIsAbstractTheme(themeData.theme === 'abstract')

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.dataset.theme
      setIsAbstractTheme(currentTheme === 'abstract')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    onCleanup(() => observer.disconnect())
  })

  createEffect(() => {
    if (isAbstractTheme()) {
      createLiquidTrails()
      const interval = setInterval(createLiquidTrails, 3000)
      return () => clearInterval(interval)
    } else {
      // Clean up existing trails
      const trails = liquidTrails()
      trails.forEach(trail => trail.remove())
      setLiquidTrails([])
    }
  })

  function createLiquidTrails() {
    if (!isAbstractTheme()) return

    // Create 3-5 liquid trails at random positions
    const trailCount = Math.floor(Math.random() * 3) + 3
    
    for (let i = 0; i < trailCount; i++) {
      setTimeout(() => {
        const trail = document.createElement('div')
        trail.className = 'liquid-trail'
        trail.style.left = Math.random() * window.innerWidth + 'px'
        trail.style.animationDelay = Math.random() * 2 + 's'
        trail.style.animationDuration = (Math.random() * 4 + 6) + 's'
        
        document.body.appendChild(trail)
        
        // Remove trail after animation
        setTimeout(() => {
          if (trail.parentNode) {
            trail.remove()
          }
        }, 10000)
      }, i * 500)
    }
  }

  return null
}
