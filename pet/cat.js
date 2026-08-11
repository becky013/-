/* ============================================================
   桌宠小猫 · 跟随鼠标 + 脚印
   用法：在 index.html 的 </body> 前加一行
        <script src="pet/cat.js"></script>
   ============================================================ */
(function () {
  'use strict';

  // ---------- 可调参数 ----------
  var CFG = {
    height: 62,          // 猫显示高度(px)
    followDist: 120,     // 与光标保持的距离(px)
    hysteresis: 46,      // 超出这个额外距离才重新起步，避免抖动
    maxSpeed: 430,       // 最大速度(px/s)
    accelK: 3.2,         // 距离→速度系数（越大启动越快）
    edgePad: 16,         // 距离窗口边缘的留白
    pauseBeforeSit: 1100,// 到位后先站着待机多久再坐下(ms)
    pawLife: 1200,       // 脚印存活时间(ms)
    pawMax: 20,          // 脚印数量上限
    mobileHeight: 58,    // 手机端猫的高度(px)
    fps: { walk: 12, idle: 4, sit: 8 },
    z: 60                // 层级：低于 PDF 浮窗(100)，高于正文
  };

  // ---------- 环境判断：手机 / 减少动效 时不启用 ----------
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;                 // 尊重系统“减少动态效果”
  var MOBILE = !fine;                 // 触屏设备：不跟随，蹲在右下角

  // ---------- 资源路径 ----------
  var base = (document.currentScript && document.currentScript.src || '').replace(/[^/]*$/, '');
  var SP = base + 'sprites/';

  var PAD = 6;                        // 精灵图每帧四周的透明留白(原始像素)
  var META = {
    walk: { frames: 8, w: 178, h: 212 },
    idle: { frames: 4, w: 224, h: 212 },
    sit:  { frames: 4, w: 230, h: 212 }
  };
  var PAW = { w: 56, h: 53 };

  var CATH = MOBILE ? CFG.mobileHeight : CFG.height;
  var k = CATH / 200;                 // 以“猫身高 200px”为基准
  function px(n) { return Math.round(n * k); }

  // ---------- DOM ----------
  var style = document.createElement('style');
  style.textContent =
    '#catpet-layer{position:fixed;inset:0;pointer-events:none;z-index:' + CFG.z + ';overflow:hidden}' +
    '#catpet{position:absolute;left:0;top:0;background-repeat:no-repeat;pointer-events:auto;cursor:pointer;' +
      'filter:drop-shadow(0 4px 7px rgba(56,110,180,.28));' +
      'transform-origin:50% 100%;will-change:transform,background-position}' +
    '.catpaw{position:absolute;opacity:.42;transition:opacity .55s ease;' +
      'filter:drop-shadow(0 1px 1px rgba(56,110,180,.18))}' +
    '.catpaw.fade{opacity:0}' +
    '#catpet-toggle{position:fixed;right:16px;bottom:16px;z-index:' + (CFG.z + 5) + ';' +
      'width:38px;height:38px;border:1px solid rgba(120,165,215,.35);border-radius:50%;cursor:pointer;' +
      'background:rgba(255,255,255,.86);backdrop-filter:blur(8px);font-size:16px;line-height:36px;text-align:center;' +
      'box-shadow:0 4px 14px rgba(56,110,180,.16);transition:transform .2s,box-shadow .2s;padding:0}' +
    '#catpet-toggle:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(56,110,180,.24)}' +
    '#catpet-toggle.off{opacity:.45;filter:grayscale(1)}' +
    '#catpet-close{position:absolute;width:20px;height:20px;border-radius:50%;border:1px solid rgba(120,165,215,.4);' +
      'background:rgba(255,255,255,.95);color:rgba(20,36,58,.55);font-size:11px;line-height:18px;text-align:center;' +
      'cursor:pointer;pointer-events:auto;opacity:0;transform:scale(.7);transition:opacity .18s,transform .18s;' +
      'box-shadow:0 2px 8px rgba(56,110,180,.2);padding:0}' +
    '#catpet-close.show{opacity:1;transform:scale(1)}' +
    '#catpet-close:hover{color:#3b6fd4;border-color:rgba(59,111,212,.6)}' +
    '@keyframes catpop{0%{opacity:0;transform:translateY(8px) scale(.86)}60%{opacity:1;transform:translateY(-2px) scale(1.04)}100%{opacity:1;transform:translateY(0) scale(1)}}' +
    '#catpet-bubble{position:absolute;max-width:220px;padding:11px 15px 12px;border-radius:18px;' +
      'background:linear-gradient(160deg,#ffffff 0%,#f4f9ff 100%);border:1.5px solid rgba(120,165,215,.42);' +
      'color:#14243a;font-size:12.5px;line-height:1.7;letter-spacing:.01em;' +
      'box-shadow:0 8px 22px rgba(56,110,180,.18),0 2px 0 rgba(120,165,215,.14);' +
      'opacity:0;pointer-events:none;font-family:inherit;display:flex;align-items:flex-start;gap:7px}' +
    '#catpet-bubble.show{animation:catpop .34s cubic-bezier(.34,1.56,.64,1) forwards}' +
    '#catpet-bubble .cp-paw{flex:0 0 auto;width:13px;height:13px;margin-top:2px;opacity:.5;' +
      'background-size:contain;background-repeat:no-repeat;background-position:center;transform:rotate(-12deg)}' +
    '#catpet-bubble .cp-dot,#catpet-bubble .cp-dot2{position:absolute;border-radius:50%;' +
      'background:linear-gradient(160deg,#ffffff,#f4f9ff);border:1.5px solid rgba(120,165,215,.42);' +
      'box-shadow:0 3px 8px rgba(56,110,180,.12)}' +
    '#catpet-bubble .cp-dot{width:11px;height:11px;left:20px;bottom:-7px}' +
    '#catpet-bubble .cp-dot2{width:6px;height:6px;left:13px;bottom:-16px}' +
    '#catpet-bubble.tail-right .cp-dot{left:auto;right:20px}' +
    '#catpet-bubble.tail-right .cp-dot2{left:auto;right:13px}';
  document.head.appendChild(style);

  var layer = document.createElement('div');
  layer.id = 'catpet-layer';
  var cat = document.createElement('div');
  cat.id = 'catpet';
  layer.appendChild(cat);

  var closeBtn = document.createElement('button');
  closeBtn.id = 'catpet-close';
  closeBtn.type = 'button';
  closeBtn.textContent = '✕';
  closeBtn.title = '让小猫先休息一下';
  layer.appendChild(closeBtn);

  var bubble = document.createElement('div');
  bubble.id = 'catpet-bubble';
  layer.appendChild(bubble);

  var toggle = document.createElement('button');
  toggle.id = 'catpet-toggle';
  toggle.type = 'button';
  toggle.textContent = '🐾';
  toggle.title = '显示 / 隐藏小猫';

  function mount() {
    document.body.appendChild(layer);
    document.body.appendChild(toggle);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();

  ['walk', 'idle', 'sit', 'paw_l', 'paw_r'].forEach(function (n) { var i = new Image(); i.src = SP + n + '.png'; });

  // ---------- 状态 ----------
  var W = innerWidth, H = innerHeight;
  var pos = { x: W * 0.5, y: H * 0.72 };
  var mouse = { x: W * 0.5, y: H * 0.5 };
  var facing = 1;
  var state = 'idle';
  var stateT = 0;
  var anim = { name: '', frame: 0, t: 0, dir: 1 };   // 空串：保证首次 setAnim 一定生效
  var paws = [];
  var pawSide = 0;
  var heading = 0;              // 当前行进方向(弧度, 0=向右)
  var lastEmit = -1;
  // 每次打开页面都默认出现；关闭只在当前这次浏览中生效
  var enabled = true;
  try { localStorage.removeItem('catpet:off'); } catch (e) {}

  addEventListener('resize', function () { W = innerWidth; H = innerHeight; });
  if (!MOBILE) {
    addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  }

  // 手机端：固定蹲在右下角（避开 🐾 按钮）
  function perch() { pos.x = W - 96; pos.y = H - 18; }
  if (MOBILE) { perch(); addEventListener('resize', perch); }

  toggle.addEventListener('click', function () { setEnabled(!enabled); });


  // ---------- 说话气泡 / 悬停叉号 ----------
  var LINES = {
    zh: [
      '点一下卡片，就能看到完整内容啦',
      '每张卡片背后都藏着一份 PDF 哦',
      '挑一个感兴趣的点开看看吧',
      '我在这儿陪你逛，慢慢看就好'
    ],
    en: [
      'Tap any card to see the full story',
      'There is a whole PDF behind every card',
      'Pick one that looks interesting!',
      'I will keep you company — take your time'
    ]
  };
  var lineIdx = 0, bubbleTimer = null, hoverTimer = null, firstTap = true;
  var FIRST = { zh: '在电脑上打开，查看效果更好哦～', en: 'It looks even better on a desktop~' };

  function isEN() { return (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0; }

  function say() {
    var lang = isEN() ? 'en' : 'zh';
    var arr = LINES[lang];
    var line;
    if (MOBILE && firstTap) { line = FIRST[lang]; firstTap = false; }
    else { line = arr[lineIdx % arr.length]; lineIdx++; }
    bubble.innerHTML = '';
    var paw = document.createElement('span');
    paw.className = 'cp-paw';
    paw.style.backgroundImage = 'url("' + SP + 'paw_r.png")';
    var txt = document.createElement('span');
    txt.textContent = line;
    var d1 = document.createElement('i'); d1.className = 'cp-dot';
    var d2 = document.createElement('i'); d2.className = 'cp-dot2';
    bubble.appendChild(paw); bubble.appendChild(txt);
    bubble.appendChild(d1); bubble.appendChild(d2);
    bubble.classList.remove('show');
    void bubble.offsetWidth;          // 重启动画
    bubble.classList.add('show');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () { bubble.classList.remove('show'); }, 4200);
  }

  function showClose(on) {
    if (MOBILE) return;                          // 手机端保持常驻
    clearTimeout(hoverTimer);
    if (on) closeBtn.classList.add('show');
    else hoverTimer = setTimeout(function () { closeBtn.classList.remove('show'); }, 400);
  }

  if (MOBILE) closeBtn.classList.add('show');   // 触屏没有 hover，叉号常驻
  cat.addEventListener('mouseenter', function () { showClose(true); });
  cat.addEventListener('mouseleave', function () { showClose(false); });
  closeBtn.addEventListener('mouseenter', function () { showClose(true); });
  closeBtn.addEventListener('mouseleave', function () { showClose(false); });
  cat.addEventListener('click', function (e) { e.stopPropagation(); say(); });
  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setEnabled(false);
  });

  function setEnabled(on) {
    enabled = on;
    layer.style.display = on ? '' : 'none';
    toggle.classList.toggle('off', !on);
    if (!on) { bubble.classList.remove('show'); closeBtn.classList.remove('show'); }
    else if (MOBILE) closeBtn.classList.add('show');
  }

  // 跟随猫定位气泡与叉号
  function placeUI() {
    var m = META[anim.name];
    var w = px(m.w), h = px(m.h);
    var left = pos.x - w / 2, top = pos.y - h + px(PAD);
    // 叉号贴在猫的右上角（视觉上略往内收）
    closeBtn.style.left = Math.round(left + w - px(PAD) - 16) + 'px';
    closeBtn.style.top = Math.round(top + px(PAD) - 4) + 'px';
    // 气泡在猫头顶偏右
    if (bubble.classList.contains('show')) {
      var bw = bubble.offsetWidth, bh = bubble.offsetHeight;
      var rightSide = pos.x > W * 0.55;
      bubble.classList.toggle('tail-right', rightSide);
      var bx = rightSide ? Math.max(8, pos.x - bw + 30) : Math.min(Math.max(8, pos.x - 26), W - bw - 8);
      bx = Math.min(bx, W - bw - 8);
      var by = Math.max(8, top - bh - 20);
      bubble.style.left = Math.round(bx) + 'px';
      bubble.style.top = Math.round(by) + 'px';
    }
  }

  // ---------- 动画 ----------
  function setAnim(name, dir) {
    if (anim.name === name && (dir || 1) === anim.dir) return;
    anim.name = name;
    anim.dir = dir || 1;
    anim.frame = anim.dir > 0 ? 0 : META[name].frames - 1;
    anim.t = 0;
    lastEmit = -1;
    var m = META[name];
    cat.style.width = px(m.w) + 'px';
    cat.style.height = px(m.h) + 'px';
    cat.style.backgroundImage = 'url("' + SP + name + '.png")';
    cat.style.backgroundSize = px(m.w * m.frames) + 'px ' + px(m.h) + 'px';
  }

  function stepAnim(dt) {
    var m = META[anim.name];
    var fps = CFG.fps[anim.name] || 8;
    anim.t += dt;
    var step = 1000 / fps;
    while (anim.t >= step) {
      anim.t -= step;
      var next = anim.frame + anim.dir;
      if (anim.name === 'walk' || anim.name === 'idle') {
        anim.frame = (next + m.frames) % m.frames;
      } else {
        anim.frame = Math.max(0, Math.min(m.frames - 1, next));
      }
    }
    cat.style.backgroundPosition = (-px(m.w) * anim.frame) + 'px 0';
  }

  function animDone() {
    var m = META[anim.name];
    return anim.dir > 0 ? anim.frame >= m.frames - 1 : anim.frame <= 0;
  }

  // ---------- 脚印 ----------
  function emitPaw() {
    var img = document.createElement('img');
    img.className = 'catpaw';
    img.src = SP + (pawSide ? 'paw_r.png' : 'paw_l.png');
    var pw = Math.round(PAW.w * k * 0.62), ph = Math.round(PAW.h * k * 0.62);
    img.style.width = pw + 'px';
    img.style.height = ph + 'px';
    // 沿行进方向后退一点，并按左右脚在垂直方向错开
    var ca = Math.cos(heading), sa = Math.sin(heading);
    var back = -(CATH * 0.12);
    var side = (pawSide ? 1 : -1) * (CATH * 0.09);
    var ox = ca * back - sa * side;
    var oy = sa * back + ca * side;
    img.style.left = Math.round(pos.x + ox - pw / 2) + 'px';
    img.style.top = Math.round(pos.y + oy - ph / 2) + 'px';
    // 素材脚趾朝上，+90° 后即指向行进方向
    img.style.transform = 'rotate(' + (heading * 180 / Math.PI + 90).toFixed(1) + 'deg)';
    layer.appendChild(img);
    paws.push({ el: img, t: 0 });
    pawSide ^= 1;
    while (paws.length > CFG.pawMax) { var old = paws.shift(); if (old.el.parentNode) old.el.remove(); }
  }

  function updatePaws(dt) {
    for (var i = paws.length - 1; i >= 0; i--) {
      var p = paws[i];
      p.t += dt;
      if (p.t > CFG.pawLife * 0.45) p.el.classList.add('fade');
      if (p.t > CFG.pawLife) { p.el.remove(); paws.splice(i, 1); }
    }
  }

  // ---------- 主循环 ----------
  var last = performance.now();
  setAnim('idle');

  function loop(now) {
    var dt = Math.min(50, now - last); last = now;
    requestAnimationFrame(loop);
    if (!enabled) return;

    if (MOBILE) {                       // 手机端：原地待机 + 眨眼
      if (anim.name !== 'idle') setAnim('idle');
      stepAnim(dt);
      placeUI();
      cat.style.transform =
        'translate(' + Math.round(pos.x - px(META.idle.w) / 2) + 'px,' +
                       Math.round(pos.y - px(META.idle.h) + px(PAD)) + 'px)';
      return;
    }

    var dx = mouse.x - pos.x, dy = mouse.y - pos.y;
    var dist = Math.hypot(dx, dy);

    stateT += dt;
    var far = dist > CFG.followDist + CFG.hysteresis;

    if (state === 'walk') {
      if (dist <= CFG.followDist) { state = 'idle'; stateT = 0; setAnim('idle'); }
    } else if (state === 'idle') {
      if (far) { state = 'walk'; stateT = 0; setAnim('walk'); }
      else if (stateT > CFG.pauseBeforeSit) { state = 'sit'; stateT = 0; setAnim('sit', 1); }
    } else if (state === 'sit') {
      if (far) { state = 'stand'; stateT = 0; setAnim('sit', -1); }
      else if (animDone()) { state = 'sitting'; stateT = 0; }
    } else if (state === 'sitting') {
      if (far) { state = 'stand'; stateT = 0; setAnim('sit', -1); }
    } else if (state === 'stand') {
      if (animDone()) { state = 'walk'; stateT = 0; setAnim('walk'); }
    }

    if (state === 'walk' && dist > 1) {
      var over = Math.max(0, dist - CFG.followDist);
      var speed = Math.min(CFG.maxSpeed, over * CFG.accelK + 40);
      var vx = dx / dist * speed, vy = dy / dist * speed;
      pos.x += vx * dt / 1000;
      pos.y += vy * dt / 1000;
      heading = Math.atan2(vy, vx);
      if (Math.abs(vx) > 6) facing = vx > 0 ? 1 : -1;
    }

    var halfW = px(META[anim.name].w) / 2;
    pos.x = Math.max(halfW + CFG.edgePad, Math.min(W - halfW - CFG.edgePad, pos.x));
    pos.y = Math.max(px(META[anim.name].h) - px(PAD) + CFG.edgePad, Math.min(H - CFG.edgePad, pos.y));

    var prev = anim.frame;
    stepAnim(dt);

    if (state === 'walk' && anim.frame !== prev) {
      if ((anim.frame === 1 || anim.frame === 5) && anim.frame !== lastEmit) {
        emitPaw(); lastEmit = anim.frame;
      }
    }

    updatePaws(dt);

    placeUI();

    cat.style.transform =
      'translate(' + Math.round(pos.x - px(META[anim.name].w) / 2) + 'px,' +
                     Math.round(pos.y - px(META[anim.name].h) + px(PAD)) + 'px)' +
      ' scaleX(' + facing + ')';
  }

  layer.style.display = enabled ? '' : 'none';
  toggle.classList.toggle('off', !enabled);
  requestAnimationFrame(loop);
})();
