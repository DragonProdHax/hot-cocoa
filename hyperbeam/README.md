# Hyperbeam Session Manager

This server manages Hyperbeam sessions with automatic cleanup after 20 minutes.

## Features

- ✅ Create new Hyperbeam sessions
- ✅ Automatic session deletion after 20 minutes
- ✅ Track active sessions with time remaining
- ✅ Persistent session storage in `sessions.json`
- ✅ Manual session deletion
- ✅ Cleanup expired sessions on startup

## Installation

```bash
cd hyperbeam
npm install
```

## Usage

Start the server:
```bash
npm start
```

Or with auto-reload during development:
```bash
npm run dev
```

## API Endpoints

### Create Session
```bash
POST /api/session/create
```

Response:
```json
{
  "success": true,
  "session": {
    "sessionId": "abc123",
    "embedUrl": "https://...",
    "expiresAt": 1234567890,
    "timeRemaining": 1200000
  }
}
```

### Get All Sessions
```bash
GET /api/sessions
```

Response:
```json
{
  "success": true,
  "sessions": [...],
  "count": 5
}
```

### Get Specific Session
```bash
GET /api/session/:sessionId
```

### Delete Session
```bash
DELETE /api/session/:sessionId
```

### Health Check
```bash
GET /health
```

## Session Storage

Sessions are stored in `sessions.json` with the following structure:

```json
{
  "sessions": [
    {
      "sessionId": "abc123",
      "embedUrl": "https://...",
      "adminToken": "token123",
      "createdAt": 1234567890,
      "expiresAt": 1234568090,
      "status": "active"
    }
  ]
}
```

## Configuration

- **Port**: Set `HYPERBEAM_PORT` environment variable (default: 3001)
- **Session Duration**: 20 minutes (hardcoded, can be modified in server.js)
- **API Key**: Stored in server.js (consider using environment variables for production)

## Auto-Cleanup

- Sessions are automatically deleted after 20 minutes
- Expired sessions are cleaned up on server startup
- Active sessions are re-scheduled for deletion on restart
