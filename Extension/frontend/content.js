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
        // const textContent = element.textContent.trim();
        // console.log(`Element ${index + 1} Text Content:`, textContent);
        textContent = textContent.trim();
        console.log("Final Text Content:", textContent);
      });
      console.log(textContent);
    } catch (error) {
      console.error("Error parsing HTML:", error);
    }
  } else {
    console.log('Article with class "jobs-description__container" not found.');
  }
}

// Function to check if the URL matches the LinkedIn jobs pattern
function isLinkedInJobsPage() {
  return /^https:\/\/www.linkedin.com\/jobs\//.test(window.location.href);
}

// Run the parser when the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  if (isLinkedInJobsPage()) {
    parser();
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "runFunction" && isLinkedInJobsPage()) {
    parser();
  }
});
