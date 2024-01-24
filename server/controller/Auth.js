 import bcrypt from "bcrypt";
 import User from "../models/User.js"
 import OTP from "../models/OTP.js"
 import otpGenerator from "otp-generator"
 import mailSender from "../utils/mailSender.js"
import Profile from "../models/Profile.js"
import jwt  from "jsonwebtoken"
import {passwordUpdated} from "../templates/passwordUpdate.js"

// Signup Controller for Registering User
export  const signup=async(req,res)=>{
    
    try{
        const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,	
			mobileNo,
			otp,
            accountType
		} = req.body;
		
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
            !mobileNo ||
			!password ||
			!otp
			) {
				return res.status(403).send({
					success: false,
					message: "All Fields are required",
				});
			}
			// console.log("all field............. ",req.body.formData)
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

        // Check if user already exists
        const existingUser=await User.findOne({mobileNo});
        if (existingUser) {
			console.log(existingUser)
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

        // Find the most recent OTP for the mobile
		// const optInServer = await  OTP.find(mobileNo).sort({CreatedAt :-1}).limit(1)

        // if (optInServer.length === 0) {
		// 	// OTP not found for the email
		// 	return res.status(401).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});
		// } else if (otp !== optInServer[0].otp) {
		// 	// Invalid OTP
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});
		// }

        //hasing the password
        const hashedPassword= await bcrypt.hash(password,10);
		console.log("here working")

        //create  profile
        const profileDetails=await Profile.create({
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            birthdate:null,
            address:null,
        })
        //create user
        const  user=await User.create({
            firstName,
            lastName,
            email,
            mobileNo,
            password:hashedPassword,
            accountType,
            profile: profileDetails._id,

        })
        
        return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});

    }catch(error){
        console.error(error);
        return res.status(500).json({
            sucess:false,
            message:`User cannot be registered. Please try again.}`
        });
    }
}



// Login controller for authenticating users
export  const login = async (req, res) => {
	try {
		// Get mobileNo and password from request body
		const { mobileNo, password } = req.body;

		// Check if email or password is missing
		if (!mobileNo || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided mobileNo
		const user = await User.findOne({ mobileNo }).populate("profile").exec();
		// If user not found with provided mobileNo
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ mobileNo: user.mobileNo, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			await user.save()
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() +  24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};


// Send OTP For mobileNo Verification
export  const sendotp = async (req, res) => {
	try {
		const { mobileNo,email } = req.body;

		// Check if user is already present
		// Find user with provided mobileNo
		const checkUserPresent = await User.findOne({ mobileNo });
		// to be used in case of signup

		// If user found with provided mobileNo
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		let result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
			result = await OTP.findOne({ otp: otp });
		}
		const otpPayload = { email, otp };
		const otpBody = new OTP(otpPayload);
		await otpBody.save();
	
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log("error at send otp function: " ,error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};




// Controller for Changing Password
export const changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,"zomato password changed",
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};