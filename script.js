// DOM Elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash API Configuration
const apiKey = "h5cSKgayHxT8OM3mtbxr1V6dpvm8DFhIxMCKO8AKFtM";
const initialPhotoCount = 5;
const highLoadPhotoCount = 30;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialPhotoCount}`;

// State Variables
let isPageReady = false;
let photosArray = [];
let imagesLoaded = 0;
let totalImages = 0;

// Function to check if all images have loaded
const onImageLoad = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        isPageReady = true;
        loader.hidden = true;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${highLoadPhotoCount}`;
    }
};

// Helper function to set multiple attributes on an element
const setAttributes = (element, attributes) => {
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
};

// Function to create image elements and append them to the DOM
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    photosArray.forEach(photo => {
        // Create anchor element linking to Unsplash
        const anchor = document.createElement('a');
        setAttributes(anchor, {
            href: photo.links.html,
            target: '_blank',
            rel: 'noopener noreferrer'  // Improves security for new tab links
        });

        // Create image element for each photo
        const image = document.createElement('img');
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description || 'Unsplash Image', // Fallback for missing alt text
            title: photo.alt_description || 'Unsplash Image'
        });

        // Add event listener to check when image has finished loading
        image.addEventListener('load', onImageLoad);

        // Append image to anchor, then anchor to image container
        anchor.appendChild(image);
        imageContainer.appendChild(anchor);
    });
};

// Function to fetch photos from Unsplash API
const fetchPhotos = async () => {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
};

// Function to check if scrolling near the bottom of the page and load more photos
const onScrollLoadMore = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isPageReady) {
        isPageReady = false;
        fetchPhotos();
    }
};

// Add scroll event listener
window.addEventListener('scroll', onScrollLoadMore);

// Initial load of photos
fetchPhotos();