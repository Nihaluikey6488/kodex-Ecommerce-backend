import ImageKit from "imagekit";
import env from "./env.js";

const imageKit = new ImageKit({
  urlEndpoint: env.imageKit.urlEndpoint,
  publicKey: env.imageKit.publicKey,
  privateKey: env.imageKit.privateKey,
});

export const uploadFile = async (fileBuffer, fileName) => {
  try {
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName,
      useUniqueFileName: true,
      folder: "/products",
    });

    return response;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export default imageKit;





















// // Import Imagekit package
// import ImageKit from 'imagekit'
// import env from './env.js'
// // Create ImageKit instance with configuration keys



// let storageInstance= new ImageKit({
//     urlEndpoint:env.imageKit.urlEndpoint,  // ImageKit URL endpoint
//     publicKey:env.imageKit.publicKey,   // Public API key
//     privateKey:env.imageKit.privateKey //Private API key
// })

// // Function to upload files on Imagekit
// let sendFiles=async(file,fileName)=>{
//     // Create upload options object
//     let options={
//         file,   //file Buffer
//         fileName  //Name of the upladed files
//     }
//      // Upload file to ImageKit and return response
//     return await storageInstance.upload(options)
// }


// export default sendFiles;
