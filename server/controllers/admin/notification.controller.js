import User from '../../models/user.model.js';
import { isUserEligibleInTarget } from '../../utils/queries/isUserEligibleInTarget.js';
import {
  response_200,
  response_500,
  response_400,
  response_201,
} from '../../utils/responseCodes.js';



export async function addNotification(req, res) {
    try {
        const {
        title,
        description,
        company,
        comments,
        target,
        content,
        } = req.body;

        if(!title || !description || !company || !comments || !target || !content) return response_400(res, 'Invalid request');

        const notification = await Notification.create({
        title,
        description,
        publicComments: [],
        privateComments: [],
        company,
        target,
        content,
        });

        const allUsers = await User.find({});
        const eligibleUsers = [];
        allUsers.forEach((user) => {
            if(isUserEligibleInTarget(user)) eligibleUsers.push(user);
        });

        eligibleUsers.forEach((user) => {
            user.notifications.push(notification._id);
            user.save();
        });

        return response_201(res, notification);
    } catch (error) {
        return response_500(res, error);
    }
    }

export async function getAllNotifications(req, res) {
    try {
        const notifications = await Notification.find({});
        return response_200(res, notifications);
    } catch (error) {
        return response_500(res, error);
    }
}

export async function getAllUserNotifications(req, res) {
    try{
        const { id } = req.params;
        if(!id) return response_400(res, 'Invalid request');
        const user = await User.findById(id).populate('notifications');
        if(!user) return response_400(res, 'User Doesnot exist');
        return response_200(res, user.notifications);
    }
    catch(error){
        return response_500(res, error);
    }
}

export async function getNotificationByIdAdmin(req, res) {
    try{
        const { id } = req.params;
        const notification = await Notification.findById(id).populate('publicComments').populate('privateComments');
        return response_200(res, notification);
    }
    catch(error){
        return response_500(res, error);
    }
}

export async function getNotificationByIdUser(req, res) {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id)
      .populate('publicComments')
        .populate('privateComments');
    
    
    
    notification.status = 'read';
    if(!notification) return response_400(res, 'Invalid request');
    return response_200(res, notification);
  } catch (error) {
    return response_500(res, error);
  }
}

// export async function getAllUserNotifications(req, res) {
//     try{
//         const { id } = req.params;
//         const user = await User.findById(id).populate('notifications').populate('notifications.publicComments');
//         return response_200(res, user.notifications);
//     }
//     catch(error){
//         return response_500(res, error);
//     }
// }

export async function addPublicComment(req, res) {
    try{
        const { content, notificationId, author} = req.body;
        const notification = await Notification.findById(notificationId);
        if(!notification || !content || !author) return response_400(res, 'Invalid request');

        if(notification.comment!="public") return response_400(res, 'Invalid request');

        const comment = await Comment.create({
            content,
            author,
            notificationId,
            private: false,
        });
    
        notification.publicComments.push(comment);
        notification.status = "unread";
        notification.save();
        return response_200(res, notification);
    }
    catch(error){
        return response_500(res, error);
    }
}

export async function addPrivateComment(req, res) {
    try{
        const { content, notificationId, author} = req.body;
        const notification = await Notification.findById(notificationId);
        if(!notification || !content || !author) return response_400(res, 'Invalid request');

        if(notification.comment!="private") return response_400(res, 'Invalid request');

        const comment = await Comment.create({
            content,
            author,
            notificationId,
            private: true,
        });
    
        notification.privateComments.push(comment);
        notification.status = 'unread';
        notification.save();
        return response_200(res, notification);
    }
    catch(error){
        return response_500(res, error);
    }
}