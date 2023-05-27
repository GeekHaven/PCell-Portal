import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notificationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: true,
  },
    private: {
    type: Boolean,
    required: false,
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = mongoose.model('Comment', commentSchema);
