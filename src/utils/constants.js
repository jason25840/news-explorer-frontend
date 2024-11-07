export const APIkey = process.env.REACT_APP_API_KEY;
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.newsexplorer.hackquest.com"
    : "http://localhost:3001";
