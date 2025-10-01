const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');

const app = express();
const PORT = process.env.HYPERBEAM_PORT || 3001;
const HYPERBEAM_API_KEY = 'sk_live_8DHlIt16YmeWlKkh4UpdEyR2g3ZZdEGE9HP2MsOQXq0';
const SESSIONS_FILE = path.join(__dirname, 'sessions.json');
const RATE_LIMIT_FILE = path.join(__dirname, 'rate_limits.json');
const IP_ROTATION_FILE = path.join(__dirname, 'ip_rotation.json');
const SESSION_DURATION = 20 * 60 * 1000; // 20 minutes in milliseconds
const RATE_LIMIT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Proxy list for IP rotation (add your own proxy servers)
const PROXY_LIST = [
  // Add your proxy servers here in format: 'http://username:password@proxy-server:port'
  // For now using different user agents and request patterns to simulate different sources
  null, // Direct connection
  null, // Will implement with actual proxies when available
  null,
  null
];

let currentProxyIndex = 0;
let requestCount = 0;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

// Initialize sessions file if it doesn't exist
async function initSessionsFile() {
  try {
    await fs.access(SESSIONS_FILE);
  } catch {
    await fs.writeFile(SESSIONS_FILE, JSON.stringify({ sessions: [] }, null, 2));
  }
}

// Initialize rate limits file if it doesn't exist
async function initRateLimitsFile() {
  try {
    await fs.access(RATE_LIMIT_FILE);
  } catch {
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify({ rateLimits: [] }, null, 2));
  }
}

// Initialize IP rotation tracking file
async function initIPRotationFile() {
  try {
    await fs.access(IP_ROTATION_FILE);
  } catch {
    await fs.writeFile(IP_ROTATION_FILE, JSON.stringify({ 
      currentProxyIndex: 0, 
      requestCount: 0,
      lastRotation: Date.now()
    }, null, 2));
  }
}

