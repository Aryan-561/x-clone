
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    // destination for uploaded files.

    destination: function (req, file, cb) {
        // ensure absolute path exists
        cb(null, path.resolve('./public/temp'))
    },

    // rename uploaded files with unique names.
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

// initialize multer middleware for handling file uploads.
const upload = multer({ storage: storage })
export default upload;