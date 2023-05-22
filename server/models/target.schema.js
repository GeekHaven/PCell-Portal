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
    type: [String],
    default: [],
  },

  exclude: {
    type: [String],
    default: [],
  },
});

export default targetSchema;
