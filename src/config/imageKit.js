import ImageKit from "imagekit";
import env from "./env.js";

const imageKit = new ImageKit({
  urlEndpoint: env.imageKit.urlEndpoint,
  publicKey: env.imageKit.publicKey,
  privateKey: env.imageKit.privateKey,
});

export const uploadFile = async (fileBuffer, fileName) => {
  try {
    return await imageKit.upload({
      file: fileBuffer,
      fileName,
      useUniqueFileName: true,
      folder: "/products",
    });
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export default imageKit;