// Read IP rotation data
async function readIPRotationData() {
  try {
    const data = await fs.readFile(IP_ROTATION_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading IP rotation data:', error);
    return { currentProxyIndex: 0, requestCount: 0, lastRotation: Date.now() };
  }
}

// Write IP rotation data
async function writeIPRotationData(data) {
  try {
    await fs.writeFile(IP_ROTATION_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing IP rotation data:', error);
  }
}

// Get next proxy and rotate if needed
async function getNextProxy() {
  const rotationData = await readIPRotationData();
  
  // Rotate IP every 4 requests
  if (rotationData.requestCount >= 4) {
    rotationData.currentProxyIndex = (rotationData.currentProxyIndex + 1) % PROXY_LIST.length;
    rotationData.requestCount = 0;
    rotationData.lastRotation = Date.now();
    await writeIPRotationData(rotationData);
    console.log(`Rotated to proxy index: ${rotationData.currentProxyIndex}`);
  }
  
  // Increment request count
  rotationData.requestCount++;
  await writeIPRotationData(rotationData);
  
  return {
    proxy: PROXY_LIST[rotationData.currentProxyIndex],
    index: rotationData.currentProxyIndex,
    requestCount: rotationData.requestCount
  };
}

// Create axios instance with rotating proxy
async function createAxiosInstance() {
  const { proxy, index, requestCount } = await getNextProxy();
  
  const config = {
    timeout: 30000,
    headers: {
      'Authorization': `Bearer ${HYPERBEAM_API_KEY}`,
      'Content-Type': 'application/json',
      // Rotate User-Agent to appear as different clients
      'User-Agent': [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
      ][index],
      // Add some randomization to headers
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': ['en-US,en;q=0.9', 'en-GB,en;q=0.9', 'en-CA,en;q=0.9'][index % 3],
      'Cache-Control': 'no-cache'
    }
  };
  
  if (proxy) {
    config.httpsAgent = new HttpsProxyAgent(proxy);
    config.httpAgent = new HttpsProxyAgent(proxy);
  }
  
  console.log(`Using proxy index ${index}, request ${requestCount}/4`);
  return axios.create(config);
}

// Read rate limits from file
async function readRateLimits() {
  try {
    const data = await fs.readFile(RATE_LIMIT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading rate limits:', error);
    return { rateLimits: [] };
  }
}

// Write rate limits to file
async function writeRateLimits(data) {
  try {
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing rate limits:', error);
  }
}

// Generate device fingerprint from request headers
function generateDeviceFingerprint(req) {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLanguage = req.headers['accept-language'] || '';
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const connection = req.headers['connection'] || '';
  
  // Create a simple hash-like fingerprint
  const fingerprint = Buffer.from(
    userAgent + acceptLanguage + acceptEncoding + connection
  ).toString('base64').substring(0, 32);
  
  return fingerprint;
}

// Check if device is rate limited
async function isDeviceRateLimited(deviceFingerprint) {
  const data = await readRateLimits();
  const now = Date.now();
  
  // Clean up expired rate limits
  data.rateLimits = data.rateLimits.filter(limit => limit.expiresAt > now);
  await writeRateLimits(data);
  
  // Check if device is currently rate limited
  const existingLimit = data.rateLimits.find(limit => limit.deviceFingerprint === deviceFingerprint);
  return existingLimit ? existingLimit.expiresAt : null;
}

// Add device to rate limit
async function addDeviceRateLimit(deviceFingerprint) {
  const data = await readRateLimits();
  const now = Date.now();
  
  // Remove any existing rate limit for this device
  data.rateLimits = data.rateLimits.filter(limit => limit.deviceFingerprint !== deviceFingerprint);
  
  // Add new rate limit
  data.rateLimits.push({
    deviceFingerprint,
    createdAt: now,
    expiresAt: now + RATE_LIMIT_DURATION
  });
  
  await writeRateLimits(data);
}

// Read sessions from file
async function readSessions() {
  try {
    const data = await fs.readFile(SESSIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading sessions:', error);
    return { sessions: [] };
  }
}

// Write sessions to file
async function writeSessions(data) {
  try {
    await fs.writeFile(SESSIONS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing sessions:', error);
  }
}

// Create a new Hyperbeam session
app.post('/api/session/create', async (req, res) => {
  try {
    // Generate device fingerprint
    const deviceFingerprint = generateDeviceFingerprint(req);
    
    // Check if device is rate limited
    const rateLimitExpiry = await isDeviceRateLimited(deviceFingerprint);
    if (rateLimitExpiry) {
      const timeRemaining = rateLimitExpiry - Date.now();
      const minutesRemaining = Math.ceil(timeRemaining / 60000);
      
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded',
        message: `You can create another session in ${minutesRemaining} minute(s). This limit is per device to prevent abuse.`,
        rateLimitExpiry,
        timeRemaining
      });
    }

    // Use rotating proxy/IP for the request
    const axiosInstance = await createAxiosInstance();
    const response = await axiosInstance.post('https://engine.hyperbeam.com/v0/vm', {});

    const sessionData = {
      sessionId: response.data.session_id,
      embedUrl: response.data.embed_url,
      adminToken: response.data.admin_token,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION,
      status: 'active',
      deviceFingerprint, // Store device fingerprint with session
    };

    // Save to sessions file
    const data = await readSessions();
    data.sessions.push(sessionData);
    await writeSessions(data);

    // Add device to rate limit
    await addDeviceRateLimit(deviceFingerprint);

    // Schedule automatic deletion
    setTimeout(() => deleteSession(sessionData.sessionId), SESSION_DURATION);

    res.json({
      success: true,
      session: {
        sessionId: sessionData.sessionId,
        embedUrl: sessionData.embedUrl,
        expiresAt: sessionData.expiresAt,
        timeRemaining: SESSION_DURATION,
      },
    });
  } catch (error) {
    console.error('Error creating session:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to create session',
      details: error.response?.data || error.message,
    });
  }
});

// Delete a specific session
async function deleteSession(sessionId) {
  try {
    // Use rotating proxy for delete requests too
    const axiosInstance = await createAxiosInstance();
    await axiosInstance.delete(`https://engine.hyperbeam.com/v0/vm/${sessionId}`);

    // Remove from sessions file
    const data = await readSessions();
    data.sessions = data.sessions.filter(s => s.sessionId !== sessionId);
    await writeSessions(data);

    console.log(`Session ${sessionId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting session ${sessionId}:`, error.response?.data || error.message);
  }
}

// API endpoint to manually delete a session
app.delete('/api/session/:sessionId', async (req, res) => {
  try {
    await deleteSession(req.params.sessionId);
    res.json({ success: true, message: 'Session deleted' });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete session',
    });
  }
});

