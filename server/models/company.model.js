import { Schema, model } from 'mongoose';

const targetSchema = Schema({
  program: {
    type: String,
  },
  year: {
    type: String,
  },
  requiredCGPA: {
    type: String,
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

  targets: {
    type: [targetSchema],
    default: [],
  },
});

export default model('Company', CompanySchema);
