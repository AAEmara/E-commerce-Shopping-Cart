import Product from '../models/Products.js';

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, description, price, imageURL, category } = req.body;
      const product = new Product(
        { name, description, price, imageURL, category});
      await product.save();

      return res.status(201).json({
        status: 'success',
        data: { product },
        message: 'Product was created successfully'
      });
    } catch(error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'production' ?
          undefined : error.message
      });
    }
  }

  static async getProducts(req, res) {
    try {
      const products = await Product.find();
      return res.status(200).json({
        status: 'success',
        data: { products },
        message: 'Products returned successfully'
      });
    } catch(error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'production' ?
          undefined : error.message
      });
    }
  }

  static async getProductById(req, res) {
    try {
      const { productId } = req.params;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'Product was not found based on the given id'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: { product },
        message: 'Product found and returned successfully'
      });
    } catch(error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'production' ?
          undefined : error.message
      });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const { name, description, price, imageURL, category } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description, price, imageURL, category },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'Product was not found based on the given id'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: { updatedProduct },
        message: 'Product was updated successfully'
      });
    } catch(error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'production' ?
          undefined : error.message
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { productId }  = req.params;

      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'Product was not found based on the given id'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: { deletedProduct },
        message: 'Product deleted successfully'
      });
    } catch(error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'production' ?
          undefined : error.message
      });
   }
  }
}

export default ProductController;
