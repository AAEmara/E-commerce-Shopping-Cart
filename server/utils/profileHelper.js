import User from '../models/Users.js';

class ProfileHelper {
  static async findProfileById(userId) {
    if (!userId)
      throw new Error('Argument is missing: userId');

    const user = await User.findById(userId).select('-password');
    return (user);
  }

  static async updateProfileById(userId, updatedData) {
    if (!userId)
      throw new Error('Argument is missing: userId');
    if (!updatedData)
      throw new Error('Argument is missing: updatedData');

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true, runValidators: true }).select('-password');

    return (updatedUser);
  }
}

export default ProfileHelper;
