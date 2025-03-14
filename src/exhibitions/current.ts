interface Exhibition {
    title: string;
    description: string;
    image: string;
}

function renderCurrentExhibition(exhibition: Exhibition) {
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
const currentExhibition: Exhibition = {
    title: 'Current Exhibition Title',
    description: 'Description of the current exhibition.',
    image: 'path/to/image.jpg'
};

renderCurrentExhibition(currentExhibition);