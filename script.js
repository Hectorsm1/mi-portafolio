document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const primaryNavigation = document.querySelector('#site-nav');

function closeNavigation() {
  if (!menuButton || !primaryNavigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  primaryNavigation.classList.remove('is-open');
}

if (menuButton && primaryNavigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    primaryNavigation.classList.toggle('is-open', !isOpen);
  });

  primaryNavigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeNavigation();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNavigation();
  });

  document.addEventListener('click', (event) => {
    if (!primaryNavigation.contains(event.target) && !menuButton.contains(event.target)) {
      closeNavigation();
    }
  });
}

const filterGroup = document.querySelector('.project-filters');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-project]')];
const filterStatus = document.querySelector('#filter-status');

if (filterGroup && filterButtons.length && projects.length && filterStatus) {
  filterGroup.hidden = false;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedType = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((candidate) => {
        const isSelected = candidate === button;
        candidate.classList.toggle('is-active', isSelected);
        candidate.setAttribute('aria-pressed', String(isSelected));
      });

      projects.forEach((project) => {
        const isVisible = selectedType === 'all' || project.dataset.projectType === selectedType;
        project.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });

      const category = selectedType === 'public'
        ? 'demos públicas'
        : selectedType === 'enterprise'
          ? 'casos empresariales'
          : 'proyectos';
      filterStatus.textContent = `Se muestran ${visibleCount} ${category}.`;
    });
  });
}

const revealTargets = [...document.querySelectorAll('[data-reveal]')];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  revealTargets.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}
