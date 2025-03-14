export function getArtistInterviews() {
    const interviews = [
        {
            artist: "Artist Name 1",
            date: "2023-01-01",
            content: "Interview content for Artist Name 1."
        },
        {
            artist: "Artist Name 2",
            date: "2023-02-01",
            content: "Interview content for Artist Name 2."
        },
        {
            artist: "Artist Name 3",
            date: "2023-03-01",
            content: "Interview content for Artist Name 3."
        }
    ];

    return interviews;
}

export function displayInterviews() {
    const interviews = getArtistInterviews();
    interviews.forEach(interview => {
        console.log(`Interview with ${interview.artist} on ${interview.date}: ${interview.content}`);
    });
}