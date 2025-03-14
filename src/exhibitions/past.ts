export const getPastExhibitions = () => {
    // Sample data for past exhibitions
    const pastExhibitions = [
        {
            title: "Exhibition Title 1",
            date: "2023-01-15",
            description: "Description of the first past exhibition.",
            images: ["image1.jpg", "image2.jpg"]
        },
        {
            title: "Exhibition Title 2",
            date: "2022-11-10",
            description: "Description of the second past exhibition.",
            images: ["image3.jpg", "image4.jpg"]
        }
    ];

    return pastExhibitions;
};

export const displayPastExhibitions = () => {
    const exhibitions = getPastExhibitions();
    exhibitions.forEach(exhibition => {
        console.log(`Title: ${exhibition.title}`);
        console.log(`Date: ${exhibition.date}`);
        console.log(`Description: ${exhibition.description}`);
        console.log(`Images: ${exhibition.images.join(", ")}`);
        console.log('-------------------');
    });
};