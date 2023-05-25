import { Schema, model } from 'mongoose';
import targetSchema from './target.schema.js';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

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

CompanySchema.plugin(aggregatePaginate);

export default model('Company', CompanySchema);
