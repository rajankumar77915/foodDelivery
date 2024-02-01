import mongoose from "mongoose";

//profile sub-schema for user
const profileSchema = new mongoose.Schema({
  image: { type: String, required: true },
  birthdate: { type: Date},
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: Number },
  },
  pincode: { type: Number},
});


const Profile= mongoose.model('Profile', profileSchema);
export default Profile