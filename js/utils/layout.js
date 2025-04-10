export default {
    init() {
        // Initial setup
        this.setupLayoutClass();
        
        // Resize handling with better throttling
        window.addEventListener('resize', () => this.handleResize());
        
        // Force apply mobile class for narrow screens
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-layout');
            document.body.classList.remove('desktop-layout');
        }
        
        // Return a resolved promise so .then() can be called on it
        return Promise.resolve();
    },
    
    setupLayoutClass() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.add(isMobile ? 'mobile-layout' : 'desktop-layout');
        document.body.classList.remove(isMobile ? 'desktop-layout' : 'mobile-layout');
        
        // Apply layout-specific adjustments
        this.updateLayout(isMobile);
    },
    
    handleResize() {
        // Throttle resize events for better performance
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = setTimeout(() => {
            this.setupLayoutClass();
        }, 250);
    },
    
    updateLayout(isMobile) {
        // Allow scrolling on main content only
        document.body.style.overflow = 'hidden';
        
        const content = document.querySelector('.content');
        if (content) {
            content.style.overflowY = 'auto';
            content.style.height = 'calc(100vh - var(--header-height))'; 
            content.style.width = '100%';
            content.style.position = 'relative';
            
            // Clear any forced positioning
            if (!isMobile) {
                content.style.paddingLeft = '';
            }
        }
        
        // REMOVE menu positioning forcing
        const menuContainer = document.getElementById('menu-container');
        if (menuContainer) {
            // Clean up previous positioning
            menuContainer.style.position = '';
            menuContainer.style.bottom = '';
            menuContainer.style.right = '';
            menuContainer.style.left = '';
        }
    }
};