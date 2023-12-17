const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  popularDishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  restaurantOpeningTime: { type:Date},
  restaurantClosingTime: { type:Date},
  contactNumber: { type: String, required: true },
  rating: { type: Number },
  reviews: [{type:String}],
  isPromo: { type: Boolean, default: false },
});


module.exports = mongoose.model('Restaurant', restaurantSchema);

