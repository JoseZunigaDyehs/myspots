import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_FOLDER,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../config/config.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: CLOUDINARY_FOLDER,
  });
}

export async function removeImage(id) {
  await cloudinary.uploader.destroy(id);
}
