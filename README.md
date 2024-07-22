# Factastic - Fact-Sharing App

Factastic is a dynamic fact-sharing application where users can share, upvote, confirm sources, downvote, and like facts. The app is built with React.js, HTML5, CSS3, and Supabase.

Check out the [Live Link](factastic.netlify.app) of the application deployed on Netlify.

## Features

- Share interesting facts
- Upvote and downvote facts
- Confirm the sources of facts
- Like your favorite facts
- Categorize facts for easy browsing

## Tech Stack

- **React.js**: A JavaScript library for building user interfaces
- **HTML5**: The standard markup language for creating web pages
- **CSS3**: The latest evolution of the Cascading Style Sheets language
- **Supabase**: An open-source Firebase alternative that provides backend services such as authentication, storage, and databases

## Installation and Setup

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/factastic.git
    cd factastic
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up Supabase:**

    - Create a project on [Supabase](https://supabase.io/)
    - Get your Supabase URL and API Key from the project settings
    - Create a `.env` file in the root of the project and add the following environment variables:

    ```env
    REACT_APP_SUPABASE_URL=your-supabase-url
    REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
    ```

4. **Run the development server:**

    ```bash
    npm start
    ```

    The app will open in your default browser at `http://localhost:3000`.

### Building for Production

To create a production build of your app, run:

```bash
npm run build
