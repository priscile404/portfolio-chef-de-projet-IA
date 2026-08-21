/**
 * Capture une page publique en PNG, via Chrome headless pilote en CDP.
 * Permet de masquer des elements (bandeaux cookies, chats) avant la capture.
 *
 * Usage :
 *   node scripts/capture-url.mjs <url> <fichier-de-sortie> [largeur] [hauteur] [selecteurs,a,masquer]
 */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const [url, out, w = '1280', h = '800', hide = '', scrollSel = ''] = process.argv.slice(2);
if (!url || !out) {
  console.error('Usage : node scripts/capture-url.mjs <url> <sortie.png> [largeur] [hauteur] [selecteurs]');
  process.exit(1);
}

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9337;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=' + process.env.TEMP + '/chrome-capture-url',
  'about:blank',
]);

for (let i = 0; i < 40; i++) {
  try {
    if ((await fetch(`http://localhost:${PORT}/json/version`)).ok) break;
  } catch {}
  await sleep(500);
}

const target = await (
  await fetch(`http://localhost:${PORT}/json/new?about:blank`, { method: 'PUT' })
).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    const { resolve, reject } = pending.get(m.id);
    pending.delete(m.id);
    m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: 1,
  mobile: false,
});
await send('Page.navigate', { url });
await sleep(9000);

// Refuse les cookies optionnels quand un bouton existe : plus propre que de masquer le bandeau.
await send('Runtime.evaluate', {
  expression: `(() => {
    const motif = /refuser|reject|decline|only essential|essentiels uniquement/i;
    const b = [...document.querySelectorAll('button, [role=button], a')]
      .find(el => motif.test((el.textContent || '').trim()) && (el.textContent || '').length < 60);
    if (b) { b.click(); return true; }
    return false;
  })()`,
  awaitPromise: true,
});
await sleep(2500);

// Ferme une eventuelle fenetre modale d'incitation a l'inscription.
await send('Runtime.evaluate', {
  expression: `(() => {
    const c = document.querySelector('[aria-label="Fermer"], [aria-label="Close"], svg[aria-label="Fermer"]');
    const btn = c && (c.closest('[role=button]') || c.closest('button') || c);
    if (btn) { btn.click(); return true; }
    return false;
  })()`,
  awaitPromise: true,
});
await sleep(2000);

// Retire les selecteurs demandes, puis tout bandeau fixe de consentement restant.
const sels = JSON.stringify(hide.split(',').map((s) => s.trim()).filter(Boolean));
await send('Runtime.evaluate', {
  expression: `
    ${sels}.forEach(s => { try { document.querySelectorAll(s).forEach(el => el.remove()); } catch {} });
    const motifs = /cookie|consent|accepter tout|tout accepter|rgpd|préférences/i;
    [...document.querySelectorAll('body *')].forEach(el => {
      const p = getComputedStyle(el).position;
      if (p !== 'fixed' && p !== 'sticky') return;
      const r = el.getBoundingClientRect();
      if (r.height < 30 || r.width < 200) return;
      if (motifs.test(el.textContent || '')) el.remove();
    });
    document.documentElement.style.overflow = 'hidden';`,
  awaitPromise: true,
});
await sleep(1500);

if (scrollSel) {
  const sel = JSON.stringify(scrollSel);
  await send('Runtime.evaluate', {
    expression: `(() => { const el = document.querySelector(${sel}); if (el) { el.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); } })()`,
    awaitPromise: true,
  });
  await sleep(1500);
}

const shot = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log(`${out} — ${w}x${h}`);

ws.close();
chrome.kill();
