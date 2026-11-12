'use strict';
const http = require('http');
const net = require('net');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const BACKEND_HOST = process.env.BACKEND_HOST || '127.0.0.1';
const BACKEND_PORT = process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT, 10) : 8000;
const PUBLIC_DIR = path.resolve(__dirname, 'pokemon-showdown-client/play.pokemonshowdown.com');
const EDGE_CLIENT_ORIGIN = process.env.EDGE_CLIENT_ORIGIN === 'off'
  ? ''
  : (process.env.EDGE_CLIENT_ORIGIN || (process.env.RENDER ? 'https://pokemonz-showdown.pages.dev' : '')).replace(/\/+$/, '');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.map': 'application/json',
};

const COMPRESSIBLE_EXTS = new Set(['.html', '.js', '.mjs', '.css', '.json', '.svg', '.map']);
const ASSET_CACHE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.mp3', '.ogg', '.wav', '.webm', '.mp4']);
const compressedCache = new Map();
const MAX_CACHE_ENTRIES = 120;

function getCacheControl(ext, rawUrl) {
  if (ext === '.html') return 'no-cache';
  if (rawUrl.includes('?')) return 'public, max-age=31536000, immutable';
  if (ASSET_CACHE_EXTS.has(ext)) return 'public, max-age=604800';
  return 'public, max-age=3600';
}

function sendCompressed(req, res, status, baseHeaders, filePath, ext, stats, data) {
  const acceptEncoding = String(req.headers['accept-encoding'] || '');
  let encoding = '';
  if (COMPRESSIBLE_EXTS.has(ext) && data.length >= 1024) {
    if (/\bbr\b/.test(acceptEncoding)) encoding = 'br';
    else if (/\bgzip\b/.test(acceptEncoding)) encoding = 'gzip';
  }

  if (!encoding) {
    res.writeHead(status, baseHeaders);
    return res.end(data);
  }

  const cacheKey = `${filePath}:${stats.size}:${Math.floor(stats.mtimeMs)}:${encoding}`;
  const cached = compressedCache.get(cacheKey);
  if (cached) {
    res.writeHead(status, { ...baseHeaders, 'Content-Encoding': encoding, 'Vary': 'Accept-Encoding' });
    return res.end(cached);
  }

  const onDone = (compErr, compData) => {
    if (compErr || !compData) {
      res.writeHead(status, baseHeaders);
      return res.end(data);
    }
    if (compressedCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = compressedCache.keys().next().value;
      if (oldestKey) compressedCache.delete(oldestKey);
    }
    compressedCache.set(cacheKey, compData);
    res.writeHead(status, { ...baseHeaders, 'Content-Encoding': encoding, 'Vary': 'Accept-Encoding' });
    res.end(compData);
  };

  if (encoding === 'br') {
    zlib.brotliCompress(data, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 } }, onDone);
  } else {
    zlib.gzip(data, { level: 6 }, onDone);
  }
}

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) return xff;
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress.replace(/^::ffff:/, '') : '127.0.0.1';
}

function proxyHttpToBackend(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    });
    return res.end();
  }
  const headers = {
    ...req.headers,
    host: `${BACKEND_HOST}:${BACKEND_PORT}`,
    'x-forwarded-for': getClientIp(req),
  };
  const proxyReq = http.request({
    hostname: BACKEND_HOST,
    port: BACKEND_PORT,
    path: req.url,
    method: req.method,
    headers,
  }, proxyRes => {
    const resHeaders = { ...proxyRes.headers };
    if (!resHeaders['access-control-allow-origin']) {
      resHeaders['access-control-allow-origin'] = '*';
    }
    res.writeHead(proxyRes.statusCode || 502, resHeaders);
    proxyRes.pipe(res, { end: true });
  });
  proxyReq.on('error', err => {
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    res.end('Backend proxy error: ' + err.message);
  });
  req.pipe(proxyReq, { end: true });
}

