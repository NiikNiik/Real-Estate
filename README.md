# Real Estate Web Application

This project is a real estate web application enabling users to browse and search Maryland residential properties. The application includes secure login, property search with filters, an interactive map, and options to save favorite listings. Built with user experience and data security in mind, this application integrates several APIs and uses a modern, scalable tech stack.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Code Standards](#code-standards)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Project Dependencies](#project-dependencies)
- [Unit Tests](#unit-tests)
- [Future Features](#future-features)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Real Estate Web Application offers a user-friendly interface for browsing and searching Maryland residential properties. It allows users to securely log in, search properties based on customizable criteria, and interact with an intuitive map for better spatial understanding of property locations.

## Features

- **Secure User Authentication**: Users can log in securely and manage their profiles.
- **Property Search and Filter**: Filter properties by location, price range, size, and more.
- **Interactive Map**: Visualize property locations using Google Maps API.
- **Save Favorites**: Users can save listings for future reference.
- **Detailed Property Listings**: View comprehensive details like price, size, and bed/bath count.

## Technologies Used

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **External APIs**: ATTOM Data API (for property data), Google Maps API (for map visualization)
- **CSS**: [index.css](./index.css) for global styling
- **Testing**: Jest, React Testing Library

## Code Standards

### Code Formatting

- The project follows consistent code formatting for readability and maintainability.
- **JavaScript**: Code is formatted according to [Prettier](https://prettier.io/) conventions, with two-space indentation.
- **CSS**: Organized with standardized indentation and spacing in [index.css](./index.css), ensuring consistency across components.

### Comments

- **Clear and Concise Comments**: Each file and function includes comments explaining its purpose and usage.
- **Documentation Comments**: JavaScript functions are annotated using JSDoc-style comments to specify parameter types, expected outputs, and usage examples.

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
- **Property Listings**: Shows properties based on user-selected filters.
- **Interactive Map**: Displays property locations on a map.
- **Save Properties**: Logged-in users can save properties for future reference.

## File Structure

- **App.js**: Main component managing routing and layout.
- **index.js**: Entry point for the React application, rendering the App component.
- **index.css**: Provides global styling, including font settings and layout adjustments.

## Project Dependencies

The project uses the following major dependencies:

- **Node.js**: `^16.0.0` or later
- **React**: `^18.0.0`
- **Express**: `^4.18.2`
- **PostgreSQL**: For storing user profiles, property listings, and saved favorites
- **Jest**: `^29.0.0` for unit testing
- **React Testing Library**: `^13.4.0` for component testing

To view all dependencies and specific versions, see the `package.json` file.

## Unit Tests

The project uses **Jest** and **React Testing Library** to ensure each component and function performs as expected.

- **Tested Components**: `App.js`, `ListingCard.js`, `ListView.js`, `TopNavBar.js`
- **Test Types**:
  - **Unit Tests**: Focus on individual functions and components.
  - **Integration Tests**: Validate that different parts of the app work together seamlessly.
  - **System Tests**: End-to-end workflows that verify the complete user experience.

## Future Features
- **Mortgage Calculator**: Calculate estimated mortgage payments.
- **Price History**: Display historical price trends for properties.
- **School and Crime Data**: Include data for schools and crime statistics in the vicinity.
- **Accessibility Enhancements**: Compliance with WCAG 2.1 for inclusive design.

## License

This project is licensed under the MIT License.