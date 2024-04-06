import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const fileUpload = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfully
    console.log("file has been uploaded successfully");
    return response.url;
  } catch (error) {
    //as we are saving file locally on our server, we should clear that file otherwise they will keep on storing in our server;
    // sync means it will happen on compulsory basis;
    fs.unlinkSync(localFilePath);
    return null;
  }
};
