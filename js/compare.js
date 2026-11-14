/* ============ 模块四：数据统计（兵力对比 / 1955 授衔 / 牺牲英烈） ============ */

const COMPARE_DATA = [
  { name: '红一方面军', alias: '中央红军',
    route: '1934.10 于都出发 → 1935.10 抵达陕北吴起镇',
    dep: 86000, depLabel: '8.6 万', arr: 7000, arrLabel: '7 千余',
    note: '湘江一战由 8.6 万锐减至 3 万余；与红15军团会师后恢复至 1 万余人',
    ranks: {
      marshal: ['朱德', '彭德怀', '林彪', '刘伯承', '罗荣桓', '聂荣臻', '叶剑英'],
      general: ['黄克诚', '陈赓', '谭政', '萧劲光', '张云逸', '罗瑞卿'],
      general2: ['张宗逊', '李克农', '邓华', '彭绍辉', '张爱萍', '杨成武', '李涛', '王平', '萧华',
        '宋任穷', '苏振华', '郭天民', '周士第', '杨得志', '陈伯钧', '朱良才', '唐亮', '黄永胜',
        '李天佑', '陈奇涵', '陈士榘', '李聚奎', '杨至成', '刘亚楼', '赖传珠', '赵尔陆', '韦国清',
        '宋时轮', '李志民', '周桓', '杨勇'],
    } },
  { name: '红二方面军', alias: '红二、六军团',
    route: '1935.11 桑植刘家坪出发 → 1936.10 将台堡会师',
    dep: 17000, depLabel: '1.7 万', arr: 11000, arrLabel: '1.1 万',
    note: '1936.7 甘孜组成红二方面军（含红32军），转战湘黔滇康，损失最小',
    ranks: {
      marshal: ['贺龙'],
      general: [],
      general2: ['萧克', '李达', '王震', '甘泗淇', '贺炳炎'],
    } },
  { name: '红四方面军', alias: '',
    route: '1935.5 强渡嘉陵江、撤离川陕 → 1936.10 会宁会师',
    dep: 80000, depLabel: '8 万', arr: 40000, arrLabel: '4 万',
    note: '三过草地损失过半；会师后 2.18 万人西渡黄河组成西路军',
    ranks: {
      marshal: ['徐向前'],
      general: ['王树声'],
      general2: ['许世友', '傅钟', '陈再道', '陈锡联', '谢富治', '洪学智', '王新亭', '王宏坤', '王建安', '周纯全'],
    } },
  { name: '红25军', alias: '「小长征」',
    route: '1934.11 罗山何家冲出发 → 1935.9 延安永坪会师',
    dep: 2980, depLabel: '2980 人', arr: 3400, arrLabel: '3400 人',
    note: '唯一人数不减反增的长征部队，途中留鄂豫陕根据地 2000 余人',
    ranks: {
      marshal: [],
      general: ['徐海东'],
      general2: ['韩先楚', '刘震'],
    } },
];

/* 未参加长征的授衔将帅（留守游击 / 留苏 / 白区 / 起义将领等），单列一类 */
const NON_MARCH_RANKS = {
  marshal: ['陈毅'],
  general: ['粟裕', '许光达'],
  general2: ['傅秋涛', '吕正操', '钟期光', '乌兰夫', '叶飞', '董其武', '陶峙岳', '陈明仁', '阎红彦'],
};

/* 三级军衔展示配置（颜色与 CSS 类对应） */
const RANK_KEYS = [
  { key: 'marshal',  label: '元帅', short: '帅', cls: 'marshal'  },
  { key: 'general',  label: '大将', short: '将', cls: 'general'  },
  { key: 'general2', label: '上将', short: '上', cls: 'general2' },
];

