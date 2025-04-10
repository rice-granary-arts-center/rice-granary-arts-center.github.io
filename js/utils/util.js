/**
 * Helper function to generate new pages with consistent structure
 */
export default {
    createPage(config) {
        const template = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${config.description}">
    <title>${config.title}</title>
    <link rel="stylesheet" href="css/main.css">
    <script type="module" src="js/main.js"></script>
</head>
<body>
    <div class="layout-container">
        <!-- Banner - automatically loaded by Banner.js -->
        <div class="banner"></div>
        
        <!-- Content -->
        <div class="content ${config.pageClass}">
            ${config.content || '<!-- Page content goes here -->'}
        </div>
        
        <!-- Navigation - automatically loaded by Menu.js -->
        <div class="navigation-container">
            <div class="menu-container" id="menu-container"></div>
        </div>
        
        <!-- Logo -->
        <a href="index.html"><img id="site-logo" class="site-logo" src="media/icons/Chinese.svg" alt="米仓艺术中心"></a>
    </div>
</body>
</html>
        `;
        
        return template;
    },
    
    // Example usage:
    // import PageTemplate from './utils/pageTemplate.js';
    // const newPageHTML = PageTemplate.createPage({
    //     title: "新页面标题 | New Page Title",
    //     description: "页面描述 | Page description",
    //     pageClass: "new-page",
    //     content: "<div class='new-content'>My content</div>"
    // });
    // console.log(newPageHTML);
};