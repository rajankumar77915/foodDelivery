import mongoose from "mongoose";
// import mailSender from "../utils/mobileOtpSend.js";
import mobileOtpSend from "../utils/mobileOtpSend.js";
const doubtSchema = mongoose.Schema({
    mobileNo: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    message: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
});

// async function sendVerificationEmail(email, otp) {
//     try {
//         const MessageResponds = await mailSender(email, "Verification Email By CourseWave", otp);
//         console.log("Sucessfully sent otp:", MessageResponds);
//     } catch (error) {
//         console.log("error occures at sendVerificationEmail:", error.message);
//         throw error;
//     }
// }

// OTPSchema.pre("save", async function (next) {
//     await sendVerificationEmail(this.email, this.otp);
//     next();
// })

 export default mongoose.model("doubt", doubtSchema);