import { v2 as cloudinary } from 'cloudinary'
import ApiErrors from './ApiErrors.js';
import fs from "fs/promises"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "missing  name",
    api_key: process.env.CLOUD_API_KEY || "missing  key",
    api_secret: process.env.CLOUD_API_SECRET || "missing  secret"
});

// upload images return only url of imge
const uploadCloudinary = async (filepath) => {
    try {
        if (!filepath) throw new ApiErrors(404, 'File path not found')
        const image = await cloudinary.uploader.upload(filepath, {
            resource_type: 'image',
            folder: 'tweetMedia',
        });
        console.log(" upload image :", image.secure_url);


        await fs.unlink(filepath);
        console.log("Temporary file deleted:", filepath);


        return image.secure_url;
    } catch (error) {
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