/* Neural Vault — Certifications Page Script
   Surgical Spectrum Design System
   ------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- VanillaTilt 3D hover on cards ---- */
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.vault-card'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.08,
      scale: 1.01,
    });
  }

  /* ---- Filter Logic ---- */
  const pills = document.querySelectorAll('.vault-filter-pill');
  const cards = document.querySelectorAll('.vault-card');
  const rows  = document.querySelectorAll('.vault-row');
  const countEl = document.getElementById('filter-count');
  const total = cards.length;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;

      // Update pill active state
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      let visible = 0;

      // Filter cards
      cards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;
        if (show) {
          card.classList.remove('vault-hidden');
          visible++;
        } else {
          card.classList.add('vault-hidden');
        }
      });

      // Hide entire rows that have no visible cards
      rows.forEach(row => {
        const rowCards = row.querySelectorAll('.vault-card:not(.vault-hidden)');
        if (rowCards.length === 0) {
          row.classList.add('row-hidden');
        } else {
          row.classList.remove('row-hidden');
        }
      });

      // Update count
      if (countEl) {
        countEl.textContent = `Showing ${visible} of ${total}`;
      }
    });
  });

  /* ---- Hamburger Menu ---- */
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.vault-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  /* ---- Scroll to top on logo click ---- */
  const logo = document.querySelector('.vault-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      if (window.location.pathname.includes('/certifications')) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
