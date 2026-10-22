(() => {
  document.querySelectorAll('.carousel').forEach(gallery => {
  const slides = [...gallery.querySelectorAll('.carousel-slide')];
  const thumbs = [...gallery.querySelectorAll('.carousel-thumb')];
  let current = 0;
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    thumbs.forEach((thumb, i) => thumb.setAttribute('aria-pressed', String(i === current)));
    gallery.querySelector('.carousel-caption').textContent = slides[current].querySelector('img').alt;
    gallery.querySelector('.carousel-count').textContent = `${current + 1} / ${slides.length}`;
    const strip = gallery.querySelector('.carousel-thumbs');
    const thumb = thumbs[current];
    strip.scrollLeft = thumb.offsetLeft - strip.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2;
  };
  gallery.querySelector('.carousel-prev').addEventListener('click', () => show(current - 1));
  gallery.querySelector('.carousel-next').addEventListener('click', () => show(current + 1));
  thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => show(i)));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  const stage = gallery.querySelector('.carousel-stage');
  let start = null;
  stage.addEventListener('touchstart', event => {
    if (event.touches.length === 1) start = [event.touches[0].clientX, event.touches[0].clientY];
    else start = null;
  }, { passive: true });
  stage.addEventListener('touchcancel', () => { start = null; });
  stage.addEventListener('touchend', event => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start[0];
    const dy = event.changedTouches[0].clientY - start[1];
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    start = null;
  }, { passive: true });
  show(0);
  });
})();
