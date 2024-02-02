// popup.js
document.getElementById("runParser").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: "runFunction" });
    });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "updatePopup") {
        const data = message.data;
        updatePopup(data);
    }
});

// Function to update the popup content
function updatePopup(data) {
    const popupContent = document.getElementById('popup-content');

    if (popupContent) {
        // Clear previous content
        popupContent.innerHTML = '';

        // Iterate through projects and points and add to the popup
        data.projects.forEach(project => {
            const projectTitle = document.createElement('h3');
            projectTitle.textContent = project.title;
            popupContent.appendChild(projectTitle);

            const pointsList = document.createElement('ul');
            project.points.forEach(point => {
                const pointItem = document.createElement('li');
                pointItem.textContent = point;
                pointsList.appendChild(pointItem);
            });
            popupContent.appendChild(pointsList);
        });
    }
}
