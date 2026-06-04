(() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  const dots = [];
  const DOT_COUNT = window.innerWidth < 768 ? 30 : 65;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function initDots() {
    dots.length = 0;
    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.0 + 0.4,
        vx: (Math.random() - 0.5) * (isReducedMotion ? 0.03 : 0.2),
        vy: (Math.random() - 0.5) * (isReducedMotion ? 0.03 : 0.2),
        alpha: Math.random() * 0.3 + 0.1
      });
    }
  }

  let animFrame;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    // Светло-голубые частицы под стиль UI
    ctx.fillStyle = '#a2c8e6'; 

    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      d.x += d.vx;
      d.y += d.vy;

      if (d.x < -5) d.x = width + 5;
      if (d.x > width + 5) d.x = -5;
      if (d.y < -5) d.y = height + 5;
      if (d.y > height + 5) d.y = -5;

      ctx.globalAlpha = d.alpha;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }

    animFrame = requestAnimationFrame(animate);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrame);
    } else if (!isReducedMotion) {
      animate();
    }
  });

  window.addEventListener('resize', () => {
    resize();
    initDots();
  });

  resize();
  initDots();
  if (!isReducedMotion) animate();
})();
