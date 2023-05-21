import { Schema } from 'mongoose';

const groupSchema = Schema({
  year: Number,
  program: String,
  minCredits: Number,
  minCGPA: Number,
});

const targetSchema = Schema({
  groups: {
    type: [groupSchema],
    default: [],
  },

  include: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    required: false,
  },

  exclude: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    required: false,
  },
});

export default targetSchema;
