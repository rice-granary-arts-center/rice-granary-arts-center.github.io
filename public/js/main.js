import Layout from './utils/layout.js';
import Header from './components/header.js';
import Menu from './components/menu.js';
import Language from './utils/language.js';
import Footer from './components/footer.js';
import SmoothScroll from './components/smooth-scroll.js';
import HomeScroll from './components/home-scroll.js'; // Add this

// Component Registry
const ComponentRegistry = {
  components: {},
  
  register(name, component) {
    this.components[name] = component;
    return component;
  },
  
  init() {
    // Initialize components in sequence
    Layout.init()
      .then(() => {
        this.register('layout', Layout);
        return Header.init();
      })
      .then(() => {
        this.register('header', Header);
        window.Header = Header; // Make available globally
        return Menu.loadMenu();
      })
      .then(() => {
        this.register('menu', Menu);
        return Footer.init();
      })
      .then(() => {
        this.register('footer', Footer);
        window.Footer = Footer;
        
        // Initialize home scroll experience
        return HomeScroll.init();
      })
      .then(() => {
        this.register('homeScroll', HomeScroll);
        
        // Try to initialize SmoothScroll if available
        if (typeof SmoothScroll !== 'undefined') {
          return SmoothScroll.init();
        }
        return Promise.resolve();
      })
      .then(() => {
        if (typeof SmoothScroll !== 'undefined') {
          this.register('smoothScroll', SmoothScroll);
        }
        
        // Initialize language system
        Language.init();
        this.register('language', Language);
        
        console.log("All components initialized successfully");
      })
      .catch(error => console.error("Component initialization failed:", error));
  }
};

// Initialize components when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  ComponentRegistry.init();
});