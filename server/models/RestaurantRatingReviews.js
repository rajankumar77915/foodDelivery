const mongoose = require('mongoose');

//rating and review sub-schema which stroed in item
const RestaurantRatingReviewsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});


module.exports = mongoose.model('RestaurantRatingReviews', RestaurantRatingReviewsSchema);

