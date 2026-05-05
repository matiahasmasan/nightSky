# 🌌 NightSky - Personal Sky Map Generator

A beautiful web application that generates personalized sky maps for special moments. Capture the stars from any location and date, and create a stunning keepsake with custom messages and images.

## Features

- **Sky Map Generation**: Generate accurate star charts for any date, time, and location using the Astronomy API
- **Personalization**: Add names, custom messages, and upload images
- **Date Tracking**: Automatically calculates and displays the time passed since a special date
- **Location Support**: Search for any city worldwide to get accurate coordinates
- **PDF Export**: Download your sky map as a high-quality PDF
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Image Upload**: Drag-and-drop or click to upload images to personalize your map
- **Beautiful UI**: Modern gradient design with Tailwind CSS styling

## Tech Stack

### Frontend

- HTML5 / CSS3 / JavaScript (ES6+)
- Tailwind CSS for styling
- html2pdf.js for PDF generation
- Responsive mobile-first design

### Backend

- Node.js
- Express.js
- node-fetch for API requests

### APIs

- Astronomy API v2 (Star chart generation)
- Geocoding API (Location lookup)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. **Clone or download the project**

   ```bash
   cd nightsky
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   node server.js
   ```

4. **Access the application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
nightsky/
├── server.js                 # Express server with API proxy
├── package.json             # Project dependencies
├── public/
│   ├── index.html           # Home page
│   ├── skymap.html          # Sky map generator page
│   ├── nightsky.js          # Main application logic
│   ├── createStars.js       # Animated background stars
│   ├── mobileMenu.js        # Mobile navigation handler
│   ├── styles.css           # Custom styles
│   ├── files/               # Configuration and credentials
│   │   ├── const.txt        # Constants
│   │   └── cred.txt         # Credentials
│   └── images/              # Placeholder for user uploads
└── README.md                # This file
```

## Usage

### Creating a Sky Map

1. Navigate to the "Sky Map" page
2. **Enter Names**: Your name and your special person's name
3. **Select Location**: Enter the city where you want to map the sky
4. **Choose Date**: Select the date you want to capture
5. **Upload Image** (Optional): Drag and drop or click to upload a photo
6. **Add Message** (Optional): Write a personal message
7. **Generate**: The app will fetch the star chart and display your personalized map
8. **Download**: Click the download button to save as PDF

### Pages

- **Home (`/`)**: Landing page with navigation
- **Sky Map (`/skymap.html`)**: Interactive sky map generator

## API Configuration

The application uses the Astronomy API for star chart generation. The authentication is configured in `server.js`:

```javascript
const API_ENDPOINT = "https://api.astronomyapi.com/api/v2/studio/star-chart";
```

The proxy endpoint is available at:

```
POST /proxy/star-chart
```

## Environment Notes

- API credentials are embedded in `server.js` (consider moving to environment variables for production)
- The app runs on port 3000 by default
- Static files are served from the `public/` directory

## Dependencies

- **express** (^4.18.2): Web framework
- **node-fetch** (^3.0.0): HTTP client for Node.js

## Features Details

### Sky Chart Generation

- Fetches real astronomical data for any date, time, and location
- Displays accurate constellation positions and star magnitudes
- Shows coordinate grid for reference

### Personalization

- Multiple text fields for custom names and messages
- Drag-and-drop image upload with preview
- Timestamp calculation for special dates

### Export

- HTML2PDF conversion for high-quality printable output
- Preserves all styling and layout in PDF format

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Notes

- The project uses ES6 modules (note `"type": "module"` in package.json)
- Tailwind CSS is loaded from CDN for quick prototyping
- Mobile responsiveness is handled with Tailwind breakpoints

## Future Enhancements

- Dark/light theme toggle
- Multiple sky map templates
- Share maps via URL
- Historical star chart archive
- Time zone support
- Additional API data visualization

## License

This project is open source. Feel free to use and modify as needed.

## Contact

For questions or suggestions, visit: https://github.com/matiahasmasan

---

Made with ❤️ under the stars ✨
