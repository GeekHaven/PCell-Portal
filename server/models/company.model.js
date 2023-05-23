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
  // registeredUsers: {
  //   type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  //   default: [],
  // },
  // shortListedUsers: {
  //   type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  //   default: [],
  // },
  // selectedUsers: {
  //   type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  //   default: [],
  // },
});

export default model('Company', CompanySchema);
