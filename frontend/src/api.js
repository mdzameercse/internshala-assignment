const API_URL = "http://localhost:8080/api/v1";

export async function register(email, password, role) {
  const res = await fetch(API_URL + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(typeof data === "string" ? data : "Register failed");
  }
  return data;
}

export async function login(email, password) {
  const res = await fetch(API_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(typeof data === "string" ? data : "Login failed");
  }
  return data;
}

export async function getNotes(token) {
  const res = await fetch(API_URL + "/notes", {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  if (res.status === 204) return [];
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error("Failed to load notes");
  }
  return data;
}

export async function createNote(token, note) {
  const res = await fetch(API_URL + "/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(note)
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error("Failed to create note");
  }
  return data;
}

export async function updateNote(token, id, note) {
  const res = await fetch(API_URL + "/notes/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(note)
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(typeof data === "string" ? data : "Failed to update note");
  }
  return data;
}

export async function deleteNote(token, id) {
  const res = await fetch(API_URL + "/notes/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  if (!res.ok) {
    throw new Error("Failed to delete note");
  }
}
