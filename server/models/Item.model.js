import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    default: null,
  },
  itemCount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  imagePath: {
    type: String,
    default: '',
  },
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;