/* 长征路上及长征时期牺牲的将帅与英雄（按部队/根据地分组，组内按牺牲时间排序） */
const MARTYR_GROUPS = [
  { name: '红一方面军（中央红军）', names: ['洪超', '唐浚', '钟伟剑', '陈树湘', '程翠林', '沈述清', '黄冕昌', '苏达清', '邓萍', '龙振文', '曹德清', '毛振华', '黄甦', '廖大珠', '黄开湘', '徐策'] },
  { name: '红二方面军（红二、六军团）', names: ['夏曦'] },
  { name: '红四方面军', names: ['罗南辉'] },
  { name: '红25军', names: ['吴焕先'] },
  { name: '陕北红军', names: ['谢子长', '刘志丹'] },
  { name: '北上抗日先遣队（红10军团）', names: ['寻淮洲', '方志敏', '刘畴西'] },
  { name: '留守苏区（坚持游击战争）', names: ['何叔衡', '贺昌', '阮啸仙', '刘伯坚', '毛泽覃', '瞿秋白', '古柏'] },
];

/* 牺牲者分级：师级以上指挥员及党政军领导人为"将帅"，团级及以下为"英雄" */
function martyrIsCommander(title) {
  return /(军长|军团长|师长|政治委员|政委|政治部主任|参谋长|总指挥|司令员|主席|书记|部长|委员)/.test(title || '');
}

/* 非战斗减员（病逝、溺水、伤重不治等） */
function martyrIsNonCombat(deathNote) {
  return /病逝|病故|溺水|伤重逝世/.test(deathNote || '');
}

