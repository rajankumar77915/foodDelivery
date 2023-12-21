const mongoose = require('mongoose');
const itemAddressSchema = new mongoose.Schema({
  pincode: { 
    type: Number, 
    required: true 
  },
  items: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item' 
  }],
});


const ItemAddress = mongoose.model('ItemAddress', itemAddressSchema);
module.exports = ItemAddress;
