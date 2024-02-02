// background.js
// This script runs in the background

// Handle messages from content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.devContent) {
    // Log or process the extracted content
    console.log("Dev Elements Content:", request.devContent);
  }
});
