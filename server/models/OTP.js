import mongoose from "mongoose";
// import mailSender from "../utils/mobileOtpSend.js";
import mobileOtpSend from "../utils/mobileOtpSend.js";
const OTPSchema = mongoose.Schema({
    mobileNo: {
        require: true,
        type: String
    },
    otp: {
        type: String,
        require: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60 //5min
    }
});

// Define a function to send mobileNos
async function sendVerificationmobileNo(mobileNo, otp) {
	// Create a transporter to send mobileNos

	// Define the mobileNo options

	// Send the mobileNo
	try {
		const otpResponse = await mobileOtpSend(
			mobileNo
		);
		console.log("mobileNo sent successfully: ", otpResponse);
	} catch (error) {
		console.log("Error occurred while sending mobileNo: ", error);
		throw error;
	}
}


// Define a post-save hook to send mobileNo after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an mobileNo when a new document is created
	if (this.isNew) {
		await sendVerificationmobileNo(this.mobileNo, this.otp);
	}
	next();
});

 export default mongoose.model("OTP", OTPSchema);