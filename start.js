'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execFileSync } = require('child_process');

const ROOT = __dirname;
const BACKEND_DIR = path.join(ROOT, 'pokemon-showdown');
const BACKEND_PORT = parseInt(process.env.BACKEND_PORT || '8000', 10);
const FRONTEND_PORT = parseInt(process.env.PORT || '8080', 10);
const FRONTEND_HOST = process.env.HOST || '0.0.0.0';

for (const relDir of [
  'logs/repl',
  'logs/chat',
  'logs/modlog',
  'logs/randbats',
  'logs/tickets',
  'databases',
  'config/chat-plugins',
  'config/avatars',
  'config/ladders',
]) {
  fs.mkdirSync(path.join(BACKEND_DIR, relDir), { recursive: true });
}

if (!fs.existsSync(path.join(BACKEND_DIR, 'dist', 'sim', 'dex.js'))) {
  console.log('[start] pokemon-showdown/dist no encontrado, compilando...');
  execFileSync(process.execPath, ['build'], { cwd: BACKEND_DIR, stdio: 'inherit' });
}

const backendEnv = {
  ...process.env,
  PORT: String(BACKEND_PORT),
  PSPORT: String(BACKEND_PORT),
  LOW_MEMORY: process.env.LOW_MEMORY || (process.env.RENDER ? '1' : ''),
};

console.log(`[start] Arrancando backend Pokemon Z en 127.0.0.1:${BACKEND_PORT}...`);
const backend = spawn(
  process.execPath,
  [path.join(BACKEND_DIR, 'pokemon-showdown'), 'start', String(BACKEND_PORT), '--skip-build'],
  { cwd: BACKEND_DIR, env: backendEnv, stdio: 'inherit' }
);

let frontend = null;
let shuttingDown = false;

function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  if (frontend && !frontend.killed) frontend.kill('SIGTERM');
  if (backend && !backend.killed) backend.kill('SIGTERM');
  setTimeout(() => process.exit(code), 300);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

backend.on('exit', code => {
  if (!shuttingDown) {
    console.error(`[start] El backend se detuvo (code=${code})`);
    shutdown(code || 1);
  }
});

function waitForBackend(timeoutMs = 30000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    function probe() {
      const req = http.get(`http://127.0.0.1:${BACKEND_PORT}/showdown/info`, res => {
        res.resume();
        if (res.statusCode === 200) return resolve();
        retry();
      });
      req.on('error', retry);
      req.setTimeout(1500, () => {
        req.destroy();
        retry();
      });
    }
    function retry() {
      if (shuttingDown) return;
      if (Date.now() > deadline) return reject(new Error('Timeout esperando al backend'));
      setTimeout(probe, 250);
    }
    probe();
  });
}

waitForBackend()
  .then(() => {
    console.log(`[start] Backend listo. Arrancando cliente y proxy en ${FRONTEND_HOST}:${FRONTEND_PORT}...`);
    frontend = spawn(process.execPath, [path.join(ROOT, 'serve_client.js')], {
      cwd: ROOT,
      env: {
        ...process.env,
        HOST: FRONTEND_HOST,
        PORT: String(FRONTEND_PORT),
        BACKEND_HOST: '127.0.0.1',
        BACKEND_PORT: String(BACKEND_PORT),
      },
      stdio: 'inherit',
    });
    frontend.on('exit', code => {
      if (!shuttingDown) {
        console.error(`[start] El cliente web se detuvo (code=${code})`);
        shutdown(code || 1);
      }
    });
  })
  .catch(err => {
    console.error('[start] Error arrancando:', err.message);
    shutdown(1);
  });
