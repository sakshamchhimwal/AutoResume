// content.js
// This script will be injected into the web page

// Get all elements with data-dev attribute
const devElements = document.querySelectorAll("[data-dev]");

// Convert NodeList to Array and extract text content
const devTextContent = Array.from(devElements).map(
  (element) => element.textContent
);

// Send the extracted content to the background script
chrome.runtime.sendMessage({ devContent: devTextContent });
