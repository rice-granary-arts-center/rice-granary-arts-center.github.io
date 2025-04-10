/**
 * Language switching functionality
 */
const Language = {
    init() {
        // Initialize language
        const savedLanguage = localStorage.getItem('language') || 'zh';
        this.setLanguage(savedLanguage);
        
        // Set up event listeners for language switching
        document.addEventListener('click', (event) => {
            if (event.target.matches('.language-switcher a')) {
                event.preventDefault();
                this.switchLanguage(event.target.getAttribute('data-lang'));
            }
        });
    },
    
    setLanguage(lang) {
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Store language preference
        localStorage.setItem('language', lang);
        
        // Update active language indicator
        document.querySelectorAll('.language-switcher a').forEach(element => {
            element.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`.language-switcher a[data-lang="${lang}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Update display of language-specific elements
        this.updateLanguageDisplay(lang);
        
        // Update logo
        const logoElement = document.getElementById('site-logo');
        if (logoElement) {
            logoElement.src = lang === 'zh' ? 'media/icons/Chinese.svg' : 'media/icons/English.svg';
        }
        
        // Update menu text
        document.querySelectorAll('nav ul li a').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
    },
    
    updateLanguageDisplay(lang) {
        // Regular elements
        document.querySelectorAll(`[data-lang-zh]:not(.banner [data-lang-zh])`).forEach(el => {
            el.style.display = lang === 'zh' ? 'block' : 'none';
        });
        document.querySelectorAll(`[data-lang-en]:not(.banner [data-lang-en])`).forEach(el => {
            el.style.display = lang === 'en' ? 'block' : 'none';
        });
        
        // Banner elements - inline display
        document.querySelectorAll(`.banner [data-lang-zh]`).forEach(el => {
            el.style.display = lang === 'zh' ? 'inline' : 'none';
        });
        document.querySelectorAll(`.banner [data-lang-en]`).forEach(el => {
            el.style.display = lang === 'en' ? 'inline' : 'none';
        });
    },
    
    switchLanguage(lang) {
        this.setLanguage(lang);
        
        // Update banner if present
        const banner = document.querySelector('.banner');
        if (banner && window.Banner) {
            window.Banner.setupBanner();
        }
    }
};

export default Language;