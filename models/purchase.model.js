const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    order_amount:{
        type: String,
        required: true
    },
    payment_method:{
        type: String,
        enum:['UPI', 'CREDIT', 'COD'],
        required: true
    },
    seller:{
        type:String,
        required: true
    },
    delivery_address:{
        type:String,
        required: true
    },
    delivery_pincode:{
        type: String,
        required: true
    },
    is_delivered: {
      type: Boolean,
      default: false,
    },
    is_cancelled:{
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

const purchase = mongoose.model("purchase", purchaseSchema);

module.exports = purchase;
