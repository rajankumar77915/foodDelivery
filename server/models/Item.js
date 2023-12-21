const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  tax: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  category: { type: String},
  // recommendation: [{ 
  //   type: String 
  // }],
  ratingsAndReviews: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'RatingReview', required: true
  }],
  isVeg: { 
    type: Boolean, 
    required: true 
  },
});
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
