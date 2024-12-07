import Cart from '../models/Cart.js';

class CartController {
  static async addItem(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user ? req.user.userId : null;
    const sessionId = req.sessionID;

    try {
      let cart = await Cart.findOne({ userId }) ||
        await Cart.findOne({ sessionId });

      if (!cart) {
        cart = new Cart({ userId, sessionId, items: [] });
      }

      const itemIndex = cart.items.findIndex(item => {
        return (item.productId.equals(productId));
      });

      if (itemIndex > -1)
        cart.items[itemIndex].quantity += quantity;
      else
        cart.items.push({ productId, quantity });
      await cart.save();

      return res.status(200).json({
        status: 'success',
        data: { cart },
        message: 'Item added to cart successfully'
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

  static async getCart(req, res) {
    console.log(req.user);
    const userId = req.user ? req.user.userId : null;
    const sessionId = req.sessionID;

    try {
      let cart = await Cart.findOne({ userId }) ||
        await Cart.findOne({ sessionId });

      if (!cart) {
        cart = new Cart({ userId, sessionId, items: [] });
        await cart.save();
      }

      return res.status(200).json({
        status: 'success',
        data: { cart },
        message: 'Cart retrieved successfully'
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

  static async updateItem(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user ? req.user._id : null;
    const sessionId = req.sessionID;

    try {
      const cart = await Cart.findOne({ userId }) ||
        await Cart.findOne({ sessionId });

      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Cart not found',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'Cart was not found in the database'
        });
      }

      const itemIndex = cart.items.findIndex(item => {
        return item.productId.equals(productId);
      });

      if (itemIndex === -1) {
        return res.status(404).json({
          status: 'error',
          message: 'Item not found in cart',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'Item was not added in the cart from the beginning'
        });
      }

      cart.items[itemIndex].quantity = quantity;
      await cart.save();

      return res.status(200).json({
        status: 'success',
        data: { cart },
        message: 'Item updated in cart successfully'
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

  static async removeItem(req, res) {
    const { productId } = req.body;
    const userId = req.user ? req.user.userId : null;
    const sessionId = req.sessionID;

    try {
      const cart = await Cart.findOne({ userId }) ||
        await Cart.findOne({ sessionId });

      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Cart not found',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'Cart was not found in the database'
        });
      }

      const itemIndex = cart.items.findIndex(item => {
        return item.productId.equals(productId);
      });

      if (itemIndex === -1) {
        return res.status(404).json({
          status: 'error',
          message: 'Item not found in cart',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'Item was not added in the cart from the beginning'
        });
      }

      cart.items.splice(itemIndex, 1);
      await cart.save();

      return res.status(200).json({
        status: 'success',
        data: { cart },
        message: 'Item removed from cart successfully'
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

export default CartController;
