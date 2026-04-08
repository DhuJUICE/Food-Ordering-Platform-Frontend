let API_URL;

const IN_PRODUCTION = process.env.REACT_APP_IN_PRODUCTION;

if (IN_PRODUCTION === true) {
  API_URL = process.env.REACT_APP_PROD_BASE_URL;
} else {
  API_URL = process.env.REACT_APP_DEV_BASE_URL;
}

export { API_URL };