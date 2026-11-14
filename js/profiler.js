/* ============ 模块四：将领个人履历时光机 + 面板渲染 ============ */

const Profiler = {
  input: null,
  dropdown: null,

  init() {
    this.input = document.getElementById('search-input');
    this.dropdown = document.getElementById('search-dropdown');
    this.input.addEventListener('input', () => this.suggest());
    this.input.addEventListener('focus', () => this.suggest());
    document.addEventListener('click', e => {
      if (!e.target.closest('.search-box')) this.dropdown.classList.add('hidden');
    });
    document.getElementById('btn-exit-focus').addEventListener('click', () => App.exitFocus());
  },

  /* ---------- 全局搜索建议（按十大元帅 → 十大将 → 其他排序） ---------- */
  suggest() {
    const q = this.input.value.trim().toLowerCase();
    this.dropdown.innerHTML = '';
    const t = Timeline.current().id;
    const hits = q
      ? PEOPLE.filter(p => p.name.toLowerCase().includes(q) || (p.alias || '').toLowerCase().includes(q)).slice(0, 12)
      : PEOPLE.slice();   // 激活搜索框且未输入 → 展示全部将领

    // 排序：十大元帅（授衔序）→ 十大将（授衔序）→ 开国上将（授衔序）→ 其他
    const sorted = hits.slice().sort((a, b) => {
      const ta = rankTierOf(a.name), tb = rankTierOf(b.name);
      if (ta !== tb) return ta - tb;
      const idx = (tier, n) => tier === 0 ? RANK_ORDER.marshal.indexOf(n)
        : tier === 1 ? RANK_ORDER.general.indexOf(n)
        : tier === 2 ? RANK_ORDER.general2.indexOf(n) : 1e9;
      return idx(ta, a.name) - idx(tb, b.name);
    });

    if (!sorted.length) {
      htmlEl('div', 'search-item', '<span style="color:#8f8a7d">未找到相关人物</span>', this.dropdown);
    } else {
      htmlEl('div', 'search-header', q ? `匹配 ${sorted.length} 位人物` : `全部 ${PEOPLE.length} 位将领/英雄/人物 · 输入姓名筛选`, this.dropdown);
      let lastTier = -1;
      sorted.forEach(p => {
        const tier = rankTierOf(p.name);
        if (tier !== lastTier) {
          htmlEl('div', 'search-group', ['十大元帅', '十大将', '开国上将', '英雄 · 其他人物'][tier], this.dropdown);
          lastTier = tier;
        }
        const role = p.noMarch ? '未参加长征' : this.currentRoleText(p.person_id, t);
        const el = htmlEl('div', 'search-item', `
          <div class="avatar">${p.name[0]}</div>
          <span class="s-name">${p.name}${p.alias ? '（' + p.alias + '）' : ''}</span>
          ${p.noMarch ? '<span class="s-nomarch">未长征</span>' : ''}
          <span class="s-role">${role}</span>`, this.dropdown);
        el.addEventListener('click', () => {
          this.dropdown.classList.add('hidden');
          this.input.value = p.name;
          App.selectPerson(p.person_id);
        });
      });
    }
    this.dropdown.classList.remove('hidden');
  },

  currentRoleText(pid, t) {
    const units = personUnitsAt(pid, t);
    if (!units.length) return '暂不在建制序列中';
    const names = units.map(uid => {
      const u = UNITS_MAP[uid];
      const st = unitStateAt(u, t);
      return st.name;
    });
    return names.join(' · ');
  },

  /* ---------- 干部履历面板 ---------- */
  renderPerson(pid) {
    const p = PEOPLE_MAP[pid];
    if (!p) return;
    const t = Timeline.current().id;
    const body = document.getElementById('detail-body');
    const secTitle = document.getElementById('detail-sec-title');

    const curUnits = personUnitsAt(pid, t);
    const curText = p.noMarch
      ? '未参加长征'
      : curUnits.length
        ? '当前任职：' + curUnits.map(uid => unitStateAt(UNITS_MAP[uid], t).name).join('、')
        : '当前时间节点暂不在建制序列中';

    secTitle.textContent = '将领履历时光机';
    body.innerHTML = `
      <div class="person-profile">
        <div class="pp-head">
          <div class="pp-avatar">${p.name[0]}</div>
          <div>
            <div class="pp-name">${p.name}${p.noMarch ? '<span class="pp-nomarch">未参加长征</span>' : ''}</div>
            <div class="pp-alias">${p.alias ? '别名：' + p.alias : '　'} · ${curText}</div>
          </div>
        </div>
        ${p.note ? `<div class="pp-note">${p.note}</div>` : ''}
        <div class="career-legend">
          <span class="cl-mil"><i></i>军事职务</span>
          <span class="cl-pol"><i></i>政治职务</span>
          <span class="cl-tmp"><i></i>临时委派</span>
        </div>
        <div id="career-svg-box"></div>
        ${this.renderBio(p)}
      </div>`;

    this.renderCareer(p, curUnits);
  },

  /* 生平档案：生卒年月 / 1955授衔 / 山头源流 / 各时期职务 / 文革遭遇 */
  renderBio(p) {
    const b = p.bio;
    if (!b) return '';
    const fmt = d => d ? d.replace('-', '.') : '？';
    const eraRows = (b.eras || []).map(([era, role]) => `
      <div class="bio-era"><span class="be-label">${era}</span><span class="be-role">${role}</span></div>`).join('');
    const rank = b.rank55 || '—';
    const rankCls = /元帅|大将/.test(rank) ? 'gold' : (/上将|中将|少将/.test(rank) ? 'red' : '');
    const sh = b.shantou;
    const shBlock = sh ? `
      <div class="bio-shantou">
        <div class="bs-title">山头源流</div>
        <div class="bs-row"><span class="bs-label">起义源</span><span class="bs-val">${sh.qi}</span></div>
        <div class="bs-row"><span class="bs-label">根据地</span><span class="bs-val">${sh.gen}</span></div>
        <div class="bs-row"><span class="bs-label">长征序列</span><span class="bs-val">${sh.march}</span></div>
      </div>` : '';
    return `
      <div class="bio-section">
        <div class="bio-row"><span class="bio-label">生卒年月</span><span class="bio-val">${fmt(b.birth)} — ${fmt(b.death)}${b.deathNote ? `（${b.deathNote}）` : ''}</span></div>
        ${b.jiguan ? `<div class="bio-row"><span class="bio-label">籍　　贯</span><span class="bio-val">${b.jiguan}</span></div>` : ''}
        <div class="bio-row"><span class="bio-label">1955年授衔</span><span class="bio-rank ${rankCls}">${rank}</span></div>
        ${shBlock}
        ${eraRows}
        ${b.cr ? `<div class="bio-cr"><span class="bio-label">文革时期</span><span class="bio-val">${b.cr}</span></div>` : ''}
      </div>`;
  },

  renderCareer(p, curUnits) {
    const box = document.getElementById('career-svg-box');
    const W = box.clientWidth || 300;
    const rowH = 46, topPad = 26, botPad = 8;
    const H = p.career.length * rowH + topPad + botPad;
    const svg = svgEl('svg', { class: 'career-svg', width: W, height: H, viewBox: `0 0 ${W} ${H}` }, box);

    const xOf = t => 6 + dateRatio(t) * (W - 12);
    const xOfC = t => clamp(xOf(t), 6, W - 6);   // 履历条收敛在轴内（超窗的条贴轴端显示）
    const curT = Timeline.current().id;

    // 时间刻度
    [T_MIN, '1935-01', '1935-06', '1935-10', T_MAX].forEach(d => {
      svgEl('text', { class: 'axis-date', x: xOf(d), y: 12, 'text-anchor': d === T_MIN ? 'start' : (d === T_MAX ? 'end' : 'middle'), text: d.replace('-', '.') }, svg);
      svgEl('line', { x1: xOf(d), y1: 16, x2: xOf(d), y2: H - 4, stroke: '#2e2e2e', 'stroke-width': 0.6 }, svg);
    });

    // 当前时间标记
    svgEl('line', { class: 'cur-marker', x1: xOf(curT), y1: 16, x2: xOf(curT), y2: H - 4 }, svg);

    const TYPE_COLOR = { military: '#c92323', political: '#f0a500', temp: '#5b8db8' };
    const FLAG_TXT = { concurrent: '兼', acting: '代', wounded: '伤', kia: '烈' };

    p.career.forEach((c, i) => {
      const y = topPad + i * rowH + 4;
      const x1 = xOfC(c.range[0]), x2 = xOfC(c.range[1]);
      const w = Math.max(x2 - x1, 30);
      const isCur = c.range[0] <= curT && curT <= c.range[1];
      const g = svgEl('g', { class: 'career-bar' + (isCur ? ' cur' : '') }, svg);
      svgEl('rect', { class: 'cb-rect', x: x1, y, width: w, height: 26, rx: 4, fill: TYPE_COLOR[c.type] || '#888', opacity: c.flag === 'kia' ? 0.7 : 1 }, g);
      if (c.flag === 'wounded') svgEl('line', { x1: x1, y1: y + 26, x2: x1 + w, y2: y, stroke: 'rgba(0,0,0,0.35)', 'stroke-width': 2 }, g);

      const label = c.title + (c.flag ? `（${FLAG_TXT[c.flag]}）` : '');
      svgEl('text', { class: 'cb-label', x: x1 + 6, y: y + 11.5, text: label.length > 13 ? label.slice(0, 13) + '…' : label }, g);
      svgEl('text', { class: 'cb-sub', x: x1 + 6, y: y + 22, text: c.unit_name }, g);

      g.addEventListener('click', () => {
        // 点击履历块 → 跳转到该职务开始后的最近节点
        const target = ALL_DATES.find(d => d >= c.range[0]) || c.range[0];
        Timeline.stop();
        App.goto(ALL_DATES.indexOf(target) >= 0 ? ALL_DATES.indexOf(target) : 0);
      });
    });
  },

  /* ---------- 部队详情面板 ---------- */
  renderUnit(uid) {
    const u = UNITS_MAP[uid];
    if (!u) return;
    const t = Timeline.current().id;
    const st = unitStateAt(u, t);
    const body = document.getElementById('detail-body');
    const secTitle = document.getElementById('detail-sec-title');
    secTitle.textContent = '建制节点详情';

    const periodText = u.periods.map(p => `${p[0].replace('-', '.')} ~ ${p[1].replace('-', '.')}`).join('；');

    const personRow = (pid, title, flag) => pid ? `
      <div class="ud-person" data-pid="${pid}">
        <div class="avatar">${personName(pid)[0]}</div>
        <div>
          <div class="p-title">${title}</div>
          <div class="p-name">${personName(pid)}
            ${flag ? `<span class="p-flag ${flag === 'wounded' ? 'red' : ''}">${{ concurrent: '（兼）', acting: '（代）', wounded: '（负伤）', kia: '（牺牲）' }[flag]}</span>` : ''}
          </div>
        </div>
      </div>` : '';
    const staffRows = (st.staff || []).map(([pid, title]) => `
      <div class="ud-person" data-pid="${pid}">
        <div class="avatar">${personName(pid)[0]}</div>
        <div>
          <div class="p-title">${title} · 机关干部</div>
          <div class="p-name">${personName(pid)}</div>
        </div>
      </div>`).join('');

    body.innerHTML = `
      <div class="unit-detail">
        <div class="ud-name">${st.name}</div>
        <div class="ud-meta">
          <span class="ud-chip red">${st.level}级</span>
          <span class="ud-chip">存续 ${periodText}</span>
        </div>
        <div class="ud-persons">
          ${personRow(st.commander, st.c_title || '军事主官', st.commander_flag)}
          ${personRow(st.political_commissar, st.p_title || '政治委员', st.pc_flag)}
          ${staffRows}
        </div>
        ${st.note ? `<div class="ud-note">${st.note}</div>` : ''}
        <div class="ud-changes">
          <h4>建制沿革</h4>
          ${u.changes.map(c => `
            <div class="ud-change-item">
              <span class="c-date">${c.date.replace('-', '.')}</span>
              <span class="c-event">${c.event || '状态更新'}</span>
              ${c.note ? `<div class="c-note">${c.note}</div>` : ''}
            </div>`).join('')}
        </div>
      </div>`;

    body.querySelectorAll('.ud-person').forEach(el => {
      el.addEventListener('click', () => App.selectPerson(el.dataset.pid));
    });
  },
};
