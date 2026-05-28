// ── Hamburg Menu ──
function hamburg() {
  const dropdown = document.querySelector('.dropdown');
  const cancelBtn = document.querySelector('.cancel');
  const hamburgBtn = document.querySelector('.hamburg');
  dropdown.style.transform = 'translateY(0)';
  cancelBtn.style.opacity = '1';
  cancelBtn.style.pointerEvents = 'auto';
  hamburgBtn.style.opacity = '0';
  hamburgBtn.style.pointerEvents = 'none';
}

function cancel() {
  const dropdown = document.querySelector('.dropdown');
  const cancelBtn = document.querySelector('.cancel');
  const hamburgBtn = document.querySelector('.hamburg');
  dropdown.style.transform = 'translateY(-500px)';
  cancelBtn.style.opacity = '0';
  cancelBtn.style.pointerEvents = 'none';
  hamburgBtn.style.opacity = '1';
  hamburgBtn.style.pointerEvents = 'auto';
}

// ✅ close dropdown when any link is clicked
document.querySelectorAll('.dropdown .links a').forEach(link => {
  link.addEventListener('click', () => {
    cancel();
  });
});


// ── Scroll to Top Button ──
window.addEventListener('scroll', () => {
  const scrollBtn = document.querySelector('.scroll-button a');
  if (window.scrollY > 300) {
    scrollBtn.classList.add('active');
  } else {
    scrollBtn.classList.remove('active');
  }
});

// ── Theme Toggle ──
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const icon = document.getElementById('themeIcon');
  if (document.body.classList.contains('light-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }
}

// ── Remember Theme on Page Reload ──
window.addEventListener('load', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('themeIcon').classList.remove('fa-moon');
    document.getElementById('themeIcon').classList.add('fa-sun');
  }
})

// ── Contact Modal ──
function openModal() {
  document.getElementById('contactModal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('contactModal').classList.remove('active');
  document.getElementById('modalOverlay').classList.remove('active');
}

// ── Send Email ──
function sendEmail(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const params = {
    from_name:  document.getElementById('from_name').value,
    from_email: document.getElementById('from_email').value,
    message:    document.getElementById('message').value,
  };

  emailjs.send('service_peblrmm', 'template_oe9i2pk', params)
    .then(() => {
      btn.textContent = '✅ Sent!';
      btn.style.background = 'green';
      setTimeout(() => {
        closeModal();
        document.getElementById('contactForm').reset();
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 2000);
    })
    .catch((err) => {
      btn.textContent = '❌ Failed — Try again';
      btn.style.background = 'red';
      btn.disabled = false;
      console.error(err);
    });
}

// ── Close dropdown when clicking outside ──
document.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.dropdown');
  const hamburgBtn = document.querySelector('.hamburg');
  
  // if click is outside dropdown and not on hamburg button
  if (!dropdown.contains(e.target) && !hamburgBtn.contains(e.target)) {
    cancel();
  }
});