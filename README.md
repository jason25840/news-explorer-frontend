##NewsExplorer Frontend

NewsExplorer is a responsive web application where users can search for and bookmark articles by keyword. Users can sign up to save and manage their own collections of articles, with permissions to delete only their saved items. The frontend of this application is built with React, utilizing Context API and hooks for state management. It works alongside an Express.js backend and is deployed on Google Cloud.

##Project Features

	•	Search for Articles: Leverages the NewsAPI to allow users to search articles by keywords.
	•	User Authentication: Users can register and log in to the platform to save articles.
	•	Bookmarking System: Logged-in users can bookmark articles for future reference.
	•	User-Specific Saved Articles: Each user can view only their saved articles and delete them as desired.
	•	Protected Routes: Users need to log in to access saved articles and bookmark features.
	•	Fully Deployed: The application is hosted on Google Cloud, with secure HTTPS access.

##Tech Stack

	•	Frontend: React (with Context API and Hooks)
	•	Backend: NewsExplorer Backend (Express.js, Node.js, MongoDB)
	•	API: NewsAPI for fetching live news articles.
	•	Deployment: Google Cloud Platform with HTTPS provided by Certbot

##Project Structure

	•	React Context: Manages global states such as CurrentUser and SavedArticles.
	•	React Hooks: Used extensively for handling component states and lifecycle methods.
	•	React Router: Version 6 for client-side routing and protected routes.

##Deployment and Domain

##The project is deployed on Google Cloud with the following domain configuration:

	•	Frontend: https://newsexplorer.hackquest.com or https://www.newsexplorer.hackquest.com
	•	Backend: https://api.newsexplorer.hackquest.com

##SSL encryption is handled via Certbot, ensuring secure communication over HTTPS.

##Requirements

	•	Node.js (>= 14.x)
	•	npm (>= 6.x)
	•	NewsAPI Key: Sign up for NewsAPI to obtain a free API key.

##Installation

1.	Clone the Repository:

    git clone https://github.com/yourusername/news-explorer-frontend.git
    cd news-explorer-frontend

2.	Install Dependencies:

    npm install

3.	Create a .env file in the root directory and add your NewsAPI key:

    REACT_APP_NEWS_API_KEY=your_news_api_key
    REACT_APP_API_URL=https://api.newsexplorer.hackquest.com

4.	Run the Application Locally:
    
    npm start

5.	Build for Production:

    npm run build

##Scripts

##The project includes the following npm scripts:

	•	npm start: Starts the development server.
	•	npm run build: Builds the app for production.
	•	npm test: Launches the test runner.
	•	npm run eject: Ejects the app from react-scripts.

##Dependencies

	•	React: A JavaScript library for building user interfaces.
	•	React Router: Handles routing for seamless page navigation.
	•	NewsAPI: Fetches articles based on user-entered keywords.
	•	Jest & Testing Library: For component testing.

##Project Configuration (package.json)

{
  "name": "news-explorer-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "newsapi": "^2.4.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.26.2",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

##API Endpoints

	•	GET /articles - Fetches articles based on keywords from NewsAPI.
	•	POST /signup - Registers a new user.
	•	POST /signin - Logs in a user and returns a JWT token.
	•	POST /articles - Saves an article to the user’s account (requires authentication).
	•	DELETE /articles/:id - Deletes a user’s saved article (requires authentication).

##Additional Information

This project is a frontend React app connected to an Express.js backend. Both parts are required for full functionality, especially for user registration, login, and article management.

##Troubleshooting

	•	Ensure the .env file is set up correctly with valid API keys.
	•	Make sure the backend server is running and accessible at the configured API URL.

##Future Improvements

	•	Add more user customization options for saved articles.
	•	Implement additional API calls for trending news and other categories.

##License

This project is licensed under the MIT License.

This README should be ready to paste directly into your project! Let me know if you’d like to add any extra details.