/* ============================================================
   StormCam Product Analysis — JS
   Data + interactions + animations
   ============================================================ */
(function () {
  'use strict';

  // ---------- ICON LIBRARY (inline SVG strings) ----------
  const ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>',
    tablet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    move: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',
    maximize: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>',
    aperture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"/><line x1="9.69" y1="8" x2="21.17" y2="8"/><line x1="7.38" y1="12" x2="13.12" y2="2.06"/><line x1="9.69" y1="16" x2="3.95" y2="6.06"/><line x1="14.31" y1="16" x2="2.83" y2="16"/><line x1="16.62" y1="12" x2="10.88" y2="21.94"/></svg>',
    message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  };

  function icon(name) { return ICONS[name] || ''; }

  // ---------- FEEDBACK DATA ----------
  const FEEDBACK_DATA = [
    { cat: '稳定性/Crash', priority: 'P0', score: 2.98, mentions: 88, analysis: '最伤体验，含闪退/卡死/花屏/黑屏', icon: 'shield' },
    { cat: '客服/反馈', priority: 'P0', score: 2.68, mentions: 22, analysis: '最低满意度，用户感觉被忽视', icon: 'message' },
    { cat: 'LUT/滤镜', priority: 'P1', score: 3.93, mentions: 216, analysis: '核心功能，呼声最高', icon: 'film' },
    { cat: '拍照功能', priority: 'P1', score: 3.98, mentions: 188, analysis: '需求量大但待原始定位', icon: 'camera' },
    { cat: '导出功能', priority: 'P1', score: 3.88, mentions: 66, analysis: '工作流关键环节', icon: 'download' },
    { cat: '画质/清晰度', priority: 'P1', score: 3.51, mentions: 45, analysis: '涉及产品核心竞争力', icon: 'image' },
    { cat: '专业参数', priority: 'P2', score: 4.05, mentions: 63, analysis: '进阶用户核心诉求', icon: 'sliders' },
    { cat: '定价/会员', priority: 'P2', score: 3.22, mentions: 129, analysis: '第二低分类别，信息差问题突出', icon: 'dollar' },
    { cat: '素材管理', priority: 'P2', score: 3.88, mentions: 57, analysis: 'UX痛点', icon: 'folder' },
    { cat: 'UI/交互', priority: 'P2', score: 3.87, mentions: 67, analysis: '可用性改进空间', icon: 'layout' },
    { cat: '音频', priority: 'P3', score: 3.88, mentions: 14, analysis: '低频但产重', icon: 'speaker' },
    { cat: '设备兼容', priority: 'P3', score: 3.73, mentions: 33, analysis: 'iPad/Android需求', icon: 'tablet' },
    { cat: '防抖', priority: 'P3', score: 4.27, mentions: 26, analysis: '用户普遍认可', icon: 'move' },
    { cat: '竖屏/横屏', priority: 'P3', score: 4.19, mentions: 26, analysis: '适配问题', icon: 'maximize' },
    { cat: '焦段/镜头', priority: 'P3', score: 3.79, mentions: 14, analysis: '涉及多倍焦但出现不多', icon: 'aperture' },
  ];

  // ---------- VERSION DATA ----------
  const VERSION_DATA = [
    { v: 'v1.0.0', date: '2024-10-28', major: true, milestone: '上线', content: '首发上线 · ProRes/Log拍摄 · 实时LUT预览' },
    { v: 'v1.0.1', date: '2024-11-01', content: '紧急修复闪退 · 优化首页布局' },
    { v: 'v1.0.2', date: '2024-11-04', content: '修复 iPhone 16 Pro 兼容性问题' },
    { v: 'v1.0.3', date: '2024-11-05', content: '修复录制中断 · 优化LUT加载速度' },
    { v: 'v1.0.4', date: '2024-11-12', content: '修复音频同步 · 新增3款LUT' },
    { v: 'v1.0.5', date: '2024-11-22', content: '拍照模式上线 · 修复竖屏旋转' },
    { v: 'v1.0.6', date: '2024-11-28', content: '修复导出卡顿 · 优化内存占用' },
    { v: 'v1.1.0', date: '2024-12-04', major: true, content: '<strong>闪光灯支持</strong> · 批量导出 · 新LUT包' },
    { v: 'v1.1.1', date: '2024-12-06', content: '修复闪光灯崩溃 · 优化电池消耗' },
    { v: 'v1.1.2', date: '2024-12-11', content: '修复4K导出问题 · 水印优化' },
    { v: 'v1.2.0', date: '2024-12-19', major: true, content: '<strong>外接设备支持</strong> · 蓝牙快门 · 新增更多分辨率' },
    { v: 'v1.2.1', date: '2024-12-20', content: '修复蓝牙连接不稳定' },
    { v: 'v1.2.2', date: '2024-12-27', content: '优化低温环境稳定性' },
    { v: 'v1.3.0', date: '2025-01-09', major: true, content: '<strong>分段录制</strong> · 时间码显示 · 焦距锁定' },
    { v: 'v1.3.1', date: '2025-01-15', content: '修复分段录制音画不同步' },
    { v: 'v1.3.2', date: '2025-01-22', content: '修复低存储空间崩溃' },
    { v: 'v1.3.3', date: '2025-02-05', content: '新年LUT包 · 优化启动速度' },
    { v: 'v1.3.4', date: '2025-02-18', content: '修复特定机型花屏问题' },
    { v: 'v1.4.0', date: '2025-03-06', major: true, milestone: '大更新', content: '<strong>全机型影调支持</strong> · 重构渲染管线 · 新UI框架' },
    { v: 'v1.4.1', date: '2025-03-12', content: '紧急修复 v1.4.0 闪退 · 发热优化' },
    { v: 'v1.4.2', date: '2025-03-22', content: '修复影调切换卡顿 · 内存泄漏修复' },
    { v: 'v1.4.3', date: '2025-04-02', content: '稳定性全面优化 · 修复多个Crash' },
  ];

  // ---------- DEMAND DATA ----------
  const DEMANDS = {
    resolved: [
      { name: '闪光灯', ver: 'v1.1.0', icon: 'zap' },
      { name: '批量导出', ver: 'v1.1.0', icon: 'download' },
      { name: '外接设备蓝牙', ver: 'v1.2.0', icon: 'tablet' },
      { name: '分段录制', ver: 'v1.3.0', icon: 'film' },
      { name: '时间码显示', ver: 'v1.3.0', icon: 'aperture' },
      { name: '竖屏录制', ver: 'v1.0.5', icon: 'maximize' },
      { name: '拍照模式', ver: 'v1.0.5', icon: 'camera' },
      { name: '焦距锁定', ver: 'v1.3.0', icon: 'sliders' },
      { name: '水印移除', ver: 'v1.1.2', icon: 'image' },
      { name: '更多分辨率', ver: 'v1.2.0', icon: 'layout' },
      { name: '存储空间提示', ver: 'v1.0.6', icon: 'folder' },
      { name: '全机型影调', ver: 'v1.4.0', icon: 'film' },
      { name: '蓝牙快门', ver: 'v1.2.0', icon: 'aperture' },
    ],
    partial: [
      { name: '拍照裁切比例', detail: '有基础，缺自定义', priority: 'mid', icon: 'camera' },
      { name: '导出到相册', detail: '可用但不够便捷', priority: 'mid', icon: 'download' },
      { name: '录制稳定性', detail: 'v1.4.3 改善但未根治', priority: 'high', icon: 'shield' },
      { name: '音频监控', detail: '有电平表，缺耳机监听', priority: 'mid', icon: 'speaker' },
      { name: '更新日志通知', detail: '有但不够醒目', priority: 'low', icon: 'message' },
    ],
    unresolved: [
      { name: 'LUT 浓度滑块', priority: 'high', mentions: 80, icon: 'sliders' },
      { name: '自定义 LUT 导入', priority: 'high', mentions: 65, icon: 'film' },
      { name: '直方图', priority: 'high', mentions: 55, icon: 'layout' },
      { name: '峰值对焦', priority: 'high', mentions: 42, icon: 'aperture' },
      { name: '半自动曝光', priority: 'high', mentions: 38, icon: 'camera' },
      { name: 'iPad 适配', priority: 'mid', mentions: 33, icon: 'tablet' },
      { name: '视频裁切比例', priority: 'mid', mentions: 28, icon: 'maximize' },
      { name: 'Android 版本', priority: 'mid', mentions: 22, icon: 'tablet' },
      { name: '文件管理系统', priority: 'mid', mentions: 20, icon: 'folder' },
      { name: '降噪处理', priority: 'mid', mentions: 18, icon: 'speaker' },
      { name: 'Anamorphic 模式', priority: 'low', mentions: 12, icon: 'film' },
      { name: '外接麦克增益', priority: 'low', mentions: 10, icon: 'speaker' },
      { name: '延时摄影', priority: 'low', mentions: 9, icon: 'camera' },
      { name: '慢动作', priority: 'low', mentions: 8, icon: 'film' },
      { name: '多机位同步', priority: 'low', mentions: 6, icon: 'move' },
      { name: 'Apple Watch 远程控制', priority: 'low', mentions: 5, icon: 'tablet' },
    ],
  };

  // ---------- TREND DATA ----------
  const TREND_DATA = [
    { m: '10月', v: 4.37 }, { m: '11月', v: 4.02 }, { m: '12月', v: 4.08 },
    { m: '1月', v: 3.65 }, { m: '2月', v: 3.62 }, { m: '3月', v: 3.32 }, { m: '4月', v: 4.00 },
  ];

  // ---------- RENDER FUNCTIONS ----------
  function renderTrendChart() {
    const svg = document.getElementById('trendSvg');
    const labels = document.getElementById('trendLabels');
    if (!svg || !labels) return;

    const W = 600, H = 220, padX = 50, padY = 30;
    const plotW = W - 2 * padX, plotH = H - 2 * padY;
    const minV = 3.0, maxV = 4.6, range = maxV - minV;

    const pts = TREND_DATA.map((d, i) => ({
      x: padX + (i / (TREND_DATA.length - 1)) * plotW,
      y: padY + (1 - (d.v - minV) / range) * plotH,
      v: d.v, m: d.m,
    }));

    // Grid lines
    let html = '';
    for (let g = minV; g <= maxV; g += 0.2) {
      const y = padY + (1 - (g - minV) / range) * plotH;
      html += `<line x1="${padX}" y1="${y}" x2="${W - padX}" y2="${y}" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>`;
      if (g % 0.5 < 0.01) {
        html += `<text x="${padX - 8}" y="${y + 3}" fill="#636366" font-size="8" font-family="IBM Plex Mono" text-anchor="end">${g.toFixed(1)}</text>`;
      }
    }

    // Line path
    const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    // Gradient area
    const areaD = pathD + ` L${pts[pts.length - 1].x},${H - padY} L${pts[0].x},${H - padY} Z`;
    html += `<defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(52,199,169,0.15)"/><stop offset="100%" stop-color="rgba(52,199,169,0)"/>
    </linearGradient></defs>`;
    html += `<path d="${areaD}" fill="url(#areaGrad)"/>`;
    html += `<path d="${pathD}" fill="none" stroke="#34c7a9" stroke-width="2"/>`;

    // Dots + labels
    pts.forEach(p => {
      const isLow = p.v < 3.5;
      const color = isLow ? '#ff3b30' : '#34c7a9';
      html += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${color}" stroke="#000" stroke-width="2"/>`;
      html += `<text x="${p.x}" y="${p.y - 12}" fill="${color}" font-size="9" font-family="IBM Plex Mono" text-anchor="middle" font-weight="600">${p.v.toFixed(2)}</text>`;
    });

    svg.innerHTML = html;
    labels.innerHTML = TREND_DATA.map(d => `<span>${d.m}</span>`).join('');
  }

  function renderFeedback(filter) {
    const grid = document.getElementById('feedbackGrid');
    if (!grid) return;
    const items = filter === 'all' ? FEEDBACK_DATA : FEEDBACK_DATA.filter(d => d.priority === filter);
    grid.innerHTML = items.map((d, i) => {
      const scoreClass = d.score < 3.0 ? 'low' : d.score < 3.8 ? 'mid' : 'high';
      return `<div class="feedback-card fade-in visible" style="animation-delay: ${i * 0.04}s">
        <div class="fb-header">
          <span class="fb-priority ${d.priority.toLowerCase()}">${d.priority}</span>
          <span class="fb-score ${scoreClass}">${d.score.toFixed(2)}</span>
        </div>
        <div class="fb-title">${d.cat}</div>
        <div class="fb-mentions">${d.mentions} MENTIONS</div>
        <div class="fb-analysis">${d.analysis}</div>
      </div>`;
    }).join('');
  }

  function renderTimeline() {
    const el = document.getElementById('timeline');
    if (!el) return;
    el.innerHTML = VERSION_DATA.map((d, i) => `
      <div class="tl-item ${d.major ? 'major' : ''}" style="animation-delay:${i * 0.05}s">
        <div class="tl-header">
          <span class="tl-version">${d.v}</span>
          <span class="tl-date">${d.date}</span>
          ${d.milestone ? `<span class="tl-milestone">${d.milestone}</span>` : ''}
        </div>
        <div class="tl-content">${d.content}</div>
      </div>`).join('');
  }

  function renderDemands() {
    // Resolved
    const rl = document.getElementById('resolvedList');
    if (rl) {
      rl.innerHTML = DEMANDS.resolved.map(d => `
        <div class="demand-item">
          <div class="demand-icon">${icon(d.icon)}</div>
          <div><div class="demand-name">${d.name}</div><div class="demand-ver">${d.ver} 解决</div></div>
          <span class="demand-badge resolved">RESOLVED</span>
        </div>`).join('');
    }
    // Partial
    const pl = document.getElementById('partialList');
    if (pl) {
      pl.innerHTML = DEMANDS.partial.map(d => `
        <div class="demand-item">
          <div class="demand-icon">${icon(d.icon)}</div>
          <div><div class="demand-name">${d.name}</div><div class="demand-ver">${d.detail}</div></div>
          <span class="demand-badge partial">PARTIAL</span>
        </div>`).join('');
    }
    // Unresolved
    const ul = document.getElementById('unresolvedList');
    if (ul) {
      ul.innerHTML = DEMANDS.unresolved.map(d => `
        <div class="demand-item">
          <div class="demand-icon">${icon(d.icon)}</div>
          <div><div class="demand-name">${d.name}</div><div class="demand-ver">${d.mentions} 条提及</div></div>
          <span class="demand-badge ${d.priority}">${d.priority === 'high' ? 'HIGH' : d.priority === 'mid' ? 'MID' : 'LOW'}</span>
        </div>`).join('');
    }
  }

  // ---------- PROGRESS RING ----------
  function animateRing() {
    const total = DEMANDS.resolved.length + DEMANDS.partial.length + DEMANDS.unresolved.length;
    const rPct = DEMANDS.resolved.length / total;
    const pPct = DEMANDS.partial.length / total;
    const circumference = 2 * Math.PI * 85; // 534

    const resolvedCircle = document.querySelector('.ring-resolved');
    const partialCircle = document.querySelector('.ring-partial');
    if (!resolvedCircle || !partialCircle) return;

    const resolvedOffset = circumference * (1 - rPct);
    const partialStart = circumference * rPct;
    const partialLen = circumference * pPct;
    const partialOffset = circumference - partialLen;

    resolvedCircle.style.strokeDashoffset = resolvedOffset;
    partialCircle.style.strokeDasharray = `${partialLen} ${circumference - partialLen}`;
    partialCircle.style.strokeDashoffset = -partialStart;
  }

  // ---------- HERO COUNTER ----------
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1200;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = target * eased;
        el.textContent = (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  // ---------- BAR ANIMATION ----------
  function animateBars() {
    document.querySelectorAll('.dist-bar-fill').forEach(bar => {
      const w = bar.dataset.width;
      bar.style.setProperty('--target-width', w + '%');
      bar.classList.add('animated');
    });
  }

  // ---------- SCROLL OBSERVER ----------
  function initObserver() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
  }

  // ---------- SIDE NAV ----------
  function initNav() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach(dot => dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }));

    const sections = document.querySelectorAll('.section');
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          dots.forEach(d => d.classList.remove('active'));
          const active = document.querySelector(`.nav-dot[data-section="${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(s => navObs.observe(s));
  }

  // ---------- FILTER ----------
  function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderFeedback(btn.dataset.filter);
      });
    });
  }

  // ---------- TABS ----------
  function initTabs() {
    document.querySelectorAll('.demand-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.demand-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.demand-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab)?.classList.add('active');
      });
    });
  }

  // ---------- INIT ----------
  function init() {
    renderTrendChart();
    renderFeedback('all');
    renderTimeline();
    renderDemands();
    initNav();
    initFilters();
    initTabs();
    initObserver();

    // Trigger hero animations
    setTimeout(animateCounters, 400);
    // Observe ratings for bar animation
    const ratingsSection = document.getElementById('ratings');
    if (ratingsSection) {
      const barObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { animateBars(); barObs.disconnect(); }
      }, { threshold: 0.3 });
      barObs.observe(ratingsSection);
    }
    // Observe demands for ring
    const demandsSection = document.getElementById('demands');
    if (demandsSection) {
      const ringObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { animateRing(); ringObs.disconnect(); }
      }, { threshold: 0.3 });
      ringObs.observe(demandsSection);
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
