// Keep native details semantics and the no-JavaScript fallback.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.faq-item').forEach(item => {
  const summary = item.querySelector('summary');
  let animation;
  let expanded = item.open;

  function settle() {
    if (animation) animation.cancel();
    animation = null;
    item.open = expanded;
    item.style.height = '';
    item.style.overflow = '';
  }

  summary.addEventListener('click', event => {
    event.preventDefault();
    const startHeight = item.getBoundingClientRect().height;
    expanded = !expanded;
    if (animation) animation.cancel();
    if (reducedMotion.matches) {
      settle();
      return;
    }

    item.open = true;
    item.style.height = '';
    const endHeight = expanded ? item.getBoundingClientRect().height
      : summary.getBoundingClientRect().height + parseFloat(getComputedStyle(item).borderBottomWidth);
    item.style.overflow = 'hidden';
    animation = item.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: 280, easing: 'ease-in-out' }
    );
    animation.onfinish = settle;
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) settle();
  });
});
