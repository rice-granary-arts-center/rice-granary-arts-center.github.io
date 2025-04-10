export default {
  init() {
    // Add smooth scrolling to all browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Set up intersection observer for fade-in elements
    this.setupScrollAnimations();
    
    // Set up scroll-to-top button
    this.setupScrollToTop();
    
    return Promise.resolve(this);
  },
  
  setupScrollAnimations() {
    // Add fade-in class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('.exhibition-section, .about-section, .artwork');
    animateElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Create an intersection observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // Stop observing once animation is triggered
        }
      });
    }, {
      root: null, // Use viewport as root
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element is in view
    });
    
    // Start observing elements
    animateElements.forEach(el => {
      observer.observe(el);
    });
  },
  
  setupScrollToTop() {
    // Create scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.style.display = 'none';
    document.body.appendChild(scrollTopBtn);
    
    // Add styles for the button
    const style = document.createElement('style');
    style.textContent = `
      .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--md-primary);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
        z-index: 999;
      }
      .scroll-top-btn:hover {
        opacity: 1;
      }
      @media (max-width: 768px) {
        .scroll-top-btn {
          bottom: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
};