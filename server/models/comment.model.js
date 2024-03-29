import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const commentSchema = Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null,
    required: false,
  },
  madeByAdmin: {
    type: Boolean,
    default: false,
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

export default model('Comment', commentSchema);
