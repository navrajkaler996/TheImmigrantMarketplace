export const getBaseURL = () => {
  let API_URL;
  console.log(window.location.host);
  if (window.location.host === "https://immigrantmarketplace.onrender.com") {
    API_URL = "https://immigrantmarketplace-api.onrender.com";
  }

  if (window.location.host === "localhost:3000") {
    API_URL = "http://localhost:4000";
  }

  return API_URL;
};
