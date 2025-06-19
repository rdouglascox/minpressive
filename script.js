// Get all elements on the page
const elements = Array.from(document.body.querySelectorAll('*'));

// Filter out empty elements and elements that are not visible
const visibleElements = elements.filter((element) => {
    return element.offsetWidth > 0 && element.offsetHeight > 0 && element.style.display!== 'none' 
        && (element.tagName.toLowerCase() === 'h1' || element.tagName.toLowerCase() === 'h2' 
            || element.tagName.toLowerCase() === 'h3' || element.tagName.toLowerCase() === 'p' 
            || element.tagName.toLowerCase() === 'blockquote' || element.tagName.toLowerCase() === 'li'
            || element.tagName.toLowerCase() === 'table' || element.tagName.toLowerCase() === 'iframe' || 
            element.tagName.toLowerCase() === 'hr');
});

// Add the highlightable class to all visible elements
visibleElements.forEach((element) => {
    element.classList.add('highlightable');
});

// Get all highlightable elements
const highlightableElements = Array.from(document.body.querySelectorAll('.highlightable'));

// Initialize the current index
let currentIndex = 0;

// Initialize the scrolling mode
let centerMode = true;

// Function to highlight an element
function highlightElement(index) {
    // Remove the highlight class from all elements
    highlightableElements.forEach((element) => element.classList.remove('highlight'));

    // Add the highlight class to the selected element
    highlightableElements[index].classList.add('highlight');

    // Scroll to the selected element
    if (centerMode) {
        // Calculate the offset of the element from the top of the viewport
        const elementTop = highlightableElements[index].offsetTop;
        const elementHeight = highlightableElements[index].offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate the scroll position to center the element
        const scrollPosition = elementTop - (viewportHeight / 2) + (elementHeight / 2);

        // Scroll to the calculated position
        window.scrollTo({ top: scrollPosition, behavior:'smooth' });
    } else {
        // Check if the element is h1, h2, or h3
        if (['h1', 'h2', 'h3'].includes(highlightableElements[index].tagName.toLowerCase())) {
            // Scroll the element into view
        //     highlightableElements[index].scrollIntoView({ behavior:'smooth' });
               const elementTop = highlightableElements[index].offsetTop;

        // Calculate the scroll position to place the element 2em from the top of the viewport
               const scrollPosition = elementTop - 2 * parseFloat(getComputedStyle(document.documentElement).fontSize);

        // Scroll to the calculated position
               window.scrollTo({ top: scrollPosition, behavior:'smooth' });
        }
    }
}

// Highlight the first element initially
highlightElement(currentIndex);

// Add event listener for keyboard navigation
document.addEventListener('keydown', (event) => {
    // Navigate to the previous element
    if (event.key === 'ArrowLeft' || event.key === 'k') {
        currentIndex = (currentIndex - 1 + highlightableElements.length) % highlightableElements.length;
        highlightElement(currentIndex);
    }
    // Navigate to the next element
    else if (event.key === 'ArrowRight' || event.key === 'j') {
        currentIndex = (currentIndex + 1) % highlightableElements.length;
        highlightElement(currentIndex);
    }
    // Select the first element
    else if (event.key === 'g') {
        currentIndex = 0;
        highlightElement(currentIndex);
    }
    // Select the last element
    else if (event.key === 'f') {
        currentIndex = highlightableElements.length - 1;
        highlightElement(currentIndex);
    }
    // Toggle the scrolling mode
    else if (event.key === 'h') {
        centerMode =!centerMode;
        highlightElement(currentIndex);
    }
      // Toggle fullscreen mode
    else if (event.key ==='s') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }
});
