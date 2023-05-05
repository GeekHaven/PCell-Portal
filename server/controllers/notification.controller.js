import Notification from '../models/notification.model';
import {
  response_400,
  response_500,
  response_200,
} from '../utils/response.utils';

export const createNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description, bannerImg, target, tags } = req.body;

    if (!title || !description || !target) {
      return response_400(res, 'Please fill all the fields');
    }
    const notification = new Notification({
      title,
      bannerImg,
      target,
      description,
      createdBy: userId,
      tags,
    });
    const savedNotification = await notification.save();

    const targetedUsers = await User.find({
      $or: [
        { rollNumber: { $in: target.rollNumbers } },
        {
          $and: [
            { admissionYear: { $in: target.admissionYears } },
            { program: { $in: target.programs } },
          ],
        },
      ],
    });

    targetedUsers.forEach(async (user) => {
      user.notifications.push(notification._id);
      await user.save();
    });

    return response_200(res, savedNotification);
  } catch (error) {
    return response_500(res, error);
  }
};
