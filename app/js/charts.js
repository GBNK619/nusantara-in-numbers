// charts.js — hand-drawn SVG charts. Each function takes plain data and
// returns an SVG string; no library, no canvas, no network.

const INK = '#1d2733';
const GRID = '#d9dee5';
const ACCENT = '#b3352c';
const TEAL = '#0f766e';
const GOLD = '#c08a1e';

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function axisFrame(width, height, pad) {
  return { x0: pad.left, y0: pad.top, x1: width - pad.right, y1: height - pad.bottom };
}

// A line chart for a yearly series; handles negative values (a zero line is drawn).
export function lineChart(points, options = {}) {
  const width = options.width ?? 640;
  const height = options.height ?? 300;
  const pad = { left: 46, right: 14, top: 16, bottom: 30 };
  const { x0, y0, x1, y1 } = axisFrame(width, height, pad);
  const color = options.color ?? ACCENT;
  const values = points.map((p) => p.value);
  let min = Math.min(...values, 0);
  let max = Math.max(...values, 0);
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  min -= span * 0.12; max += span * 0.12;
  const sx = (i) => x0 + (i / (points.length - 1)) * (x1 - x0);
  const sy = (v) => y1 - ((v - min) / (max - min)) * (y1 - y0);
  const parts = [];
  for (let t = 0; t <= 4; t++) {
    const v = min + ((max - min) * t) / 4;
    const y = sy(v);
    parts.push(`<line x1="${x0}" y1="${y.toFixed(1)}" x2="${x1}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`);
    parts.push(`<text x="${x0 - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="chart-axis">${v.toFixed(1)}</text>`);
  }
  if (min < 0 && max > 0) {
    const y = sy(0);
    parts.push(`<line x1="${x0}" y1="${y.toFixed(1)}" x2="${x1}" y2="${y.toFixed(1)}" stroke="${INK}" stroke-width="1" stroke-dasharray="4 3"/>`);
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(i).toFixed(1)},${sy(p.value).toFixed(1)}`).join(' ');
  parts.push(`<path d="${path}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`);
  points.forEach((p, i) => {
    parts.push(`<circle cx="${sx(i).toFixed(1)}" cy="${sy(p.value).toFixed(1)}" r="3.2" fill="${color}"><title>${p.year}: ${p.value}</title></circle>`);
    if (i % 2 === 0 || i === points.length - 1) {
      parts.push(`<text x="${sx(i).toFixed(1)}" y="${y1 + 20}" text-anchor="middle" class="chart-axis">${p.year}</text>`);
    }
  });
  const first = points[0];
  const last = points[points.length - 1];
  parts.push(`<text x="${sx(0).toFixed(1)}" y="${(sy(first.value) - 10).toFixed(1)}" text-anchor="middle" class="chart-value">${first.value}</text>`);
  parts.push(`<text x="${sx(points.length - 1).toFixed(1)}" y="${(sy(last.value) - 10).toFixed(1)}" text-anchor="middle" class="chart-value">${last.value}</text>`);
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label ?? 'Line chart')}" class="chart">${parts.join('')}</svg>`;
}

// A vertical bar chart for a yearly series or a short category list.
export function barChart(items, options = {}) {
  const width = options.width ?? 640;
  const height = options.height ?? 300;
  const pad = { left: 46, right: 14, top: 22, bottom: 30 };
  const { x0, y0, x1, y1 } = axisFrame(width, height, pad);
  const color = options.color ?? TEAL;
  const max = Math.max(...items.map((d) => d.value)) * 1.08;
  const slot = (x1 - x0) / items.length;
  const barW = Math.min(slot * 0.62, 52);
  const parts = [];
  for (let t = 0; t <= 4; t++) {
    const v = (max * t) / 4;
    const y = y1 - (v / max) * (y1 - y0);
    parts.push(`<line x1="${x0}" y1="${y.toFixed(1)}" x2="${x1}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`);
    parts.push(`<text x="${x0 - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end" class="chart-axis">${Math.round(v)}</text>`);
  }
  items.forEach((d, i) => {
    const cx = x0 + slot * i + slot / 2;
    const h = (d.value / max) * (y1 - y0);
    parts.push(`<rect x="${(cx - barW / 2).toFixed(1)}" y="${(y1 - h).toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="${color}"><title>${esc(d.label)}: ${d.value}</title></rect>`);
    parts.push(`<text x="${cx.toFixed(1)}" y="${(y1 - h - 6).toFixed(1)}" text-anchor="middle" class="chart-value">${d.value}</text>`);
    parts.push(`<text x="${cx.toFixed(1)}" y="${y1 + 20}" text-anchor="middle" class="chart-axis">${esc(d.label)}</text>`);
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label ?? 'Bar chart')}" class="chart">${parts.join('')}</svg>`;
}

