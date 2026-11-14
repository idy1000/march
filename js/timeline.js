/* ============ 模块一：时空轴控制中心 ============ */

const Timeline = {
  idx: 0,
  playing: false,
  _progressRAF: null,
  DWELL: 4200,          // 播放时每个节点停留 ms
  _dwellStart: 0,
  _dwellFrom: 0,

  els: {},

  init() {
    this.els.track = document.getElementById('tl-track');
    this.els.progress = document.getElementById('tl-progress');
    this.els.nodes = document.getElementById('tl-nodes');
    this.els.caption = document.getElementById('tl-caption');
    this.els.play = document.getElementById('btn-play');
    this.els.prev = document.getElementById('btn-prev');
    this.els.next = document.getElementById('btn-next');

    this.renderNodes();
    this.bind();
  },

  renderNodes() {
    const box = this.els.nodes;
    box.innerHTML = '';
    const n = TIME_NODES.length;
    TIME_NODES.forEach((node, i) => {
      const pct = ((i + 0.5) / n) * 100;
      const el = htmlEl('div', 'tl-node', `
        <div class="tn-date">${node.date}</div>
        <div class="tn-title">${node.title}</div>
        ${node.strength || FLOWS[node.id]
          ? `<div class="tn-strength">${FLOWS[node.id] ? '<span class="tn-flowmark">●</span>' : ''}${node.strength || ''}</div>`
          : ''}
      `, box);
      el.style.left = pct + '%';
      el.dataset.idx = i;
      el.addEventListener('click', () => {
        this.stop();
        App.goto(i);
      });
    });
  },

  bind() {
    this.els.play.addEventListener('click', () => this.toggle());
    this.els.prev.addEventListener('click', () => { this.stop(); App.goto(this.idx - 1); });
    this.els.next.addEventListener('click', () => { this.stop(); App.goto(this.idx + 1); });

    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT') return;
      if (App.view === 'map' || App.view === 'cast') return;   // 路线图/番外视图：时间轴隐藏，不响应切换/播放
      if (e.key === 'ArrowLeft') { this.stop(); App.goto(this.idx - 1); }
      else if (e.key === 'ArrowRight') { this.stop(); App.goto(this.idx + 1); }
      else if (e.key === ' ') { e.preventDefault(); this.toggle(); }
    });
  },

  current() { return TIME_NODES[this.idx]; },

  /* 切换到节点 i（含边界保护），刷新 UI 与画布 */
  setIndex(i, source) {
    this.idx = clamp(i, 0, TIME_NODES.length - 1);
    this.refresh(source);
  },

  refresh() {
    const cur = this.current();
    const nodes = this.els.nodes.querySelectorAll('.tl-node');
    nodes.forEach(el => {
      const i = +el.dataset.idx;
      el.classList.toggle('past', i < this.idx);
      el.classList.toggle('current', i === this.idx);
    });
    this.els.progress.style.width = (((this.idx + 0.5) / TIME_NODES.length) * 100) + '%';
    this.els.caption.innerHTML = `<b>${cur.date}</b> · ${cur.title}`;
    this.els.play.textContent = this.playing ? '❚❚' : '▶';
    this.els.play.classList.toggle('playing', this.playing);
  },

  /* ---------- 播放控制 ---------- */
  toggle() { this.playing ? this.stop() : this.play(); },

  play() {
    if (this.playing) return;
    if (this.idx >= TIME_NODES.length - 1) this.setIndex(0);   // 播放到头后重播
    this.playing = true;
    this.refresh();
    this._scheduleNext();
  },

  stop() {
    this.playing = false;
    this._dwellStart = 0;
    if (this._progressRAF) { cancelAnimationFrame(this._progressRAF); this._progressRAF = null; }
    this.refresh();
  },

  _scheduleNext() {
    if (!this.playing) return;
    this._dwellStart = performance.now();
    this._dwellFrom = this.idx;
    const step = () => {
      if (!this.playing) return;
      const p = (performance.now() - this._dwellStart) / this.DWELL;
      // 节点内推进进度条（覆盖前半段→后半段）
      const seg = (this.idx + 0.5) / TIME_NODES.length;
      const nxt = (Math.min(this.idx + 1, TIME_NODES.length - 1) + 0.5) / TIME_NODES.length;
      this.els.progress.style.width = (seg + (nxt - seg) * clamp(p, 0, 1)) * 100 + '%';
      if (p >= 1) {
        if (this.idx >= TIME_NODES.length - 1) { this.stop(); return; }
        App.goto(this.idx + 1);
        this._scheduleNext();
        return;
      }
      this._progressRAF = requestAnimationFrame(step);
    };
    this._progressRAF = requestAnimationFrame(step);
  },
};
