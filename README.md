# Real Estate Web Application

This project is a real estate web application that allows users to browse and search residential properties in Maryland. Users can filter results, view property details, save favorites, and interact with an interactive map. The application integrates with external APIs and is built with a focus on user experience and data security.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Future Features](#future-features)

## Project Overview

The Real Estate Web Application provides a user-friendly interface for browsing and searching Maryland residential properties. Users can log in securely, search properties by specific criteria, and view properties on an interactive map. This application is designed to be responsive, secure, and easy to use.

## Features

- **Secure User Authentication**: Users can log in securely and create profiles.
- **Property Search and Filter**: Filter properties by price, size, location, and more.
- **Interactive Map**: Display property locations using Google Maps API.
- **Save Favorites**: Users can save preferred properties for later viewing.
- **Detailed Property Listings**: Property details such as price, size, bed/bath count, and more.

## Technologies Used

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **External APIs**: ATTOM Data API (for property data), Google Maps API (for map visualization)
- **CSS**: [index.css](./index.css) provides global styling for the application
- **Testing**: Jest, React Testing Library

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/real-estate-app.git
    cd real-estate-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Environment Setup**:
   - Create a `.env` file in the root directory and add your API keys for ATTOM and Google Maps.
   - Example `.env` file:
     ```plaintext
     ATTOM_API_KEY=your_attom_api_key
     GOOGLE_MAPS_API_KEY=your_google_maps_api_key
     ```

4. **Start the application**:
    ```bash
    npm start
    ```

## Usage

- **Homepage**: The main screen allows users to search for properties.
- **Property Listings**: Lists properties based on user-selected filters.
- **Interactive Map**: Allows users to see property locations on a map.
- **Save Properties**: Logged-in users can save properties for future reference.

## File Structure

- **App.js**: Main component of the application, managing routing and layout.
- **index.js**: Entry point for the React application, rendering the App component.
- **index.css**: Provides global styling, including font settings and layout adjustments.

## Future Features

- **Mortgage Calculator**: Calculate estimated mortgage payments.
- **Price History**: View historical price trends for properties.
- **School and Crime Data**: Display nearby schools and local crime statistics.
- **Improved Accessibility**: Ensure compliance with WCAG 2.1 standards.

## Contributing

Feel free to open issues or submit pull requests to enhance the app.

## License

This project is licensed under the MIT License.
