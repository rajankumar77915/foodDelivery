import Profile from "../models/Profile.js";
import User from "../models/User.js";

export const  updateProfile  = async (req, res) => {
    try {
        
        const { birthdate="", address="", pincode=""} = req?.body;
        const { firstName="", lastName="" } = req.body; // Fix the typo from req.boy to req.body
        const id=req.user.id
        console.log("updateProfile:",req.body)
        // Find the profile by id
        const userDetails = await User.findById(id);
        

        if(!userDetails){
            return res.status(500).json({
                success:false,
                message:"user not found login again"
            })
        }
        const profile = await Profile.findById(userDetails.profile);

        const updateFields = {}; // Initialize an empty object for the update

        if (firstName) {
            updateFields.firstName = firstName;
        }

        if (lastName) {
            updateFields.lastName = lastName;
        }
       

        if (Object.keys(updateFields).length > 0) {
            // Only perform the update if there are fields to update
            await userDetails.updateOne({ $set: updateFields });
        }

        // Update the profile fields
        
        if(address){
            profile.address = address;
        }
        if(pincode)
        profile.pincode = pincode;
        
        if(birthdate)
            profile.birthdate = new Date(birthdate);

        // Save the updated profile
        await profile.save();

        // Use direct path in findById for population
        const updatedProfile = await User.findById(id).populate("profile");

        // Remove sensitive information before sending the response
        updatedProfile.password = '';
        updatedProfile.resetPasswordExpires = '';
        console.log("done")
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user:updatedProfile,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: `Error at update profile: ${error.message}`,
        });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Delete Associated Profile with the User
        await Profile.findByIdAndDelete(user.additionalDetails.toString());

        // Now Delete User
        await User.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error at delete profile: ${error.message}`,
        });
    }
};





export const updateDisplayPicture = async (req, res) => {
	try {
		const displayPicture = req.files.displayPicture
		const userId = req.user.id
		const image = await uploadImageCloudinary(
			displayPicture,
			process.env.FOLDER_NAME,
			1000,
			1000
		)
		console.log("afetr::::::::::::", image)
		const updatedProfile = await User.findByIdAndUpdate(
			{ _id: userId },
			{ image: image.secure_url },
			{ new: true }
		)
		res.send({
			success: true,
			message: `Image Updated successfully`,
			data: updatedProfile,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		})
	}
};