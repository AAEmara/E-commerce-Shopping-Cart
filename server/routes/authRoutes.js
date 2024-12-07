import AuthController from '../controllers/authController.js';
import express from 'express';

const router = express.Router();

// TODO: Swagger JSDoc
// TODO: Validate Request before handling the business logic
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User was registered successfully
 *       400:
 *         description: Registration failed
 *       500:
 *         description: Internal server error
 */
router.post('/register',
  AuthController.registerUser
);

// TODO: Swagger JSDoc
// TODO: Validate Request before the business logic
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User has logged in successfully
 *       400:
 *         description: Login failed. Check your credentials again.
 *       500:
 *         description: Internal server error
 */
router.post('/login',
  AuthController.loginUser
);

export default router;
