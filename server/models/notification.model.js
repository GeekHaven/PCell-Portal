import { Schema, model } from 'mongoose';
import targetSchema from './target.schema.js';

const NotificationSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    publicComments: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
    privateComments: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    targets: {
      type: targetSchema,
    },
    status: {
      type: String,
      enum: ['read', 'unread'],
      default: 'active'
    }
  },
  { timestamps: true }
);
export default model('Notification', NotificationSchema);
