export const getFutureExhibitions = async () => {
    // Simulated API call to fetch future exhibitions
    const futureExhibitions = [
        {
            id: 1,
            title: "Future Exhibition 1",
            date: "2023-12-01",
            description: "An exciting exhibition showcasing contemporary art."
        },
        {
            id: 2,
            title: "Future Exhibition 2",
            date: "2024-01-15",
            description: "A collection of works from emerging artists."
        }
    ];

    return futureExhibitions;
};

export const displayFutureExhibitions = async () => {
    const exhibitions = await getFutureExhibitions();
    exhibitions.forEach(exhibition => {
        console.log(`Title: ${exhibition.title}`);
        console.log(`Date: ${exhibition.date}`);
        console.log(`Description: ${exhibition.description}`);
        console.log('---------------------------');
    });
};