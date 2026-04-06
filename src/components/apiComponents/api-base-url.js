let API_URL;

const IN_PRODUCTION = false;

if (IN_PRODUCTION === true) {
  API_URL = 'https://heranbites-backend.onrender.com';
} else {
  API_URL = 'http://localhost:8000';
}

export { API_URL };