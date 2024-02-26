import mongoose from "mongoose";

const SubsectionOrderSchema = new mongoose.Schema({
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
    available: { type: Boolean,default:true },
    qunitity:{type:Number,default:1},
    orderStatus: {
        type: String,
        enum: ['pending_orderReq','preparing', 'delivered', 'confirmed', 'in progress', 'canceled'],
        default:"pending_orderReq"
    },
});


// module.exports = mongoose.model('SubsectionOrder', SubsectionOrder);
const SubsectionOrder= mongoose.model('SubsectionOrder', SubsectionOrderSchema);
export default SubsectionOrder