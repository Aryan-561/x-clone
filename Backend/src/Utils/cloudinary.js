import { v2 as cloudinary } from 'cloudinary'
import ApiErrors from "./ApiErrors.js"
import fs from "fs/promises"
import conf from '../conf/conf.js'

console.log(conf);
cloudinary.config({
    cloud_name: conf.name ,
    api_key: conf.key ,
    api_secret: conf.secret 
});

// upload images return only url of imge
const uploadCloudinary = async (filepath) => {
    try {
        if (!filepath) throw new ApiErrors(404, 'File path not found')
        const image = await cloudinary.uploader.upload(filepath, {
            resource_type: 'image',
            folder: 'tweetDb',
        });
        console.log(" upload image :", image.secure_url);


        await fs.unlink(filepath);
        console.log("Temporary file deleted:", filepath);


        return image.secure_url;
    } catch (error) {
        await fs.unlink(filepath);

        console.log('Error uploading image:', error);
        throw new ApiErrors(500, 'Failed to upload image', error)
    }
}

// delete images, need only public id of image
const deleteCloudinary = async (filePublicId) => {
    try {
        if (!filePublicId) throw new ApiErrors(404, 'File id not found')
        const deleteImage = await cloudinary.uploader.destroy(filePublicId)
        console.log("delete image files", deleteImage);
        return deleteImage;

    } catch (error) {
        console.log('Error deleting image:', error);
        throw new ApiErrors(500, 'Failed to delete images file', error)
    }
}
export {
    uploadCloudinary,
    deleteCloudinary
}