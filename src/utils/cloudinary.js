import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';

import fs from "fs";


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(localFilePath){
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto",
            });
            console.log("file is uploaded on cloudinary",
                response.url);
            return response;   
        }
        return null;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation failed
        console.log("Error in uploading file on cloudinary",error);
    }
}



export default uploadOnCloudinary;
