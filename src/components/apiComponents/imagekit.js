import ImageKit from "imagekit-javascript";

const IN_PRODUCTION = false

let authEndpoint;

if (IN_PRODUCTION === true){
  authEndpoint = "https://heranbites-backend.onrender.com/api/auth-image"
}else{
  authEndpoint = "http://localhost:8000/api/auth-image"
}

const imagekit = new ImageKit({
  publicKey: "public_tCW7CHgWHSo+4XkVnYMOlCKMu9Q=",       // from ImageKit dashboard
  urlEndpoint: "https://ik.imagekit.io/jugamsoft", // from ImageKit dashboard
  authenticationEndpoint: authEndpoint  // for secure uploads
});

export default imagekit;