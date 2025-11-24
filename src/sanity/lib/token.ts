export const token = process.env.SANITY_API_READ_TOKEN ?? "";

// Prevent crashes during client bundling or typegen
if (typeof window === "undefined" && !token) {
  console.warn("Warning: SANITY_API_READ_TOKEN is missing. Server-side Sanity reads may not work.");
}
