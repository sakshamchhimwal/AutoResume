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

// Function to update the popup content with the form
function updatePopup(data) {
  const editFormContainer = document.getElementById("editFormContainer");
  console.log("rednnf");
  console.log(data);
  if (editFormContainer) {
    // Clear previous content
    editFormContainer.innerHTML = "";

    data.projects.forEach((project, index) => {
      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = project.title;
      titleInput.name = `title_${index}`;
      editFormContainer.appendChild(titleInput);

      const pointsTextarea = document.createElement("textarea");
      pointsTextarea.value = project.points.join("\n");
      pointsTextarea.name = `points_${index}`;
      editFormContainer.appendChild(pointsTextarea);

      const technologiesInput = document.createElement("input");
      technologiesInput.type = "text";
      technologiesInput.value = project.technologies.join(", ");
      technologiesInput.name = `technologies_${index}`;
      editFormContainer.appendChild(technologiesInput);
    });

    const submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Edit & Submit";
    submitButton.addEventListener("click", () =>
      submitForm(data, editFormContainer)
    );
    editFormContainer.appendChild(submitButton);
  }
}

function submitForm(originalData, editFormContainer) {
  const updatedData = { projects: [] };

  originalData.projects.forEach((project, index) => {
    const title = document.querySelector(`input[name=title_${index}]`).value;
    const points = document
      .querySelector(`textarea[name=points_${index}]`)
      .value.split("\n");
    const technologies = document
      .querySelector(`input[name=technologies_${index}]`)
      .value.split(",")
      .map((item) => item.trim());

    updatedData.projects.push({
      title: title,
      points: points,
      technologies: technologies,
    });
  });

  sendUpdatedDataToBackend(updatedData);
}

function sendUpdatedDataToBackend(updatedData) {
  const token = localStorage.getItem("accessToken");

  fetch("http://localhost:3003/analyzer/make", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      updatedData: updatedData,
      token: token,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //   console.log(await response);
      return await response.blob();
    })
    .then((blob) => {
      // Create a Blob URL for the PDF content
      const pdfUrl = URL.createObjectURL(blob);

      // Remove the form from the DOM
      const editFormContainer = document.getElementById("editFormContainer");
      if (editFormContainer) {
        editFormContainer.remove();
      }

      // Add a Download PDF button
      const downloadButton = document.createElement("a");
      downloadButton.href = pdfUrl;
      downloadButton.download = "resume.tex";
      downloadButton.textContent = "Download Resume PDF";
      downloadButton.click();
      document.body.appendChild(downloadButton);
    })
    .catch((error) => {
      console.error("Error sending updated data to backend:", error);
    });
}
