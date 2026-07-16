document.addEventListener("DOMContentLoaded", () => {
    // 1. පිටුව ලස්සනට fade-in කරවීම
    document.body.classList.add('loaded');

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // sidebar.html load කරගැනීම...
        fetch('./sidebar.html')
            .then(response => {
                if (!response.ok) throw new Error("Sidebar file missing!");
                return response.text();
            })
            .then(data => {
                sidebar.innerHTML = data;
                setActiveNavLink();
                
                const themeBtn = document.getElementById('themeToggleBtn');
                if (themeBtn) {
                    themeBtn.addEventListener('click', () => {
                        document.body.classList.toggle('dark-theme');
                    });
                }
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }
});

function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('#sidebar-nav a');
    
    navLinks.forEach(link => {
        const pageAttr = link.getAttribute('data-page');
        if (currentPage === pageAttr) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
// Contact Form එක වැඩ කරවීම (තිබේ නම් පමණක් ක්‍රියාත්මක වේ)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Page එක reload වීම වැළැක්වීම

        formStatus.textContent = "Sending message...";
        formStatus.style.color = "#aaa";

        // YOUR_SERVICE_ID සහ YOUR_TEMPLATE_ID වෙනුවට ඔයාගේ ඒවා ආදේශ කරන්න
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(() => {
                formStatus.textContent = "✅ Message sent successfully! I'll get back to you soon.";
                formStatus.style.color = "#2ecc71";
                contactForm.reset(); // Form එක clear කිරීම
            }, (error) => {
                formStatus.textContent = "❌ Failed to send message. Please try again.";
                formStatus.style.color = "#e74c3c";
                console.error('EmailJS Error:', error);
            });
    });
}

// වෙනත් පිටුවකට යද්දී ලස්සනට fade-out කරවීම
window.addEventListener('beforeunload', () => {
    document.body.classList.remove('loaded');
});