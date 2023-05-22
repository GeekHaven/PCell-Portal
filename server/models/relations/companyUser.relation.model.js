import { Schema, model } from 'mongoose';

const CompanyUserRelationSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['registered', 'shortlisted', 'selected', 'rejected'],
    required: true,
  },
});

export default model('CompanyUserRelation', CompanyUserRelationSchema);
