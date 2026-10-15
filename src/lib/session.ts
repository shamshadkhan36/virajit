// Client-side session token generator and storage

export function getSessionToken(): string {
  if (typeof window === "undefined") return "server-session";

  let token = localStorage.getItem("rfb_session_token");
  if (!token) {
    token = "usr_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
    localStorage.setItem("rfb_session_token", token);
  }
  return token;
}
