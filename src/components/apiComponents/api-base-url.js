let API_URL;

const isProduction = false;

if (isProduction === true) {
  API_URL = 'https://heranbites-backend.onrender.com';
} else {
  API_URL = 'http://localhost:8000';
}

export { API_URL };