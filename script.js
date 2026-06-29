/* ── NAVIGATION LOGIC ── */
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.section;

    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    sections.forEach(s => {
      s.classList.remove('active');
      if (s.id === target) s.classList.add('active');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ── THEME SWITCHER LOGIC ── */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = themeToggleBtn.querySelector('i');
const themeText = themeToggleBtn.querySelector('span');

// Check saved theme or system preference default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
  if (theme === 'light') {
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}