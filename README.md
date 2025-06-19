# Gemini Clone App

This project is a clone of the Gemini app, built using React.js. It demonstrates the use of various React features including components, context, hooks, and state management. The app is structured to replicate the functionality of the original Gemini app, featuring an interactive UI with a sidebar and different icons. It also integrates Google API and Google AI Studio for enhanced functionality.

## 🔗 Live Website

🌐 [Visit the Live Site](https://gemini-clone-application-version-2.netlify.app/)  


## Features

- **Sidebar Navigation**: Allows for easy navigation through various sections.
- **Interactive UI**: Buttons and icons that respond to user actions.
- **Icons and Assets**: Favicon
- **Google API Integration**: Uses Google Gemini API for AI-driven responses.
- **Google AI Studio**: Provides powerful language model integration for enhanced functionality.

## Technologies Used

- **React.js**: The front-end framework used for building the UI.
- **React Context API**: For managing the global state.
- **CSS**: For styling the app, with individual CSS files for different components.
- **Google API**: Integration of Google Gemini API to handle AI model-based interactions.
- **Google AI Studio**: For enhanced content generation using Google’s AI models.


## Setup

To run this project locally, follow the steps below:

### 1. Clone the repository
### 2. Install Dependencies

Navigate to the project directory and install the required dependencies using npm or yarn: 
or if you're using yarn:


### 3. Set Up Google API

- Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
- Enable the **Gemini API** and **Google AI Studio** in your Google Cloud project.
- Obtain your **API Key** for authenticating the API requests.

### 4. Start the Development Server

Run the following command to start the development server:

npm run dev

This will open the app in your browser at [http://localhost:5173/](http://localhost:5173/).

## Customization

- **Components**: You can customize the sidebar, main content, and other sections by editing the respective JSX and CSS files.
- **Assets**: Update the images in the `assets` folder to personalize the app.
- **Context**: Modify the global state in `context/Context.jsx` for any app-wide data.
- **Google API**: You can further integrate and extend Google’s AI-powered features by modifying the API calls in `config/gemini.js`.


## Acknowledgements

- Inspiration: [Gemini App](https://www.gemini.com)
- Libraries: React.js, React Context API
- Google API & Google AI Studio: For the powerful AI-driven features integrated into the app









