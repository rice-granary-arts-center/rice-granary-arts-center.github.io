# Art Space Website

This project is a web application for a newly opening art space, designed to showcase exhibitions, facilitate bookings, and provide articles related to art and artists.

## Project Structure

```
art-space-website
├── src
│   ├── exhibitions
│   │   ├── current.ts          # Retrieves and displays information about the current exhibition
│   │   ├── past.ts             # Retrieves and displays information about past exhibitions
│   │   └── future.ts           # Retrieves and displays information about future exhibitions
│   ├── booking
│   │   └── index.ts            # Handles booking functionality, integrating with WeChat public accounts or mini-programs
│   ├── articles
│   │   ├── interviews.ts        # Retrieves and displays artist interviews
│   │   └── exhibition-introductions.ts # Retrieves and displays introductions to exhibitions
├── public
│   ├── index.html              # Main HTML file for the website
│   └── styles.css              # CSS styles for the website
├── package.json                 # npm configuration file
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Project documentation
```

## Features

- **Exhibition Information**: 
  - Current Exhibitions
  - Past Exhibitions
  - Future Exhibitions

- **Booking Functionality**: 
  - Integration with WeChat public accounts and mini-programs for reservations.

- **Article Content**: 
  - Artist Interviews
  - Exhibition Introductions

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/art-space-website.git
   ```

2. Navigate to the project directory:
   ```
   cd art-space-website
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   npm start
   ```

## Deployment

This project can be hosted on a cloud server. Ensure that the necessary configurations are made for the server environment to serve the static files from the `public` directory.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.