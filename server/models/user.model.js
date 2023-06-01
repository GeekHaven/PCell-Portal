import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    cgpa: {
      type: mongoose.SchemaTypes.Decimal128,
      required: true,
    },
    resumeLink: {
      type: String,
      required: false,
    },
    currentSem: {
      type: String,
      required: true,
    },
    completedCredits: {
      type: Number,
      required: true,
    },
    totalCredits: {
      type: Number,
      required: true,
    },
    admissionYear: {
      type: Number,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', UserSchema);
