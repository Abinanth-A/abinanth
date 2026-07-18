// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });
}

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(element => {
  observer.observe(element);
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100; // Offset for header
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });

  // Header background on scroll
  const header = document.querySelector('.header');
  if (scrollY > 50) {
    header.style.background = 'rgba(17, 24, 39, 0.9)';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = 'rgba(17, 24, 39, 0.7)';
    header.style.boxShadow = 'none';
  }
});

// Trigger initial animations
window.addEventListener('load', () => {
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-section.fade-in-up');
    heroElements.forEach(el => el.classList.add('visible'));
  }, 100);
});

// Contact Form submission via Web3Forms
document.querySelectorAll('.contact-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    data.access_key = "b411afa5-3951-494a-b416-de5239e6536f";

    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result.success) {
        alert('Thank you! Your message has been sent successfully.');
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
        console.error(result);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
});
