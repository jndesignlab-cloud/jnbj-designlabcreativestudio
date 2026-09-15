const SITE_VERSION = "3.16.19";

const loginPanel = document.querySelector("#supabaseAuthPanel");
const editorPanel = document.querySelector("#projectEditorPanel");
const loginForm = document.querySelector("#supabaseLoginForm");
const loginStatus = document.querySelector("#supabaseLoginStatus");
const emailInput = document.querySelector("#supabaseAdminEmail");
const passwordInput = document.querySelector("#supabaseAdminPassword");
const signOutButton = document.querySelector("#supabaseSignOut");
const sessionLabel = document.querySelector("#supabaseSessionLabel");

const projectForm = document.querySelector("#projectForm");
const formStatus = document.querySelector("#formStatus");

function setAuthState(session) {
  const signedIn = Boolean(session?.access_token);

  loginPanel.hidden = signedIn;
  editorPanel.hidden = !signedIn;

  if (signedIn && sessionLabel) {
    const email = session.user?.email || "Supabase admin";
    sessionLabel.textContent = `Signed in as ${email}`;
  }
}

async function restoreAdminSession() {
  if (!window.DesignLabProjects) {
    loginStatus.textContent = "Supabase project client is unavailable.";
    return;
  }

  const session = await window.DesignLabProjects.getAdminSession();
  setAuthState(session);
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  loginStatus.textContent = "Signing in…";
  loginForm.querySelector("button").disabled = true;

  try {
    const session = await window.DesignLabProjects.signIn(
      emailInput.value.trim(),
      passwordInput.value
    );

    passwordInput.value = "";
    loginStatus.textContent = "";
    setAuthState(session);
  } catch (error) {
    console.error("Supabase sign in:", error);
    loginStatus.textContent =
      error.message || "Unable to sign in.";
  } finally {
    loginForm.querySelector("button").disabled = false;
  }
});

signOutButton?.addEventListener("click", async () => {
  await window.DesignLabProjects.signOut();
  projectForm?.reset();
  formStatus.textContent = "";
  setAuthState(null);
});

projectForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = projectForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  formStatus.textContent = "Adding project to Supabase…";

  const formData = new FormData(projectForm);
  const values = Object.fromEntries(formData.entries());

  const selectedFilters = Array.from(
    projectForm.querySelectorAll('input[name="filterCategory"]:checked')
  )
    .map((input) => input.value.trim())
    .filter(Boolean);

  if (!selectedFilters.length) {
    formStatus.textContent = "Select at least one filter category.";
    submitButton.disabled = false;
    return;
  }

  const payload = {
    title: values.title,
    category: values.category,
    filterCategory: selectedFilters.join(", "),
    featured: projectForm.querySelector('[name="featured"]').checked,
    showOnPersonalPortfolio:
      projectForm.querySelector('[name="showOnPersonalPortfolio"]').checked,
    image: values.image,
    galleryImages: String(values.galleryImages || "")
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean)
      .join("\n"),
    skills: String(values.skills || "").trim(),
    link: String(values.link || "").trim(),
    description: String(values.description || "").trim(),
    problem: String(values.problem || "").trim(),
    solution: String(values.solution || "").trim(),
    outcome: String(values.outcome || "").trim(),
    status: values.status || "Published"
  };

  try {
    const project = await window.DesignLabProjects.createProject(payload);

    formStatus.innerHTML =
      `Project added successfully. <a href="project.html?id=${encodeURIComponent(project.id)}" target="_blank" rel="noopener">Open project ↗</a>`;

    projectForm.reset();
    projectForm.querySelector('[name="showOnPersonalPortfolio"]').checked = true;
    projectForm.querySelector('[name="status"]').value = "Published";
  } catch (error) {
    console.error("Supabase add project:", error);

    const message = String(error.message || "");
    if (
      message.toLowerCase().includes("row-level security") ||
      message.toLowerCase().includes("permission")
    ) {
      formStatus.textContent =
        "Supabase blocked this write. Confirm that this Auth user was added to public.portfolio_admins.";
    } else {
      formStatus.textContent =
        message || "Unable to add the project.";
    }
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

restoreAdminSession();
