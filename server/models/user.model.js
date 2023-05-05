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
      type: String,
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
  },
  {
    timestamps: true,
  }
);

export default model('User', UserSchema);
