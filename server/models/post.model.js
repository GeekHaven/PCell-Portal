import { Schema, model } from 'mongoose';
import targetSchema from './target.schema.js';

const PostSchema = Schema(
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
      required: false,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: {
      type: String,
      enum: ['disabled', 'public', 'private'],
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    targets: {
      type: targetSchema,
    },
  },
  { timestamps: true }
);
export default model('Post', PostSchema);
