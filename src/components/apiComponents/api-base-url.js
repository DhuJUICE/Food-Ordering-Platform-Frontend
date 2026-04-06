let API_URL;

const IN_PRODUCTION = true;

if (IN_PRODUCTION === true) {
  API_URL = 'https://heranbites-backend.onrender.com';
} else {
  //API_URL = 'http://localhost:8000';
  API_URL = 'https://availability-robust-star-dancing.trycloudflare.com';
}

export { API_URL };