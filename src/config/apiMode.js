const apiMode = import.meta.env.VITE_API_MODE || "demo";

export const isDemoMode = apiMode !== "real";
export const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL || "https://13.208.43.217.nip.io";
