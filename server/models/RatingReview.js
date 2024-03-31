import mongoose from "mongoose";

//rating and review sub-schema which stroed in item
const ratingReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item:{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' ,required: true},
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});


const RatingReview=mongoose.model('RatingReview', ratingReviewSchema);
export   default RatingReview

