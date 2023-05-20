import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

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

const CompanySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  techStack: {
    type: String,
    default: '',
  },
  targets: {
    type: targetSchema,
    default: [],
  },
});

export default model('Company', CompanySchema);
