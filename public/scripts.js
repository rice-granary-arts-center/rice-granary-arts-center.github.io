const exhibitionInfo = {
    zh: {
        title: "杭州米仓艺术中心开馆特别展-小泽刚与管怀宾",
        duration: "展览期间：2025年3月18日至6月15日",
        time: "开放时间：周二至周日 10:00-18:00"
    },
    en: {
        title: "Hangzhou Rice Granary Arts Center Opening Special Exhibition: Ozawa Tsuyoshi and Guan Huaibin",
        duration: "Exhibition Period: March 18, 2024 - June 15, 2024",
        time: "Opening Days and Hours: Tuesday to Sunday 10:00 AM - 6:00 PM"
    }
};

document.addEventListener("DOMContentLoaded", function() {
    // Initialize language immediately
    const savedLanguage = localStorage.getItem('language') || 'zh';
    updateLanguageDisplay(savedLanguage);
    
    // Load menu once, it stays throughout the session
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
            
            // Set active menu item based on the current page
            setActiveMenuItem();
            
            // Apply language to menu elements
            switchLanguage(savedLanguage);
            
            // Update banner text (only on index page)
            const banner = document.querySelector('.banner');
            if (banner) {
                const savedLanguage = localStorage.getItem('language') || 'zh';
                updateBannerText(savedLanguage);
            }
        })
        .catch(error => {
            console.error('Error loading menu:', error);
        });
    
    // Mobile layout adjustments
    if (window.innerWidth <= 768) {
        handleMobileLayout();
    }
});

// Update the language display function to handle banner elements specially
function updateLanguageDisplay(lang) {
    // Handle regular elements (use block display)
    document.querySelectorAll('[data-lang-zh]:not(.banner [data-lang-zh])').forEach(el => {
        el.style.display = lang === 'zh' ? 'block' : 'none';
    });
    document.querySelectorAll('[data-lang-en]:not(.banner [data-lang-en])').forEach(el => {
        el.style.display = lang === 'en' ? 'block' : 'none';
    });
    
    // Handle banner elements specially (use inline display)
    document.querySelectorAll('.banner [data-lang-zh]').forEach(el => {
        el.style.display = lang === 'zh' ? 'inline' : 'none';
    });
    document.querySelectorAll('.banner [data-lang-en]').forEach(el => {
        el.style.display = lang === 'en' ? 'inline' : 'none';
    });
}

// Replace updateBannerText function with this version
function updateBannerText(lang) {
    updateLanguageDisplay(lang);
    
    // Add touch and mouse event handlers to pause animation
    const scrollContent = document.querySelector('.scrollable-content');
    if (scrollContent) {
        // Reset to beginning of animation when language changes
        scrollContent.style.animation = 'none';
        scrollContent.offsetHeight; // Trigger reflow
        scrollContent.style.animation = 'scroll-text 30s linear infinite';
        
        // Handle mouse events
        scrollContent.addEventListener('mousedown', () => {
            scrollContent.style.animationPlayState = 'paused';
        });
        
        document.addEventListener('mouseup', () => {
            scrollContent.style.animationPlayState = 'running';
        });
        
        // Handle touch events for mobile
        scrollContent.addEventListener('touchstart', () => {
            scrollContent.style.animationPlayState = 'paused';
        });
        
        document.addEventListener('touchend', () => {
            scrollContent.style.animationPlayState = 'running';
        });
    }
}

function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    
    // Update active language indicator
    document.querySelectorAll('.language-switcher a').forEach(element => {
        element.classList.remove('active');
    });
    document.querySelector(`.language-switcher a[data-lang="${lang}"]`).classList.add('active');
    
    // Update menu text
    document.querySelectorAll('nav ul li a').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    // Update logo
    document.getElementById('site-logo').src = lang === 'zh' ? 'media/icons/Chinese.svg' : 'media/icons/English.svg';
    
    // Update banner text
    updateBannerText(lang);
    
    // Update language display for content elements
    updateLanguageDisplay(lang);
}

function setActiveMenuItem() {
    // Get the current page filename
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('nav ul li a').forEach(element => {
        element.classList.remove('active');
        const href = element.getAttribute('href');
        
        // Check if this menu item corresponds to the current page
        if (currentPage === href) {
            element.classList.add('active');
        }
    });
}

// Add this new function to fetch and update only the content area
function loadPageContent(url) {
    // Show loading indicator
    document.querySelector('.content').classList.add('loading');
    
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract just the content section
            const newContent = doc.querySelector('.content');
            
            // Replace only the content area, leave menu and logo untouched
            if (newContent) {
                document.querySelector('.content').innerHTML = newContent.innerHTML;
                
                // Update page title
                document.title = doc.title;
                
                // Update URL without page reload
                history.pushState({}, doc.title, url);
                
                // Apply language display to new content
                const currentLang = localStorage.getItem('language') || 'zh';
                updateLanguageDisplay(currentLang);
                
                // IMPORTANT: Only handle mobile layout for specific pages
                if (window.innerWidth <= 768 && url.includes('index.html')) {
                    handleMobileLayout();
                }
            }
        })
        .catch(error => {
            console.error('Error loading page content:', error);
        })
        .finally(() => {
            // Remove loading indicator
            document.querySelector('.content').classList.remove('loading');
        });
}

// Modify handleMobileLayout to work with new banner structure
function handleMobileLayout() {
    const content = document.querySelector('.content');
    const poster = document.querySelector('.poster');
    const banner = document.querySelector('.banner');
    
    if (content && poster && banner) {
        // Clear and rebuild in correct order
        content.innerHTML = '';
        
        // 1. Add poster first
        content.appendChild(poster);
        
        // 2. Add banner second
        banner.style.display = 'block';
        banner.style.backgroundColor = '#333';
        banner.style.color = '#fff';
        banner.style.width = '100%';
        content.appendChild(banner);
    }
}

// Modify the document click event to handle navigation
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Language switching (existing code)
    if (target.matches('.language-switcher a')) {
        event.preventDefault();
        switchLanguage(target.getAttribute('data-lang'));
    }
    
    // NEW: Handle menu navigation links
    if (target.matches('nav ul li a')) {
        event.preventDefault();
        
        // First update active state in the menu
        document.querySelectorAll('nav ul li a').forEach(el => {
            el.classList.remove('active');
        });
        target.classList.add('active');
        
        // Then load the page content
        loadPageContent(target.getAttribute('href'));
    }
});

// Handle browser back/forward navigation
window.addEventListener('popstate', function() {
    loadPageContent(window.location.pathname);
});

window.addEventListener('resize', function() {
    // If resized to desktop width, ensure banner is hidden
    if (window.innerWidth > 768) {
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.display = 'none';
        }
    } else {
        // If resized to mobile width, apply mobile layout
        handleMobileLayout();
    }
});