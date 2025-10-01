import { consola } from 'consola'
import express from 'express'
import httpProxy from 'http-proxy'
import wisp from 'wisp-server-node'
import http from 'node:http'
import path from 'node:path'
import { build } from 'vite'
import fs from 'node:fs/promises'
import axios from 'axios'
import type { Socket } from 'node:net'

const httpServer = http.createServer()
const proxy = httpProxy.createProxyServer()

const app = express()
const port = process.env.PORT || 3003

// Hyperbeam configuration
const HYPERBEAM_API_KEY = 'sk_live_8DHlIt16YmeWlKkh4UpdEyR2g3ZZdEGE9HP2MsOQXq0'
const SESSIONS_FILE = path.join(process.cwd(), 'hyperbeam', 'sessions.json')
const RATE_LIMIT_FILE = path.join(process.cwd(), 'hyperbeam', 'rate_limits.json')
const IP_ROTATION_FILE = path.join(process.cwd(), 'hyperbeam', 'ip_rotation.json')
const SESSION_DURATION = 20 * 60 * 1000 // 20 minutes
const RATE_LIMIT_DURATION = 5 * 60 * 1000 // 5 minutes

consola.start('Building frontend')
await build()

app.use(express.json())
app.use(express.static('dist'))

// Hyperbeam helper functions
async function initFiles() {
  try {
    await fs.access(SESSIONS_FILE)
  } catch {
    await fs.writeFile(SESSIONS_FILE, JSON.stringify({ sessions: [] }, null, 2))
  }
  
  try {
    await fs.access(RATE_LIMIT_FILE)
  } catch {
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify({ rateLimits: [] }, null, 2))
  }
  
  try {
    await fs.access(IP_ROTATION_FILE)
  } catch {
    await fs.writeFile(IP_ROTATION_FILE, JSON.stringify({ 
      currentProxyIndex: 0, 
      requestCount: 0,
      lastRotation: Date.now()
    }, null, 2))
  }
}

function generateDeviceFingerprint(req: any) {
  const userAgent = req.headers['user-agent'] || ''
  const acceptLanguage = req.headers['accept-language'] || ''
  const acceptEncoding = req.headers['accept-encoding'] || ''
  const connection = req.headers['connection'] || ''
  
  return Buffer.from(`${userAgent}:${acceptLanguage}:${acceptEncoding}:${connection}`).toString('base64')
}

async function isDeviceRateLimited(deviceFingerprint: string) {
  try {
    const data = await fs.readFile(RATE_LIMIT_FILE, 'utf8')
    const rateLimits = JSON.parse(data)
    
    const now = Date.now()
    const deviceLimit = rateLimits.rateLimits.find((limit: any) => limit.deviceFingerprint === deviceFingerprint)
    
    if (deviceLimit && deviceLimit.expiry > now) {
      return deviceLimit.expiry
    }
    
    return null
  } catch (error) {
    console.error('Error checking rate limit:', error)
    return null
  }
}

async function setDeviceRateLimit(deviceFingerprint: string) {
  try {
    const data = await fs.readFile(RATE_LIMIT_FILE, 'utf8')
    const rateLimits = JSON.parse(data)
    
    const now = Date.now()
    const expiry = now + RATE_LIMIT_DURATION
    
    const existingIndex = rateLimits.rateLimits.findIndex((limit: any) => limit.deviceFingerprint === deviceFingerprint)
    
    if (existingIndex >= 0) {
      rateLimits.rateLimits[existingIndex].expiry = expiry
    } else {
      rateLimits.rateLimits.push({ deviceFingerprint, expiry })
    }
    
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(rateLimits, null, 2))
  } catch (error) {
    console.error('Error setting rate limit:', error)
  }
}

// Initialize files
await initFiles()

// Hyperbeam API routes
app.post('/api/session/create', async (req, res) => {
  try {
    const deviceFingerprint = generateDeviceFingerprint(req)
    
    const rateLimitExpiry = await isDeviceRateLimited(deviceFingerprint)
    if (rateLimitExpiry) {
      const timeRemaining = rateLimitExpiry - Date.now()
      const minutesRemaining = Math.ceil(timeRemaining / 60000)
      
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message: `You can create another session in ${minutesRemaining} minute(s). This limit is per device to prevent abuse.`,
        rateLimitExpiry,
        timeRemaining
      })
    }

    const response = await axios.post('https://engine.hyperbeam.com/v0/vm', {}, {
      headers: {
        'Authorization': `Bearer ${HYPERBEAM_API_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    const sessionData = {
      sessionId: response.data.session_id,
      embedUrl: response.data.embed_url,
      adminToken: response.data.admin_token,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION,
      timeRemaining: SESSION_DURATION
    }

    const sessionsData = JSON.parse(await fs.readFile(SESSIONS_FILE, 'utf8'))
    sessionsData.sessions.push(sessionData)
    await fs.writeFile(SESSIONS_FILE, JSON.stringify(sessionsData, null, 2))

    await setDeviceRateLimit(deviceFingerprint)

    res.json({
      success: true,
      session: sessionData
    })
  } catch (error: any) {
    console.error('Error creating session:', error.response?.data || error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to create session',
      details: error.response?.data || error.message
    })
  }
})

app.use('/cdn', (req, res) => {
  proxy.web(req, res, {
    target: 'https://assets.3kh0.net',
    changeOrigin: true,
    // @ts-ignore
    rewritePath: {
      '^/cdn': ''
    }
  })
})

app.get('*', (_req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'))
})

httpServer.on('request', (req, res) => {
  app(req, res)
})

httpServer.on('upgrade', (req, socket, head) => {
  if (req.url?.startsWith('/wisp/')) {
    wisp.routeRequest(req, socket as Socket, head)
  } else {
    socket.end()
  }
})

httpServer.on('listening', () => {
  consola.info(`Hot Chocolate with Hyperbeam API listening on http://localhost:${port}`)
})

httpServer.listen({
  port,
  host: '0.0.0.0'
})