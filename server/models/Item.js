import mongoose from "mongoose";
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
    type: Number
  },
  image: { 
    type: String, 
    required: true 
  },
  foodVarity:[{type:String}],
  foodTags:[{type:String}],
  category: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', required: true
  },
  ratingsAndReviews: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'RatingReview'
  }],
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant'
  },
  isVeg: { 
    type: Boolean, 
    required: true 
  },
  quantity: { type: Number,default:1},
});
const  Item = mongoose.model('Item', itemSchema);
export   default Item

