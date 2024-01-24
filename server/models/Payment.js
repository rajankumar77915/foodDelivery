import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, required: true },
  razorpaySignature: { type: String, required: true },
});


const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
