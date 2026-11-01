// Frame equations preserved from Portfolio v2.dc.html.
export type AsciiKind = 'globe' | 'radar' | 'waves' | 'contours' | 'fire' | 'grid' | 'footer';
export type AsciiFrame = { bg: string; fg: string; ac: string };
const TC = 300, TR = 24;
const hash = (x: number, y: number, z: number) => { let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(z, 1442695041)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
const smooth = (t: number) => t * t * (3 - 2 * t);
const vnoise = (x: number, y: number) => { const xi = Math.floor(x), yi = Math.floor(y), xf = smooth(x - xi), yf = smooth(y - yi);
  const a = hash(xi, yi, 7), b = hash(xi + 1, yi, 7), c = hash(xi, yi + 1, 7), d = hash(xi + 1, yi + 1, 7);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf; };
const fbm = (x: number, y: number) => vnoise(x, y) * .6 + vnoise(x * 2.1, y * 2.1) * .3 + vnoise(x * 4.3, y * 4.3) * .1;
const ecg = (p: number) => { p = ((p % 46) + 46) % 46; let o = 0;
  if (p > 12 && p < 16) o = -Math.sin((p - 12) / 4 * Math.PI) * 1.2;
  else if (p >= 19 && p < 20) o = (p - 19) * 2;
  else if (p >= 20 && p < 21.5) o = 2 - (p - 20) * 7;
  else if (p >= 21.5 && p < 23) o = -8.5 + (p - 21.5) * 7.6;
  else if (p >= 23 && p < 24) o = 2.9 - (p - 23) * 2.9;
  else if (p > 28 && p < 34) o = -Math.sin((p - 28) / 6 * Math.PI) * 2;
  return TR / 2 + o; };
const GENS: Array<(t: number) => (x: number, y: number) => number> = [
  t => (x: number, y: number) => { const dx = (x - TC * .4) * .5, dy = y - TR * .5, d = Math.sqrt(dx * dx + dy * dy); return (.5 + .5 * Math.sin(d * .8 - t * .3)) * Math.max(0, 1 - d / 75); },
  t => { const yc: number[] = []; for (let x = 0; x <= TC + 1; x++) yc.push(ecg(x + t * 1.1)); return (x: number, y: number) => { const a = yc[x], b = yc[x + 1], lo = Math.min(a, b) - .5, hi = Math.max(a, b) + .5; if (y >= lo && y <= hi) return 1; if (y >= lo - 1 && y <= hi + 1) return .3; return (x % 6 === 0 && y % 3 === 0) ? .12 : 0; }; },
  t => (x: number, y: number) => { const v = (Math.sin(x * .09 + t * .05) + Math.sin(y * .45 - t * .04) + Math.sin(x * .05 + y * .25 + t * .03) + Math.sin(Math.hypot(x * .5 - 30, y - 11) * .3 - t * .08)) / 4; const f = ((v + 1) * 3.5) % 1; return f < .1 ? 1 : f < .2 ? .45 : f > .9 ? .2 : 0; },
  t => (x: number, y: number) => { const heat = Math.pow(y / TR, 1.5) * 1.6; return Math.max(0, Math.min(1, fbm(x * .11, y * .22 + t * .22) * heat - .12)); },
  t => (x: number, y: number) => { const s = Math.floor(t * .5), gx = x + s, cx = Math.floor(gx / 14), cy = Math.floor(y / 5); if (gx % 14 === 0 || y % 5 === 0) return .28; return hash(cx, cy, Math.floor(t / 12)) > .64 ? .85 : .05; }
];
const RAMPS = { classic: ' .:-=+*#%@', binary: ' .:01', minimal: ' .+#' };
const BC = 104, BR = 38;

export class AsciiEngine {
  ramp = RAMPS.classic;
  columns = TC;
  cw = 4.8;
  ch = 8;
  gCols = 20;
  gRows = 12;
  globe(t: number) {
    const C = this.gCols, Rr = this.gRows, R = this.ramp, n = R.length - 1, cw = this.cw, ch = this.ch, D = Math.PI / 180;
    const W = C * cw, H = Rr * ch, wide = W > 900, cxp = wide ? W * .64 : W / 2, cyp = wide ? H * .47 : H * .36;
    const rad = wide ? Math.min(W * .27, H * .4) : Math.min(W * .4, H * .28);
    const rot = Math.PI / 2 - .9 + t * .018, tilt = .25;
    const ca = Math.cos(tilt), sa = Math.sin(tilt), cr = Math.cos(rot), sr = Math.sin(rot);
    const Lx = -.55, Ly = .5, Lz = .67, step = 15 * D;
    const pl = 14.6 * D, pn = -90.5 * D, pw0 = Math.cos(pl) * Math.sin(pn), pw1 = Math.sin(pl), pw2 = Math.cos(pl) * Math.cos(pn);
    const px1 = pw0 * cr + pw2 * sr, pz1 = -pw0 * sr + pw2 * cr, py2 = pw1 * ca - pz1 * sa, pz2 = pw1 * sa + pz1 * ca;
    const pinC = Math.round((px1 * rad + cxp) / cw - .5), pinR = Math.round((-py2 * rad + cyp) / ch - .5), pinVis = pz2 > .08;
    const LAB = 'GUATEMALA CITY  14.6N 90.5W', labR = pinR - 3, labC = pinC + 6;
    const pulse = (t % 26) / 26, cosPin = Math.cos(2.2 * D);
    const sat = t * .045, satC = Math.round((Math.cos(sat) * 1.34 * rad + cxp) / cw - .5), satR = Math.round((Math.sin(sat) * .3 * rad + cyp) / ch - .5), satFront = Math.sin(sat) > 0;
    let bg = '', fg = '', ac = '';
    for (let y = 0; y < Rr; y++) {
      let a = '', b = '', c = '';
      for (let x = 0; x < C; x++) {
        const sx = ((x + .5) * cw - cxp) / rad, sy = ((y + .5) * ch - cyp) / rad, d2 = sx * sx + sy * sy;
        let cb = ' ', cf = ' ', cc = ' ';
        const re = Math.abs(Math.hypot(sx / 1.34, sy / .3) - 1);
        if (d2 <= 1) {
          const vz = Math.sqrt(1 - d2), vx = sx, vy = -sy;
          const y2 = vy * ca + vz * sa, z2 = -vy * sa + vz * ca, x3 = vx * cr - z2 * sr, z3 = vx * sr + z2 * cr;
          const lat = Math.asin(Math.max(-1, Math.min(1, y2))), lon = Math.atan2(x3, z3);
          const lam = Math.max(0, vx * Lx + vy * Ly + vz * Lz);
          const gl = Math.abs(lat / step - Math.round(lat / step)), go = Math.abs(lon / step - Math.round(lon / step)) * Math.cos(lat);
          const onLat = gl < .07, onLon = go < .06 && Math.abs(lat) < 80 * D;
          const dp = x3 * pw0 + y2 * pw1 + z3 * pw2;
          if (dp > cosPin) cc = '@';
          else if (Math.abs(Math.acos(Math.min(1, dp)) - (2.5 + pulse * 11) * D) < .7 * D && pulse < .85) cc = pulse < .4 ? 'O' : 'o';
          else if (onLat || onLon) { const g = onLat && onLon ? '+' : onLat ? '-' : ':'; if (lam > .12) cf = g; else cb = g; }
          else cb = R[Math.round((.05 + .55 * lam) * n)];
          if (re < .035 && sy > 0) { cc = '.'; cb = ' '; cf = ' '; }
        } else {
          if (re < .035) cb = '.';
          else if (d2 < 1.12 && hash(x, y, 9) < .25) cb = '.';
          else { const s = hash(x, y, 3); if (s < .006) cb = hash(x, y, Math.floor(t / 5)) < .7 ? '.' : s < .0015 ? '*' : '+'; }
        }
        if (pinVis && y === labR && x >= labC && x < labC + LAB.length) { cc = LAB[x - labC]; cb = ' '; cf = ' '; }
        if (pinVis && ((y === pinR - 1 && x === pinC + 2) || (y === pinR - 2 && x === pinC + 4))) { cc = '/'; cb = ' '; cf = ' '; }
        if (y === satR && Math.abs(x - satC) <= 1 && (satFront || d2 > 1)) { cc = x === satC ? '#' : '='; cb = ' '; cf = ' '; }
        if (cc !== ' ') { cb = ' '; cf = ' '; } else if (cf !== ' ') cb = ' ';
        a += cb; b += cf; c += cc;
      }
      bg += a + '\n'; fg += b + '\n'; ac += c + '\n';
    }
    return { bg, fg, ac };
  }

  brainFrame(t: number) {
    const R = this.ramp, n = R.length - 1, cw = this.cw || 4.8, W = BC * cw, H = BR * 8, cx = W / 2, cy = H / 2, TAU = Math.PI * 2;
    const sw = (t * .07) % TAU, doses = [[.35, 70], [1.6, 110], [2.7, 50], [3.9, 130], [5.1, 90]];
    let base = '', acc = '';
    for (let y = 0; y < BR; y++) {
      let p = '', q = '';
      for (let x = 0; x < BC; x++) {
        const dx = (x + .5) * cw - cx, dy = (y + .5) * 8 - cy, d = Math.hypot(dx, dy), ang = (Math.atan2(dy, dx) + TAU) % TAU;
        const lag = ((sw - ang) % TAU + TAU) % TAU, trail = Math.exp(-lag * 1.4) * (d < 150 ? 1 : 0);
        const rings = (.5 + .5 * Math.cos(d * .11 - t * .22)) * Math.max(0, 1 - d / 240);
        let v = Math.min(1, rings * .6 + trail * .55);
        let hit = false;
        for (const [da, dr] of doses) { const px = Math.cos(da) * dr, py = Math.sin(da) * dr; if (Math.abs(dx - px) < cw * 1.1 && Math.abs(dy - py) < 5) { const l = ((sw - da) % TAU + TAU) % TAU; hit = l < 1.2; if (!hit) v = 1; } }
        if (hit) { p += ' '; q += '@'; }
        else if (v > .82 && trail > .5) { p += ' '; q += R[Math.round(v * n)]; }
        else { p += R[Math.round(v * n)]; q += ' '; }
      }
      base += p + '\n'; acc += q + '\n';
    }
    return { base, acc };
  }


  frame(kind: AsciiKind, t: number): AsciiFrame {
    if (kind === 'globe') return this.globe(t);
    if (kind === 'radar') {
      const {base, acc} = this.brainFrame(t);
      return {bg: base, fg: '', ac: acc};
    }
    const index = {waves: 0, contours: 2, fire: 3, grid: 4, footer: 0}[kind];
    const f = GENS[index](t);
    const rows = kind === 'footer' ? 10 : TR;
    let bg = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        const value = kind === 'footer'
          ? fbm(x * .05 + t * .02, y * .35) * (y / rows) * 1.8 - .2
          : f(x, y);
        bg += this.ramp[Math.round(Math.max(0, Math.min(1, value)) * (this.ramp.length - 1))];
      }
      bg += '\n';
    }
    return {bg, fg: '', ac: ''};
  }
}
