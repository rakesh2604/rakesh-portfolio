// Theme Management
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// State management using JavaScript variables (no localStorage)
let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Initialize theme
function initTheme() {
  html.setAttribute('data-color-scheme', currentTheme);
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-color-scheme', currentTheme);
});

initTheme();

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('.section, .hero');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = 'var(--shadow-md)';
  } else {
    header.style.boxShadow = 'var(--shadow-sm)';
  }
  
  lastScroll = currentScroll;
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Copy Email to Clipboard
const copyEmailBtn = document.getElementById('copyEmail');
const emailLink = document.getElementById('emailLink');

copyEmailBtn.addEventListener('click', async () => {
  const email = 'rakesh.kr2604@gmail.com';
  
  try {
    await navigator.clipboard.writeText(email);
    copyEmailBtn.textContent = 'Copied!';
    copyEmailBtn.style.background = 'var(--color-success)';
    copyEmailBtn.style.color = 'var(--color-btn-primary-text)';
    
    setTimeout(() => {
      copyEmailBtn.textContent = 'Copy';
      copyEmailBtn.style.background = '';
      copyEmailBtn.style.color = '';
    }, 2000);
  } catch (err) {
    // Fallback for browsers that don't support clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      copyEmailBtn.textContent = 'Failed';
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy';
      }, 2000);
    }
    
    document.body.removeChild(textArea);
  }
});

const downloadResumeBtn = document.getElementById('downloadResume');
downloadResumeBtn.addEventListener('click', () => {
  // Directly download your actual resume PDF by navigating to the PDF URL
  window.open('/Rakesh-Kumar-Google-Application-Engineer-Resume.pdf', '_blank');
});


// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  // Simulate form submission (in a real scenario, this would send to a server)
  console.log('Form submitted:', formData);
  
  // Create mailto link
  const mailtoLink = `mailto:rakesh.kr2604@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
  
  window.location.href = mailtoLink;
  
  // Reset form
  contactForm.reset();
  
  // Show success message
  alert('Thank you for your message! Your email client will open to send the message.');
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
const animatedElements = document.querySelectorAll(
  '.skill-category, .project-card, .achievement-card, .education-card, .experience-card'
);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Skill Tags Interaction
const skillTags = document.querySelectorAll('.skill-tag');
let selectedSkills = [];

skillTags.forEach(tag => {
  tag.addEventListener('click', () => {
    const skill = tag.textContent;
    const index = selectedSkills.indexOf(skill);
    
    if (index > -1) {
      selectedSkills.splice(index, 1);
      tag.style.opacity = '1';
    } else {
      selectedSkills.push(skill);
      tag.style.opacity = '0.7';
    }
  });
});

// Console Easter Egg
console.log('%cHey there! 👋', 'color: #21808d; font-size: 24px; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'color: #21808d; font-size: 16px;');
console.log('%cEmail: rakesh.kr2604@gmail.com', 'color: #626c71; font-size: 14px;');
console.log('%cGitHub: https://github.com/rakesh2604', 'color: #626c71; font-size: 14px;');

// Performance monitoring
window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
  }
});