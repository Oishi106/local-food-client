// ─── Base URL ────────────────────────────────────────────────
// frontend .env এ রাখো: VITE_API_URL=https://local-food-server.onrender.com
const BASE_URL = import.meta.env.VITE_API_URL || "https://local-food-server.onrender.com";

// ─── Token helpers ───────────────────────────────────────────
export const saveToken  = (token) => localStorage.setItem("fn_token", token);
export const clearToken = ()      => localStorage.removeItem("fn_token");
export const getToken   = ()      => localStorage.getItem("fn_token");

// ─── Main fetch wrapper ──────────────────────────────────────
export async function apiFetch(path, options = {}) {
  const token = getToken();

  const url = path.startsWith("http")
    ? path
    : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token        ? { Authorization: `Bearer ${token}` }  : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json") ? res.json() : res.text();
}

// ─── JWT fetch (call after Firebase login) ───────────────────
export async function fetchAndSaveToken(email) {
  try {
    const res = await fetch(`${BASE_URL}/jwt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.token) saveToken(data.token);
  } catch (err) {
    console.error("JWT fetch failed:", err);
  }
}

// ─── Save user to DB (call after first login) ────────────────
export async function saveUserToDB(user) {
  try {
    await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:     user.displayName || "",
        email:    user.email       || "",
        photoURL: user.photoURL    || "",
        role:     "user",
      }),
    });
  } catch (err) {
    console.error("Save user failed:", err);
  }
}
