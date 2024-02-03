// content.js

function parser() {
    let textContent = ""; // Initialize an empty string

    const jobsDescriptionContainer = document.querySelector(
        "div.jobs-description-content__text"
    );

    if (jobsDescriptionContainer) {
        const contentInsideArticle = jobsDescriptionContainer.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(contentInsideArticle, "text/html");

        try {
            const elements = doc.querySelectorAll("span, p, li, h2, strong, ul"); // Add more element types as needed

            elements.forEach((element, index) => {
                textContent += element.textContent.trim() + " ";
            });

            // console.log(textContent);

            sendToBackend(textContent);
        } catch (error) {
            console.error("Error parsing HTML:", error);
        }
    } else {
        console.log('Article with class "jobs-description__container" not found.');
    }
}

function sendToBackend(textContent) {
    /* using local files */
    const useLocalFile = true;
    if (useLocalFile) {
        // Fetch data from local sample.json file
        const responseData = {
            projects: [
                {
                    title: 'Project 1',
                    points: [
                        'Point 1 for Project 1',
                        'Point 2 for Project 1',
                        'Point 3 for Project 1',
                    ],
                    technologies: ['React', 'Node.js', 'MongoDB'],
                },
                {
                    title: 'Project 2',
                    points: [
                        'Point 1 for Project 2',
                        'Point 2 for Project 2',
                        'Point 3 for Project 2',
                    ],
                    technologies: ['Angular', 'Express', 'MySQL'],
                },
                {
                    title: 'Project 3',
                    points: [
                        'Point 1 for Project 3',
                        'Point 2 for Project 3',
                        'Point 3 for Project 3',
                    ],
                    technologies: ['Vue.js', 'Django', 'PostgreSQL'],
                },
            ]
        };


        updatePopup(responseData);
        return;
    }

    /*--------------*/

    fetch("http://localhost:3000/analyzer/parse", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: textContent }),
    })
        .then((response) => response.json())
        .then((responseData) => {
            updatePopup(responseData);
        })
        .catch((error) => {
            console.error("Error sending data to backend:", error);
        });
}

function updatePopup(responseData) {
    // Send a message to the popup with the data
    chrome.runtime.sendMessage({ action: "updatePopup", data: responseData });
}

// Function to check if the URL matches the LinkedIn jobs pattern
function isLinkedInJobsPage() {
    return /^https:\/\/www.linkedin.com\/jobs\//.test(window.location.href);
}

// Run the parser when the page is fully loaded
// document.addEventListener("DOMContentLoaded", function () {
//     if (isLinkedInJobsPage()) {
//         parser();
//     }
// });

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "runFunction" && isLinkedInJobsPage()) {
        parser();
    }
});
