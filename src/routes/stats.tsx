import { createSignal, onMount } from 'solid-js'
import { getTodayCount, updateDailyStats } from '../lib/analytics'
import { Users } from 'lucide-solid'

export default function Stats() {
  const [todayCount, setTodayCount] = createSignal(getTodayCount())

  onMount(() => {
    // Update stats when page loads
    updateDailyStats()
    setTodayCount(getTodayCount())
  })

  return (
    <div class="flex flex-col items-center justify-center min-h-[60vh] gap-8 p-8">
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-4xl font-bold">Today's Visitors</h1>
        <p class="text-lg opacity-70">Number of visitors today</p>
      </div>

      <div class="stat bg-base-300 rounded-box">
        <div class="stat-figure text-primary">
          <Users class="h-12 w-12" />
        </div>
        <div class="stat-value text-primary text-6xl">{todayCount()}</div>
        <div class="stat-title">Visitors Today</div>
      </div>
    </div>
  )
} 