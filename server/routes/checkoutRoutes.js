import express from 'express';
import CheckoutController from '../controllers/checkoutController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Process checkout
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               guestInfo:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *               shippingAddress:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Checkout processed successfully
 *       500:
 *         description: Internal server error
 */
router.post('/',
  AuthMiddleware.optionalVerifyAccessToken,
  CheckoutController.processCheckout
);

export default router;