// Get all active sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const data = await readSessions();
    const now = Date.now();

    // Update sessions with time remaining
    const activeSessions = data.sessions
      .filter(s => s.expiresAt > now)
      .map(s => ({
        sessionId: s.sessionId,
        embedUrl: s.embedUrl,
        createdAt: s.createdAt,
        expiresAt: s.expiresAt,
        timeRemaining: s.expiresAt - now,
        status: s.status,
      }));

    res.json({
      success: true,
      sessions: activeSessions,
      count: activeSessions.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sessions',
    });
  }
});

// Get a specific session
app.get('/api/session/:sessionId', async (req, res) => {
  try {
    const data = await readSessions();
    const session = data.sessions.find(s => s.sessionId === req.params.sessionId);

    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found',
      });
    }

    const now = Date.now();
    const timeRemaining = session.expiresAt - now;

    if (timeRemaining <= 0) {
      return res.status(410).json({
        success: false,
        error: 'Session expired',
      });
    }

    res.json({
      success: true,
      session: {
        sessionId: session.sessionId,
        embedUrl: session.embedUrl,
        createdAt: session.createdAt,
        expiresAt: session.expiresAt,
        timeRemaining,
        status: session.status,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch session',
    });
  }
});

// Cleanup expired sessions on startup
async function cleanupExpiredSessions() {
  try {
    const data = await readSessions();
    const now = Date.now();
    const expiredSessions = data.sessions.filter(s => s.expiresAt <= now);

    // Delete expired sessions
    for (const session of expiredSessions) {
      await deleteSession(session.sessionId);
    }

    // Schedule deletion for remaining active sessions
    const activeSessions = data.sessions.filter(s => s.expiresAt > now);
    for (const session of activeSessions) {
      const timeUntilExpiry = session.expiresAt - now;
      setTimeout(() => deleteSession(session.sessionId), timeUntilExpiry);
    }

    console.log(`Cleaned up ${expiredSessions.length} expired sessions`);
    console.log(`${activeSessions.length} active sessions remaining`);
  } catch (error) {
    console.error('Error cleaning up sessions:', error);
  }
}

// Check rate limit status for current device
app.get('/api/rate-limit/status', async (req, res) => {
  try {
    const deviceFingerprint = generateDeviceFingerprint(req);
    const rateLimitExpiry = await isDeviceRateLimited(deviceFingerprint);
    
    if (rateLimitExpiry) {
      const timeRemaining = rateLimitExpiry - Date.now();
      const minutesRemaining = Math.ceil(timeRemaining / 60000);
      
      res.json({
        success: true,
        rateLimited: true,
        expiresAt: rateLimitExpiry,
        timeRemaining,
        minutesRemaining,
        message: `You can create another session in ${minutesRemaining} minute(s)`
      });
    } else {
      res.json({
        success: true,
        rateLimited: false,
        message: 'No rate limit active for this device'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check rate limit status'
    });
  }
});

// Reset IP rotation endpoint
app.post('/api/ip-rotation/reset', async (req, res) => {
  try {
    await writeIPRotationData({
      currentProxyIndex: 0,
      requestCount: 0,
      lastRotation: Date.now()
    });
    res.json({ success: true, message: 'IP rotation reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to reset IP rotation' });
  }
});

// Get IP rotation status
app.get('/api/ip-rotation/status', async (req, res) => {
  try {
    const rotationData = await readIPRotationData();
    res.json({
      success: true,
      currentProxyIndex: rotationData.currentProxyIndex,
      requestCount: rotationData.requestCount,
      nextRotationIn: 4 - rotationData.requestCount,
      lastRotation: rotationData.lastRotation
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get IP rotation status' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Start server
async function startServer() {
  await initSessionsFile();
  await initRateLimitsFile();
  await initIPRotationFile();
  await cleanupExpiredSessions();

  app.listen(PORT, () => {
    console.log(`Hyperbeam server running on port ${PORT}`);
    console.log(`Session duration: ${SESSION_DURATION / 1000 / 60} minutes`);
    console.log(`Rate limit duration: ${RATE_LIMIT_DURATION / 1000 / 60} minutes`);
    console.log(`IP rotation: Every 4 requests`);
  });
}

startServer();
