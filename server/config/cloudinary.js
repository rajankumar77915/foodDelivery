import {v2 as Cloudinary} from "cloudinary"

export const cloudinaryConnect = (() => {
    try {
        Cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key:process.env.api_key,
            api_secret:process.env.api_secret
        })
        
        console.log("connection with cloudinary sucess")
    } catch (error) {
        console.log("cloudinary unsucess connection")
        console.log(error.message)
    }
}
)
