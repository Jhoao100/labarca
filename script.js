const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

const header = $('[data-header]');
const menu = $('[data-menu]');
const menuBtn = $('[data-menu-button]');
const glow = $('.cursor-glow');

window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 18));
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? '×' : '☰';
});
$$('[data-menu] a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); menuBtn.textContent = '☰'; menuBtn.setAttribute('aria-expanded','false'); }));

document.addEventListener('pointermove', e => {
  if (!glow) return;
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

const io = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
}), { threshold: .14 });
$$('.reveal').forEach(el => io.observe(el));

$$('[data-filter]').forEach(btn => btn.addEventListener('click', () => {
  $$('[data-filter]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  $$('.dish').forEach(dish => dish.classList.toggle('hide', filter !== 'all' && dish.dataset.type !== filter));
}));

$$('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

let dragged = null, startX = 0, startY = 0, baseX = 0, baseY = 0;
$$('.draggable').forEach(el => {
  el.addEventListener('pointerdown', e => {
    dragged = el; dragged.setPointerCapture(e.pointerId);
    startX = e.clientX; startY = e.clientY;
    baseX = Number(el.dataset.x || 0); baseY = Number(el.dataset.y || 0);
  });
  el.addEventListener('pointermove', e => {
    if (dragged !== el) return;
    const x = baseX + e.clientX - startX;
    const y = baseY + e.clientY - startY;
    el.dataset.x = x; el.dataset.y = y;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('pointerup', () => dragged = null);
});

const copy = {
  ES: { reserve: 'Reservar', hero: 'Una experiencia cálida bajo luces, hojas y sabores.' },
  EN: { reserve: 'Book now', hero: 'A warm experience under lights, leaves and flavors.' }
};
$('[data-lang]').addEventListener('click', e => {
  const next = e.currentTarget.textContent.trim() === 'EN' ? 'ES' : 'EN';
  e.currentTarget.textContent = next === 'EN' ? 'EN' : 'ES';
  document.querySelector('.hero h1').textContent = copy[next].hero;
});
