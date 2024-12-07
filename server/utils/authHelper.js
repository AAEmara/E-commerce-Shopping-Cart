import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

class AuthHelper {
  static async checkUsernameExists(username) {
    if (!username)
      throw new Error('Argument is missing: username');

    const user = await User.findOne({ username }).exec();
    return (user);
  }

  static async checkEmailExists(email) {
    if (!email)
      throw new Error('Argument is missing: email');

    const user = await User.findOne({ email }).exec();
    return (user);
  }

  static async checkIdentifierExists(identifier) {
    if (!identifier)
      throw new Error('Argument is missing: identifier');

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });
    return (user);
  }

  static async hashPassword(password) {
    if (!password)
      throw new Error('Argument is missing: password');

    const hashedPassword = bcrypt.hash(password, 10);
    return (hashedPassword);
  }

  static async checkHashedPassword(password, hashedPassword) {
    if (!password)
      throw new Error('Argument is missing: password');
    else if (!hashedPassword)
      throw new Error('Argument is missing: hashedPassword');

    const isAuthentic = await bcrypt.compare(password, hashedPassword);
    return (isAuthentic);
  }

  static generateAccessToken(payload) {
    if (!payload)
      throw new Error('Argument is missing: payload');

    const accessExpiryPeriodMs = process.env.ACCESS_TOKEN_EXP_MS;

    if (!accessExpiryPeriodMs)
      throw new Error('Environment variable is missing: ACCESS_TOKEN_EXP_MS');

    try {
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: accessExpiryPeriodMs }
      );

      return (accessToken);
    } catch(error) {
      throw new Error(`Access token generation failed: ${error.message}`);
    }
  }

  static generateRefreshToken(payload) {
    if (!payload)
      throw new Error('Argument is missing: payload');

    const refreshExpiryPeriodMs = process.env.REFRESH_TOKEN_EXP_MS;
    if (!refreshExpiryPeriodMs)
      throw new Error('Environment variable is missing: REFRESH_TOKEN_EXP_MS');

    try {
      const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: refreshExpiryPeriodMs }
      );

      return (refreshToken);
    } catch(error) {
      throw new Error(`Refresh token generation failed: ${error.message}`);
    }
  }
}

export default AuthHelper;
