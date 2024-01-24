const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        const { birthdate = "", address = "", pincode = "" } = req.body;
        const { firstName, lastName, id } = req.body; // Fix the typo from req.boy to req.body

        // Find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

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
        profile.birthdate = new Date(birthdate);
        profile.address = address;
        profile.pincode = pincode;

        // Save the updated profile
        await profile.save();

        // Use direct path in findById for population
        const updatedProfile = await User.findById(id).populate("additionalDetails");

        // Remove sensitive information before sending the response
        updatedProfile.password = '';
        updatedProfile.resetPasswordExpires = '';

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedProfile,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: `Error at update profile: ${error.message}`,
        });
    }
};

exports.deleteProfile = async (req, res) => {
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
