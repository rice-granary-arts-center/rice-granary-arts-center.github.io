export default {
  init() {
    return this.loadFooter()
      .then(() => {
        console.log("Footer loaded successfully");
        return this;
      })
      .catch(error => {
        console.error("Error loading footer:", error);
        this.createFallbackFooter();
        return this;
      });
  },
  
  loadFooter() {
    return fetch('templates/footer.html')
      .catch(() => {
        console.log("Footer not found in templates/, trying root...");
        return fetch('footer.html');
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load footer: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        const footerContainer = document.querySelector('.site-footer');
        if (!footerContainer) {
          console.error("Footer container not found");
          return;
        }
        footerContainer.innerHTML = data;
        
        // Debug output
        console.log("Footer content loaded: ", footerContainer.innerHTML.substring(0, 100) + "...");
        console.log("Footer styles: ", window.getComputedStyle(footerContainer).display, 
                  window.getComputedStyle(footerContainer).height,
                  window.getComputedStyle(footerContainer).position);
                  
        // Apply current language
        const currentLang = localStorage.getItem('language') || 'zh';
        this.updateFooterLanguage(currentLang);
      });
  },
  
  createFallbackFooter() {
    const footerContainer = document.querySelector('.site-footer');
    if (footerContainer) {
      footerContainer.innerHTML = `
        <div class="footer-container">
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} <span data-lang-zh>米仓艺术中心</span><span data-lang-en>Rice Granary Arts Center</span></p>
          </div>
        </div>
      `;
    }
  },
  
  updateFooterLanguage(lang) {
    // Target specific elements and use inline-block instead of block for better layout
    document.querySelectorAll('.site-footer [data-lang-zh]').forEach(el => {
      el.style.display = lang === 'zh' ? 'inline-block' : 'none';
    });
    
    document.querySelectorAll('.site-footer [data-lang-en]').forEach(el => {
      el.style.display = lang === 'en' ? 'inline-block' : 'none';
    });
    
    // Also handle block elements separately
    document.querySelectorAll('.site-footer p[data-lang-zh], .site-footer h5[data-lang-zh], .site-footer div[data-lang-zh]').forEach(el => {
      el.style.display = lang === 'zh' ? 'block' : 'none';
    });
    
    document.querySelectorAll('.site-footer p[data-lang-en], .site-footer h5[data-lang-en], .site-footer div[data-lang-en]').forEach(el => {
      el.style.display = lang === 'en' ? 'block' : 'none';
    });
    
    // Force footer visibility regardless of language
    document.querySelector('.site-footer').style.display = 'block';
  }
};