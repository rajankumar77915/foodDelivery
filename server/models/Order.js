const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  SubsectionOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'SubsectionOrder', required: true },
  deliveryAddress: { type: String, required: true },
  paymentStatus: { type: Boolean, default: false },
  orderDate:{type:Date.now()}
});


module.exports = mongoose.model('Order', orderSchema);

