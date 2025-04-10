/**
 * Home page scroll experience with exhibition carousel
 */
export default {
  init() {
    // Initialize only on home page
    if (!document.querySelector('.exhibition-carousel')) {
      return Promise.resolve(this);
    }
    
    this.setupCarousel();
    this.setupSmoothScroll();
    this.setupTouchSwipe();
    
    console.log("Home scroll experience initialized");
    return Promise.resolve(this);
  },
  
  setupCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    
    // Function to show a specific slide
    const goToSlide = (slideIndex) => {
      // Hide all slides and remove active class from dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show the selected slide and activate corresponding dot
      slides[slideIndex].classList.add('active');
      dots[slideIndex].classList.add('active');
      
      // Update current slide index
      currentSlide = slideIndex;
    };
    
    // Previous slide button
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
      });
    }
    
    // Next slide button
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const newIndex = (currentSlide + 1) % slides.length;
        goToSlide(newIndex);
      });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
      const newIndex = (currentSlide + 1) % slides.length;
      goToSlide(newIndex);
    }, 5000);
    
    // Pause auto-advance when user interacts with carousel
    const carousel = document.querySelector('.exhibition-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
          const newIndex = (currentSlide + 1) % slides.length;
          goToSlide(newIndex);
        }, 5000);
      });
    }
  },
  
  setupSmoothScroll() {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for header height
          behavior: 'smooth'
        });
      });
    });
    
    // Scroll down indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          window.scrollTo({
            top: aboutSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    }
  },
  
  setupTouchSwipe() {
    const carousel = document.querySelector('.carousel-wrapper');
    if (!carousel) return;
    
    let startX;
    let endX;
    
    carousel.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      
      // Calculate swipe distance
      const distance = startX - endX;
      
      // Minimum swipe distance threshold
      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          // Swipe left, go to next slide
          document.querySelector('.carousel-next').click();
        } else {
          // Swipe right, go to previous slide
          document.querySelector('.carousel-prev').click();
        }
      }
    }, { passive: true });
  }
};