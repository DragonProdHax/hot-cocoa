import { onMount, onCleanup } from 'solid-js'
import { gsap } from 'gsap'

interface SplitTextProps {
  text: string
  class?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines'
  from?: { opacity?: number; y?: number; x?: number }
  to?: { opacity?: number; y?: number; x?: number }
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span'
  onComplete?: () => void
}

export default function SplitText(props: SplitTextProps) {
  let containerRef: HTMLElement | undefined

  const {
    text,
    class: className = '',
    delay = 100,
    duration = 0.6,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    onComplete
  } = props

  onMount(() => {
    if (!containerRef || !text) return

    // Split text into characters, words, or lines
    const splitText = () => {
      if (splitType === 'chars') {
        return text.split('').map((char) => 
          `<span class="split-char inline-block" style="transform: translateY(${from.y || 0}px); opacity: ${from.opacity || 0};">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('')
      } else if (splitType === 'words') {
        return text.split(' ').map((word) => 
          `<span class="split-word inline-block" style="transform: translateY(${from.y || 0}px); opacity: ${from.opacity || 0};">${word}</span>`
        ).join(' ')
      } else {
        return `<span class="split-line inline-block" style="transform: translateY(${from.y || 0}px); opacity: ${from.opacity || 0};">${text}</span>`
      }
    }

    containerRef.innerHTML = splitText()
    
    // Animate the split elements
    const elements = containerRef.querySelectorAll('.split-char, .split-word, .split-line')
    
    gsap.to(elements, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      onComplete: () => {
        onComplete?.()
      }
    })
  })

  onCleanup(() => {
    if (containerRef) {
      gsap.killTweensOf(containerRef.querySelectorAll('.split-char, .split-word, .split-line'))
    }
  })

  return (
    <span 
      ref={containerRef}
      class={`split-text ${className}`}
      style={{ 
        "word-wrap": "break-word",
        "will-change": "transform, opacity"
      }}
    >
      {text}
    </span>
  )
}
