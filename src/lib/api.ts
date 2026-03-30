import axios from "axios";

// ─── Base URL ─────────────────────────────────────────────
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://rental-boat.gt.tc/php-server";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


// ─────────────────────────────────────────────────────────
// Rental Boat APIs (baru)
// ─────────────────────────────────────────────────────────

/** Helper: ambil token dari localStorage */
const getToken = () => localStorage.getItem("rbb_admin_token");

/** Helper: header Authorization */
const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

// ── Armada Kapal ──────────────────────────────────────────
export const fleetAPI = {
  /** Public: semua kapal aktif */
  getAll: () =>
    axios.get(`${API_BASE_URL}/api-fleet.php`),

  /** Public: satu kapal by id */
  getById: (id: number) =>
    axios.get(`${API_BASE_URL}/api-fleet.php?id=${id}`),

  /** Admin: semua kapal (include non-aktif) */
  getAllAdmin: () =>
    axios.get(`${API_BASE_URL}/api-fleet-crud.php`, { headers: authHeader() }),

  create: (data: any) =>
    axios.post(`${API_BASE_URL}/api-fleet-crud.php`, data, { headers: authHeader() }),

  update: (id: number, data: any) =>
    axios.put(`${API_BASE_URL}/api-fleet-crud.php?id=${id}`, data, { headers: authHeader() }),

  delete: (id: number) =>
    axios.delete(`${API_BASE_URL}/api-fleet-crud.php`, {
      data: { id },
      headers: authHeader(),
    }),
};

// ── Layanan ───────────────────────────────────────────────
export const servicesAPI = {
  getAll: () =>
    axios.get(`${API_BASE_URL}/api-services.php`),

  getAllAdmin: () =>
    axios.get(`${API_BASE_URL}/api-services-crud.php`, { headers: authHeader() }),

  create: (data: any) =>
    axios.post(`${API_BASE_URL}/api-services-crud.php`, data, { headers: authHeader() }),

  update: (id: number, data: any) =>
    axios.put(`${API_BASE_URL}/api-services-crud.php?id=${id}`, data, { headers: authHeader() }),

  delete: (id: number) =>
    axios.delete(`${API_BASE_URL}/api-services-crud.php`, {
      data: { id },
      headers: authHeader(),
    }),
};

// ── Kontak Settings ───────────────────────────────────────
export const contactAPI = {
  /** Public: ambil semua setting kontak */
  getAll: () =>
    axios.get(`${API_BASE_URL}/api-contact.php`),

  /** Admin: update setting kontak */
  update: (data: Record<string, string>) =>
    axios.put(`${API_BASE_URL}/api-contact.php`, data, { headers: authHeader() }),
};

// ── Gallery Folders ───────────────────────────────────────
export const galleryFoldersAPI = {
  /** Public: semua folder aktif */
  getAll: () =>
    axios.get(`${API_BASE_URL}/api-gallery-folders.php`),

  /** Admin: semua folder termasuk non-aktif */
  getAllAdmin: () =>
    axios.get(`${API_BASE_URL}/api-gallery-folders.php?all=1`, { headers: authHeader() }),

  create: (data: any) =>
    axios.post(`${API_BASE_URL}/api-gallery-folders.php`, data, { headers: authHeader() }),

  update: (id: number, data: any) =>
    axios.put(`${API_BASE_URL}/api-gallery-folders.php?id=${id}`, data, { headers: authHeader() }),

  delete: (id: number) =>
    axios.delete(`${API_BASE_URL}/api-gallery-folders.php`, {
      data: { id },
      headers: authHeader(),
    }),
};

// ── Gallery Items ─────────────────────────────────────────
export const galleryItemsAPI = {
  /** Public: semua item aktif (opsional: filter by folder_id) */
  getAll: (folderId?: number) =>
    axios.get(`${API_BASE_URL}/api-gallery-items.php${folderId != null ? `?folder_id=${folderId}` : ""}`),

  /** Admin: semua item */
  getAllAdmin: (folderId?: number) => {
    const qs = folderId != null ? `?folder_id=${folderId}` : "?all=1";
    return axios.get(`${API_BASE_URL}/api-gallery-items.php${qs}`, { headers: authHeader() });
  },

  create: (data: any) =>
    axios.post(`${API_BASE_URL}/api-gallery-items.php`, data, { headers: authHeader() }),

  update: (id: number, data: any) =>
    axios.put(`${API_BASE_URL}/api-gallery-items.php?id=${id}`, data, { headers: authHeader() }),

  /** Bulk move items ke folder lain */
  bulkMove: (ids: number[], folderId: number | null) =>
    axios.put(
      `${API_BASE_URL}/api-gallery-items.php`,
      { ids, folder_id: folderId },
      { headers: authHeader() }
    ),

  delete: (id: number) =>
    axios.delete(`${API_BASE_URL}/api-gallery-items.php`, {
      data: { id },
      headers: authHeader(),
    }),
};

// ── Admin Auth ────────────────────────────────────────────
export const adminAuthAPI = {
  login: (username: string, password: string) =>
    axios.post(`${API_BASE_URL}/login.php`, { username, password }),

  verify: () =>
    axios.get(`${API_BASE_URL}/login.php`, { headers: authHeader() }),

  logout: () =>
    axios.delete(`${API_BASE_URL}/login.php`, { headers: authHeader() }),
};

// ── Upload (untuk fleet & gallery) ───────────────────────
export const boatUploadAPI = {
  upload: (formData: FormData, type: "fleet" | "gallery") =>
    axios.post(`${API_BASE_URL}/api-upload.php?type=${type}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...authHeader(),
      },
    }),
};

export default api;
