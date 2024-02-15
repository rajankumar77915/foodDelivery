import mongoose from "mongoose";


const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address:   {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: Number },
  },
  pincode: { type: Number, required: true },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  popularDishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  restaurantOpeningTime: { type:Date},
  restaurantClosingTime: { type:Date},
  contactNumber: { type: String, required: true },
  RatingReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantRatingReviews'}],
  // isPromo: { type: Boolean, default: false },
});


const Restaurant= mongoose.model('Restaurant', restaurantSchema);
export default Restaurant