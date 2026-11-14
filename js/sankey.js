/* ============ 模块三：干部人事变动流向图（Sankey） ============ */

const Sankey = {
  g: null,
  tipEl: null,
  emptyEl: null,

  init() {
    this.g = svgEl('g', { id: 'sankey-layer' }, document.getElementById('canvas'));
    this.g.style.display = 'none';
    this.tipEl = document.getElementById('flow-tip');
    this.emptyEl = document.getElementById('flow-empty');
    window.addEventListener('resize', () => { if (App.view === 'flow') this.render(Timeline.current().id, false); });
  },

  show() { this.g.style.display = ''; this.render(Timeline.current().id, true); },
  hide() { this.g.style.display = 'none'; this.tipEl.classList.add('hidden'); this.emptyEl.classList.add('hidden'); },

  render(t, animate) {
    const g = this.g;
    g.innerHTML = '';
    const flow = FLOWS[t];
    if (!flow) {
      this.emptyEl.classList.remove('hidden');
      App.renderFlowList(null);
      return;
    }
    this.emptyEl.classList.add('hidden');

    const svg = document.getElementById('canvas');
    const W = svg.clientWidth, H = svg.clientHeight;
    if (!W || !H) return;

    // 渐变定义（红 → 金）
    const defs = svgEl('defs', {}, g);
    defs.innerHTML = `
      <linearGradient id="sankey-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#c92323" stop-opacity="0.9"/>
        <stop offset="1" stop-color="#f0a500" stop-opacity="0.9"/>
      </linearGradient>`;

    const PAD = 40, TOP = 100;
    const LW = 185, RW = 195;
    const x0 = PAD + LW, x1 = W - PAD - RW;
    const usableH = H - TOP - 40;

    // 带宽基准值 → 两侧所需总高度 → 超出画布时先压间隙、再等比压缩带宽，保证完整展示
    const baseLinkW = l => Math.max(12, (l.people ? l.people.length : 0) * 15 + 10);
    const lTot0 = new Map(), rTot0 = new Map();
    flow.links.forEach(l => {
      lTot0.set(l.from, (lTot0.get(l.from) || 0) + baseLinkW(l));
      rTot0.set(l.to, (rTot0.get(l.to) || 0) + baseLinkW(l));
    });
    const sumNeed = (nodes, tot, gap, padn) =>
      nodes.reduce((s, n) => s + (tot.get(n.id) || 0) + padn * 2 + gap, -gap);
    const sumFixed = (nodes, gap, padn) => nodes.reduce((s, n) => s + padn * 2 + gap, -gap);
    const GAP0 = 22, PADN0 = 7;
    let GAP = GAP0, PADN = PADN0, kFit = 1;
    let need = Math.max(sumNeed(flow.left, lTot0, GAP, PADN), sumNeed(flow.right, rTot0, GAP, PADN));
    if (need > usableH) {
      GAP = 6; PADN = 2;
      const linkPart = Math.max(
        flow.left.reduce((s, n) => s + (lTot0.get(n.id) || 0), 0),
        flow.right.reduce((s, n) => s + (rTot0.get(n.id) || 0), 0));
      const fixedPart = Math.max(sumFixed(flow.left, GAP, PADN), sumFixed(flow.right, GAP, PADN));
      if (linkPart + fixedPart > usableH) kFit = Math.max(0.1, (usableH - fixedPart) / linkPart);
    }
    const linkW = l => Math.max(4, baseLinkW(l) * kFit);

    const lTot = new Map(), rTot = new Map();
    flow.links.forEach(l => {
      lTot.set(l.from, (lTot.get(l.from) || 0) + linkW(l));
      rTot.set(l.to, (rTot.get(l.to) || 0) + linkW(l));
    });

    const lSum = flow.left.reduce((s, n) => s + (lTot.get(n.id) || 0) + PADN * 2 + GAP, -GAP);
    const rSum = flow.right.reduce((s, n) => s + (rTot.get(n.id) || 0) + PADN * 2 + GAP, -GAP);
    let ly = TOP + Math.max(0, (usableH - lSum) / 2);
    let ry = TOP + Math.max(0, (usableH - rSum) / 2);
    const lPos = new Map(), rPos = new Map();

    flow.left.forEach(n => {
      const h = lTot.get(n.id) + PADN * 2;
      lPos.set(n.id, { y: ly, h });
      ly += h + GAP;
    });
    flow.right.forEach(n => {
      const h = rTot.get(n.id) + PADN * 2;
      rPos.set(n.id, { y: ry, h });
      ry += h + GAP;
    });

    // 标题
    svgEl('text', { class: 'sankey-title', x: W / 2, y: 46, 'text-anchor': 'middle', text: flow.title }, g);
    svgEl('text', { class: 'sankey-subtitle', x: W / 2, y: 70, 'text-anchor': 'middle', text: '左侧：整编前序列　　右侧：整编后序列　　（悬停流向带查看干部去向）' }, g);

    const clearHl = () => {
      this.tipEl.classList.add('hidden');
      g.querySelectorAll('.sankey-link').forEach(p => p.classList.remove('hl', 'mute'));
    };
    const bindHover = (el, link) => {
      el.addEventListener('mouseenter', e => this.showTip(e, link, flow));
      el.addEventListener('mousemove', e => this.showTip(e, link, flow));
      el.addEventListener('mouseleave', clearHl);
    };

    // 连接带
    const segL = new Map(), segR = new Map();
    flow.links.forEach((l, i) => {
      const lp = lPos.get(l.from), rp = rPos.get(l.to);
      if (!lp || !rp) return;
      const w = linkW(l);
      const sl = segL.has(l.from) ? segL.get(l.from) : lp.y + PADN;
      const sr = segR.has(l.to) ? segR.get(l.to) : rp.y + PADN;
      segL.set(l.from, sl + w);
      segR.set(l.to, sr + w);

      const mx = (x0 + x1) / 2;
      const d = `M${x0},${sl} C${mx},${sl} ${mx},${sr} ${x1},${sr} L${x1},${sr + w} C${mx},${sr + w} ${mx},${sl + w} ${x0},${sl + w} Z`;
      const path = svgEl('path', { class: 'sankey-link', d }, g);
      l._el = path;
      bindHover(path, l);
      if (animate) {
        path.setAttribute('opacity', 0);
        Anim.tween('sk-link-' + i, 550 + i * 55, v => path.setAttribute('opacity', v), Ease.outCubic);
      }
    });

    // 左右节点
    const drawSide = (nodes, pos, x, align) => {
      nodes.forEach((n, i) => {
        const p = pos.get(n.id);
        const ng = svgEl('g', { class: 'sankey-node' }, g);
        svgEl('rect', { x: align === 'l' ? x - 5 : x, y: p.y, width: 10, height: p.h, rx: 2 }, ng);
        const tx = align === 'l' ? x - 14 : x + 24;
        const anchor = align === 'l' ? 'end' : 'start';
        const lines = this.wrapLabel(n.label, 9);
        lines.forEach((ln, j) => {
          svgEl('text', { x: tx, y: p.y + p.h / 2 - (lines.length - 1) * 8 + j * 16 + 4, 'text-anchor': anchor, text: ln }, ng);
        });
        if (animate) {
          ng.setAttribute('opacity', 0);
          Anim.tween('sk-node-' + align + i, 380 + i * 45, v => ng.setAttribute('opacity', v), Ease.outCubic);
        }
      });
    };
    drawSide(flow.left, lPos, x0, 'l');
    drawSide(flow.right, rPos, x1, 'r');

    App.renderFlowList(flow);
  },

  wrapLabel(s, max) {
    if (s.length <= max) return [s];
    const out = [];
    let i = 0;
    while (i < s.length) { out.push(s.slice(i, i + max)); i += max; }
    return out;
  },

  showTip(e, link, flow) {
    const tip = this.tipEl;
    const fromN = flow.left.find(n => n.id === link.from);
    const toN = flow.right.find(n => n.id === link.to);
    const people = link.people && link.people.length ? link.people.join('、') : '（建制调整）';
    tip.innerHTML = `
      <div class="ft-title">${fromN ? fromN.label : ''} → ${toN ? toN.label : ''}</div>
      <div class="ft-people">${people}</div>
      ${link.note ? `<div class="ft-note">${link.note}</div>` : ''}`;
    tip.classList.remove('hidden');

    const wrap = document.getElementById('canvas-wrap');
    const wr = wrap.getBoundingClientRect();
    tip.style.left = clamp(e.clientX - wr.left + 16, 8, wrap.clientWidth - 340) + 'px';
    tip.style.top = clamp(e.clientY - wr.top + 14, 8, wrap.clientHeight - 120) + 'px';

    this.g.querySelectorAll('.sankey-link').forEach(p => p.classList.add('mute'));
    if (link._el) { link._el.classList.remove('mute'); link._el.classList.add('hl'); }
  },
};
