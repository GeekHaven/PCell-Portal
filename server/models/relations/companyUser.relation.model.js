import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const CompanyUserRelationSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  // companyName: {
  //   type: String,
  //   required: true,
  // },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['registered', 'shortlisted', 'selected'],
    required: true,
  },
});

CompanyUserRelationSchema.plugin(aggregatePaginate);

export default model('CompanyUserRelation', CompanyUserRelationSchema);