// A horizontal bar list, best for wide-ranging values such as density by island.
export function hbarChart(items, options = {}) {
  const rowH = 30;
  const width = options.width ?? 640;
  const height = items.length * rowH + 12;
  const labelW = 118;
  const max = Math.max(...items.map((d) => d.value)) * 1.05;
  const color = options.color ?? GOLD;
  const parts = [];
  items.forEach((d, i) => {
    const y = 6 + i * rowH;
    const w = ((width - labelW - 64) * d.value) / max;
    parts.push(`<text x="${labelW - 8}" y="${y + 17}" text-anchor="end" class="chart-axis">${esc(d.label)}</text>`);
    parts.push(`<rect x="${labelW}" y="${y + 4}" width="${w.toFixed(1)}" height="16" fill="${color}"><title>${esc(d.label)}: ${d.value}</title></rect>`);
    parts.push(`<text x="${(labelW + w + 7).toFixed(1)}" y="${y + 17}" class="chart-value">${d.value}</text>`);
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label ?? 'Horizontal bar chart')}" class="chart">${parts.join('')}</svg>`;
}

const DONUT_COLORS = ['#b3352c', '#0f766e', '#c08a1e', '#34558b', '#6d4c9f', '#2e7d4f', '#a05a2c', '#51707e', '#8a8f3c', '#c9ccd4'];

// A donut chart with a legend; slices are stroke-dasharray arcs on one circle.
export function donutChart(slices, options = {}) {
  const size = options.size ?? 300;
  const r = 104;
  const c = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  let acc = 0;
  const parts = [`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#eef1f4" stroke-width="34"/>`];
  slices.forEach((s, i) => {
    const frac = s.share / 100;
    const dash = Math.max(frac * c - 2, 0.5);
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${DONUT_COLORS[i % DONUT_COLORS.length]}" stroke-width="34" stroke-dasharray="${dash.toFixed(1)} ${(c - dash).toFixed(1)}" stroke-dashoffset="${(-acc * c).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"><title>${esc(s.sector)}: ${s.share}%</title></circle>`);
    acc += frac;
  });
  parts.push(`<text x="${cx}" y="${cy - 2}" text-anchor="middle" class="donut-center">GDP</text>`);
  parts.push(`<text x="${cx}" y="${cy + 20}" text-anchor="middle" class="chart-axis">by industry, 2024</text>`);
  const legend = slices.map((s, i) => `<li><span class="swatch" style="background:${DONUT_COLORS[i % DONUT_COLORS.length]}"></span>${esc(s.sector)} — <strong>${s.share}%</strong></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(options.label ?? 'Donut chart')}" class="chart donut">${parts.join('')}</svg><ul class="donut-legend">${legend}</ul></div>`;
}

// A population pyramid: male bars to the left, female to the right, youngest at top.
export function pyramidChart(rows, options = {}) {
  const rowH = 21;
  const width = options.width ?? 640;
  const height = rows.length * rowH + 34;
  const mid = width / 2;
  const maxV = Math.max(...rows.flatMap((r) => [r.male, r.female])) * 1.08;
  const scale = (mid - 78) / maxV;
  const parts = [];
  parts.push(`<text x="${mid - 10}" y="14" text-anchor="end" class="chart-value" fill="#34558b">Male</text>`);
  parts.push(`<text x="${mid + 10}" y="14" class="chart-value" fill="#b3352c">Female</text>`);
  rows.forEach((r, i) => {
    const y = 24 + i * rowH;
    const mw = r.male * scale;
    const fw = r.female * scale;
    parts.push(`<rect x="${(mid - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="15" fill="#34558b"><title>Age ${esc(r.group)} male: ${r.male}%</title></rect>`);
    parts.push(`<rect x="${mid}" y="${y}" width="${fw.toFixed(1)}" height="15" fill="#b3352c"><title>Age ${esc(r.group)} female: ${r.female}%</title></rect>`);
    parts.push(`<text x="${mid}" y="${y + 12}" text-anchor="middle" class="chart-axis pyramid-age">${esc(r.group)}</text>`);
    parts.push(`<text x="${(mid - mw - 6).toFixed(1)}" y="${y + 12}" text-anchor="end" class="chart-axis">${r.male}</text>`);
    parts.push(`<text x="${(mid + fw + 6).toFixed(1)}" y="${y + 12}" class="chart-axis">${r.female}</text>`);
  });
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(options.label ?? 'Population pyramid')}" class="chart">${parts.join('')}</svg>`;
}
