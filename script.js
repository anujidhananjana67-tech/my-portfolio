/* ── THEME SWITCHER LOGIC ── */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = themeToggleBtn.querySelector('i');

// Check saved theme or system preference default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
  });
}

function updateThemeButton(theme) {
  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }
}

const currentPath = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  if (currentPath === linkPath || (currentPath === "" && linkPath === "index.html")) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});