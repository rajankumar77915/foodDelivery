import mongoose from "mongoose";

const SubsectionOrder = new mongoose.Schema({
    items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true}],
    available: { type: Number, required: true },
    qunitity:{type:number},
    orderStatus: {
        type: String,
        enum: ['pending_orderReq','preparing', 'delivered', 'confirmed', 'in progress', 'canceled'],
        required: true,
    },
});


module.exports = mongoose.model('SubsectionOrder', SubsectionOrder);