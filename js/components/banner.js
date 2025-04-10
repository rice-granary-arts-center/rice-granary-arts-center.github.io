export default {
    init() {
        return this.loadBanner()
            .then(() => {
                this.setupScrollingBanner();
                console.log("Banner initialized successfully");
            })
            .catch(error => {
                console.error("Error initializing banner:", error);
            });
    },
    
    loadBanner() {
        return fetch('templates/banner.html')  // Keep consistent with menu.js
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load banner: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                const bannerContainer = document.querySelector('.banner');
                if (!bannerContainer) {
                    console.error("Banner container not found");
                    return;
                }
                bannerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error("Error loading banner:", error);
            });
    },
    
    setupScrollingBanner() {
        const scrollableContent = document.getElementById('scrollable-content');
        
        if (!scrollableContent) return;
        
        // For mobile scrolling, we need the content duplicated differently
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Clear any previous clones first
            const originalContent = scrollableContent.querySelector('.exhibition-info');
            if (!originalContent) return;
            
            // Remove any existing duplicates
            while (scrollableContent.childNodes.length > 1) {
                scrollableContent.removeChild(scrollableContent.lastChild);
            }
            
            // Create a clone to ensure continuous scroll
            const clone = originalContent.cloneNode(true);
            scrollableContent.appendChild(clone);
            
            // Fix mobile animation
            scrollableContent.style.transform = 'none';
            scrollableContent.style.animation = 'scroll-text 30s linear infinite';
            
        } else {
            // Desktop vertical scrolling - only duplicate if needed
            const originalContent = scrollableContent.querySelector('.exhibition-info');
            if (!originalContent) return;
            
            // Remove any existing duplicates
            while (scrollableContent.childNodes.length > 1) {
                scrollableContent.removeChild(scrollableContent.lastChild);
            }
            
            // Create a clone to ensure continuous scroll
            const clone = originalContent.cloneNode(true);
            scrollableContent.appendChild(clone);
            
            // Fix vertical scrolling settings
            scrollableContent.style.transformOrigin = 'left bottom';
            scrollableContent.style.transform = 'rotate(270deg) translateX(-100%)';
            scrollableContent.style.animation = 'scroll-vertical 30s linear infinite';
        }
        
        // Make this accessible to other modules
        window.Banner = this;
    },
    
    updateExhibitionInfo(data) {
        const scrollableContent = document.getElementById('scrollable-content');
        if (!scrollableContent) return;
        
        const exhibitionInfo = scrollableContent.querySelector('.exhibition-info');
        if (exhibitionInfo && data) {
            // Update exhibition data
            const zhTitle = exhibitionInfo.querySelector('[data-lang-zh]:nth-child(1)');
            const enTitle = exhibitionInfo.querySelector('[data-lang-en]:nth-child(2)');
            const zhDates = exhibitionInfo.querySelector('[data-lang-zh]:nth-child(4)');
            const enDates = exhibitionInfo.querySelector('[data-lang-en]:nth-child(5)');
            
            if (zhTitle && data.titleZh) zhTitle.textContent = data.titleZh;
            if (enTitle && data.titleEn) enTitle.textContent = data.titleEn;
            if (zhDates && data.datesZh) zhDates.textContent = `展览期间：${data.datesZh}`;
            if (enDates && data.datesEn) enDates.textContent = `Exhibition Period: ${data.datesEn}`;
            
            // Re-initialize the scrolling after data update
            this.setupScrollingBanner();
        }
    }
};