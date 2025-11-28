import './style.css'

const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const sidebarToggle = document.getElementById('sidebar-toggle');
const themeToggle = document.getElementById('theme-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const copyBtn = document.getElementById('copy-btn');
const scriptCode = document.getElementById('script-code');

function loadTheme() {
  const savedTheme = localStorage.getItem('blackout-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('blackout-theme', isDark ? 'dark' : 'light');
}

function toggleSidebar() {
  if (window.innerWidth <= 768) {
    sidebar.classList.toggle('open');
  } else {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
  }
}

function switchPage(pageId) {
  pages.forEach(page => page.classList.remove('active'));
  navLinks.forEach(link => link.classList.remove('active'));

  const targetPage = document.getElementById(`${pageId}-page`);
  const targetLink = document.querySelector(`[data-page="${pageId}"]`);

  if (targetPage) {
    targetPage.classList.add('active');
  }
  if (targetLink) {
    targetLink.classList.add('active');
  }

  if (window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyToClipboard() {
  const text = scriptCode.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

loadTheme();

themeToggle.addEventListener('click', toggleTheme);
sidebarToggle.addEventListener('click', toggleSidebar);
copyBtn.addEventListener('click', copyToClipboard);

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('data-page');
    switchPage(pageId);
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove('open');
  }
});
