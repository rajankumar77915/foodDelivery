const mongoose = require('mongoose');

//profile sub-schema for user
const profileSchema = new mongoose.Schema({
  image: { type: String, required: true },
  birthdate: { type: Date, required: true },
  address: { type: String, required: true },
  pincode: { type: Number, required: true },
});


module.exports = mongoose.model('Profile', profileSchema);
