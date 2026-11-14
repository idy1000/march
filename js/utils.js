/* ============ 通用工具 ============ */

function svgEl(tag, attrs, parent) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  if (attrs) {
    for (const k in attrs) {
      if (k === 'text') el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
  }
  if (parent) parent.appendChild(el);
  return el;
}

function htmlEl(tag, cls, html, parent) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (html != null) el.innerHTML = html;
  if (parent) parent.appendChild(el);
  return el;
}

/* ---------- 补间引擎 ---------- */
const Ease = {
  inOutCubic: t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outCubic: t => 1 - Math.pow(1 - t, 3),
};

const Anim = {
  _tweens: new Map(),
  _raf: null,
  onFrame: null,   // 每帧所有补间更新后调用（用于联动刷新，如连线跟随节点）

  /* key: 唯一标识；同 key 重复调用会替换旧补间 */
  tween(key, dur, onUpdate, ease) {
    ease = ease || Ease.inOutCubic;
    this._tweens.set(key, { t0: performance.now(), dur, onUpdate, ease });
    if (this._raf == null) this._loop();
  },

  _loop() {
    const step = () => {
      const now = performance.now();
      this._tweens.forEach((tw, key) => {
        const p = Math.min(1, (now - tw.t0) / tw.dur);
        try { tw.onUpdate(tw.ease(p), p); } catch (e) { console.error(e); }
        if (p >= 1) this._tweens.delete(key);
      });
      if (this.onFrame) { try { this.onFrame(); } catch (e) { console.error(e); } }
      if (this._tweens.size > 0) this._raf = requestAnimationFrame(step);
      else this._raf = null;
    };
    this._raf = requestAnimationFrame(step);
  },

  finishKey(key) { this._tweens.delete(key); },
};

/* ---------- 日期工具 ---------- */
const ALL_DATES = TIME_NODES.map(n => n.id);
const T_MIN = ALL_DATES[0];
const T_MAX = ALL_DATES[ALL_DATES.length - 1];

/* 时间点在整条轴上的比例位置（1934-10 → 1936-10 线性映射） */
function dateRatio(t) {
  const toM = x => (+x.split('-')[0]) * 12 + (+x.split('-')[1]);
  return (toM(t) - toM(T_MIN)) / (toM(T_MAX) - toM(T_MIN));
}

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function personName(pid) { return pid && PEOPLE_MAP[pid] ? PEOPLE_MAP[pid].name : '—'; }

function flagText(flag) {
  return { concurrent: '兼', acting: '代', wounded: '伤', kia: '烈' }[flag] || null;
}
