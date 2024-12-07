import Order from '../models/Order.js';
import Product from '../models/Products.js';
import nodemailer from 'nodemailer';
import Cart from '../models/Cart.js';

class CheckoutController {
  static async processCheckout(req, res) {
    const { userId, guestInfo, shippingAddress, totalAmount } = req.body;

    try {
      // Find the cart
      const cart = await Cart.findOne({ userId }) ||
        await Cart.findOne({ sessionId: req.sessionID });

      if (!cart) {
        return res.status(404).json({
          status: 'error',
          message: 'Cart not found',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'Cart was not found in the database'
        });
      }

      const order = new Order({
        userId,
        sessionId: req.sessionID,
        guestInfo,
        items: cart.items,
        totalAmount,
        shippingAddress,
        paymentStatus: 'Paid'  // Simulate successful payment for now
      });
      await order.save();

      // Update product inventory levels
      for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.inventory -= item.quantity;
          await product.save();
        }
      }

      // Clear the cart
      await Cart.deleteOne({ _id: cart._id });

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userId ? req.user.email : guestInfo.email,
        subject: 'Order Confirmation',
        text: `Your order has been placed successfully! Order ID: ${order._id}`
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        status: 'success',
        data: { order },
        message: 'Checkout processed successfully and confirmation email sent'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'production' ? undefined : error.message
      });
    }
  }
}

export default CheckoutController;
