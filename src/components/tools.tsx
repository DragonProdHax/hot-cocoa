import { createSignal } from 'solid-js'
import styles from './tools.module.css'

export default function Tools() {
  const [showContinue, setShowContinue] = createSignal(true)

  const handleContinue = () => {
    setShowContinue(false)
  }

  const handleCheckSessions = () => {
    window.open('chrome-extension://haldlgldplgnggkjaafhelgiaglafanh/popup.html', '_blank', 'width=800,height=600')
  }

  return (
    <div class={styles.toolsContainer}>
      {showContinue() ? (
        <div class={styles.continueOverlay}>
          <div class={styles.continueContent}>
            <h2>This is for school extensions</h2>
            <button onClick={handleContinue} class={styles.continueButton}>
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div class={styles.toolsContent}>
          <h1>Tools</h1>
          <div class={styles.extensionCard}>
            <img 
              src="https://support.goguardian.com/servlet/rtaImage?eid=ka04N000000ocqe&feoid=00N1K00000ed3rb&refid=0EM4N000003LlZn" 
              alt="GoGuardian"
              class={styles.extensionIcon}
            />
            <div class={styles.extensionInfo}>
              <h3>GoGuardian</h3>
              <p>Check if you're in a GoGuardian session</p>
              <button onClick={handleCheckSessions} class={styles.launchButton}>
                Check Sessions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 