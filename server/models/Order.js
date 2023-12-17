const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true}],
  quantity: { type: Number, required: true },
  available: { type: Number, required: true },
  orderStatus: {
    type: String,
    enum: ['preparing', 'delivered', 'confirmed', 'in progress', 'canceled'],
    required: true,
  },
  deliveryAddress: { type: String, required: true },
  paymentStatus: { type: Boolean, default: false },
});


module.exports = mongoose.model('Order', orderSchema);

