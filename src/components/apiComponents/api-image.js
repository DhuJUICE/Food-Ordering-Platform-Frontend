import imagekit from './imagekit';

export const uploadImage = async (imageFile) => {
  if (!imageFile) throw new Error("No image selected");

  const authRes = await fetch("http://localhost:8000/api/auth-image", {
    method: "GET",
    credentials: "include",
  });

  const { token, signature, expire } = await authRes.json();

  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      const base64 = reader.result;

      imagekit.upload(
        {
          file: base64,
          fileName: imageFile.name,
          useUniqueFileName: true,
          tags: ['product-image'],
          isPrivateFile: false,
          token, 
          signature,
          expire
        },
        (err, result) => {
          if (err) {
            console.error("ImageKit Upload Error:", err);
            reject(err);
          } else {
            resolve(result.url);
          }
        }
      );
    };

    reader.onerror = (error) => reject("Failed to read image file: " + error);

    reader.readAsDataURL(imageFile);
  });
};