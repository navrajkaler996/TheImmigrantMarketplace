export const getBaseURL = () => {
  let API_URL;
  console.log(window.location.host);
  if (window.location.host === "immigrantmarketplace") {
    API_URL = "https://immigrantmarketplace-api";
  }

  if (window.location.host === "localhost:3000") {
    API_URL = "http://localhost:4000";
  }

  return API_URL;
};
