import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  SubsectionOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'SubsectionOrder', required: true },
  deliveryAddress:   {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: Number },
  },
  paymentStatus: { type: Boolean, default: false },
  orderDate:{type:Date.now()}
});


module.exports = mongoose.model('Order', orderSchema);

