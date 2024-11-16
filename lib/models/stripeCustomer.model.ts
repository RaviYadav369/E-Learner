import mongoose from "mongoose";

const stripeSchema = new mongoose.Schema({
  userId:{type:String,require:true},
  StripeCustomerId:{type:String,require:true,},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StripeCustomer = mongoose.models.StripeCustomer || mongoose.model("StripeCustomer", stripeSchema);
export default StripeCustomer;