const server = http.createServer((req, res) => {
  const rawUrl = req.url || '/';
  if (rawUrl === '/showdown' || rawUrl.startsWith('/showdown/') || rawUrl.startsWith('/showdown?') || rawUrl.startsWith('/avatars/')) {
    return proxyHttpToBackend(req, res);
  }
  if (rawUrl.startsWith('/fx/') && !rawUrl.includes('..')) {
    const safePath = rawUrl.replace(/[\r\n]/g, '');
    res.writeHead(301, {
      'Location': `https://play.pokemonshowdown.com${safePath}`,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    });
    return res.end();
  }

  if (EDGE_CLIENT_ORIGIN) {
    const reqHost = String(req.headers.host || '').split(':')[0].toLowerCase();
    const userAgent = String(req.headers['user-agent'] || '');
    if (rawUrl === '/healthz' || userAgent.startsWith('Render/')) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('ok');
    }
    if (reqHost.endsWith('.onrender.com')) {
      const cleaned = rawUrl.replace(/[\r\n]/g, '');
      const safeTarget = (cleaned.startsWith('/') && !cleaned.startsWith('//')) ? cleaned : '/';
      res.writeHead(302, {
        'Location': `${EDGE_CLIENT_ORIGIN}${safeTarget}`,
        'Cache-Control': 'no-store',
      });
      return res.end();
    }
  }

  let urlPath;
  try {
    urlPath = decodeURIComponent(rawUrl.split('?')[0]);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Bad Request');
  }
  const normalizedPath = urlPath === '/self-host' || urlPath === '/self-host/' ? '/self-host.html' : urlPath;
  const relPath = normalizedPath === '/' ? 'index.html' : normalizedPath.replace(/^\/+/, '');
  let filePath = path.resolve(PUBLIC_DIR, relPath);

  // Prevent directory traversal outside PUBLIC_DIR
  if (filePath !== PUBLIC_DIR && !filePath.startsWith(PUBLIC_DIR + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      return fs.stat(filePath, (dirErr, dirStats) => {
        if (dirErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('Not Found: ' + urlPath);
        }
        serveFile(dirStats);
      });
    }
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not Found: ' + urlPath);
    }
    serveFile(stats);
  });

  function serveFile(stats) {
    const ext = path.extname(filePath).toLowerCase();
    const etag = `"${stats.size}-${Math.floor(stats.mtimeMs)}"`;
    const baseHeaders = {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': getCacheControl(ext, rawUrl),
      'ETag': etag,
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };

    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, baseHeaders);
      return res.end();
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Not Found: ' + urlPath);
      }
      sendCompressed(req, res, 200, baseHeaders, filePath, ext, stats, data);
    });
  }
});

// Proxy WebSocket connections on /showdown* directly to the Pokemon Showdown backend
server.on('upgrade', (req, clientSocket, head) => {
  const rawUrl = req.url || '';
  if (!rawUrl.startsWith('/showdown')) {
    clientSocket.destroy();
    return;
  }
  const upstream = net.connect(BACKEND_PORT, BACKEND_HOST, () => {
    const lines = [`${req.method} ${req.url} HTTP/${req.httpVersion}`];
    let hasXff = false;
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      const name = req.rawHeaders[i];
      const val = req.rawHeaders[i + 1];
      if (name.toLowerCase() === 'host') {
        lines.push(`${name}: ${BACKEND_HOST}:${BACKEND_PORT}`);
      } else {
        if (name.toLowerCase() === 'x-forwarded-for') hasXff = true;
        lines.push(`${name}: ${val}`);
      }
    }
    if (!hasXff) {
      lines.push(`X-Forwarded-For: ${getClientIp(req)}`);
    }
    lines.push('', '');
    upstream.write(lines.join('\r\n'));
    if (head && head.length) upstream.write(head);
    upstream.pipe(clientSocket);
    clientSocket.pipe(upstream);
  });

  const cleanup = () => {
    clientSocket.destroy();
    upstream.destroy();
  };
  upstream.on('error', cleanup);
  clientSocket.on('error', cleanup);
});

server.listen(PORT, HOST, () => {
  console.log(`Pokemon Z client serving ${PUBLIC_DIR} at http://localhost:${PORT} (listening on ${HOST}, WS proxy -> ${BACKEND_HOST}:${BACKEND_PORT})`);
});
