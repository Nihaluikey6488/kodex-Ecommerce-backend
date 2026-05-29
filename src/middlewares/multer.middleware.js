// Import multer package for handling file uploads
import multer from "multer"


// Store uploaded files temporarily in server memory as buffer
let storage = multer.memoryStorage()


// Create multer middleware using memory storage
let upload = multer({ storage })


// Export upload middleware
export default upload