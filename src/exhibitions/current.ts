// Assuming you have a function to render the current exhibition
function renderCurrentExhibition(exhibition: any) {
    const exhibitionContainer = document.getElementById('exhibition-container');
    if (!exhibitionContainer) {
        console.error('Exhibition container not found');
        return;
    }

    exhibitionContainer.innerHTML = `
        <h1>${exhibition.title}</h1>
        <p>${exhibition.description}</p>
        <img src="${exhibition.image}" alt="${exhibition.title}">
    `;
}

// Example usage
const currentExhibition = {
    title: 'Current Exhibition Title',
    description: 'Description of the current exhibition.',
    image: 'path/to/image.jpg'
};

renderCurrentExhibition(currentExhibition);