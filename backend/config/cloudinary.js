import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });

        // Verbindung testen
        const result = await cloudinary.api.ping();

        console.log("✅ Cloudinary erfolgreich verbunden!");
        console.log(result);

    } catch (error) {
        console.error("❌ Cloudinary-Verbindung fehlgeschlagen!");
        console.error(error.message);
    }
};

export default connectCloudinary;