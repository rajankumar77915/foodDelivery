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
  restaurantOpeningTime: { type:String},
  restaurantClosingTime: { type:String},
  approved: { type: Boolean, default: false },
  contactNumber: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubsectionOrder' }],
  RatingReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantRatingReviews'}],
  certificateImage: { type: String },
  // isPromo: { type: Boolean, default: false },
});


const Restaurant= mongoose.model('Restaurant', restaurantSchema);
export default Restaurant