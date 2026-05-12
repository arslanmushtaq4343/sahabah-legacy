import { chromium } from 'playwright';
import { spawn, spawnSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const PORT = Number(process.env.QA_PORT || 4173);
const HOST = '127.0.0.1';
const BASE_URL = process.env.BASE_URL || `http://${HOST}:${PORT}`;
const OUT_DIR = process.env.QA_OUT_DIR || path.join('artifacts', 'responsive');

const routes = [
  '/',
  '/companions',
  '/connections',
  '/insights',
  '/imams',
  '/library',
  '/today',
  '/voices',
  '/compass',
  '/study',
  '/timeline',
  '/library/quran-triggers',
  '/library/laqab',
  '/library/deaths',
  '/library/last-words',
];

const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const modes = [
  { name: 'day', tahajjud: false },
  { name: 'night', tahajjud: true },
];

function npmCmd() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

function previewCommand() {
  if (process.platform !== 'win32') {
    return {
      command: npmCmd(),
      args: ['run', 'preview', '--', '--host', HOST, '--port', String(PORT)],
    };
  }

  return {
    command: process.env.ComSpec || 'cmd.exe',
    args: [
      '/d',
      '/s',
      '/c',
      `${npmCmd()} run preview -- --host ${HOST} --port ${PORT}`,
    ],
  };
}

function routeSlug(route) {
  return route === '/' ? 'home' : route.replace(/^\/+/, '').replace(/[/:]+/g, '-');
}

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();
  let lastError;
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch (error) {
      lastError = error;
    }
    await new Promise(resolve => setTimeout(resolve, 400));
  }
  throw new Error(`Timed out waiting for ${url}${lastError ? `: ${lastError.message}` : ''}`);
}

async function startPreviewIfNeeded() {
  if (process.env.BASE_URL) return null;

  const preview = previewCommand();
  const child = spawn(preview.command, preview.args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: false,
    windowsHide: true,
  });

  child.stdout.on('data', data => process.stdout.write(data));
  child.stderr.on('data', data => process.stderr.write(data));

  await waitForServer(BASE_URL);
  return child;
}

async function captureRoute(browser, route, viewport, mode) {
  const context = await browser.newContext({ viewport });
  await context.addInitScript(value => {
    window.localStorage.setItem('tahajjud_mode', String(value));
  }, mode.tahajjud);

  const page = await context.newPage();
  const url = new URL(route, BASE_URL).toString();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(500);

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    return {
      scrollWidth: Math.max(doc.scrollWidth, body?.scrollWidth || 0),
      clientWidth: doc.clientWidth,
      title: document.title,
    };
  });

  const delta = overflow.scrollWidth - overflow.clientWidth;
  if (viewport.width <= 768 && delta > 4) {
    throw new Error(
      `${mode.name}/${viewport.name}${route} has horizontal overflow: ${overflow.scrollWidth}px > ${overflow.clientWidth}px`
    );
  }

  const dir = path.join(OUT_DIR, mode.name, viewport.name);
  await mkdir(dir, { recursive: true });
  await page.screenshot({
    path: path.join(dir, `${routeSlug(route)}.png`),
    fullPage: false,
  });

  await context.close();
}

async function main() {
  let preview;
  let browser;
  try {
    preview = await startPreviewIfNeeded();
    browser = await chromium.launch();

    for (const mode of modes) {
      for (const viewport of viewports) {
        for (const route of routes) {
          process.stdout.write(`checking ${mode.name}/${viewport.name} ${route}\n`);
          await captureRoute(browser, route, viewport, mode);
        }
      }
    }

    process.stdout.write(`responsive screenshots saved to ${OUT_DIR}\n`);
  } catch (error) {
    if (/Executable doesn't exist|browserType.launch/.test(String(error?.message || error))) {
      process.stderr.write(
        'Playwright browser is not installed. Run `npx playwright install chromium` once, then rerun `npm run qa:responsive`.\n'
      );
    }
    throw error;
  } finally {
    if (browser) await browser.close();
    if (preview) {
      if (process.platform === 'win32') {
        spawnSync('taskkill', ['/pid', String(preview.pid), '/f', '/t'], { stdio: 'ignore' });
      } else {
        preview.kill('SIGTERM');
      }
    }
  }
}

main();
