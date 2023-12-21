const Profile=require("../models/Profile")
const User=require("../models/User")

exports.UpdateProfile=async(req,res)=>{
    try{
    const {birthdate="",address="",pincode=""}=req.boy;
    const {firstName,lastName,id}=req.body;

    // Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		const updateFields = {}; // Initialize an empty object for the update

		if (firstName !== undefined && firstName !== '') {
			updateFields.firstName = firstName;
		}

		if (lastName !== undefined && lastName !== '') {
			updateFields.lastName = lastName;
		}

		if (Object.keys(updateFields).length > 0) {
			// Only perform the update if there are fields to update
			await userDetails.updateOne({ $set: updateFields });
		}

		// Update the profile fields
		profile.birthdate = Date(birthdate);
		profile.address = address;
		profile.pincode = pincode;

		// Save the updated profile
		await profile.save();
		
		const Updatedprofile=await User.findById( id ).populate("additionalDetails");
		Updatedprofile.password='';
		Updatedprofile.resetPasswordExpires=''
		console.log("Updateprofile  ",Updatedprofile)
		return res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			Updatedprofile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: `error at update profil:${error.message}`,
		});
	}
};

exports.deleteProfile=async(req,res)=>{
	try{
		const {id}=req.body;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails.toString() });
		// Now Delete User
		await User.deleteOne({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	}catch(error){
		return res.status(500).json({
			success: false,
			error: `error at delete profile:${error.message}`,
		});
	}
}