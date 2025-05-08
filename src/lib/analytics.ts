import { createSignal } from 'solid-js'

interface DailyStats {
  date: string
  count: number
}

const STORAGE_KEY = 'daily_visitor_stats'

export function getDailyStats(): DailyStats[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  return JSON.parse(stored)
}

export function updateDailyStats() {
  const today = new Date().toISOString().split('T')[0]
  const stats = getDailyStats()
  
  // Find today's entry
  const todayIndex = stats.findIndex(stat => stat.date === today)
  
  if (todayIndex === -1) {
    // New day, add entry
    stats.push({ date: today, count: 1 })
  } else {
    // Update existing day
    stats[todayIndex].count++
  }
  
  // Keep only last 30 days
  const recentStats = stats.slice(-30)
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recentStats))
  return recentStats
}

export function getTodayCount(): number {
  const today = new Date().toISOString().split('T')[0]
  const stats = getDailyStats()
  const todayStats = stats.find(stat => stat.date === today)
  return todayStats?.count || 0
}

export function getTotalCount(): number {
  const stats = getDailyStats()
  return stats.reduce((sum, stat) => sum + stat.count, 0)
}
