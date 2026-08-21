/**
 * Capture les ecrans de l'outil SEO/GEO RenovtaLoc via CDP (Chrome headless).
 * Aucun appel API payant : on ouvre un article deja enregistre en local.
 * Usage : node capture-seo-tool.mjs
 */
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const APP = 'http://localhost:3000/';
const OUT = 'public/captures';
const PORT = 9333;
const W = 1280;
const H = 800;

mkdirSync(OUT, { recursive: true });

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=' + process.env.TEMP + '/chrome-capture-profile',
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForDevTools() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://localhost:${PORT}/json/version`);
      if (r.ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error('DevTools injoignable');
}

await waitForDevTools();

const target = await (await fetch(`http://localhost:${PORT}/json/new?${encodeURIComponent(APP)}`, { method: 'PUT' })).json();

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
};

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });

const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  return r.result?.value;
};

async function shot(file, clip) {
  const r = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: Boolean(clip),
    ...(clip ? { clip: { ...clip, scale: 1 } } : {}),
  });
  writeFileSync(`${OUT}/${file}`, Buffer.from(r.data, 'base64'));
  console.log(`${OUT}/${file}  ${clip ? `${clip.width}x${clip.height}` : `${W}x${H}`}`);
}

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: APP });
await sleep(4000);

// 1. Ecran principal, generateur d'articles.
await shot('ia-01-app.png');

// 2. Article deja enregistre, ouvert depuis la bibliotheque locale.
await evaluate(`(async () => {
  toggleLibrary();
  await new Promise(r => setTimeout(r, 600));
  await openFromLibrary('a1785827660202279');
  await new Promise(r => setTimeout(r, 1800));
})()`);
const box = await evaluate(`(() => {
  const el = document.getElementById('output-area');
  const r = el.getBoundingClientRect();
  return JSON.stringify({ top: Math.round(r.top + scrollY) });
})()`);
const top = JSON.parse(box).top;
await shot('ia-01-generation.png', { x: 0, y: top, width: W, height: H });

// 3. Panneau d'audit GEO, avant lancement (aucun appel API).
await evaluate(`(() => {
  const btn = [...document.querySelectorAll('.tab-btn')].find(b => /audit d'article/i.test(b.innerText));
  switchTab('geo-article', btn);
  window.scrollTo(0, 0);
})()`);
await sleep(1200);
await shot('ia-01-audit-formulaire.png');

ws.close();
chrome.kill();
console.log('termine');
