import { Schema, model } from 'mongoose';
const NotificationSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bannerImg: {
      type: String,
    },
    target: {
      type: String,
      required: true,
    },
    tags: [String],
  },
  { timestamps: true }
);
export default model('Notification', NotificationSchema);
