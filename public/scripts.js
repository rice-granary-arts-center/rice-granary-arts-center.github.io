const exhibitionInfo = {
    zh: {
        title: "杭州米仓艺术中心开馆特别展-小泽刚与管怀宾",
        duration: "展览期间：2025年3月18日至6月15日",
        time: "开放时间：周二至周日 10:00-18:00"
    },
    en: {
        title: "Hangzhou Rice Granary Art Center Opening Special Exhibition: Ozawa Tsuyoshi and Guan Huaibin",
        duration: "Exhibition Period: March 18, 2024 - June 15, 2024",
        time: "Opening Days and Hours: Tuesday to Sunday 10:00 AM - 6:00 PM"
    }
};

document.addEventListener("DOMContentLoaded", function() {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
            const savedLanguage = localStorage.getItem('language') || 'zh';
            switchLanguage(savedLanguage);
            setActiveMenuItem();
            updateBannerText(savedLanguage);
        });
        
    // For mobile, just ensure correct element order without inline styling
    if (window.innerWidth <= 768) {
        const poster = document.querySelector('.poster');
        const banner = document.querySelector('.banner');
        const content = document.querySelector('.content');
        
        // Clear and rebuild the content in correct order
        if (content && poster && banner) {
            content.innerHTML = '';
            content.appendChild(poster);
            content.appendChild(banner);
        }
    }
});


function updateBannerText(lang) {
    const info = exhibitionInfo[lang];
    const marquee = document.querySelector('.banner marquee');
    if (marquee) {
        marquee.innerHTML = `${info.title} | ${info.duration} | ${info.time}`;
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
}

function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '/' || currentPath.endsWith('index.html');
    
    document.querySelectorAll('nav ul li a').forEach(element => {
        element.classList.remove('active');
        if ((isIndexPage && element.getAttribute('href') === 'index.html') || 
            (!isIndexPage && element.getAttribute('href') === currentPath)) {
            element.classList.add('active');
        }
    });
}

document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Language switching
    if (target.matches('.language-switcher a')) {
      event.preventDefault();
      switchLanguage(target.getAttribute('data-lang'));
    }
  });