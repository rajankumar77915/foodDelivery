import mongoose from "mongoose";

//profile sub-schema for user
const profileSchema = new mongoose.Schema({
  image: { type: String, required: true },
  birthdate: { type: Date},
  address: { type: String},
  pincode: { type: Number},
});


const Profile= mongoose.model('Profile', profileSchema);
export default Profile