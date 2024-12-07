import express from 'express';
import CartController from '../controllers/cartController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       500:
 *         description: Internal server error
 */
router.post('/add',
  AuthMiddleware.optionalVerifyAccessToken,
  CartController.addItem
);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
router.get('/',
  AuthMiddleware.optionalVerifyAccessToken,
  CartController.getCart
);

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update item in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item updated in cart successfully
 *       404:
 *         description: Cart or item not found
 *       500:
 *         description: Internal server error
 */
router.put('/update', 
  AuthMiddleware.optionalVerifyAccessToken,
  CartController.updateItem
);

/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       404:
 *         description: Cart or item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/remove',
  AuthMiddleware.optionalVerifyAccessToken,
  CartController.removeItem
);

export default router;
