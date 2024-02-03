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


function updatePopup(data) {
    const popupContent = document.getElementById('popup-content');
    const responseDataTextarea = document.getElementById('responseDataTextarea');

    if (popupContent && responseDataTextarea) {
        // Clear previous content
        popupContent.innerHTML = '';

        // Display the responseData in the textarea
        responseDataTextarea.value = JSON.stringify(data, null, 2);

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

document.getElementById('editSubmit').addEventListener('click', function () {
    const editedData = document.getElementById('responseDataTextarea').value;

    // Send the edited data to another route of the backend
    fetch('http://localhost:3000/analyze/final', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: editedData,
    })
        .then(response => response.blob()) // Convert response to a Blob
        .then(blob => {
            // Create a download link for the PDF file
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Resume.pdf'; // Set the desired file name
            link.click();
        })
        .catch(error => {
            console.error('Error sending data to backend:', error);
        });
});