const Compare = {
  g: null,
  _pidMap: null,
  subTab: 'forces',   // 二级 tab：'forces' | 'ranks' | 'martyrs'

  init() {
    this.g = svgEl('g', { id: 'compare-layer' }, document.getElementById('canvas'));
    this.g.style.display = 'none';
    window.addEventListener('resize', () => { if (App.view === 'compare') this.render(false); });
    document.querySelectorAll('#cmp-subtabs button').forEach(btn => {
      btn.addEventListener('click', () => this.setSubTab(btn.dataset.sub));
    });
  },

  show() { this.g.style.display = ''; this.render(true); },
  hide() { this.g.style.display = 'none'; },

  /* ---------- 二级 tab 切换 ---------- */
  setSubTab(sub) {
    if (this.subTab === sub) return;
    this.subTab = sub;
    document.querySelectorAll('#cmp-subtabs button').forEach(b =>
      b.classList.toggle('active', b.dataset.sub === sub));
    this.render(true);
  },

  /* 姓名 → person_id（点击人名进入聚焦模式） */
  pidOf(name) {
    if (!this._pidMap) {
      this._pidMap = {};
      PEOPLE.forEach(p => { this._pidMap[p.name] = p.person_id; });
    }
    return this._pidMap[name] || null;
  },

  focusName(name) {
    const pid = this.pidOf(name);
    if (!pid) return;
    App.selectPerson(pid);   // 不切换视图，右侧面板直接展示该将领信息
  },

  /* 牺牲者详情：person / 牺牲时任职（无 kia 标记时取最后任职）/ BIOS 生卒 */
  martyrInfo(name) {
    const pid = this.pidOf(name);
    if (!pid) return null;
    const p = PEOPLE_MAP[pid];
    const career = p.career || [];
    const kia = career.find(c => c.flag === 'kia') || career[career.length - 1];
    return { pid, p, kia, bio: BIOS[pid] || {} };
  },

  render(animate) {
    const g = this.g;
    g.innerHTML = '';
    const svg = document.getElementById('canvas');
    const W = svg.clientWidth, H = svg.clientHeight;
    if (!W || !H) return;
    if (this.subTab === 'ranks') this.renderRanks(g, W, H, animate);
    else if (this.subTab === 'martyrs') this.renderMartyrs(g, W, H, animate);
    else this.renderForces(g, W, H, animate);

    /* 面板：聚焦某将领时展示其档案，否则展示统计明细 */
    if (App.focusPerson) Profiler.renderPerson(App.focusPerson);
    else App.renderStatsList();
  },

  /* 公共：标题 + 副标题（画在二级 tab 栏下方） */
  header(g, W, compact, title, subHTML) {
    svgEl('text', { class: 'cmp-title', x: W / 2, y: compact ? 76 : 82, 'text-anchor': 'middle', text: title }, g);
    const sub = svgEl('text', { class: 'cmp-sub', x: W / 2, y: compact ? 96 : 102, 'text-anchor': 'middle' }, g);
    sub.innerHTML = subHTML;
  },

  secTitle(g, txt, y) {
    const t = svgEl('text', { class: 'cmp-sec-title', x: 40, y }, g);
    t.innerHTML = `<tspan class="cmp-sec-dot" font-size="10">◆</tspan> ${txt}`;
  },

  sumBox(g, W, y, h, lines) {
    svgEl('rect', { class: 'cmp-sum-bg', x: 40, y, width: W - 80, height: h, rx: 8 }, g);
    const gap = h / (lines.length + 1);
    lines.forEach((html, i) => {
      const t = svgEl('text', { class: 'cmp-sum', x: W / 2, y: y + gap * (i + 1) + 4, 'text-anchor': 'middle' }, g);
      t.innerHTML = html;
    });
  },

  /* ============ Tab 1：兵力对比（出发 → 结束） ============ */
  renderForces(g, W, H, animate) {
    const compact = H < 760;
    const barX = 380;                                   // 数据条统一起点，避开左侧文案
    const maxBar = W - barX - 180;
    const scale = maxBar / 86000;

    this.header(g, W, compact, '四路红军长征 · 兵力对比',
      '<tspan fill="#c92323">■</tspan> 出发人数　<tspan fill="#f0a500">■</tspan> 到达人数　│　红25军为唯一增员部队');
    this.secTitle(g, '兵力对比 · 出发 → 结束', compact ? 122 : 134);
    const rowAH = compact ? 50 : 62;
    let y = compact ? 132 : 146;

    COMPARE_DATA.forEach((d, i) => {
      const gy = y + i * rowAH;
      const delta = Math.round((d.arr - d.dep) / d.dep * 100);
      const A = compact
        ? { nameY: 21, depY: 0, arrY: 18, barH: 13, depLY: 11, arrLY: 29, dY: 23, dSubY: 39 }
        : { nameY: 26, depY: 2, arrY: 24, barH: 16, depLY: 15, arrLY: 37, dY: 28, dSubY: 46 };

      // 左侧：番号标识（行程与注释见右侧统计明细）
      svgEl('text', { class: 'cmp-force', x: 40, y: gy + A.nameY, text: d.name }, g);
      if (d.alias) svgEl('text', { class: 'cmp-alias', x: 40 + d.name.length * 17 + 6, y: gy + A.nameY, text: d.alias }, g);

      // 出发条（红）
      const depW = Math.max(3, d.dep * scale);
      const depBar = svgEl('rect', { class: 'cmp-bar-dep', x: barX, y: gy + A.depY, width: animate ? 0 : depW, height: A.barH, rx: 3 }, g);
      svgEl('text', { class: 'cmp-val', x: barX + depW + 8, y: gy + A.depLY, text: d.depLabel }, g);
      // 到达条（金）
      const arrW = Math.max(3, d.arr * scale);
      const arrBar = svgEl('rect', { class: 'cmp-bar-arr', x: barX, y: gy + A.arrY, width: animate ? 0 : arrW, height: A.barH, rx: 3 }, g);
      svgEl('text', { class: 'cmp-val', x: barX + arrW + 8, y: gy + A.arrLY, text: d.arrLabel }, g);

      // 增减比例徽标
      const up = delta > 0;
      svgEl('text', {
        class: 'cmp-delta' + (up ? ' up' : ''), x: W - 40, y: gy + A.dY, 'text-anchor': 'end',
        text: (up ? '+' : '') + delta + '%'
      }, g);
      svgEl('text', { class: 'cmp-delta-sub', x: W - 40, y: gy + A.dSubY, 'text-anchor': 'end', text: up ? '不减反增' : '折损' }, g);

      if (animate) {
        Anim.tween('cmp-dep-' + i, 700 + i * 90, v => depBar.setAttribute('width', depW * v), Ease.outCubic);
        Anim.tween('cmp-arr-' + i, 850 + i * 90, v => arrBar.setAttribute('width', arrW * v), Ease.outCubic);
      }
    });
    y += COMPARE_DATA.length * rowAH;

    this.sumBox(g, W, y + (compact ? 8 : 10), compact ? 40 : 48, [
      '合计：出发约 18.6 万 → 到达约 6.1 万',
      '红25军为唯一增员部队，红四方面军会师后 2.18 万人组成西路军'
    ]);
  },

  /* ============ Tab 2：1955 授衔（各路红军 + 未参加长征单列） ============ */
  renderRanks(g, W, H, animate) {
    const compact = H < 760;
    const barX = 380;
    const rankRows = [
      ...COMPARE_DATA.map(d => ({ name: d.name, alias: d.alias, ranks: d.ranks, dim: false })),
      { name: '未参加长征', alias: '留守游击 / 留苏 / 白区 / 起义将领', ranks: NON_MARCH_RANKS, dim: true },
    ];
    const maxTotal = Math.max(...rankRows.map(r => RANK_KEYS.reduce((s, k) => s + r.ranks[k.key].length, 0)));
    const rankMaxW = Math.max(140, W - barX - 200);
    const rankScale = rankMaxW / maxTotal;
    const B = compact
      ? { nameY: 14, barY: 1, barH: 13, cntY: 12 }
      : { nameY: 18, barY: 2, barH: 16, cntY: 15 };

    this.header(g, W, compact, '1955 年授衔 · 走出的开国将帅',
      '<tspan class="rk-badge-marshal">★</tspan> 元帅　<tspan class="rk-badge-general">★</tspan> 大将　'
      + '<tspan class="rk-badge-general2">★</tspan> 上将　│　授衔按长征出发部队归类');
    this.secTitle(g, '开国将帅 · 按出发部队归类', compact ? 122 : 134);
    let ry = compact ? 132 : 146;

    rankRows.forEach((d, i) => {
      const gy = ry;
      // 左侧：番号标识（人名明细见右侧统计面板）
      svgEl('text', { class: 'cmp-force' + (d.dim ? ' cmp-force-dim' : ''), x: 40, y: gy + B.nameY, text: d.name }, g);
      if (d.alias) svgEl('text', { class: 'cmp-alias', x: 40 + d.name.length * 17 + 6, y: gy + B.nameY, text: d.alias }, g);

      // 授衔数据条：元帅·大将·上将三色累加
      let rx = barX;
      RANK_KEYS.forEach((r, j) => {
        const n = d.ranks[r.key].length;
        if (!n) return;
        const w = Math.max(3, n * rankScale - 1.5);
        const seg = svgEl('rect', { class: 'cmp-bar-' + r.cls, x: rx, y: gy + B.barY, width: animate ? 0 : w, height: B.barH, rx: 2 }, g);
        if (animate) Anim.tween('cmp-rk-' + i + '-' + j, 800 + i * 70 + j * 120, v => seg.setAttribute('width', w * v), Ease.outCubic);
        rx += w + 1.5;
      });
      const cnt = svgEl('text', { class: 'cmp-rk-count', x: rx + 6, y: gy + B.cntY }, g);
      cnt.innerHTML = RANK_KEYS.map(r =>
        `<tspan class="rk-c-${r.cls}">${r.short} ${d.ranks[r.key].length}</tspan>`).join('<tspan class="rk-c-dim"> · </tspan>');

      ry += compact ? 28 : 36;
    });

    const mTotal = RANK_KEYS.reduce((s, r) => s + COMPARE_DATA.reduce((a, d) => a + d.ranks[r.key].length, 0), 0);
    const nmCount = RANK_KEYS.reduce((s, r) => s + NON_MARCH_RANKS[r.key].length, 0);
    this.sumBox(g, W, ry + (compact ? 8 : 10), compact ? 44 : 52, [
      `1955 授衔：四路红军走出开国将帅 ${mTotal} 人`
      + `（<tspan class="rk-c-marshal">元帅 ${COMPARE_DATA.reduce((a, d) => a + d.ranks.marshal.length, 0)}</tspan>`
      + `<tspan class="rk-c-dim"> · </tspan><tspan class="rk-c-general">大将 ${COMPARE_DATA.reduce((a, d) => a + d.ranks.general.length, 0)}</tspan>`
      + `<tspan class="rk-c-dim"> · </tspan><tspan class="rk-c-general2">上将 ${COMPARE_DATA.reduce((a, d) => a + d.ranks.general2.length, 0)}</tspan>）`,
      `另有 ${nmCount} 人未参加长征（留守游击 / 留苏 / 白区 / 起义将领）`
    ]);
  },

  /* ============ Tab 3：牺牲英烈（名录在画布双栏，口径在右侧面板） ============ */
  renderMartyrs(g, W, H, animate) {
    const compact = H < 800;   // 名录内容较多，较其他 tab 更早进入紧凑模式
    this.header(g, W, compact, '长征路上 · 牺牲的将帅与英雄',
      '<tspan fill="#c92323">■</tspan> 将帅与党政军领导人　<tspan fill="#f0a500">●</tspan> 英雄（团级及以下）　│　点击人名打开履历时光机');

    const rowH = compact ? 22 : 24;
    const grpGap = compact ? 22 : 26;
    const colGap = 48;
    const colW = (W - 80 - colGap) / 2;
    const colX = [40, 40 + colW + colGap];
    /* 左栏：红一、红二方面军；右栏：其余各组 */
    const cols = [MARTYR_GROUPS.slice(0, 2), MARTYR_GROUPS.slice(2)];
    let maxY = compact ? 114 : 124;

    cols.forEach((groups, ci) => {
      let y = compact ? 114 : 124;
      groups.forEach(grp => {
        const head = svgEl('text', { class: 'cmp-sec-title', x: colX[ci], y }, g);
        head.innerHTML = `<tspan class="cmp-sec-dot" font-size="10">◆</tspan> ${grp.name} · ${grp.names.length} 人`;
        y += compact ? 11 : 14;   // 组标题 → 本组第一行

        grp.names.forEach(name => {
          const info = this.martyrInfo(name);
          if (!info) return;
          const cmd = martyrIsCommander(info.kia && info.kia.title);
          const note = info.bio.deathNote || '';
          const ill = martyrIsNonCombat(note);
          const illTag = /溺水/.test(note) ? '溺水' : (/伤重/.test(note) ? '伤逝' : '病逝');
          const baseY = y + rowH - 7;

          const nameEl = svgEl('text', { class: 'cmp-martyr-name', x: colX[ci], y: baseY }, g);
          nameEl.innerHTML = name + (ill ? `<tspan class="cmp-martyr-flag" font-size="9.5" letter-spacing="0"> ${illTag}</tspan>` : '');
          nameEl.addEventListener('click', () => this.focusName(name));
          svgEl('text', { class: cmd ? 'cmp-martyr-cmd' : 'cmp-martyr-hero', x: colX[ci] + 76, y: baseY, text: cmd ? '■' : '●' }, g);
          svgEl('text', { class: 'cmp-martyr-title', x: colX[ci] + 94, y: baseY,
            text: (info.kia ? info.kia.unit_name : '') + (info.kia ? info.kia.title : '') }, g);
          /* 牺牲简介：按栏宽截断，完整内容见该人物时光机 */
          const maxChars = Math.max(8, Math.floor((colW - 220 - 8) / 10.5));
          let brief = note;
          if (brief.length > maxChars) brief = brief.slice(0, maxChars - 1) + '…';
          svgEl('text', { class: 'cmp-martyr-note', x: colX[ci] + 220, y: baseY, text: brief }, g);
          y += rowH;
        });
        y += grpGap;
      });
      maxY = Math.max(maxY, y - grpGap);
    });

    let cmdCount = 0, heroCount = 0, illCount = 0;
    MARTYR_GROUPS.forEach(grp => grp.names.forEach(n => {
      const info = this.martyrInfo(n);
      if (!info) return;
      martyrIsCommander(info.kia && info.kia.title) ? cmdCount++ : heroCount++;
      if (martyrIsNonCombat(info.bio.deathNote)) illCount++;
    }));
    this.sumBox(g, W, maxY + (compact ? 8 : 10), compact ? 38 : 42, [
      `合计：将帅 ${cmdCount} 人 · 英雄 ${heroCount} 人（共 ${cmdCount + heroCount} 人）　·　其中病逝、溺水、伤重不治等非战斗减员 ${illCount} 人`,
      '血洒征途，功勋不朽 —— 谨以此名录致敬长征时期牺牲的所有英烈'
    ]);
  },
};
