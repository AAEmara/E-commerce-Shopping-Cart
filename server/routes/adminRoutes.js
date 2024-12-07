import express from 'express';
import AdminController from '../controllers/adminController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register an admin user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
 *       200:
 *         description: Admin user registered successfully
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.post('/register',
  AdminController.registerAdmin
);

export default router;
