import mongoose from 'mongoose';

const PurchaseListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const PurchaseList = mongoose.model('PurchaseList', PurchaseListSchema);
export default PurchaseList;
