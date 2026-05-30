// Import Imagekit package
import ImageKit from 'imagekit'
// Create ImageKit instance with configuration keys



let storageInstance= new ImageKit({
    urlEndpoint:process.env.IMAGEKIT_URL,  // ImageKit URL endpoint
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,   // Public API key
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY //Private API key
})

// Function to upload files on Imagekit
let sendFiles=async(file,fileName)=>{
    // Create upload options object
    let options={
        file,   //file Buffer
        fileName  //Name of the upladed files
    }
     // Upload file to ImageKit and return response
    return await storageInstance.upload(options)
}


export default sendFiles;