const tabButtons = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('.tab-panel');
const siteNameLink = document.querySelector('[data-tab-link="home"]');
const menuToggle = document.getElementById('menuToggle');

function showTab(tabId, updateHash = true) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === tabId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabId);
  });

  if (updateHash) {
    history.replaceState(null, '', `#${tabId}`);
  }

  document.body.classList.remove('nav-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => showTab(button.dataset.tab));
});

siteNameLink?.addEventListener('click', (event) => {
  event.preventDefault();
  showTab('home');
});

menuToggle?.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

const initialTab = window.location.hash.replace('#', '') || 'home';
const validTabs = Array.from(tabPanels).map((panel) => panel.id);
showTab(validTabs.includes(initialTab) ? initialTab : 'home', false);
