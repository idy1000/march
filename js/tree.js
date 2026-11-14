/* ============ 模块二：动态建制分级树（核心画布） ============
 * 布局：垂直树（根在左、叶在右）；团级默认折叠（+N 角标，双击/点角标展开）；
 * 自适应缩放下限 FIT_FLOOR；悬停节点弹出固定像素详情卡片。
 */
const Tree = {
  svg: null,
  viewport: null,
  gEdges: null,
  gNodes: null,
  tipEl: null,

  view: { x: 0, y: 0, k: 1 },
  snapshot: null,
  layout: null,          // Map(uid -> {x,y,w,h,type})，附 _collapsed/_bbox

  nodeEls: new Map(),    // uid -> {g, cur:{x,y,o}, type, dying}
  edgeEls: new Map(),     // childUid -> {path, o, dying, parentUid}
  userCollapsed: new Map(), // uid -> bool（用户手动折叠/展开，跨节点保留）

  NW_FULL: 176, NH_FULL: 82,   // 完整节点（含双主官）
  NW_CMP: 104, NH_CMP: 40,     // 紧凑节点（团级/无主官）
  V_GAP: 11,                   // 兄弟纵向间距
  H_GAP: 44,                   // 层级横向间距
  ROOT_GAP: 60,
  FIT_FLOOR: 0.55,             // 自适应缩放下限（复位总览不受限）
  _suppressClick: false,

  init() {
    this.svg = document.getElementById('canvas');
    this.tipEl = document.getElementById('node-tip');
    const defs = svgEl('defs', {}, this.svg);
    defs.innerHTML = `
      <linearGradient id="node-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2b2825"/><stop offset="1" stop-color="#211f1d"/>
      </linearGradient>`;
    this.viewport = svgEl('g', { id: 'viewport' }, this.svg);
    this.gEdges = svgEl('g', { id: 'edges' }, this.viewport);
    this.gNodes = svgEl('g', { id: 'nodes' }, this.viewport);
    this.bindPanZoom();
    this.bindNodeTip();
    Anim.onFrame = () => this.syncEdges();
  },

  show() { this.viewport.style.display = ''; },
  hide() { this.viewport.style.display = 'none'; this.hideNodeTip(); },

  /* ---------- 折叠状态 ---------- */
  // 默认规则：拥有 ≥2 个团级子节点的单位默认折叠
  computeCollapsed(snapshot, forceUnits) {
    const forceAncestors = new Set();
    (forceUnits || []).forEach(f => {
      let cur = f;
      while (cur && !forceAncestors.has(cur)) {
        forceAncestors.add(cur);
        const st = snapshot.units.get(cur);
        cur = st && st.parent_id && snapshot.units.has(st.parent_id) ? st.parent_id : null;
      }
    });
    const collapsedSet = new Set();
    snapshot.children.forEach((kids, uid) => {
      const manual = this.userCollapsed.get(uid);
      let collapsed;
      if (forceAncestors.has(uid)) collapsed = false;                    // 聚焦强制展开
      else if (manual !== undefined) collapsed = manual;                 // 用户手动选择
      else collapsed = kids.length >= 2 && kids.every(k => snapshot.units.get(k).level === '团');
      if (collapsed) collapsedSet.add(uid);
    });
    return collapsedSet;
  },

  toggleCollapse(uid) {
    if (!this.snapshot || !this.snapshot.children.has(uid)) return;
    const was = this.layout && this.layout._collapsed.has(uid);
    this.userCollapsed.set(uid, !was);
    this.hideNodeTip();
    App.renderTree(true);
  },

  /* ---------- 布局（垂直树：根在左，叶在右） ---------- */
  nodeSize(st) {
    const compact = st.level === '团' || (!st.commander && !st.political_commissar);
    return compact
      ? { w: this.NW_CMP, h: this.NH_CMP, type: 'compact' }
      : { w: this.NW_FULL, h: this.NH_FULL, type: 'full' };
  },

  computeLayout(snapshot, forceUnits) {
    const collapsedSet = this.computeCollapsed(snapshot, forceUnits);

    const sizes = new Map();
    snapshot.units.forEach((st, uid) => sizes.set(uid, this.nodeSize(st)));

    // 可见集合（折叠的子树整体隐藏）
    const visible = new Set();
    const markVisible = uid => {
      visible.add(uid);
      if (collapsedSet.has(uid)) return;
      (snapshot.children.get(uid) || []).forEach(markVisible);
    };
    snapshot.roots.forEach(markVisible);
    const vis = new Map();
    snapshot.children.forEach((kids, uid) => {
      if (visible.has(uid) && !collapsedSet.has(uid)) vis.set(uid, kids.filter(k => visible.has(k)));
    });

    // 深度 → 每层列 x
    const depth = new Map();
    const walkDepth = (uid, d) => {
      depth.set(uid, d);
      (vis.get(uid) || []).forEach(c => walkDepth(c, d + 1));
    };
    snapshot.roots.forEach(r => walkDepth(r, 0));

    const colW = new Map();
    sizes.forEach((s, uid) => {
      const d = depth.get(uid);
      if (d == null) return;
      colW.set(d, Math.max(colW.get(d) || 0, s.w));
    });
    const levelX = new Map();
    let ax = 0;
    [...colW.keys()].sort((a, b) => a - b).forEach(d => {
      levelX.set(d, ax);
      ax += colW.get(d) + this.H_GAP;
    });
    const totalW = Math.max(ax - this.H_GAP, 60);

    // 子树高度
    const subH = new Map();
    const measure = uid => {
      const kids = vis.get(uid) || [];
      let kh = 0;
      kids.forEach(c => { kh += measure(c) + this.V_GAP; });
      if (kids.length) kh -= this.V_GAP;
      const h = Math.max(sizes.get(uid).h, kh);
      subH.set(uid, h);
      return h;
    };
    snapshot.roots.forEach(measure);

    // 摆放：子节点纵向堆叠，父节点纵向居中
    const layout = new Map();
    const place = (uid, y) => {
      const s = sizes.get(uid);
      const kids = vis.get(uid) || [];
      let cy;
      if (kids.length) {
        const kidsH = kids.reduce((t, c) => t + subH.get(c) + this.V_GAP, -this.V_GAP);
        let ky = y + (subH.get(uid) - kidsH) / 2;
        kids.forEach(c => { place(c, ky); ky += subH.get(c) + this.V_GAP; });
        const first = layout.get(kids[0]), last = layout.get(kids[kids.length - 1]);
        cy = (first.y + last.y + last.h) / 2 - s.h / 2;
      } else {
        cy = y + (subH.get(uid) - s.h) / 2;
      }
      layout.set(uid, { x: levelX.get(depth.get(uid)), y: cy, w: s.w, h: s.h, type: s.type });
    };
    let ry = 0;
    snapshot.roots.forEach((r, i) => { place(r, ry); ry += subH.get(r) + (i ? this.ROOT_GAP : 0); });

    let totalH = 0;
    snapshot.roots.forEach((r, i) => { totalH += subH.get(r) + (i ? this.ROOT_GAP : 0); });

    layout._bbox = { w: totalW, h: Math.max(totalH, 60) };
    layout._collapsed = collapsedSet;
    layout._visible = visible;
    return layout;
  },

  /* ---------- 节点渲染 ---------- */
  levelColor(level) {
    return {
      '军委': '#f0a500', '方面军': '#c92323', '兵团': '#d4552e', '军团': '#d4552e',
      '支队': '#d4552e', '军': '#b03a2e', '师': '#8e3b3b', '纵队': '#a0522d', '团': '#6e4a4a',
    }[level] || '#6e4a4a';
  },

  buildNodeContent(g, uid, st, size, meta) {
    g.innerHTML = '';
    const color = this.levelColor(st.level);

    if (size.type === 'full') {
      svgEl('rect', { class: 'node-box', width: size.w, height: size.h, rx: 7, fill: 'url(#node-grad)', stroke: color, 'stroke-width': 1.3 }, g);
      svgEl('rect', { class: 'node-header-bg', width: size.w, height: 27, rx: 7, fill: 'rgba(255,255,255,0.03)' }, g);
      svgEl('rect', { y: 21, width: size.w, height: 6, fill: 'rgba(0,0,0,0.18)' }, g);
      svgEl('rect', { x: 0, y: 0, width: 4, height: size.h, fill: color, rx: 2 }, g);

      const nameEl = svgEl('text', { class: 'node-name', x: 12, y: 19, text: st.name }, g);
      if (st.name.length > 9) nameEl.style.fontSize = '11.5px';
      svgEl('text', { class: 'node-level', x: size.w - 8, y: 19, 'text-anchor': 'end', text: st.level + '级' }, g);

      this.buildPersonRow(g, st, 'commander', st.c_title || '军事主官', 27, size.w);
      this.buildPersonRow(g, st, 'political_commissar', st.p_title || '政治委员', 54.5, size.w);
    } else {
      svgEl('rect', { class: 'node-box compact', width: size.w, height: size.h, rx: 6, fill: 'url(#node-grad)', stroke: color, 'stroke-width': 1.2 }, g);
      svgEl('rect', { x: 0, y: 0, width: 3.5, height: size.h, fill: color, rx: 2 }, g);
      const nameEl = svgEl('text', { class: 'node-name compact-name', x: size.w / 2, y: 16, 'text-anchor': 'middle', text: st.name }, g);
      nameEl.style.fontSize = '12px';
      const flagStr = f => f ? { concurrent: '（兼）', acting: '（代）', wounded: '（伤）', kia: '（烈）' }[f] || '' : '';
      const names = [];
      if (st.commander) names.push((st.commander_flag === 'acting' ? '代·' : '') + personName(st.commander) + flagStr(st.commander_flag));
      if (st.political_commissar) names.push(personName(st.political_commissar) + flagStr(st.pc_flag));
      if (names.length) {
        const raw = names.join(' · ');
        const t = svgEl('text', { class: 'row-name', x: size.w / 2, y: 32, 'text-anchor': 'middle', text: raw }, g);
        const len = raw.replace(/[·\s]/g, '').length;
        t.style.fontSize = len <= 9 ? '10px' : len <= 12 ? '8.5px' : '7.5px';
        t.style.fill = '#b5af9f';
      }
    }

    // 折叠角标（+N）
    if (meta && meta.collapsedKids) {
      const bg = svgEl('g', {}, g);
      const bx = size.w + 5, by = (size.h - 18) / 2;
      svgEl('rect', { x: bx, y: by, width: 28, height: 18, rx: 4, fill: 'rgba(240,165,0,0.14)', stroke: 'rgba(240,165,0,0.55)', 'stroke-width': 1 }, bg);
      svgEl('text', { x: bx + 14, y: by + 13, 'text-anchor': 'middle', fill: '#f0a500', 'font-size': 10, 'font-weight': 700, text: '+' + meta.collapsedKids }, bg);
      bg.style.cursor = 'pointer';
      bg.addEventListener('click', e => { e.stopPropagation(); this.toggleCollapse(uid); });
    }
  },

  buildPersonRow(g, st, field, title, y, w) {
    const pid = st[field];
    const flag = field === 'commander' ? st.commander_flag : st.pc_flag;
    const isMil = field === 'commander';
    const rowG = svgEl('g', { class: 'p-row' }, g);
    if (pid) {
      rowG.style.cursor = 'pointer';
      rowG.addEventListener('click', e => {
        e.stopPropagation();
        if (this._suppressClick) return;
        App.selectPerson(pid);
      });
    }

    svgEl('rect', { class: isMil ? 'row-mil-bg' : 'row-pol-bg', x: 1, y, width: w - 2, height: 27.5 }, rowG);
    svgEl('text', { class: 'row-icon ' + (isMil ? 'mil' : 'pol'), x: 10, y: y + 18, text: isMil ? '⚔' : '★' }, rowG);
    svgEl('text', { class: 'row-title', x: 26, y: y + 18, text: title }, rowG);

    if (!pid) {
      svgEl('text', { class: 'row-name', x: w - 12, y: y + 18, 'text-anchor': 'end', fill: '#57534a', text: '—' }, rowG);
      return;
    }

    const nameAnchorX = flag ? w - 34 : w - 12;
    const nm = personName(pid);
    const cls = ['row-name'];
    if (flag === 'acting') cls.push('acting');
    if (flag === 'wounded') cls.push('wounded');
    const displayName = (flag === 'acting' ? '代·' : '') + nm;
    svgEl('text', { class: cls.join(' '), x: nameAnchorX, y: y + 18, 'text-anchor': 'end', text: displayName }, rowG);

    if (flag) {
      const bw = 18;
      const bx = w - bw - 8;
      svgEl('rect', { class: 'row-badge-box' + (flag === 'wounded' ? ' wounded' : ''), x: bx, y: y + 6.5, width: bw, height: 14, rx: 3 }, rowG);
      svgEl('text', { class: 'row-badge-text' + (flag === 'wounded' ? ' wounded' : ''), x: bx + bw / 2, y: y + 16.5, 'text-anchor': 'middle', text: flagText(flag) }, rowG);
    }
  },

  /* ---------- 形变主流程 ---------- */
  render(t, animate = true, forceUnits = null) {
    const snapshot = buildSnapshot(t);
    this.snapshot = snapshot;
    const layout = this.computeLayout(snapshot, forceUnits);
    this.layout = layout;

    const seenNodes = new Set(), seenEdges = new Set();

    layout.forEach((pos, uid) => {
      seenNodes.add(uid);
      const st = snapshot.units.get(uid);
      let entry = this.nodeEls.get(uid);

      if (entry && !entry.dying && entry.g.parentNode && entry.type === pos.type) {
        this._tweenNode(uid, entry, pos, animate);          // 复用：位置补间
      } else {
        if (entry && entry.g.parentNode) entry.g.remove();  // 类型变化：重建
        const g = svgEl('g', {}, this.gNodes);
        g.classList.add('unit-node');
        g.dataset.uid = uid;
        g.style.cursor = 'pointer';
        g.addEventListener('click', e => {
          e.stopPropagation();
          if (this._suppressClick) return;
          App.selectUnit(uid);
        });
        g.addEventListener('dblclick', e => { e.stopPropagation(); this.toggleCollapse(uid); });
        const parentUid = st.parent_id && layout.has(st.parent_id) ? st.parent_id : null;
        const pe = parentUid ? this.nodeEls.get(parentUid) : null;
        const from = pe ? { x: pe.cur.x, y: pe.cur.y } : { x: pos.x, y: pos.y };
        entry = { g, cur: { x: from.x, y: from.y, o: 0 }, type: pos.type, dying: false };
        this.nodeEls.set(uid, entry);
        this._tweenNode(uid, entry, pos, animate, 0);
      }
      const kidsCount = (snapshot.children.get(uid) || []).length;
      const meta = layout._collapsed.has(uid) ? { collapsedKids: kidsCount } : null;
      this.buildNodeContent(entry.g, uid, st, pos, meta);   // 内容刷新（番号/主官/角标）
      entry.g.setAttribute('transform', `translate(${entry.cur.x},${entry.cur.y})`);
      entry.g.setAttribute('opacity', entry.cur.o);
    });

    // 消失的节点淡出
    this.nodeEls.forEach((entry, uid) => {
      if (!seenNodes.has(uid) && !entry.dying) {
        entry.dying = true;
        const from = entry.cur.o;
        Anim.tween('node-out-' + uid, animate ? 380 : 0, v => {
          if (this.nodeEls.get(uid) !== entry) return;   // 已被新实例替换
          entry.cur.o = from * (1 - v);
          entry.g.setAttribute('opacity', entry.cur.o);
          if (v >= 1) {
            if (entry.g.parentNode) entry.g.remove();
            if (this.nodeEls.get(uid) === entry) this.nodeEls.delete(uid);
          }
        });
      }
    });

    // 连线
    visChildrenOf(layout, snapshot).forEach((kids, parentUid) => {
      kids.forEach(childUid => {
        seenEdges.add(childUid);
        let edge = this.edgeEls.get(childUid);
        if (!edge || edge.dying || edge.parentUid !== parentUid || !edge.path.parentNode) {
          if (edge && edge.path.parentNode) edge.path.remove();
          const path = svgEl('path', { class: 'unit-edge' }, this.gEdges);
          edge = { path, o: 0, dying: false, parentUid };
          this.edgeEls.set(childUid, edge);
          Anim.tween('edge-in-' + childUid, animate ? 420 : 0, v => { edge.o = v; });
        }
      });
    });
    this.edgeEls.forEach((edge, childUid) => {
      if (!seenEdges.has(childUid) && !edge.dying) {
        edge.dying = true;
        const from = edge.o;
        Anim.tween('edge-out-' + childUid, animate ? 320 : 0, v => {
          if (this.edgeEls.get(childUid) !== edge) return;   // 已被新实例替换
          edge.o = from * (1 - v);
          if (v >= 1) {
            if (edge.path.parentNode) edge.path.remove();
            if (this.edgeEls.get(childUid) === edge) this.edgeEls.delete(childUid);
          }
        });
      }
    });

    this.applyFocus();
    this.fit(animate);
  },

  _tweenNode(uid, entry, pos, animate, fromOpacity) {
    const fx = entry.cur.x, fy = entry.cur.y;
    const fo = fromOpacity != null ? fromOpacity : entry.cur.o;
    Anim.tween('node-' + uid, animate ? 480 : 0, v => {
      entry.cur.x = fx + (pos.x - fx) * v;
      entry.cur.y = fy + (pos.y - fy) * v;
      entry.cur.o = fo + (1 - fo) * v;
      entry.g.setAttribute('transform', `translate(${entry.cur.x},${entry.cur.y})`);
      entry.g.setAttribute('opacity', entry.cur.o);
    });
  },

  /* 连线跟随节点位置实时重算（父右缘中点 → 子左缘中点） */
  syncEdges() {
    this.edgeEls.forEach((edge, childUid) => {
      const c = this.nodeEls.get(childUid), p = this.nodeEls.get(edge.parentUid);
      if (!c || !p || c.dying || p.dying) return;
      const x1 = p.cur.x + (p.type === 'full' ? this.NW_FULL : this.NW_CMP);
      const y1 = p.cur.y + (p.type === 'full' ? this.NH_FULL : this.NH_CMP) / 2;
      const x2 = c.cur.x;
      const y2 = c.cur.y + (c.type === 'full' ? this.NH_FULL : this.NH_CMP) / 2;
      const mx = (x1 + x2) / 2;
      edge.path.setAttribute('d', `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
      edge.path.setAttribute('opacity', edge.o);
    });
  },

  /* ---------- 聚焦 / 兼任高亮 ---------- */
  applyFocus() {
    const pid = App.focusPerson;
    const t = Timeline.current().id;
    const hlUnits = pid ? personUnitsAt(pid, t) : [];
    const hlSet = new Set(hlUnits);

    const keep = new Set();
    if (pid) {
      hlUnits.forEach(uid => {
        let cur = uid;
        while (cur && !keep.has(cur)) {
          keep.add(cur);
          const st = this.snapshot && this.snapshot.units.get(cur);
          cur = st && st.parent_id && this.snapshot.units.has(st.parent_id) ? st.parent_id : null;
        }
      });
    }

    this.nodeEls.forEach((entry, uid) => {
      entry.g.classList.toggle('hl', hlSet.has(uid));
      entry.g.classList.toggle('dimmed', pid != null && !keep.has(uid));
    });
    this.edgeEls.forEach((edge, childUid) => {
      edge.path.classList.toggle('dimmed', pid != null && !keep.has(childUid) && !keep.has(edge.parentUid));
      edge.path.classList.toggle('hl', pid != null && hlSet.has(childUid));
    });
  },

  /* ---------- 悬停详情卡片 ---------- */
  bindNodeTip() {
    this.gNodes.addEventListener('mouseover', e => {
      const g = e.target.closest('.unit-node');
      if (g && g.dataset.uid) this.showNodeTip(g.dataset.uid, e);
    });
    this.gNodes.addEventListener('mousemove', e => {
      if (!this.tipEl.classList.contains('hidden')) this.moveNodeTip(e);
    });
    this.gNodes.addEventListener('mouseout', e => {
      const g = e.target.closest('.unit-node');
      if (g && (!e.relatedTarget || !g.contains(e.relatedTarget))) this.hideNodeTip();
    });
  },

  showNodeTip(uid, e) {
    const st = this.snapshot && this.snapshot.units.get(uid);
    if (!st) return;
    const kids = (this.snapshot.children.get(uid) || []).length;
    const collapsed = this.layout && this.layout._collapsed.has(uid);
    const FT = { concurrent: '兼', acting: '代', wounded: '伤', kia: '烈' };
    const flagHtml = f => f ? `<span class="nt-flag${(f === 'wounded' || f === 'kia') ? ' red' : ''}">${FT[f]}</span>` : '';
    const personLine = (pid, title, flag) => pid ? `
      <div class="nt-row"><span class="nt-title">${title}</span><span class="nt-name">${personName(pid)}</span>${flagHtml(flag)}</div>` : '';
    const staffRows = (st.staff || []).map(([pid, title]) => `
      <div class="nt-row nt-staff"><span class="nt-title">${title}</span><span class="nt-name">${personName(pid)}</span></div>`).join('');
    this.tipEl.innerHTML = `
      <div class="nt-head"><span class="nt-unit">${st.name}</span><span class="nt-level">${st.level}级</span></div>
      ${personLine(st.commander, st.c_title || '军事主官', st.commander_flag)}
      ${personLine(st.political_commissar, st.p_title || '政治委员', st.pc_flag)}
      ${staffRows}
      ${st.note ? `<div class="nt-note">${st.note}</div>` : ''}
      ${collapsed ? `<div class="nt-fold">▸ 含 ${kids} 个下辖建制 · 双击展开</div>` : (kids ? `<div class="nt-fold">双击可折叠下辖 ${kids} 个建制</div>` : '')}
    `;
    this.tipEl.classList.remove('hidden');
    this.moveNodeTip(e);
  },

  moveNodeTip(e) {
    const wrap = document.getElementById('canvas-wrap');
    const r = wrap.getBoundingClientRect();
    let x = e.clientX - r.left + 16, y = e.clientY - r.top + 14;
    const tw = this.tipEl.offsetWidth, th = this.tipEl.offsetHeight;
    if (x + tw > wrap.clientWidth - 8) x = e.clientX - r.left - tw - 12;
    if (y + th > wrap.clientHeight - 8) y = e.clientY - r.top - th - 12;
    this.tipEl.style.left = Math.max(8, x) + 'px';
    this.tipEl.style.top = Math.max(8, y) + 'px';
  },

  hideNodeTip() { this.tipEl.classList.add('hidden'); },

  /* ---------- 平移 / 缩放 / 复位 ---------- */
  bindPanZoom() {
    const svg = this.svg;
    let dragging = false, lastX = 0, lastY = 0, moved = 0;

    svg.addEventListener('mousedown', e => {
      dragging = true; moved = 0;
      lastX = e.clientX; lastY = e.clientY;
      svg.classList.add('panning');
    });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      moved += Math.abs(dx) + Math.abs(dy);
      lastX = e.clientX; lastY = e.clientY;
      this.view.x += dx; this.view.y += dy;
      this.applyView();
    });
    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      this._suppressClick = moved > 8;
      svg.classList.remove('panning');
      setTimeout(() => { this._suppressClick = false; }, 60);
    });

    svg.addEventListener('wheel', e => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const factor = Math.exp(-e.deltaY * 0.0012);
      const k = clamp(this.view.k * factor, 0.25, 2.5);
      this.view.x = mx - (mx - this.view.x) * (k / this.view.k);
      this.view.y = my - (my - this.view.y) * (k / this.view.k);
      this.view.k = k;
      this.applyView();
    }, { passive: false });
  },

  applyView() {
    this.viewport.setAttribute('transform', `translate(${this.view.x},${this.view.y}) scale(${this.view.k})`);
  },

  /* full=false：带缩放下限的可读视图（时间轴切换用）
     full=true ：无下限的完整总览（"复位"按钮用） */
  fit(animate = true, full = false) {
    const rect = this.svg.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    if (!W || !H || !this.layout) return;
    const bb = this.layout._bbox || { w: 100, h: 100 };
    const pad = 10;
    const K_MAX = 1.5;
    const kFit = clamp(Math.min((W - pad * 2) / Math.max(bb.w, 1), (H - pad * 2) / Math.max(bb.h, 1), K_MAX), 0.25, K_MAX);
    const k = full ? kFit : Math.max(kFit, this.FIT_FLOOR);
    const tx = (W - bb.w * k) / 2;
    const ty = (H - bb.h * k) / 2;
    if (!animate) {
      this.view = { x: tx, y: ty, k };
      this.applyView();
      return;
    }
    const from = { ...this.view };
    Anim.tween('view-fit', 520, v => {
      this.view.x = from.x + (tx - from.x) * v;
      this.view.y = from.y + (ty - from.y) * v;
      this.view.k = from.k + (k - from.k) * v;
      this.applyView();
    });
  },
};

/* 布局可见树的父子映射（供连线遍历） */
function visChildrenOf(layout, snapshot) {
  const res = new Map();
  snapshot.children.forEach((kids, uid) => {
    if (layout.has(uid) && !layout._collapsed.has(uid)) {
      const vk = kids.filter(k => layout.has(k));
      if (vk.length) res.set(uid, vk);
    }
  });
  return res;
}
