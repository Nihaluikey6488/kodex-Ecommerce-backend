// Import Imagekit package
import ImageKit from 'imagekit'
// Create ImageKit instance with configuration keys
let storageInstance= new ImageKit({
    urlEndpoint:"https://ik.imagekit.io/7tiz96d91",  // ImageKit URL endpoint
    publicKey:"public_MPmiu/LwyxwQAm55Xest9WRl/cc=",   // Public API key
    privateKey:"private_1ypqQ4riNg8kCtYQr3gsIzCis5k="  //Private API key
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