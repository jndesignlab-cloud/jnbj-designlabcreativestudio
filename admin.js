const projectForm = document.querySelector("#projectForm");
const formStatus = document.querySelector("#formStatus");

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!API_URL || API_URL.includes("PASTE_YOUR")) {
    formStatus.textContent = "Please paste your Apps Script Web App URL in config.js first.";
    return;
  }

  const formData = new FormData(projectForm);
  const payload = Object.fromEntries(formData.entries());
  payload.action = "addProject";

  formStatus.textContent = "Adding project...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Unable to add project.");
    }

    formStatus.textContent = "Project added successfully!";
    projectForm.reset();
  } catch (error) {
    console.error(error);
    formStatus.textContent = error.message || "Something went wrong.";
  }
});
