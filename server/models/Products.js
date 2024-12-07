import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    required: false,
    default: 'https://cdn-icons-png.freepik.com/512/8415/8415797.png'
  },
  category: {
    type: String,
    required: false,
    default: 'General'
  },
  inventory: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

const Product = model('Product', productSchema);

export default Product;
