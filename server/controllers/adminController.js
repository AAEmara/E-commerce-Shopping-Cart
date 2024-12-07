import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

class AdminController {
  static async registerAdmin(req, res) {
    const { firstName, lastName, email, username, password } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the admin user
      const adminUser = new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();

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
        to: email,
        subject: 'Admin Account Created',
        text: `Hello ${firstName}, your admin account has been created successfully.`
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        status: 'success',
        message: 'Admin user registered successfully',
        data: { adminUser }
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

export default AdminController;
