# Frequently Asked Questions (FAQ)

### Q1: How does the infinite scroll work?

**A:** The application listens for scroll events on the window. When the user scrolls near the bottom of the page (specifically, within 1000 pixels of the bottom), and if it's ready to load more (`isPageReady` flag is true), it triggers a function (`fetchPhotos`) to request more images from the Unsplash API. Once the new images are fetched and displayed, the flag is reset, allowing the process to repeat.

### Q2: Where do the images come from?

**A:** The images are fetched directly from the [Unsplash API](https://unsplash.com/developers), which provides access to a vast library of high-quality, freely usable photos.

### Q3: Do I need my own Unsplash API key?

**A:** The project includes a demo API key in `script.js`. However, public API keys often have strict rate limits (number of requests allowed per hour). If you plan to use this project extensively or modify it, it's **highly recommended** to register for your own free API key on the Unsplash Developer website and replace the placeholder key in `script.js`.

### Q4: How can I change the number of images loaded each time?

**A:** Open the `script.js` file. You can modify the values of these variables:
*   `initialPhotoCount`: Controls how many photos are loaded initially when the page first opens (default is 5).
*   `highLoadPhotoCount`: Controls how many photos are loaded on subsequent scrolls (default is 30).

```javascript
// script.js
// ...
const initialPhotoCount = 10; // Example: Load 10 initially
const highLoadPhotoCount = 50; // Example: Load 50 on scroll
// ...
```

### Q5: Why is there a loading indicator?

**A:** Fetching images from an external API and loading them into the browser takes time. The loading indicator (`loader.svg`) provides visual feedback to the user that content is being loaded in the background, improving the user experience. It disappears once the newly fetched batch of images has finished loading.

### Q6: What happens if the Unsplash API request fails?

**A:** The `fetchPhotos` function includes basic error handling using a `try...catch` block. If an error occurs during the API request (e.g., network issue, invalid API key, rate limit exceeded), an error message will be logged to the browser's developer console. The application might stop loading new images in this case. More robust user-facing error handling could be added as an improvement.

```javascript
// script.js (inside fetchPhotos)
try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
} catch (error) {
    // Error handling - logs to console
    console.error('Error fetching photos:', error);
    // Potential Improvement: Display a message to the user here
}
```

### Q7: Is the project responsive?

**A:** Yes, the project includes basic CSS media queries in `style.css` to adjust the layout for smaller screens (like smartphones). The image container width is adjusted, and the heading size is reduced on screens narrower than 600px.

### Q8: Why do images sometimes load out of order or show gaps temporarily?

**A:** Images are loaded asynchronously. While the JavaScript requests them in batches, each image file might take a different amount of time to download depending on its size and network conditions. The layout might adjust as images finish loading. The `onImageLoad` function helps track when all images in a *batch* have loaded before allowing the next fetch.