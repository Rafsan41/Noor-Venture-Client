import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ── Request interceptor — attach bearer token if stored ────────────────────────
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("noor_token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// ── Response interceptor — unwrap data or throw ────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// ── Typed helpers ──────────────────────────────────────────────────────────────
export const apiGet    = <T>(url: string, params?: object) =>
  api.get<T>(url, { params }).then((r) => r.data);

export const apiPost   = <T>(url: string, body?: object) =>
  api.post<T>(url, body).then((r) => r.data);

export const apiPatch  = <T>(url: string, body?: object) =>
  api.patch<T>(url, body).then((r) => r.data);

export const apiDelete = <T>(url: string) =>
  api.delete<T>(url).then((r) => r.data);
