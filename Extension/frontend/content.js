// content.js
// This script will be injected into the web page

// linkedin parser
function parser() {
    const jobsDescriptionContainer = document.querySelector('div.jobs-description-content__text');


    if (jobsDescriptionContainer) {
        const contentInsideArticle = jobsDescriptionContainer.innerHTML;
        const parser = new DOMParser();

        const doc = parser.parseFromString(contentInsideArticle, 'text/html');

        try {
            const doc = parser.parseFromString(contentInsideArticle, 'text/html');
            const elements = doc.querySelectorAll('span, p, li, h2, strong, ul'); // Add more element types as needed

            elements.forEach(element => {
                const textContent = element.textContent.trim();
                console.log(textContent);
            });
        } catch (error) {
            console.error('Error parsing HTML:', error);
        }
    } else {
        console.log('Article with class "jobs-description__container" not found.');
    }
}

parser();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'runFunction') {
        parser();
    }
});
