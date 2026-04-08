import ImageKit from "imagekit-javascript";

const IN_PRODUCTION = process.env.REACT_APP_IN_PRODUCTION

let authEndpoint;

if (IN_PRODUCTION === true){
  authEndpoint = process.env.REACT_APP_IMAGEKIT_PROD_AUTH_ENDOINT
}else{
  authEndpoint = process.env.REACT_APP_IMAGEKIT_DEV_AUTH_ENDOINT
}

const imagekit = new ImageKit({
  publicKey: process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT, // from ImageKit dashboard
  authenticationEndpoint: authEndpoint  // for secure uploads
});

export default imagekit;