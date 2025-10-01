import { consola } from 'consola'
import express from 'express'
import httpProxy from 'http-proxy'
import wisp from 'wisp-server-node'
import http from 'node:http'
import path from 'node:path'
import { build } from 'vite'
import { spawn } from 'node:child_process'
import type { Socket } from 'node:net'

const httpServer = http.createServer()
const proxy = httpProxy.createProxyServer()

const app = express()
const port = process.env.PORT || 3003

consola.start('Building frontend')
await build()

// Start hyperbeam server
consola.start('Starting Hyperbeam server')
const hyperbeamProcess = spawn('npm', ['start'], {
  cwd: path.join(process.cwd(), 'hyperbeam'),
  stdio: 'inherit',
  env: { ...process.env, HYPERBEAM_PORT: '3001' }
})

hyperbeamProcess.on('error', (err) => {
  consola.error('Failed to start Hyperbeam server:', err)
})

app.use(express.static('dist'))

// Proxy hyperbeam API requests to the hyperbeam server
app.use('/api', (req, res) => {
  proxy.web(req, res, {
    target: 'http://localhost:3001',
    changeOrigin: true
  })
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
  consola.info(`Hot Chocolate listening on http://localhost:${port}`)
  consola.info(`Hyperbeam server running on port 3001`)
})

// Clean up hyperbeam process on exit
process.on('SIGINT', () => {
  hyperbeamProcess.kill()
  process.exit()
})

process.on('SIGTERM', () => {
  hyperbeamProcess.kill()
  process.exit()
})

httpServer.listen({
  port,
  host: '0.0.0.0'
})