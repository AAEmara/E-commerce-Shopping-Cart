import ProfileHelper from '../utils/profileHelper.js';
import User from '../models/Users.js';

class ProfileController {
  static async getUserProfile(req, res) {
    const { userId } = req.user;
    try {
      const user = await ProfileHelper.findProfileById(userId);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'The user may be removed from the database'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: user,
        message: 'User profile data is returned successfully'
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

  static async updateProfile(req, res) {
    try {
      const userId = req.user.userId;
      const { firstName, lastName, username, email } = req.body;
      const updatedData = { firstName, lastName, username, email };

      const updatedUser = await ProfileHelper.
        updateProfileById(userId, updatedData);
      if (!updatedUser) {
        return res.status(404).json({
          status: 'error',
          message: 'Failed to update profile',
          error: process.env.NODE_ENV === 'production' ?
            undefined : 'User was not found and profile update failed'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: updatedUser,
        message: 'User was updated successfully'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred. Please try again later.',
        error: process.env.NODE_ENV === 'production' ?
          undefined : error.message
      });
    }
  }
}

export default ProfileController;
