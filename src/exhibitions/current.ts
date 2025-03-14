export const getCurrentExhibition = async () => {
    // Simulated API call to fetch current exhibition data
    const response = await fetch('/api/exhibitions/current');
    if (!response.ok) {
        throw new Error('Failed to fetch current exhibition data');
    }
    const currentExhibition = await response.json();
    return currentExhibition;
};

export const displayCurrentExhibition = (exhibition) => {
    const exhibitionContainer = document.getElementById('current-exhibition');
    exhibitionContainer.innerHTML = `
        <h2>${exhibition.title}</h2>
        <p>${exhibition.description}</p>
        <p><strong>Opening Date:</strong> ${exhibition.openingDate}</p>
        <p><strong>Closing Date:</strong> ${exhibition.closingDate}</p>
    `;
};