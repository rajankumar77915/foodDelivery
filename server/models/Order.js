import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  SubsectionOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubsectionOrder' }],
  deliveryAddress:   {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: Number },
  },
  paymentStatus: { type: Boolean, default: false },
  orderDate:{type:Date,
            default:Date.now()
  }
});



const Order= mongoose.model('Order', orderSchema);
export default Order
