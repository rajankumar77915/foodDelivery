const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ['admin', 'customer', 'deliveryBoy'],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    require:true
  },
  token:{
    type:String
  },
  resetPasswordExpires:{
      type:Date
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
});


const User = mongoose.model('User', userSchema);
module.exports = User;