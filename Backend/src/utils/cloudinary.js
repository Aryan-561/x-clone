import { v2 as cloudinary } from "cloudinary";
import ApiErrors from "./ApiErrors.js";
import fs from "fs/promises";
import conf from "../conf/conf.js";

// console.log(conf);
cloudinary.config({
    cloud_name: conf.name,
    api_key: conf.key,
    api_secret: conf.secret,
});

// function for uploading media file on cloundinary and return url

const uploadCloudinary = async (filepath, resourceType = "auto") => {
    try {
        if (!filepath) throw new ApiErrors(404, "File path not found");
        const uploadedMedia = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
            folder: "tweetDb",
        });
// console.log(" uploaded media file :", uploadedMedia.secure_url)

        await fs.unlink(filepath);
// console.log("Temporary media file deleted:", filepath)
        // console.log("response:", uploadedMedia);
            
        return uploadedMedia;
    } catch (error) {
        await fs.unlink(filepath);
// console.log("Error uploading media file:", error)
    }
};


// delete media file , url needed

const deleteCloudinary = async (publicId, resourceType="image") => {

    try {

        if (!publicId) throw new ApiErrors(404, "File public Id not found");
        
        // hehe i commented code here and mine work fine now and make change in your file
        // 😒 added public id in db instead of performing js operation., 

        // extract file public id from url
        // const filePublicId = url.split("/").pop().split(".")[0];

        // extract file resource type form url
        // const resourceType = url.split("/")[4]


        const deleteMedia = await cloudinary.uploader.destroy(publicId,{resource_type:resourceType});
// console.log("delete media files", deleteMedia)
// console.log("delete media files", deleteMedia)
    } catch (error) {
// console.log("Error deleting media:", error)

// console.log("Error deleting media:", error)
};
export { uploadCloudinary, deleteCloudinary };
