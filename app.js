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
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
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
    { v: 'v1.1.1', date: '2025-10-26', major: true, milestone: '首发', content: '首发上线 · 细节更新和bug修复' },
    { v: 'v1.1.2', date: '2025-10-28', content: '修复了一些bug' },
    { v: 'v1.1.3', date: '2025-10-29', content: '优化动态图拍摄 · 优化UI表述 · 性能优化' },
    { v: 'v1.1.4', date: '2025-11-02', content: '新增地理位置/EXIF保存 · 深色图标 · 更多帧率与快门速度 · 非Log机型购买Pro提示' },
    { v: 'v1.1.5', date: '2025-11-05', content: '<strong>方向锁定</strong> · 修复闪退' },
    { v: 'v1.1.6', date: '2025-11-07', content: '<strong>外接麦克风录制</strong> · <strong>相机快速启动</strong> · UI优化' },
    { v: 'v1.1.7', date: '2025-11-12', major: true, milestone: '批量导出', content: '<strong>批量导出</strong> · 修复前台画面卡死' },
    { v: 'v1.1.8', date: '2025-11-13', milestone: '100万下载', content: '媒体库筛选 · 保留上次拍摄参数' },
    { v: 'v1.1.10', date: '2025-11-20', content: '<strong>Liquid Glass效果</strong> · 蓝牙麦克风 · 麦克风输入源选择 · 部分设备2x焦段' },
    { v: 'v1.1.11', date: '2025-11-26', content: '解决了一些已知问题' },
    { v: 'v1.1.12', date: '2025-11-30', content: '修复闪退' },
    { v: 'v1.2.0', date: '2025-12-08', major: true, milestone: '评分破万', content: '<strong>OpenGate</strong> · 拍照模式支持静帧/画幅/色彩空间 · 移除非Log机型拍摄限制' },
    { v: 'v1.3.0', date: '2025-12-22', major: true, content: '<strong>资源库增强</strong> · 左右滑动切换 · 静音导出 · 批量导出可批量改LUT · Liquid Glass UI' },
    { v: 'v1.3.1', date: '2025-12-28', content: '提升拍摄稳定性' },
    { v: 'v1.3.2', date: '2026-01-08', major: true, content: '<strong>回收站</strong> · 录制异常提醒 · sRGB OG 48MP · 视频/图片参数独立 · 飓风相机相簿 · 码率提升' },
    { v: 'v1.3.3', date: '2026-01-15', content: '修复sRGB绿边/清晰度异常 · 修复批量导出封面 · 修复稳定器记忆 · 一键切换到Log' },
    { v: 'v1.3.4', date: '2026-01-17', content: '修复拍照切视频闪退' },
    { v: 'v1.3.5', date: '2026-02-12', major: true, content: '<strong>HDR LUT</strong> · <strong>闪光灯</strong> · 参数页新UI · 媒体库显示数量' },
    { v: 'v1.3.6', date: '2026-02-13', content: '修复16:9实况绿边' },
    { v: 'v1.3.7', date: '2026-02-25', content: '<strong>存储位置选项</strong>（系统相册/App内）' },
    { v: 'v1.3.8', date: '2026-03-06', content: '修复画面拉伸 · 素材库入口 · 位置信息丢失 · 非Log购买提醒加强' },
    { v: 'v1.4.0', date: '2026-03-30', major: true, milestone: '大更新', content: '<strong>全机型影调</strong> · 拍照拆分Log实况+照片 · <strong>48MP拍照</strong> · 8个新影调 · 电影级/极致防抖 · 英语支持 · 倒置拍摄' },
    { v: 'v1.4.1', date: '2026-03-31', content: '<strong>繁体中文</strong> · 优化影调切换记忆 · 修复iOS17闪退 · 修复批量导出影调问题' },
    { v: 'v1.4.2', date: '2026-04-01', content: '优化拍摄模式/镜头切换响应速度 · 修复倒置拍摄导出异常' },
    { v: 'v1.4.3', date: '2026-04-03', content: '修复非4:3照片HDR增益丢失 · 修复openGate+极致防抖丢失音频' },
  ];

  // ---------- DEMAND DATA ----------
  const DEMANDS = {
    resolved: [
      { name: '批量导出', ver: 'v1.1.7', icon: 'download' },
      { name: '快速启动/侧键', ver: 'v1.1.6', icon: 'zap' },
      { name: 'EXIF/位置信息', ver: 'v1.1.4', icon: 'camera' },
      { name: '外接麦克风', ver: 'v1.1.6', icon: 'speaker' },
      { name: '方向锁定', ver: 'v1.1.5', icon: 'move' },
      { name: '非Log机型支持', ver: 'v1.2.0', icon: 'film' },
      { name: '闪光灯', ver: 'v1.3.5', icon: 'zap' },
      { name: '存储到系统相册', ver: 'v1.3.2', icon: 'folder' },
      { name: '素材手势切换', ver: 'v1.3.0', icon: 'layout' },
      { name: 'OpenGate', ver: 'v1.2.0', icon: 'maximize' },
      { name: '多语言支持', ver: 'v1.4.0', icon: 'message' },
      { name: '回收站', ver: 'v1.3.2', icon: 'folder' },
      { name: '48MP 拍照', ver: 'v1.4.0', icon: 'camera' },
    ],
    partial: [
      { name: '批量导出体验', detail: '核心可用，仍需简化流程', priority: 'mid', icon: 'download' },
      { name: '稳定性/闪退', detail: '打地鼠式修复，缺系统治理', priority: 'high', icon: 'shield' },
      { name: 'iOS版本兼容', detail: '新iOS版本总引入新问题', priority: 'mid', icon: 'tablet' },
      { name: '画质/清晰度', detail: '怀疑编码层面未优化到极致', priority: 'mid', icon: 'image' },
      { name: '定价信息差', detail: '增加了提醒但核心矛盾未解决', priority: 'mid', icon: 'dollar' },
    ],
    unresolved: [
      { name: 'LUT 浓度调节', priority: 'high', mentions: 50, icon: 'sliders' },
      { name: '直方图', priority: 'high', mentions: 22, icon: 'layout' },
      { name: '自定义 LUT 导入', priority: 'high', mentions: 20, icon: 'film' },
      { name: '半自动曝光', priority: 'high', mentions: 15, icon: 'camera' },
      { name: '客服响应体系', priority: 'high', mentions: 22, icon: 'message' },
      { name: '滤镜分类管理', priority: 'mid', mentions: 15, icon: 'film' },
      { name: '拍照裁切/比例', priority: 'mid', mentions: 12, icon: 'camera' },
      { name: '峰值对焦/斑马线', priority: 'mid', mentions: 10, icon: 'aperture' },
      { name: '额外焦段', priority: 'mid', mentions: 11, icon: 'aperture' },
      { name: '竖屏视频适配', priority: 'mid', mentions: 7, icon: 'maximize' },
      { name: '锁屏小组件', priority: 'mid', mentions: 5, icon: 'layout' },
      { name: 'iPad 适配', priority: 'low', mentions: 10, icon: 'tablet' },
      { name: '外接硬盘直录', priority: 'low', mentions: 3, icon: 'folder' },
      { name: '更多场景LUT', priority: 'low', mentions: 5, icon: 'film' },
      { name: '人像模式', priority: 'low', mentions: 5, icon: 'camera' },
      { name: 'Android 版', priority: 'low', mentions: 5, icon: 'tablet' },
      { name: 'ProRes 支持', priority: 'low', mentions: 3, icon: 'film' },
    ],
  };

  // ---------- US MARKET DATA ----------
  const US_ISSUES = [
    { issue: '海外登录验证码', severity: 'blocker', detail: '海外无法收短信验证码，无法登录/使用付费功能', icon: 'alert' },
    { issue: '跨区订阅不同步', severity: 'high', detail: '中国区购买的Pro在美区不生效', icon: 'alert' },
  ];

  const CROSS_MARKET = [
    { demand: '自定义 LUT', cn: '201 次', us: '12 次', consensus: true },
    { demand: '拍照功能', cn: '145 次', us: '3 次', consensus: true },
    { demand: '闪退/卡顿', cn: '98 次', us: '3 次', consensus: true },
    { demand: 'ProRes/RAW', cn: '10 次', us: '10 次', consensus: true },
    { demand: '外接存储', cn: '43 次', us: '2 次', consensus: true },
    { demand: '国际化/i18n', cn: '—', us: '多条', consensus: false },
    { demand: '海外登录验证', cn: '—', us: '阻断级', consensus: false },
  ];

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

  function renderUSInsights() {
    const issueList = document.getElementById('usIssuesList');
    if (issueList) {
      issueList.innerHTML = US_ISSUES.map(d => {
        const sevClass = d.severity === 'blocker' ? 'high' : d.severity;
        const sevLabel = d.severity === 'blocker' ? 'BLOCKER' : d.severity.toUpperCase();
        return `<div class="demand-item">
          <div class="demand-icon">${icon(d.icon)}</div>
          <div><div class="demand-name">${d.issue}</div><div class="demand-ver">${d.detail}</div></div>
          <span class="demand-badge ${sevClass}">${sevLabel}</span>
        </div>`;
      }).join('');
    }

    const crossTable = document.getElementById('crossMarketTable');
    if (crossTable) {
      crossTable.innerHTML = CROSS_MARKET.map(d =>
        `<tr>
          <td class="compete-dim">${d.demand}</td>
          <td>${d.cn}</td>
          <td>${d.us}</td>
          <td>${d.consensus ? '<span style="color:var(--accent-green)">SHARED</span>' : '<span style="color:var(--accent-orange)">US ONLY</span>'}</td>
        </tr>`
      ).join('');
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

    // Update ring center text dynamically
    const ringPct = document.querySelector('.ring-pct');
    if (ringPct) ringPct.textContent = Math.round(rPct * 100) + '%';
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
    renderUSInsights();
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
