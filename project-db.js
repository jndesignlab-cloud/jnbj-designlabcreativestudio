(() => {
  const SESSION_KEY = "designlab-supabase-admin-session";
  const PUBLIC_COLUMNS = [
    "id",
    "title",
    "category",
    "filter_category",
    "featured",
    "image_url",
    "gallery_image_urls",
    "skills",
    "description",
    "problem_goal",
    "what_i_did",
    "result_outcome",
    "project_link",
    "status",
    "show_on_personal_portfolio",
    "created_at",
    "updated_at"
  ].join(",");

  function assertConfig() {
    if (!window.SUPABASE_URL || !window.SUPABASE_PUBLISHABLE_KEY) {
      throw new Error("Supabase configuration is missing.");
    }
  }

  function dataHeaders(accessToken = "") {
    assertConfig();
    const headers = {
      "apikey": window.SUPABASE_PUBLISHABLE_KEY,
      "Accept": "application/json"
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  }

  function authHeaders(accessToken = "") {
    assertConfig();
    const headers = {
      "apikey": window.SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  }

  async function parseResponse(response) {
    const text = await response.text();
    let data = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      const message =
        data?.message ||
        data?.msg ||
        data?.error_description ||
        data?.hint ||
        data?.details ||
        `Supabase request failed (${response.status}).`;
      throw new Error(message);
    }

    return data;
  }

  function normalizeProject(row = {}) {
    return {
      id: row.id || "",
      title: row.title || "",
      category: row.category || "",
      filterCategory: row.filter_category || "",
      featured: Boolean(row.featured),
      image: row.image_url || "",
      galleryImages: row.gallery_image_urls || "",
      skills: row.skills || "",
      description: row.description || "",
      problem: row.problem_goal || "",
      solution: row.what_i_did || "",
      outcome: row.result_outcome || "",
      link: row.project_link || "",
      status: row.status || "Draft",
      showOnPersonalPortfolio: row.show_on_personal_portfolio !== false,
      createdAt: row.created_at || "",
      updatedAt: row.updated_at || ""
    };
  }

  async function publicRequest(queryString) {
    assertConfig();

    const response = await fetch(
      `${window.SUPABASE_URL}/rest/v1/projects?${queryString}`,
      {
        method: "GET",
        headers: dataHeaders(),
        cache: "no-store"
      }
    );

    return parseResponse(response);
  }

  async function listPublished({ featured = null, limit = null, personalOnly = false } = {}) {
    const params = new URLSearchParams();
    params.set("select", PUBLIC_COLUMNS);
    params.set("status", "eq.Published");
    params.set("order", "created_at.desc");

    if (featured === true) params.set("featured", "eq.true");
    if (personalOnly) params.set("show_on_personal_portfolio", "eq.true");
    if (Number.isFinite(limit) && limit > 0) params.set("limit", String(limit));

    const rows = await publicRequest(params.toString());
    return Array.isArray(rows) ? rows.map(normalizeProject) : [];
  }

  async function getPublishedProject(id) {
    if (!id) return null;

    const params = new URLSearchParams();
    params.set("select", PUBLIC_COLUMNS);
    params.set("id", `eq.${id}`);
    params.set("status", "eq.Published");
    params.set("limit", "1");

    const rows = await publicRequest(params.toString());
    return Array.isArray(rows) && rows.length ? normalizeProject(rows[0]) : null;
  }

  function createSlug(value = "") {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 72);
  }

  function createProjectId(title) {
    const slug = createSlug(title) || "project";
    let suffix = "";

    if (window.crypto?.randomUUID) {
      suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
    } else if (window.crypto?.getRandomValues) {
      const bytes = new Uint8Array(4);
      crypto.getRandomValues(bytes);
      suffix = Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
    } else {
      suffix = Math.random().toString(16).slice(2, 10);
    }

    return `${slug}-${suffix}`;
  }

  function readSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveSession(session) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {}
  }

  function clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {}
  }

  function normalizeSession(data) {
    if (!data?.access_token) return null;

    const expiresIn = Number(data.expires_in || 3600);
    const expiresAt =
      Number(data.expires_at) ||
      Math.floor(Date.now() / 1000) + expiresIn;

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token || "",
      expires_at: expiresAt,
      user: data.user || null
    };
  }

  async function signIn(email, password) {
    assertConfig();

    const response = await fetch(
      `${window.SUPABASE_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ email, password })
      }
    );

    const data = await parseResponse(response);
    const session = normalizeSession(data);

    if (!session) {
      throw new Error("Supabase did not return a valid login session.");
    }

    saveSession(session);
    return session;
  }

  async function refreshSession(refreshToken) {
    if (!refreshToken) {
      clearSession();
      return null;
    }

    const response = await fetch(
      `${window.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );

    const data = await parseResponse(response);
    const session = normalizeSession(data);

    if (!session) {
      clearSession();
      return null;
    }

    saveSession(session);
    return session;
  }

  async function getAdminSession() {
    let session = readSession();
    if (!session?.access_token) return null;

    const now = Math.floor(Date.now() / 1000);
    if (Number(session.expires_at || 0) <= now + 60) {
      try {
        session = await refreshSession(session.refresh_token);
      } catch {
        clearSession();
        return null;
      }
    }

    return session;
  }

  async function signOut() {
    const session = readSession();

    if (session?.access_token) {
      try {
        await fetch(`${window.SUPABASE_URL}/auth/v1/logout`, {
          method: "POST",
          headers: authHeaders(session.access_token)
        });
      } catch {}
    }

    clearSession();
  }

  async function createProject(project) {
    const session = await getAdminSession();
    if (!session?.access_token) {
      throw new Error("Please sign in to the portfolio admin first.");
    }

    const payload = {
      id: project.id || createProjectId(project.title),
      title: String(project.title || "").trim(),
      category: String(project.category || "").trim(),
      filter_category: String(project.filterCategory || "").trim(),
      featured: Boolean(project.featured),
      image_url: String(project.image || "").trim(),
      gallery_image_urls: String(project.galleryImages || "").trim(),
      skills: String(project.skills || "").trim(),
      description: String(project.description || "").trim(),
      problem_goal: String(project.problem || "").trim(),
      what_i_did: String(project.solution || "").trim(),
      result_outcome: String(project.outcome || "").trim(),
      project_link: String(project.link || "").trim(),
      status: project.status || "Published",
      show_on_personal_portfolio: project.showOnPersonalPortfolio !== false
    };

    const response = await fetch(`${window.SUPABASE_URL}/rest/v1/projects`, {
      method: "POST",
      headers: {
        ...dataHeaders(session.access_token),
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(payload)
    });

    const rows = await parseResponse(response);
    return Array.isArray(rows) && rows.length ? normalizeProject(rows[0]) : normalizeProject(payload);
  }

  window.DesignLabProjects = {
    listPublished,
    getPublishedProject,
    createProject,
    createProjectId,
    signIn,
    signOut,
    getAdminSession,
    normalizeProject
  };
})();
