/**
 * Menu component for navigation management
 */
export default {
    loadMenu() {
        return fetch('templates/menu.html')
            .catch(() => {
                console.log("Menu not found in templates/, trying root...");
                return fetch('menu.html');
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load menu: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const menuContainer = document.getElementById('menu-container');
                if (!menuContainer) {
                    console.error("Menu container not found");
                    return;
                }
                menuContainer.innerHTML = data;

                // Add ALL setup functionality
                this.setupMobileMenu();
                this.setupLanguageSwitcher();
                this.setActiveMenuItem();
                
                // Add navigation click handler
                document.addEventListener('click', (e) => this.handleNavClick(e));
                
                console.log("Menu loaded and initialized successfully");
            })
            .catch(error => {
                console.error("Error loading menu:", error);
                throw error;
            });
    },
    
    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const menuItems = document.querySelector('.menu-items');
        
        if (menuToggle && menuItems) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                menuItems.classList.toggle('active');
                document.body.style.overflow = menuItems.classList.contains('active') ? 'hidden' : '';
            });
    
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuItems.contains(e.target) && !menuToggle.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    menuItems.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
    
            // Close menu when clicking a link
            const links = menuItems.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    menuItems.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    },
    
    setupLanguageSwitcher() {
        const currentLang = localStorage.getItem('language') || 'zh';
        
        document.querySelectorAll('.language-switcher a').forEach(element => {
            element.classList.remove('active');
            
            // Update onclick to use modern event handling
            element.removeAttribute('onclick');
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = element.getAttribute('data-lang');
                if (lang) {
                    // Use the language module to switch language
                    import('../utils/language.js').then(module => {
                        module.default.switchLanguage(lang);
                    });
                }
            });
            
            // Set active class on current language
            if (element.getAttribute('data-lang') === currentLang) {
                element.classList.add('active');
            }
        });
    },
    
    setActiveMenuItem() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        document.querySelectorAll('nav ul li a').forEach(element => {
            element.classList.remove('active');
            const href = element.getAttribute('href');
            if (href === currentPage) {
                element.classList.add('active');
            }
        });
        
        // Also update the menu text based on current language
        const currentLang = localStorage.getItem('language') || 'zh';
        document.querySelectorAll('nav ul li a').forEach(element => {
            const text = element.getAttribute(`data-${currentLang}`);
            if (text) {
                element.textContent = text;
            }
        });
    },
    
    handleNavClick(event) {
        // This is a more complete implementation
        const target = event.target;
        
        // Handle menu navigation links
        if (target.matches('nav ul li a')) {
            event.preventDefault();
            const href = target.getAttribute('href');
            
            // Update active state in the menu
            document.querySelectorAll('nav ul li a').forEach(el => {
                el.classList.remove('active');
            });
            target.classList.add('active');
            
            // Navigate to the page
            window.location.href = href;
        }
    }
};