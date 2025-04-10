export default {
  init() {
    return this.loadHeader()
      .then(() => {
        console.log("Header loaded successfully");
        return this;
      })
      .catch(error => {
        console.error("Error loading header:", error);
        return this;
      });
  },
  
  loadHeader() {
    return fetch('templates/header.html')
      .catch(() => {
        console.log("Header not found in templates/, trying root...");
        return fetch('header.html');
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load header: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        const headerContainer = document.querySelector('.site-header');
        if (!headerContainer) {
          console.error("Header container not found");
          return;
        }
        headerContainer.innerHTML = data;
        
        // Apply current language to logo
        const currentLang = localStorage.getItem('language') || 'zh';
        this.updateHeaderLanguage(currentLang);
      });
  },
  
  updateHeaderLanguage(lang) {
    const logoElement = document.getElementById('site-logo');
    if (logoElement) {
      logoElement.src = lang === 'zh' ? 'media/icons/Chinese.svg' : 'media/icons/English.svg';
      logoElement.alt = lang === 'zh' ? '米仓艺术中心' : 'Rice Granary Arts Center';
    }
  }
};