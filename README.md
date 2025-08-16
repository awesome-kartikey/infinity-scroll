# Awesome Kartikey Infinity Scroll

A simple web application that displays a continuously scrolling feed of high-quality images fetched from the Unsplash API.

## Description

This project demonstrates the implementation of an "infinite scroll" feature using vanilla JavaScript. As the user scrolls down the page, new images are fetched from the Unsplash API and dynamically added to the bottom, creating a seamless browsing experience.

## Features

- **Infinite Scrolling:** Loads new images automatically as you scroll down.
- **Dynamic Content Loading:** Fetches and displays images from the Unsplash API on the fly.
- **Loading State:** Shows a loading indicator while images are being fetched and loaded.
- **Responsive Design:** Basic responsiveness for smaller screen sizes.
- **Direct Links:** Each image links directly to its page on Unsplash.

## Tech Stack

- **HTML5:** Structure of the web page.
- **CSS3:** Styling, layout, and responsiveness.
- **JavaScript (ES6+):** Core logic, DOM manipulation, API interaction (using `fetch`), event handling.
- **Unsplash API:** Source of the images.

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/awesome-kartikey/infinity-scroll.git
    cd infinity-scroll
    ```
2.  **(Optional) Get your own Unsplash API Key:**
    - The project uses a default API key in `script.js`. However, API keys have rate limits.
    - It's recommended to get your own free API key from [Unsplash Developers](https://unsplash.com/developers).
    - Replace the `apiKey` variable value in `script.js` with your key:
      ```javascript
      // script.js
      const apiKey = "YOUR_UNSPLASH_API_KEY";
      // ... rest of the code
      ```
3.  **Open the application:**
    - Simply open the `index.html` file in your web browser. No build steps or local server is strictly required for basic functionality (though using a simple live server extension in your editor can be helpful for development).

## Usage

1.  Open `index.html` in your browser.
2.  The application will initially load a small set of images.
3.  Scroll down the page.
4.  As you approach the bottom, a loading indicator will appear briefly, and more images will be loaded and displayed.
5.  Continue scrolling to load more images indefinitely.
6.  Click on any image to open it on the Unsplash website in a new tab.
