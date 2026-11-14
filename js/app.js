/* ============ 应用主控制器：全局状态与模块联动 ============ */

const App = {
  view: 'map',           // 默认路线图视图：'map' | 'tree' | 'flow' | 'compare' | 'cast'
  focusPerson: null,
  selectedUnit: null,

  init() {
    Tree.init();
    Sankey.init();
    Compare.init();
    RouteMap.init();
    Cast.init();
    Timeline.init();
    Profiler.init();

    document.getElementById('btn-view-map').addEventListener('click', () => this.switchView('map'));
    document.getElementById('btn-view-tree').addEventListener('click', () => this.switchView('tree'));
    document.getElementById('btn-view-compare').addEventListener('click', () => this.switchView('compare'));
    document.getElementById('btn-view-cast').addEventListener('click', () => this.switchView('cast'));
    document.getElementById('tf-btn-tree').addEventListener('click', () => this.switchView('tree'));
    document.getElementById('tf-btn-flow').addEventListener('click', () => this.switchView('flow'));
    document.getElementById('btn-fit').addEventListener('click', () => {
      if (this.view === 'tree') Tree.fit(true, true);   // 复位 = 完整总览
      else if (this.view === 'map') RouteMap.reset();    // 路线图复位 = 回到路线总览
    });

    // 视角说明入口
    const pBtn = document.getElementById('btn-perspective');
    const pTip = document.getElementById('perspective-tip');
    pBtn.addEventListener('click', e => {
      e.stopPropagation();
      pTip.classList.toggle('hidden');
      pBtn.classList.toggle('active', !pTip.classList.contains('hidden'));
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#perspective-tip') && !e.target.closest('#btn-perspective')) {
        pTip.classList.add('hidden');
        pBtn.classList.remove('active');
      }
    });

    window.addEventListener('resize', () => {
      if (this.view === 'tree') Tree.fit(false, false);
    });

    this.goto(0, false);   // 初始化时间轴状态（map 视图下不渲染树，避免启动闪烁）
    Tree.hide();           // 树画布保持隐藏
    RouteMap.show();       // 进入路线图视图
  },

  /* 统一的树渲染入口：聚焦人物时强制展开其任职节点 */
  renderTree(animate = true) {
    const t = Timeline.current().id;
    Tree.render(t, animate, this.focusPerson ? personUnitsAt(this.focusPerson, t) : null);
  },

  /* ---------- 时间节点切换 ---------- */
  goto(i, animate = true) {
    if (i < 0 || i >= TIME_NODES.length) return;
    Timeline.setIndex(i);
    if (this.view === 'map' || this.view === 'cast') return;   // 路线图/番外视图：不联动时空节点/建制树/面板
    const node = Timeline.current();
    this.renderEventCard(node);

    if (this.view === 'tree') {
      this.renderTree(animate);
      if (this.focusPerson) Profiler.renderPerson(this.focusPerson);
      else if (this.selectedUnit) {
        if (UNITS_MAP[this.selectedUnit] && unitActiveAt(UNITS_MAP[this.selectedUnit], node.id)) {
          Profiler.renderUnit(this.selectedUnit);
        } else {
          this.selectedUnit = null;
          this.renderEventCard(node);
        }
      }
    } else if (this.view === 'flow') {
      Sankey.render(node.id, animate);
    } else if (this.view === 'compare') {
      Compare.render(animate);
    }
  },

  /* ---------- 视图切换 ---------- */
  switchView(v) {
    if (this.view === v) return;
    this.view = v;
    const isTree = v === 'tree';
    document.getElementById('btn-view-map').classList.toggle('active', v === 'map');
    document.getElementById('btn-view-tree').classList.toggle('active', v === 'tree' || v === 'flow');
    document.getElementById('btn-view-compare').classList.toggle('active', v === 'compare');
    document.getElementById('btn-view-cast').classList.toggle('active', v === 'cast');
    document.getElementById('tf-btn-tree').classList.toggle('active', v === 'tree');
    document.getElementById('tf-btn-flow').classList.toggle('active', v === 'flow');
    document.getElementById('canvas-legend').style.display = isTree ? '' : 'none';
    document.body.classList.toggle('view-flow', !isTree);   // 非树视图隐藏阶段兵力卡片，避免遮挡标题区
    document.body.classList.toggle('view-compare', v === 'compare');   // 数据统计视图：隐藏时间轴/时空节点/树流切换
    document.body.classList.toggle('view-map', v === 'map');   // 路线图视图：全画布地图
    document.body.classList.toggle('view-cast', v === 'cast'); // 番外视图：角色谱
    this.updateFocusBanner();
    if (v === 'compare' || v === 'map' || v === 'cast') Timeline.stop();
    if (v === 'flow') {
      RouteMap.hide();
      Cast.hide();
      Tree.hide();
      Compare.hide();
      Sankey.show();
    } else if (v === 'compare') {
      RouteMap.hide();
      Cast.hide();
      Tree.hide();
      Sankey.hide();
      Compare.show();
    } else if (v === 'map') {
      Cast.hide();
      Tree.hide();
      Sankey.hide();
      Compare.hide();
      RouteMap.show();
    } else if (v === 'cast') {
      RouteMap.hide();
      Tree.hide();
      Sankey.hide();
      Compare.hide();
      Cast.show();
    } else {
      RouteMap.hide();
      Cast.hide();
      Sankey.hide();
      Compare.hide();
      Tree.show();
      this.renderTree(true);
      if (!this.focusPerson && !this.selectedUnit) this.renderEventCard(Timeline.current());
    }
  },

  /* ---------- 选中部队节点 ---------- */
  selectUnit(uid) {
    if (!UNITS_MAP[uid]) return;
    this.selectedUnit = uid;
    Profiler.renderUnit(uid);
  },

  /* ---------- 选中干部：聚焦模式 + 兼任高亮（树视图）/ 右侧信息（其他视图） ---------- */
  selectPerson(pid) {
    if (!PEOPLE_MAP[pid]) return;
    this.focusPerson = pid;
    this.selectedUnit = null;
    document.getElementById('search-input').value = PEOPLE_MAP[pid].name;
    document.getElementById('panel-event').classList.add('hidden');   // 聚焦时隐藏时空节点卡
    document.getElementById('focus-banner').classList.remove('hidden');
    this.updateFocusBanner();
    Profiler.renderPerson(pid);
    if (this.view === 'tree') this.renderTree(true);   // 树视图下高亮兼职节点；其他视图仅右侧展示信息
  },

  updateFocusBanner() {
    if (!this.focusPerson) return;
    const name = PEOPLE_MAP[this.focusPerson].name;
    document.getElementById('focus-banner-text').textContent = (this.view === 'compare' || this.view === 'map' || this.view === 'cast')
      ? `聚焦模式：${name}`
      : `聚焦模式：${name}（点击其姓名可高亮全部兼职节点）`;
  },

  exitFocus() {
    this.focusPerson = null;
    document.getElementById('focus-banner').classList.add('hidden');
    document.getElementById('search-input').value = '';
    document.getElementById('panel-event').classList.remove('hidden');  // 恢复时空节点卡
    if (this.view === 'compare') {
      this.renderStatsList();          // 数据统计视图：恢复统计明细面板
    } else if (this.view === 'map') {
      RouteMap.renderPanel();          // 路线图视图：恢复路线节点/总览面板
    } else if (this.view === 'cast') {
      Cast.renderPanel();             // 番外视图：恢复角色谱说明面板
    } else {
      this.renderTree(true);
      this.renderEventCard(Timeline.current());
    }
  },

  /* ---------- 事件卡 + 阶段兵力徽章 ---------- */
  renderEventCard(node) {
    document.getElementById('ev-date').textContent = node.date;
    document.getElementById('ev-title').textContent = node.title;
    document.getElementById('ev-fact').textContent = node.fact;
    document.getElementById('ev-desc').textContent = node.desc;

    const chip = document.getElementById('stage-strength');
    if (node.strength) {
      chip.classList.remove('hidden');
      chip.innerHTML = `
        <div class="ss-head"><span class="ss-label">阶段兵力</span><span class="ss-num">${node.strength}</span></div>
        ${node.strengthNote ? `<div class="ss-note">${node.strengthNote}</div>` : ''}`;
    } else {
      chip.classList.add('hidden');
    }

    if (!this.focusPerson && !this.selectedUnit) {
      document.getElementById('detail-sec-title').textContent = '当前节点 · 建制一览';
      document.getElementById('detail-body').innerHTML = this.snapshotSummary();
    }
  },

  snapshotSummary() {
    const t = Timeline.current().id;
    const snap = buildSnapshot(t);
    const byLevel = new Map();
    snap.units.forEach(st => {
      byLevel.set(st.level, (byLevel.get(st.level) || 0) + 1);
    });
    const order = ['军委', '方面军', '兵团', '军团', '支队', '军', '师', '纵队', '团'];
    const rows = order.filter(l => byLevel.has(l)).map(l => `
      <div class="ud-change-item" style="display:flex;justify-content:space-between">
        <span class="c-event">${l}级建制</span><span class="c-date">${byLevel.get(l)} 个</span>
      </div>`).join('');
    const total = snap.units.size;
    return `
      <div class="unit-detail">
        <div class="ud-meta"><span class="ud-chip red">当前共 ${total} 个建制节点</span></div>
        ${rows}
        <div class="ud-note" style="margin-top:10px">点击画布中的部队节点查看详情与沿革；点击人名进入该将领的履历时光机。</div>
      </div>`;
  },

  /* ---------- 数据统计明细（面板内，随二级 tab 切换） ---------- */
  renderStatsList() {
    const sub = Compare.subTab;
    if (sub === 'ranks') this.renderStatsRanks();
    else if (sub === 'martyrs') this.renderStatsMartyrs();
    else this.renderStatsForces();
  },

  /* 明细 · 兵力对比 */
  renderStatsForces() {
    document.getElementById('detail-sec-title').textContent = '四路红军 · 兵力统计明细';
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-note" style="margin-bottom:8px">各路红军长征出发与到达人数（通行口径）：</div>
        <div class="flow-list">
          ${COMPARE_DATA.map(d => `
            <div class="flow-list-item cmp-item">
              <span class="fl-from">${d.name}${d.alias ? '（' + d.alias + '）' : ''}</span>
              <span class="fl-arrow">→</span>
              <span class="fl-to">${d.depLabel} → ${d.arrLabel}</span>
              <span class="fl-people">${d.route}｜${d.note}</span>
            </div>`).join('')}
        </div>
        <div class="ud-note" style="margin-top:10px">合计：出发约 18.6 万 → 到达约 6.1 万。红25军为唯一增员部队；红四方面军会师后 2.18 万人西渡黄河组成西路军。</div>
      </div>`;
  },

  /* 明细 · 授衔将帅 */
  renderStatsRanks() {
    document.getElementById('detail-sec-title').textContent = '1955 授衔 · 将帅明细';
    const rankRow = (label, names, cls) => names.length ? `
      <div class="cmp-rank-row">
        <span class="rk-chip ${cls}">${label}</span>
        <span class="rk-names">${names.map(n => `<span class="rk-name ${cls}" data-name="${n}">${n}</span>`).join('<i class="rk-sep">、</i>')}</span>
      </div>` : '';
    const rankBlock = (d, dim) => {
      const r = d.ranks;
      const total = RANK_KEYS.reduce((s, k) => s + r[k.key].length, 0);
      return `<div class="cmp-rank-force${dim ? ' nm' : ''}">
        <div class="crf-head"><span class="crf-name">${d.name}</span><span class="crf-count">共 ${total} 人</span></div>
        ${rankRow('元帅', r.marshal, 'marshal')}${rankRow('大将', r.general, 'general')}${rankRow('上将', r.general2, 'general2')}
      </div>`;
    };
    const nmCount = RANK_KEYS.reduce((s, k) => s + NON_MARCH_RANKS[k.key].length, 0);
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-note" style="margin-bottom:8px">1955 年授衔 · 各路红军走出的开国将帅（点击人名查看履历时光机）：</div>
        <div class="cmp-rank-list">
          ${COMPARE_DATA.map(d => rankBlock(d, false)).join('')}
          ${rankBlock({ name: '未参加长征', ranks: NON_MARCH_RANKS }, true)}
        </div>
        <div class="ud-note" style="margin-top:10px">未参加长征的 ${nmCount} 位将帅：留守游击（陈毅、傅秋涛、钟期光、叶飞）、留苏（许光达、阎红彦）、白区/民族地区（粟裕先遣转战浙南、乌兰夫）、起义将领（董其武、陶峙岳、陈明仁，时为国民党军军官）、东北军（吕正操）。按长征出发时所在部队归类：陈伯钧出发时在红五军团（红一方面军），1936年改任红六军团军团长；朱德、刘伯承等懋功会师后随红军总部（左路军）行动，仍计入红一方面军。</div>
      </div>`;
    document.getElementById('detail-body').querySelectorAll('.rk-name').forEach(el => {
      el.addEventListener('click', () => {
        const pid = Compare.pidOf(el.dataset.name);
        if (pid) App.selectPerson(pid);   // 数据统计视图内直接右侧展示，不切换视图
      });
    });
  },

  /* 明细 · 牺牲英烈（名录在画布，面板仅统计口径） */
  renderStatsMartyrs() {
    document.getElementById('detail-sec-title').textContent = '牺牲英烈 · 统计口径';
    document.getElementById('detail-body').innerHTML = `
      <div class="unit-detail">
        <div class="ud-note" style="margin-bottom:10px"><b>收录范围</b>：长征时期（1934.10 — 1936.10）牺牲、就义或病逝的人员，含四路红军、北上抗日先遣队（红10军团）、陕北红军，以及留守苏区坚持游击战争的党政军人员。</div>
        <div class="ud-note" style="margin-bottom:10px"><b>分级口径</b>：<span style="color:var(--red)">■</span> 师级以上指挥员及党政军领导人计为"将帅"；<span style="color:#f0a500">●</span> 团级及以下计为"英雄"。</div>
        <div class="ud-note" style="margin-bottom:10px"><b>非战斗减员</b>：病逝（黄开湘、曹德清）、溺水（夏曦）、伤重不治（谢子长）等人名后单独标注。</div>
        <div class="ud-note" style="margin-bottom:10px"><b>交互</b>：点击画布中的人名，可打开该人物的履历时光机。</div>
        <div class="ud-note">湘江等战役中牺牲的无名战士难以计数，谨以此名录致敬所有英烈。</div>
      </div>`;
  },

  /* ---------- 人事流向列表（面板内） ---------- */
  renderFlowList(flow) {
    const body = document.getElementById('detail-body');
    const secTitle = document.getElementById('detail-sec-title');
    if (!flow) {
      secTitle.textContent = '当前节点 · 建制一览';
      body.innerHTML = this.snapshotSummary();
      return;
    }
    secTitle.textContent = '整编流向明细';
    body.innerHTML = `
      <div class="unit-detail">
        <div class="ud-note">${flow.note}</div>
        <div class="flow-list">
          ${flow.links.map((l, i) => {
            const f = flow.left.find(n => n.id === l.from);
            const tt = flow.right.find(n => n.id === l.to);
            return `<div class="flow-list-item" data-i="${i}">
              <span class="fl-from">${f ? f.label : ''}</span><span class="fl-arrow">→</span><span class="fl-to">${tt ? tt.label : ''}</span>
              <span class="fl-people">${l.people && l.people.length ? l.people.join('、') : '（建制调整）'}</span>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  },
};

window.addEventListener('DOMContentLoaded', () => App.init());
