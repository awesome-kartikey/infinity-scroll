# System Architecture

This document outlines the architecture of the Awesome Kartikey Infinity Scroll application.

## 1. Overview

The application is a simple **client-side single-page application (SPA)**. It runs entirely within the user's web browser. Its main purpose is to fetch image data from the external Unsplash API and render it dynamically on the page, implementing an infinite scroll mechanism. There is no server-side component specific to this application.

## 2. Folder Structure

The project has a minimal structure:

```
infinity-scroll/
├── index.html       # The main HTML file defining the page structure and UI elements.
├── script.js        # Contains all the JavaScript logic for API interaction, DOM manipulation, and event handling.
└── style.css        # Contains all the CSS rules for styling the page elements.
```

- **`index.html`**: Defines the basic HTML document structure, including the title, viewport settings, links to the CSS (`style.css`) and JavaScript (`script.js`) files, a heading (`<h1>`), a container for the loading animation (`<div class="loader">`), and the main container where images will be displayed (`<div class="image-container">`).
- **`style.css`**: Provides the visual styling for the application. It includes base styles, styles for the heading, the loading indicator, the image container, and the images themselves. It also includes a media query for basic responsiveness.
- **`script.js`**: The core of the application. It handles fetching data, managing state, interacting with the DOM, and responding to user actions (scrolling).

## 3. Major Components

The application logic in `script.js` can be broken down into several key functional components:

1.  **DOM Element References:** Variables are used to hold references to key HTML elements (`imageContainer`, `loader`) for efficient manipulation.
2.  **API Configuration & State:**
    - `apiKey`: Stores horridcoding API key for Unsplash.
    - `initialPhotoCount`, `highLoadPhotoCount`: Control the number of photos fetched.
    - `apiUrl`: Dynamically constructed URL for the Unsplash API endpoint.
    - `isPageReady`: A boolean flag to prevent multiple concurrent fetches while scrolling.
    - `photosArray`: An array to store the photo data received from the API.
    - `imagesLoaded`, `totalImages`: Counters used to track the loading status of images within a fetched batch.
3.  **API Interaction (`fetchPhotos` function):**
    - Uses the `fetch` API with `async/await` to make asynchronous HTTP GET requests to the `apiUrl`.
    - Handles the JSON response from the Unsplash API.
    - Calls `displayPhotos` upon successful data retrieval.
    - Includes basic `try...catch` error handling.
4.  **DOM Manipulation (`displayPhotos` function):**
    - Iterates over the `photosArray`.
    - For each photo, dynamically creates an `<a>` element (linking to the Unsplash page) and an `<img>` element.
    - Uses the `setAttributes` helper function to efficiently set multiple HTML attributes (`href`, `target`, `rel`, `src`, `alt`, `title`).
    - Appends the created elements to the `imageContainer`.
    - Attaches an `onload` event listener to each image to track when it has finished loading (`onImageLoad` function).
5.  **Image Load Tracking (`onImageLoad` function):**
    - Increment `imagesLoaded` counter each time an image in the current batch finishes loading.
    - Checks if all images in the batch (`imagesLoaded === totalImages`) have loaded.
    - If all loaded, it sets `isPageReady` to `true` (allowing the next fetch on scroll), hides the `loader`, and updates the `apiUrl` to fetch a larger batch next time.
6.  **Scroll Event Handling (`onScrollLoadMore` function & Event Listener):**
    - An event listener attached to the `window` detects `scroll` events.
    - `onScrollLoadMore` checks two conditions:
      - If the user has scrolled close enough to the bottom of the page (`window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000`).
      - If the page is ready to load more images (`isPageReady` is true).
    - If both conditions are met, it temporarily sets `isPageReady` to `false` (to prevent immediate re-triggering) and calls `fetchPhotos` to load the next batch.

## 4. Data Flow

1.  **Initial Load:**
    - User opens `index.html`.
    - `script.js` executes.
    - `fetchPhotos()` is called initially.
    - A request is sent to the Unsplash API using `apiUrl` (with `initialPhotoCount`).
    - The API returns a JSON array of photo objects.
    - `photosArray` is populated with the response data.
    - `displayPhotos()` is called:
      - DOM elements (`<a>`, `<img>`) are created for each photo.
      - `onload` listeners are attached to images.
      - Elements are appended to `imageContainer`.
      - `totalImages` is set.
    - As each image finishes loading, `onImageLoad()` is triggered.
    - When all initial images are loaded (`imagesLoaded === totalImages`), `onImageLoad()` sets `isPageReady = true`, hides the `loader`, and updates `apiUrl` to use `highLoadPhotoCount`.
2.  **Scrolling and Loading More:**
    - User scrolls down the page.
    - The `scroll` event listener calls `onScrollLoadMore()`.
    - `onScrollLoadMore()` checks if the scroll position is near the bottom AND `isPageReady` is `true`.
    - If conditions are met:
      - `isPageReady` is set to `false`.
      - The `loader` might implicitly become visible again if CSS is set up that way, or it remains hidden until the next fetch completes (current implementation hides it only when loading _finishes_). _Correction: The loader is shown only at the start and hidden permanently after the first batch loads._ The script should ideally show the loader again before fetching. _Self-correction: The provided code only hides the loader once initially and doesn't explicitly show it again. This is a potential improvement area._
      - `fetchPhotos()` is called using the updated `apiUrl` (with `highLoadPhotoCount`).
      - The flow repeats from step 4 of the Initial Load (API request -> Populate `photosArray` -> `displayPhotos` -> Image loading -> `onImageLoad` -> Set `isPageReady = true`).

## 5. Design Decisions

- **Vanilla JavaScript:** The project is built using only native browser APIs (HTML, CSS, JS) without external frameworks or libraries (except for Font Awesome CSS) to keep it lightweight and demonstrate core concepts.
- **`fetch` API with `async/await`:** Modern approach for handling asynchronous network requests, providing cleaner syntax compared to older methods like `XMLHttpRequest`.
- **Client-Side Rendering:** All HTML is generated dynamically in the browser based on API data.
- **Progressive Loading:** Loads an initial small batch (`initialPhotoCount`) for a faster perceived first load, then larger batches (`highLoadPhotoCount`) for efficiency during scrolling.
- **Image Load Tracking:** Explicitly waiting for images in a batch to load (`onImageLoad`) before enabling the next fetch prevents triggering loads too rapidly if images take a long time to render.
- **Basic Error Handling:** Uses `try...catch` for network errors, logging them to the console.
- **Helper Function (`setAttributes`):** A small utility to improve code readability when setting multiple attributes on DOM elements.
- **Security Attribute (`rel="noopener noreferrer"`):** Added to links opening in new tabs (`target="_blank"`) as a security best practice to prevent potential tab-napping.
- **Scroll Trigger Threshold:** Using `document.body.offsetHeight - 1000` provides a buffer, triggering the load before the user _exactly_ hits the bottom.
