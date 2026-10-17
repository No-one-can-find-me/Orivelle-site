import { animate, createTimeline, stagger } from 'animejs';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const mobileMenu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => { mobileMenu.open = false; });
});

if (!reduceMotion) {
  const intro = createTimeline({ defaults: { ease: 'out(3)', duration: 900 } });
  intro
    .add('.hero .eyebrow', { opacity: [0, 1], y: [8, 0] })
    .add('.hero h1', { opacity: [0, 1], y: [18, 0] }, '-=680')
    .add('.hero-description', { opacity: [0, 1], y: [12, 0] }, '-=640')
    .add('.hero-actions', { opacity: [0, 1], y: [10, 0] }, '-=660')
    .add('.hero-footnote', { opacity: [0, 1] }, '-=580')
    .add('.hero-art', { opacity: [0, 1], scale: [0.97, 1] }, '-=1040');

  animate('.orbit-one', { rotate: '1turn', duration: 58000, ease: 'linear', loop: true });
  animate('.orbit-two', { rotate: '-1turn', duration: 76000, ease: 'linear', loop: true });
  animate('.orbit-three', { rotate: '1turn', duration: 98000, ease: 'linear', loop: true });
  animate('.core-orbit', { rotate: '1turn', duration: 22000, ease: 'linear', loop: true });
  animate('.art-glow', { scale: [0.94, 1.06], opacity: [0.65, 0.95], duration: 5000, ease: 'inOutSine', alternate: true, loop: true });

  document.querySelectorAll<HTMLElement>('.reveal').forEach((section) => {
    const targets = section.querySelectorAll<HTMLElement>('.section-index, .intro-content, .collection-heading, .collection-card, .collection-note, .closing-section > *');
    const observer = new IntersectionObserver(([entry], currentObserver) => {
      if (!entry.isIntersecting) return;
      animate(targets, {
        opacity: [0, 1],
        y: [18, 0],
        delay: stagger(90),
        duration: 780,
        ease: 'out(3)',
      });
      currentObserver.disconnect();
    }, { threshold: 0.12 });
    observer.observe(section);
  });
}
