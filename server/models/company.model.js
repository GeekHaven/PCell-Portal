import { Schema, model } from 'mongoose';
import targetSchema from './target.schema.js';

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
  },
  currentStatus: {
    type: String,
    enum: [
      'registration open',
      'registration closed',
      'shortlisting',
      'completed',
    ],
    default: 'registration open',
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

export default model('Company', CompanySchema);
